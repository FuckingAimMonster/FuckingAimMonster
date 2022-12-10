import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
