import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice.js";
import apiaryReducer from "../features/apiary/apiary.slice.js";
import deviceReducer from "../features/device/device.slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    apiary: apiaryReducer,
    device: deviceReducer,
  },
});
