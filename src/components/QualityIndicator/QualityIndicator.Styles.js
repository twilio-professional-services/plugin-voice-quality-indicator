import { default as styled } from "react-emotion";
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
  margin-right: 20px;
  border: 1px solid;
  border-color: ${(props) =>
    errorLevelToBorderColor(
      props.disabled ? ErrorLevels.DISABLED : props.errorLevel
    )};
  borderradius: 5px;
  padding: 5px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
