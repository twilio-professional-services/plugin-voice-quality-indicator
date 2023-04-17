import { ErrorLevels } from "../../../helpers/voiceClientHelper";
import { Icon } from "@twilio/flex-ui";

const FlexWifiIndicator = (props) => {
  const { networkStatus, disabled } = props;
  
  const strengthToIcon = () => {
    const strength = disabled ? ErrorLevels.DISABLED : networkStatus.errorLevel;
    
    switch (strength) {
      case ErrorLevels.DISABLED:
      return 'Success';
      case ErrorLevels.ERROR:
      return 'AppDegraded';
      case ErrorLevels.WARNING:
      return 'ConnectionError';
      case ErrorLevels.ABOVE_ERROR_THRESHOLD:
      return 'Success';
      case ErrorLevels.NORMAL:
      return 'Success';
    }
    
    return 'AppDegraded';
  }

  return (
    <Icon
      icon={strengthToIcon()}
      style={{ height: 24 }}
      title={disabled ? "No active call" : networkStatus.errorString}
      />
  );
};

export default FlexWifiIndicator;
