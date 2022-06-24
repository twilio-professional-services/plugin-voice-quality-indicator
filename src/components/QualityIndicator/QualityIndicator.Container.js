import { connect } from "react-redux";
import QualityIndicator from "./QualityIndicator";
import { ErrorLevels } from "../../helpers/voiceClientHelper";

const storeToNetworkStatus = (store) => {
  if (store.errors.length) {
    return {
      errorLevel: ErrorLevels.ERROR,
      errorString: store.errors.map((error) => error.warningName).toString(),
    };
  }

  if (store.warnings.length) {
    return {
      errorLevel: ErrorLevels.WARNING,
      errorString: store.warnings
        .map((warning) => warning.warningName)
        .toString(),
    };
  }

  if (store.aboveErrorThreshold) {
    return {
      errorLevel: ErrorLevels.ABOVE_ERROR_THRESHOLD,
      errorString: "Above error threshold",
    };
  }

  return { errorLevel: ErrorLevels.NORMAL, errorString: "Normal" };
};

const mapStateToProps = (state) => ({
  disabled: !state["flex"].phone.connection,
  networkStatus: storeToNetworkStatus(
    state["agent-voice-quality-indicator"].qualityIndicator
  ),
});

export default connect(mapStateToProps)(QualityIndicator);
