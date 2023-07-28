import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemType } from "../../typings/*";
import { updateCart } from "../utils/cartUtils";

const initialState: itemType = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<itemType>) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem)
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      else state.cartItems = [...state.cartItems, item];

      updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
