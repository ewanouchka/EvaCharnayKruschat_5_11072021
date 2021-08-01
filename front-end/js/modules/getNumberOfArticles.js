import { articles } from "./getCart.js";

export const getTotalQuantity = () => {
  if (!articles) {
    let number = 0;
    return number;
  } else if (articles[0]) {
    let number = articles.reduce((accumulator, { quantity }) => accumulator + quantity, 0);
    return number;
  } else {
    let number = articles.quantity;
    return number;
  }
};

const cartLogo = document.getElementById("cart-logo");
export const displayTotalQuantity = () => {
  if (getTotalQuantity() == 0) {
    cartLogo.innerHTML += ``;
  } else {
    cartLogo.innerHTML += `<span id="cart-logo__number" class="cart-logo__number">` + getTotalQuantity() + `</span>`;
  }
};
