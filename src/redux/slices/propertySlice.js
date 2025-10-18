import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProperty } from "../../utils/api";

export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllProperty();
      if (res?.errCode === 0) {
        return res.data || [];
      }
      if (res?.errCode !== 0) {
        return rejectWithValue(res.message || "Something went wrong");
      }
      return res.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  properties: [],
  status: "idle",
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = propertySlice.actions;
export default propertySlice.reducer;
