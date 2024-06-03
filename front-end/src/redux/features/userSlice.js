import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default userSlice.reducer;

export const { setIsAuthenticated, setUser, setLoading } = userSlice.actions;
