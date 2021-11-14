import { combineReducers } from "redux"

import authReducer from "./auth"
import uiReducer from "./ui"  

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer, 
})

export default rootReducer
