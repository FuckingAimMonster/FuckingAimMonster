import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkId = createAsyncThunk("CHECK_ID", async (username) => {
  const response = await axios.post("http://3.36.140.120:8000/user/checkid/", {
    username,
  });
  return response.data;
});

export const addUser = createAsyncThunk("ADD_USER", async (user) => {
  const response = await axios.post(
    "http://3.36.140.120:8000/user/signup/",
    user
  );
  return response.data;
});

export const login = createAsyncThunk("LOGIN", async (info) => {
  const response = await axios.post(
    "http://3.36.140.120:8000/user/signin/",
    info
  );
  return response.data[0];
});

export const logout = createAsyncThunk("LOGOUT", async (username) => {
  const response = await axios.post(`http://3.36.140.120:8000/user/logout/`, {
    username,
  });
  return response.data;
});

export const updateUser = createAsyncThunk("UPDATE_USER", async (newUser) => {
  const response = await axios.post(
    `http://3.36.140.120:8000/user/modifydpi/`,
    newUser
  );
  return response.data[0];
});

const initialState = {
  username: "",
  nickname: "",
  password: "",
  checkPassword: "",
  mousedpi: "",
  gamedpi: "",
  currentdpi: "",
  auth: null,
  authError: null,
  isChecked: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialize: (state) => {
      return {
        ...state,
        username: "",
        nickname: "",
        password: "",
        checkPassword: "",
        mousedpi: "",
        gamedpi: "",
        currentdpi: "",
        auth: null,
        authError: null,
        isChecked: false,
      };
    },
    changeField: (state, { payload: { key, value } }) => {
      return {
        ...state,
        [key]: value,
      };
    },
  },
  extraReducers: {
    [checkId.fulfilled]: (state, { _ }) => {
      return {
        ...state,
        isChecked: true,
        authError: null,
      };
    },
    [checkId.rejected]: (state, { _ }) => {
      return {
        ...state,
        isChecked: false,
        authError: true,
      };
    },
    [addUser.fulfilled]: (state, { _ }) => {
      return {
        ...state,
        auth: true,
        authError: null,
      };
    },
    [addUser.rejected]: (state, { _ }) => {
      return {
        ...state,
        auth: false,
        authError: true,
      };
    },
    [login.fulfilled]: (state, { payload }) => {
      const fields = payload.fields;
      const loginUser = {
        username: fields.username,
        nickname: fields.nickname,
        password: fields.password,
        mousedpi: fields.mousedpi,
        gamedpi: fields.gamedpi,
        currentdpi: fields.currentdpi,
      };
      return {
        ...state,
        user: loginUser,
        authError: null,
      };
    },
    [login.rejected]: (state, { _ }) => {
      return {
        ...state,
        user: null,
        authError: true,
      };
    },
    [logout.fulfilled]: (state, { _ }) => {
      return {
        ...state,
        user: null,
        authError: null,
      };
    },
    [logout.rejected]: (state, { _ }) => {
      return {
        ...state,
        authError: true,
      };
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const fields = payload.fields;
      const newUser = {
        username: fields.username,
        nickname: fields.nickname,
        password: fields.password,
        mousedpi: fields.mousedpi,
        gamedpi: fields.gamedpi,
        currentdpi: fields.currentdpi,
      };
      return {
        ...state,
        user: newUser,
      };
    },
  },
});

export const { initialize, changeField } = userSlice.actions;
export default userSlice.reducer;
