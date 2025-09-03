import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  location: localStorage.getItem("location") || null,
  checkIn: localStorage.getItem("checkIn") || null,
  checkOut: localStorage.getItem("checkOut") || null,
  guestCount: Number(localStorage.getItem("guestCount")) || 1,
  roomCount: Number(localStorage.getItem("roomCount")) || 1,
  stayDays: Number(localStorage.getItem("stayDays")) || 1,

  status: "idle",
  error: null,
};


const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInfo: (state, action) => {
      const { location, checkIn, checkOut, guestCount, roomCount } =
        action.payload;
      state.location = location;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.guestCount = guestCount;
      state.roomCount = roomCount;

      // Tính số ngày ở
      if (checkIn && checkOut) {
        const nights =
          checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : 1;
        state.stayDays = nights > 1 ? nights : 1;
      } else {
        state.stayDays = 1;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { setSearchInfo } = searchSlice.actions;
export default searchSlice.reducer;
