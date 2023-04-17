import { Actions as QualityIndicatorAction } from "../states/QualityIndicatorState";
import EventEmitter from "eventemitter3";

// TMP - move to config (or ideally fetch a json config from a remote server)

const packetLossThreshold = 0;
const jitterThreshold = 10;

const INPUT = "input";
const OUTPUT = "output";

const warningEvents = [
  "high-rtt",
  "low-mos",
  "high-jitter",
  "high-packet-loss",
  "low-bytes-received",
  "low-bytes-sent",
];
const errorEvents = ["ice-connectivity-lost"];

class VolumeEvents {
  constructor() {
    this.emitter = new EventEmitter();
  }

  volumeUpdateHandler = (input, output) => {
    // levels are 0.x floats - lets switch to 0-9
    const newInput = Math.floor(input * 10);
    const newOutput = Math.floor(output * 10);

    // if level has changed emit an event
    if (this.input != newInput) {
      this.input = newInput;
      this.emitter.emit("input", newInput);
    }

    if (this.output != newOutput) {
      this.output = newOutput;
      this.emitter.emit("output", newOutput);
    }
  };

  on = (e, cb) => this.emitter.on(e, cb);

  removeListener = (e) => this.emitter.removeListener(e);
}

export const VolumeEventsHandler = new VolumeEvents();

// Maps to react-wifi-indicator string
export const ErrorLevels = {
  DISABLED: "UNUSABLE",
  ERROR: "DISCONNECTED",
  WARNING: "OKAY",
  ABOVE_ERROR_THRESHOLD: "GREAT",
  NORMAL: "EXCELLENT",
};

export const listenForVoiceClientEvents = (manager) => {
  manager.voiceClient.on("incoming", (connection) => {
    connection.on("sample", (rtcSample) =>
      handleNetworkStatusSample(manager, rtcSample)
    );

    connection.on("warning", (warningName, warningData) =>
      handleWarningEvent(manager, true, warningName, warningData)
    );

    connection.on("warning-cleared", (warningName, warningData) =>
      handleWarningEvent(manager, false, warningName, warningData)
    );

    connection.on("volume", (input, output) => {
      VolumeEventsHandler.volumeUpdateHandler(input, output);
    });
  });

  manager.voiceClient.on("incoming", () => {
    manager.store.dispatch(QualityIndicatorAction.clearData());
  });
};

const handleWarningEvent = (manager, raised, warningName, warningData) => {
  if (warningEvents.includes(warningName)) {
    manager.store.dispatch(
      QualityIndicatorAction.updateWarning(raised, warningName)
    );
  }

  if (errorEvents.includes(warningName)) {
    manager.store.dispatch(
      QualityIndicatorAction.updateError(raised, warningName)
    );
  }
};

window.testSdkEvent = handleWarningEvent;

const processErrorThresholdUpdate = (manager, jitter, packetsLost) => {
  const currentlySet =
    manager.store.getState()["agent-voice-quality-indicator"].qualityIndicator
      .aboveErrorThreshold;

  const aboveErrorThreshold =
    jitter > jitterThreshold || packetsLost > packetLossThreshold;

  if (currentlySet != aboveErrorThreshold) {
    manager.store.dispatch(
      QualityIndicatorAction.updateAboveThresholdError(aboveErrorThreshold)
    );
  }
};

const handleNetworkStatusSample = (manager, rtcSample) => {
  const { store } = manager;
  console.log(
    rtcSample.jitter,
    rtcSample.packetsLost,
    rtcSample.audioInputLevel,
    rtcSample.audioOutputLevel
  );

  processErrorThresholdUpdate(manager, rtcSample.jitter, rtcSample.packetsLost);
};
