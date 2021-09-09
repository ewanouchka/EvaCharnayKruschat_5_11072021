import { productsInCart, arrayOfProducts } from "./modules/formatCart.js";
import { getTotalQuantity, displayTotalQuantity } from "./modules/getNumberOfProducts.js";
import { cartContent } from "./modules/htmlContent.js";
import { setStorageItem, removeStorageItem } from "./modules/storage.js";

// affichage du panier

const displayCart = async (arrayOfProducts) => {
  cartContent();

  // fonctions modifications des produits du panier
  // --> suppression d'une ligne produit au clic sur la corbeille en fin de ligne

  const trashButton = document.querySelectorAll(".fa-trash-alt");

  Array.from(trashButton).forEach((button, index) =>
    button.addEventListener("click", () => {
      if (arrayOfProducts.length == 1) {
        removeStorageItem("products");
      } else {
        arrayOfProducts.splice(index, 1);
        setStorageItem("products", arrayOfProducts);
      }

      window.location.reload();
    })
  );

  // --> suppression de l'ensemble du panier au clic sur "vider le panier"

  const supprAll = document.querySelector("#empty-cart");

  supprAll.addEventListener("click", () => {
    removeStorageItem("products");
  });

  // --> ajout d'un article supplémentaire au clic sur le bouton +

  const plusOneButtons = document.querySelectorAll(".plus");

  Array.from(plusOneButtons).forEach((button, index) =>
    button.addEventListener("click", () => {
      setStorageItem(
        "products",
        arrayOfProducts.map((article, indexArticle) => {
          if (indexArticle === index) {
            return { ...article, quantity: parseInt(article.quantity, 10) + 1 };
          }
          return article;
        })
      );

      window.location.reload();
    })
  );

  // --> suppression d'un exemplaire de l'article au clic sur le bouton -
  // si la quantité actuelle est 1, suppression de la ligne concernée
  // si la quantité est 1 sur la seule ligne produit présente au panier, on vide le panier

  const minusOneButtons = document.querySelectorAll(".minus");

  Array.from(minusOneButtons).forEach((button, index) =>
    button.addEventListener("click", () => {
      if (getTotalQuantity(arrayOfProducts) == 1) {
        removeStorageItem("products");
      } else if (arrayOfProducts[index].quantity == 1) {
        arrayOfProducts.splice(index, 1);
        setStorageItem("products", arrayOfProducts);
      } else {
        setStorageItem(
          "products",
          arrayOfProducts.map((article, indexArticle) => {
            if (indexArticle === index) {
              return { ...article, quantity: parseInt(article.quantity, 10) - 1 };
            }
            return article;
          })
        );
      }

      window.location.reload();
    })
  );
};

// appels des fonctions pour affichage

if (productsInCart !== null) {
  displayCart(arrayOfProducts);
}

displayTotalQuantity();
