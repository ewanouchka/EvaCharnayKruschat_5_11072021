import { productsInCart } from "./formatCart.js";

export const getTotalQuantity = () => {
  if (!productsInCart) {
    let number = 0;
    return number;
  } else if (productsInCart[0]) {
    let number = productsInCart.reduce((accumulator, { quantity }) => accumulator + quantity, 0);
    return number;
  } else {
    let number = productsInCart.quantity;
    return number;
  }
};

const cartLogo = document.querySelector("#cart-logo");
export const displayTotalQuantity = () => {
  if (getTotalQuantity() !== 0) {
    cartLogo.innerHTML += `<span id="cart-logo__number" class="cart-logo__number">${getTotalQuantity()}</span>`;
  }
};
