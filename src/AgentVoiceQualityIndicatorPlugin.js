import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";

import reducers, { namespace } from "./states";

import QualityIndicatorContainer from "./components/QualityIndicator/QualityIndicator.Container";
import { listenForVoiceClientEvents } from "./helpers/voiceClientHelper";

const PLUGIN_NAME = "AgentVoiceQualityIndicatorPlugin";

export default class AgentVoiceQualityIndicatorPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    listenForVoiceClientEvents(manager);

    flex.MainHeader.Content.remove("mute-button");
    flex.MainHeader.Content.add(
      <QualityIndicatorContainer key="quality-indicator" />,
      {
        sortOrder: -1,
        align: "end",
      }
    );
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
