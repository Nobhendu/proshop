import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemType } from "../../typings/*";

const addDecimals = (num: number) =>
  parseFloat((Math.round(num * 100) / 100).toFixed(2));

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

      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc: number, item) => acc + item.price * item.qty,
          0
        )
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(0.15 * state.itemsPrice);
      state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
