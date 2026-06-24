// // Made for the cartSlice to make code look easier becuser in the required function inside cartSlice we can call it anywhere.

export const updateCart = (state) => {
  // // Use of below totalPrice and shippingCharge code: After adding certain new product in the cart the totalprice of those products are also stored in the state.
  // // Then this totalprice can be access anywhere.
  state.itemPrice = Number(
    state.cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2)
  );
  state.shippingCharge = state.itemPrice >= 100 ? 0 : 5;
  state.totalPrice = Number(
    (state.itemPrice + state.shippingCharge).toFixed(2)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
