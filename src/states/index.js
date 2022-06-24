import { combineReducers } from "redux";

import { reduce as QualityIndicatorReducer } from "./QualityIndicatorState";

// Register your redux store under a unique namespace
export const namespace = "agent-voice-quality-indicator";

// Combine the reducers
export default combineReducers({
  qualityIndicator: QualityIndicatorReducer,
});
