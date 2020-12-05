import { combineReducers } from "redux";
import authReducer from "./auth";
import quizReducer from "./quiz";

export default combineReducers({
  quiz: quizReducer,
  auth: authReducer,
});
