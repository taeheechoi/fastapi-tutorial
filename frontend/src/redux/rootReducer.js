import { combineReducers } from "redux"
import authReducer from "./auth"
const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers will go here later
})
export default rootReducer