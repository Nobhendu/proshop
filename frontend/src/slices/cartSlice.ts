import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemType } from "../../typings/*";
import { updateCart } from "../utils/cartUtils";

const initialState: any = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<itemType>) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x: itemType) => x._id === item._id
      );
      if (existItem)
        state.cartItems = state.cartItems.map((x: itemType) =>
          x._id === existItem._id ? item : x
        );
      else state.cartItems = [...state.cartItems, item];

      updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (x: itemType) => x._id !== action.payload
      );

      updateCart(state);
    },
    saveShippingAddress: (state, action: PayloadAction<any>) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
