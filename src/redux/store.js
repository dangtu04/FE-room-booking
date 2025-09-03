import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import appReducer from "./slices/appSlice";
import allcodeReducer from "./slices/allcodeSlice";
import propertyReducer from "./slices/propertySlice";
import roomReducer from "./slices/roomSlice";
import searchReducer from "./slices/searchSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    allcode: allcodeReducer,
    property: propertyReducer,
    room: roomReducer,
    search: searchReducer,
  },
});
