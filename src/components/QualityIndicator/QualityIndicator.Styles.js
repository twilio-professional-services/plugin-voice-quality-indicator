import { styled } from "@twilio/flex-ui";
import { ErrorLevels } from "../../helpers/voiceClientHelper";

const errorLevelToBorderColor = (errorLevel) => {
  switch (errorLevel) {
    case ErrorLevels.DISABLED:
      return "grey";
    case ErrorLevels.ERROR:
      return "red";
    case ErrorLevels.ABOVE_ERROR_THRESHOLD:
      return "yellow";
    case ErrorLevels.WARNING:
      return "orange";
    case ErrorLevels.NORMAL:
      return "green";
  }
};

export const QualityIndicatorStyles = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  border: 1px solid;
  border-color: ${(props) =>
    errorLevelToBorderColor(
      props.disabled ? ErrorLevels.DISABLED : props.errorLevel
    )};
  border-radius: 5px;
  padding: 3px 10px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
