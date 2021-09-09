import { setStorageItem } from "./storage.js";
import { productsInCart, arrayOfProducts } from "./formatCart.js";
import { createPopup, createContentAddToCart } from "./popup.js";
import { choiceColor } from "./htmlContent.js";

// fonction pour ajouter le produit sélectionné au panier au clic sur le bouton "Ajouter au panier"

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

    // affichage d'un message d'erreur pour la sélection de la couleur si celle-ci n'est pas choisie

    const error = document.querySelector("#color-error");

    if (optionsItemSelected.color == "") {
      error.classList.remove("error-hidden");
      error.classList.add("error-visible");
    } else {
      error.classList.remove("error-visible");
      error.classList.add("error-hidden");

      // ajout des articles au localStorage si celui-ci est vide ou modification de son contenu s'il contient déjà au moins un article
      // si au moins un article est présent dans le localStorage, on vérifie si le produit choisi par l'utilisateur est déjà présent dans le localStorage (id + color)
      // si le produit choisi n'est pas déjà dans le localStorage, on l'ajoute à la liste de produits, s'il est déjà présent, on modifie la quantité de ce produit dans le localStorage

      if (!productsInCart) {
        setStorageItem("products", optionsItemSelected);
      } else {
        ((arrayOfProducts) => {
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
        })(arrayOfProducts);
      }

      // création du pop-up de confirmation d'ajout au panier

      createPopup();
      createContentAddToCart(optionsItemSelected);
    }
  });
};
