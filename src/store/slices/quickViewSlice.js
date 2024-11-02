import { createSlice } from "@reduxjs/toolkit";

const quickViewSlice = createSlice({
  name: "quickView",
  initialState: {
    isVisible: false,
    selectedProduct: null,
  },
  reducers: {
    showQuickView: (state, action) => {
      state.isVisible = true;
      state.selectedProduct = action.payload;
    },
    hideQuickView: (state) => {
      state.isVisible = false;
      state.selectedProduct = null;
    },
  },
});

export const { showQuickView, hideQuickView } = quickViewSlice.actions;

export const selectQuickView = (state) => state.quickView.isVisible;
export const selectViewedProduct = (state) => state.quickView.selectedProduct;

export default quickViewSlice.reducer;
