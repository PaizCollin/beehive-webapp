import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiaryService from "./apiary.service.js";

const initialState = {
  apiaries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user apiaries GOOD
export const getApiaries = createAsyncThunk(
  "apiary/getApiaries",
  async (_, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.getApiaries(token);
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

// Set new apiary GOOD
export const setApiary = createAsyncThunk(
  "apiary/setApiary",
  async (apiaryData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.setApiary(apiaryData, token);
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

// Update apiary GOOD
export const updateApiary = createAsyncThunk(
  "apiary/updateApiary",
  async (apiaryData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.updateApiary(apiaryData, token);
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

// Delete apiary GOOD
export const deleteApiary = createAsyncThunk(
  "apiary/deleteApiary",
  async (apiaryData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.deleteApiary(apiaryData, token);
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

// Set new device GOOD
export const setDevice = createAsyncThunk(
  "apiary/setDevice",
  async (apiaryData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.setDevice(apiaryData, token);
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

// Update device GOOD
export const updateDevice = createAsyncThunk(
  "apiary/updateDevice",
  async (apiaryData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.updateDevice(apiaryData, token);
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

// Delete device GOOD
export const deleteDevice = createAsyncThunk(
  "apiary/deleteDevice",
  async (apiaryData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.deleteDevice(apiaryData, token);
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

// Set new member GOOD
export const setMember = createAsyncThunk(
  "apiary/setMember",
  async (userData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.setMember(userData, token);
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

// Update member GOOD
export const updateMember = createAsyncThunk(
  "apiary/updateMember",
  async (userData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.updateMember(userData, token);
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

// Delete member GOOD
export const deleteMember = createAsyncThunk(
  "apiary/deleteMember",
  async (userData, thunkAPI) => {
    if (!thunkAPI.getState().auth.user) return;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.deleteMember(userData, token);
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

export const apiarySlice = createSlice({
  name: "apiary",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiaries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApiaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.apiaries = action.payload;
      })
      .addCase(getApiaries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(setApiary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setApiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.apiaries.push(action.payload);
      })
      .addCase(setApiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateApiary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.apiaries.findIndex(
          (apiary) => apiary._id === action.payload._id
        );
        state.apiaries.fill(action.payload, index, index + 1);
      })
      .addCase(updateApiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.apiaries = action.payload;
      })

      .addCase(deleteApiary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.apiaries = state.apiaries.filter(
          (apiary) => apiary._id !== action.payload._id
        );
      })
      .addCase(deleteApiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(setDevice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setDevice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.apiaries.findIndex(
          (apiary) => apiary._id === action.payload._id
        );
        state.apiaries.fill(action.payload, index, index + 1);
      })
      .addCase(setDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateDevice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.apiaries.findIndex(
          (apiary) => apiary._id === action.payload._id
        );
        state.apiaries.fill(action.payload, index, index + 1);
      })
      .addCase(updateDevice.rejected, (state, action) => {
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
        const index = state.apiaries.findIndex(
          (apiary) => apiary._id === action.payload._id
        );
        state.apiaries.fill(action.payload, index, index + 1);
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(setMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.apiaries.findIndex(
          (apiary) => apiary._id === action.payload._id
        );
        state.apiaries.fill(action.payload, index, index + 1);
      })
      .addCase(setMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.apiaries.findIndex(
          (apiary) => apiary._id === action.payload._id
        );
        state.apiaries.fill(action.payload, index, index + 1);
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.apiaries.findIndex(
          (apiary) => apiary._id === action.payload._id
        );
        state.apiaries.fill(action.payload, index, index + 1);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = apiarySlice.actions;
export default apiarySlice.reducer;
