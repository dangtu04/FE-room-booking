import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("language") || "vi",
  globalLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLocale(state, action) {
      state.locale = action.payload;
    },
    toggleLoading(state, action) {
      state.globalLoading = action.payload;
    },
    changeLanguage(state, action) {
      const { language } = action.payload;
      state.language = language;
      localStorage.setItem("language", language);
    },
  },
});

export const { setLocale, toggleLoading, changeLanguage } = appSlice.actions;
export default appSlice.reducer;
