import { itemType } from "../../typings/*";

export const addDecimals = (num: number) =>
  parseFloat((Math.round(num * 100) / 100).toFixed(2));

export const updateCart = (state: itemType) => {
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

  return state;
};
