import { getStorageItem } from "./storage.js";

export let productsInCart = getStorageItem("products");

export const formatCart = () => {
  if (!productsInCart) {
    return [];
  }

  if (!productsInCart[0]) {
    return Array.of(productsInCart);
  }

  return productsInCart;
};

export let arrayOfProducts = formatCart();
