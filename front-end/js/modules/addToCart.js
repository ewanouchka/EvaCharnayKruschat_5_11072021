import { setStorageItem } from "./storage.js";
import { productsInCart, arrayOfProducts } from "./formatCart.js";
import { createPopup, createContentAddToCart } from "./popup.js";
import { choiceColor } from "./htmlContent.js";

// fonction Ajouter au panier

export const addToCart = async (teddy) => {
  const addToCartButton = document.querySelector("#add-to-cart");
  addToCartButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const choiceQuantity = parseInt(document.querySelector("#teddy-item__quantity").value);
    const optionsItemSelected = {
      name: teddy.name,
      id: teddy.id,
      color: choiceColor,
      price: teddy.price,
      quantity: choiceQuantity,
    };

    const error = document.querySelector("#color-error");
    if (optionsItemSelected.color == "") {
      error.classList.remove("error-hidden");
      error.classList.add("error-visible");
    } else {
      error.classList.remove("error-visible");
      error.classList.add("error-hidden");

      // ajout des articles au localStorage

      if (!productsInCart) {
        setStorageItem("products", optionsItemSelected);
      } else {
        const addSelectedArticle = (arrayOfProducts) => {
          if (
            arrayOfProducts.every(
              (value) => value.color !== optionsItemSelected.color || value.id !== optionsItemSelected.id
            )
          ) {
            arrayOfProducts.push(optionsItemSelected);
            setStorageItem("products", arrayOfProducts);
          } else {
            for (let n = 0; n < arrayOfProducts.length; n++) {
              if (
                arrayOfProducts[n].color === optionsItemSelected.color &&
                arrayOfProducts[n].id === optionsItemSelected.id
              ) {
                arrayOfProducts[n].quantity =
                  parseInt(arrayOfProducts[n].quantity, 10) + parseInt(optionsItemSelected.quantity, 10);
                setStorageItem("products", arrayOfProducts);
              }
            }
          }
          return;
        };
        addSelectedArticle(arrayOfProducts);
      }

      // pop-up

      createPopup();
      createContentAddToCart(optionsItemSelected);
    }
  });
};
