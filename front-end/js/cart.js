import { productsInCart, arrayOfProducts } from "./modules/getCart.js";
import { getTotalQuantity, displayTotalQuantity } from "./modules/getNumberOfArticles.js";
import { cartContent } from "./modules/htmlContent.js";

// affichage du panier

const displayCart = async (arrayOfProducts) => {
  cartContent();

  // fonctions modifications des produits du panier
  const trashButton = document.querySelectorAll(".fa-trash-alt");
  Array.from(trashButton).forEach((button, index) =>
    button.addEventListener("click", () => {
      if (arrayOfProducts.length == 1) {
        localStorage.removeItem("products");
      } else {
        arrayOfProducts.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(arrayOfProducts));
      }
      window.location.reload();
    })
  );

  const supprAll = document.getElementById("empty-cart");
  supprAll.addEventListener("click", () => {
    localStorage.removeItem("products");
  });

  const plusOneButtons = document.querySelectorAll(".plus");
  Array.from(plusOneButtons).forEach((button, index) =>
    button.addEventListener("click", () => {
      localStorage.setItem(
        "products",
        JSON.stringify(
          arrayOfProducts.map((article, indexArticle) => {
            if (indexArticle === index) {
              return { ...article, quantity: parseInt(article.quantity, 10) + 1 };
            }
            return article;
          })
        )
      );
      window.location.reload();
    })
  );

  const minusOneButtons = document.querySelectorAll(".minus");
  Array.from(minusOneButtons).forEach((button, index) =>
    button.addEventListener("click", () => {
      if (getTotalQuantity(arrayOfProducts) == 1) {
        localStorage.removeItem("products");
      } else if (arrayOfProducts[index].quantity == 1) {
        arrayOfProducts.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(arrayOfProducts));
      } else {
        localStorage.setItem(
          "products",
          JSON.stringify(
            arrayOfProducts.map((article, indexArticle) => {
              if (indexArticle === index) {
                return { ...article, quantity: parseInt(article.quantity, 10) - 1 };
              }
              return article;
            })
          )
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
