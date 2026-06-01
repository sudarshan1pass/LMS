import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,

  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,

  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  email: localStorage.getItem("email")
    ? JSON.parse(localStorage.getItem("email"))
    : null,

  storedata: localStorage.getItem("storedata")
    ? JSON.parse(localStorage.getItem("storedata"))
    : [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setemail: (state, action) => {
      state.email = action.payload;

      localStorage.setItem(
        "email",
        JSON.stringify(action.payload)
      );
    },

    setToken: (state, action) => {
      state.token = action.payload;

      localStorage.setItem(
        "token",
        JSON.stringify(action.payload)
      );
    },

    setUser: (state, action) => {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    updateEmployee: (state, action) => {
      const updatedEmp = action.payload;

      state.storedata = state.storedata.map((emp) =>
        emp._id === updatedEmp._id ? updatedEmp : emp
      );

      localStorage.setItem(
        "storedata",
        JSON.stringify(state.storedata)
      );
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.signupData = null;
      state.email = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
    },
  },
});

export const {
  setSignupData,
  setLoading,
  setemail,
  setToken,
  setUser,
  updateEmployee,
  logout,
} = authSlice.actions;

export default authSlice.reducer;