import { productsInCart, arrayOfProducts } from "./modules/getCart.js";
import { getTotalQuantity, displayTotalQuantity } from "./modules/getNumberOfProducts.js";
import { cartContent } from "./modules/htmlContent.js";
import { setStorageItem, removeStorageItem } from "./modules/storage.js";

// affichage du panier

const displayCart = async (arrayOfProducts) => {
  cartContent();

  // fonctions modifications des produits du panier
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

  const supprAll = document.querySelector("#empty-cart");
  supprAll.addEventListener("click", () => {
    removeStorageItem("products");
  });

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

// appels

(async () => {
  if (productsInCart !== null) {
    displayCart(arrayOfProducts);
  }
})();
displayTotalQuantity();
