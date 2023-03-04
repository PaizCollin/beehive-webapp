import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice.js";
import orgReducer from "../features/org/org.slice.js";
import deviceReducer from "../features/device/device.slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    org: orgReducer,
    device: deviceReducer,
  },
});
