import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: null,
  cartItems: [],
  cartCount: 0,
  modal: false,
};

// const updateLS = () => {
//   localStorage.setItem("cart", JSON.stringify(state.cartItems));
// };

const productData = createSlice({
  name: "productData",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
      // console.log(action.payload)
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id == product.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems = [...state.cartItems, product];
      }

      state.cartCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      // updateLS();
    },

    updateCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id == product.id,
      );

      if (existingItem) {
        existingItem.quantity = Number(product.quantity);
      } else {
        state.cartItems = [...product];
      }
      state.cartCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      // updateLS();
    },

    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setProductList, addToCart, setModal, updateCart } =
  productData.actions;
export default productData.reducer;
