import { createSlice } from "@reduxjs/toolkit";
// import { forgetPassword } from "../../../Server/Controller/Forgetpassword";

const initialState = {
  signupData: null,
  loading: false,
  email:null,

  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,

  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  email:localStorage.getItem("email") 
    ? JSON.parse(localStorage.getItem("email"))
    : null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setemail(state,action){
      state.email=action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;

      localStorage.setItem(
        "token",
        JSON.stringify(action.payload)
      );
    },

    setUser(state, action) {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    logout(state) {
      state.token = null;
      state.signupData = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
      updateEmployee: (state, action) => {
      const updatedEmp = action.payload;

      state.storedata = state.storedata.map((emp) =>
        emp._id === updatedEmp._id ? updatedEmp : emp
      );

      localStorage.setItem("storedata", JSON.stringify(state.storedata));
    },
   
  },
});

export const {
  setSignupData,
  setLoading,
  setToken,
  setUser,setemail,
  logout,updateEmployee
} = authSlice.actions;

export default authSlice.reducer;