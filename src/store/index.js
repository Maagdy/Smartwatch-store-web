import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import snackbarReducer from "./slices/snackbarSlice";
import quickViewReducer from "./slices/quickViewSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    snackbar: snackbarReducer,
    quickView: quickViewReducer,
  },
});

export default store;
