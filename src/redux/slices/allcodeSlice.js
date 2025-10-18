import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCode } from "../../utils/api/allcodeApi";

export const fetchGenders = createAsyncThunk(
  "allcode/fetchGenders",
  async (_, { rejectedWithValue }) => {
    try {
      const res = await getAllCode("GENDER");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectedWithValue(error.message || "Failed to fetch");
    }
  }
);

export const fetchRoles = createAsyncThunk(
  "allcode/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCode("ROLE");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProvinces = createAsyncThunk(
  "allcode/fetchProvinces",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCode("PROVINCE");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPropertyType = createAsyncThunk(
  "allcode/fetchPropertyType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCode("PROPERTY_TYPE");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCheckInTime = createAsyncThunk(
  "allcode/fetchCheckInTime",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCode("CHECKIN");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCheckOutTime = createAsyncThunk(
  "allcode/fetchCheckOutTime",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCode("CHECKOUT");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRoomType = createAsyncThunk(
  "allcode/fetchRoomType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCode("ROOM_TYPE");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRoomStatus = createAsyncThunk(
  "allcode/fetchRoomStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCode("ROOM_STATUS");
      if (res?.errCode === 0) {
        return res.data || [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  genders: [],
  roles: [],
  provinces: [],
  propertyType: [],
  checkInTime: [],
  checkOutTime: [],
  roomTypes: [],
  roomStatus: []
};

const allcodeSlice = createSlice({
  name: "allcode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.genders = action.payload;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload;
      })
      .addCase(fetchPropertyType.fulfilled, (state, action) => {
        state.propertyType = action.payload;
      })
      .addCase(fetchCheckInTime.fulfilled, (state, action) => {
        state.checkInTime = action.payload;
      })
      .addCase(fetchCheckOutTime.fulfilled, (state, action) => {
        state.checkOutTime = action.payload;
      })
      .addCase(fetchRoomType.fulfilled, (state, action) => {
        state.roomTypes = action.payload;
      })
       .addCase(fetchRoomStatus.fulfilled, (state, action) => {
        state.roomStatus = action.payload;
      });
  },
});

export const {} = allcodeSlice.actions;
export default allcodeSlice.reducer;
