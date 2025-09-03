import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../utils/api";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload.email, payload.password);
      // console.log("Login response:", res);
      if (res?.errCode === 0) {
        return {
          token: res.access_token,
          ...res.data,
        };
      } else {
        return rejectWithValue(res.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState = {
  token: localStorage.getItem("access_token") || null,
  email: null,
  fullName: null,
  roleCode: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      state.fullName = null;
      state.roleCode = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user_data");
      localStorage.removeItem("access_token");
    },
    restoreUser(state, action) {
      const { token, email, fullName, roleCode } = action.payload;
      state.token = token;
      state.email = email;
      state.fullName = fullName;
      state.roleCode = roleCode;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, email, fullName, roleCode } = action.payload;
        // lưu vào reudx
        state.token = token;
        state.email = email;
        state.fullName = fullName;
        state.roleCode = roleCode;
        state.isAuthenticated = true;
        state.status = "succeeded";

        // lưu vào localStorage
        localStorage.setItem("access_token", token);
        localStorage.setItem(
          "user_data",
          JSON.stringify({ email, fullName, roleCode })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, restoreUser } = userSlice.actions;
export default userSlice.reducer;
// fix token hết hạn bị lưu trong localStorage