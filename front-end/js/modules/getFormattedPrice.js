import { arrayOfProducts } from "./formatCart.js";

export const getFormattedPrice = (number) => {
  const newPrice = new Intl.NumberFormat("Fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return newPrice.format(number / 100);
};

export const calculateTotal = () => {
  const total = arrayOfProducts
    .map((article) => `${article.price}` * `${article.quantity}`)
    .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10));
  return getFormattedPrice(total);
};
