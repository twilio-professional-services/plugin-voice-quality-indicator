const ACTION_WARNING_UPDATE = "WARNING_UPDATE";
const ACTION_ERROR_UPDATE = "ERROR_UPDATE";
const ACTION_ABOVE_ERROR_THRESHOLD_UPDATE = "ABOVE_ERROR_THRESHOLD_UPDATE";
const ACTION_CLEAR_DATA = "CLEAR_DATA";

const initialState = {
  warnings: [],
  errors: [],
  aboveErrorThreshold: false,
};

export class Actions {
  static updateWarning = (raised, warningName) => ({
    type: ACTION_WARNING_UPDATE,
    payload: {
      raised: raised,
      warningName: warningName,
    },
  });

  static updateError = (raised, warningName) => ({
    type: ACTION_ERROR_UPDATE,
    payload: {
      raised: raised,
      warningName: warningName,
    },
  });

  static updateAboveThresholdError = (raised) => ({
    type: ACTION_ABOVE_ERROR_THRESHOLD_UPDATE,
    payload: { raised: raised },
  });

  static clearData = () => ({
    type: ACTION_CLEAR_DATA,
  });
}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case ACTION_CLEAR_DATA: {
      return initialState;
    }

    case ACTION_WARNING_UPDATE: {
      if (action.payload.raised) {
        return {
          ...state,
          warnings: [
            ...state.warnings,
            { warningName: action.payload.warningName },
          ],
        };
      } else
        return {
          ...state,
          warnings: state.warnings.filter(
            (warning) => warning.warningName !== action.payload.warningName
          ),
        };
    }

    case ACTION_ERROR_UPDATE: {
      if (action.payload.raised) {
        return {
          ...state,
          errors: [
            ...state.errors,
            { warningName: action.payload.warningName },
          ],
        };
      } else
        return {
          ...state,
          errors: state.errors.filter(
            (warning) => warning.warningName !== action.payload.warningName
          ),
        };
    }

    case ACTION_ABOVE_ERROR_THRESHOLD_UPDATE: {
      return {
        ...state,
        aboveErrorThreshold: action.payload.raised,
      };
    }

    default:
      return state;
  }
}
