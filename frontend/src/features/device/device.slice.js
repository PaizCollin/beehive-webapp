import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deviceService from "./device.service.js";

const initialState = {
  devices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all apiary devices
export const getData = createAsyncThunk(
  "device/getData",
  async (apiaryID, deviceID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await deviceService.getData(apiaryID, deviceID, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all apiary devices
export const getDevices = createAsyncThunk(
  "device/getAll",
  async (apiaryID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await deviceService.getDevices(apiaryID, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new device
export const createDevice = createAsyncThunk(
  "device/create",
  async (deviceData, apiaryID, thunkAPI) => {
    if (!thunkAPI.getState().auth.user.token) {
      return;
    }
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await deviceService.createDevice(deviceData, apiaryID, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user device
export const updateDevice = createAsyncThunk(
  "device/delete",
  async (deviceData, apiaryID, deviceID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await deviceService.updateDevice(
        deviceData,
        apiaryID,
        deviceID,
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user device
export const deleteDevice = createAsyncThunk(
  "device/delete",
  async (apiaryID, deviceID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await deviceService.deleteDevice(apiaryID, deviceID, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDevice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDevice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.devices.push(action.payload);
      })
      .addCase(createDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDevices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDevices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.devices = action.payload;
      })
      .addCase(getDevices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDevice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.devices = state.devices.filter(
          (device) => device._id !== action.payload.id
        );
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = deviceSlice.actions;
export default deviceSlice.reducer;
