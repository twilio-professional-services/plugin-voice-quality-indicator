import WifiIndicator, { SignalStrength } from "react-wifi-indicator";
import { ErrorLevels } from "../../../helpers/voiceClientHelper";

const FlexWifiIndicator = (props) => {
  const { networkStatus, disabled } = props;

  const strength = disabled ? ErrorLevels.DISABLED : networkStatus.errorLevel;

  return (
    <WifiIndicator
      strength={strength}
      style={{ height: 24 }}
      title={disabled ? "No active call" : networkStatus.errorString}
    />
  );
};

export default FlexWifiIndicator;
