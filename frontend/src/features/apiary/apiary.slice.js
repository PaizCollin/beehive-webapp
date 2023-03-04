import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiaryService from "./apiary.service.js";

const initialState = {
  apiaries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new apiary
export const createApiary = createAsyncThunk(
  "apiary/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await apiaryService.createApiary(goalData, token);
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
