import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getListRoomTypeByPropertyId,
  getListRoomUnitByRoomTypeId,
} from "../../utils/api";

export const fetchListRoomType = createAsyncThunk(
  "room/fetchListRoomType",
  async (propertyId, { rejectWithValue }) => {
    try {
      const res = await getListRoomTypeByPropertyId(propertyId);
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

export const fetchListRoomUnit = createAsyncThunk(
  "room/fetchListRoomUnit",
  async (roomTypeId, { rejectWithValue }) => {
    try {
      const res = await getListRoomUnitByRoomTypeId(roomTypeId);
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
  listRoomType: [],
  listRoomUnit: [],
  status: "idle",
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListRoomType.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchListRoomType.fulfilled, (state, action) => {
        state.listRoomType = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchListRoomType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      ///////////////////////////
      .addCase(fetchListRoomUnit.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchListRoomUnit.fulfilled, (state, action) => {
        state.listRoomUnit = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchListRoomUnit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = roomSlice.actions;
export default roomSlice.reducer;
