import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiaryService from "./apiary.service.js";

const initialState = {
  apiaries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user apiaries
export const getApiaries = createAsyncThunk(
  "apiary/getAll",
  async (_, thunkAPI) => {
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

// Create new apiary
export const createApiary = createAsyncThunk(
  "apiary/create",
  async (apiaryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.createApiary(apiaryData, token);
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

export const updateMembers = createAsyncThunk(
  "apiary/updateMembers",
  async (apiaryID, userID, setOwner, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.updateMembers(
        apiaryID,
        userID,
        setOwner,
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

export const deleteMember = createAsyncThunk(
  "apiary/deleteMember",
  async (apiaryID, userID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.deleteMember(apiaryID, userID, token);
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

export const updateApiary = createAsyncThunk(
  "apiary/updateApiary",
  async (apiaryData, apiaryID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.updateApiary(apiaryData, apiaryID, token);
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

// Delete user apiary
export const deleteApiary = createAsyncThunk(
  "apiaries/delete",
  async (apiaryID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) return;
      return await apiaryService.deleteApiary(apiaryID, token);
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
      .addCase(createApiary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.apiaries.push(action.payload);
      })
      .addCase(createApiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.apiaries = action.payload;
      })
      .addCase(updateMembers.rejected, (state, action) => {
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
        state.apiaries = action.payload;
      })
      .addCase(deleteMember.rejected, (state, action) => {
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
        state.apiaries = action.payload;
      })
      .addCase(updateApiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteApiary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.apiaries = state.apiaries.filter(
          (apiary) => apiary._id !== action.payload.id
        );
      })
      .addCase(deleteApiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = apiarySlice.actions;
export default apiarySlice.reducer;
