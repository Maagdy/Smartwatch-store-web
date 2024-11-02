import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    severity: "success",
    path: "",
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.path = action.payload.path || "";
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
