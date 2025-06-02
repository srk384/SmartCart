import { configureStore } from "@reduxjs/toolkit";
import { productDataApi } from "../APIs/productDataApi";
import productDataReducer from "../slices/productDataSlice";

export const store = configureStore({
  reducer: {
    productData: productDataReducer,
    [productDataApi.reducerPath]: productDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productDataApi.middleware),
});
