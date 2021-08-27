import { productsInCart, arrayOfProducts } from "./modules/getCart.js";
import { getFormattedPrice } from "./modules/getFormattedPrice.js";
import { getTotalQuantity, displayTotalQuantity } from "./modules/getNumberOfArticles.js";
import { setStorageItem } from "./modules/storage.js";

// affichage du panier

const displayCart = async (arrayOfProducts) => {
  const cartElement = document.querySelector("#cart");

  cartElement.innerHTML = `<ul class="cart-head"> 
  <li class="cart-head__label" title="Article">Article</li>
  <li class="cart-head__label" title="Couleur">Couleur</li>
  <li class="cart-head__label" title="Prix">Prix</li>
  <li class="cart-head__label" title="Quantité">Quantité</li>
  <li class="cart-head__label" title="Total">Total</li>
  <li class="cart-head__label" title="Supprimer">Suppr.</li></ul>`;

  cartElement.innerHTML += arrayOfProducts
    .map(
      (article) =>
        `<section class="cart-list">
        <a href="product.html?id=${article.id}" class="cart-list__info">
        Ourson ${article.name}</a>
        <div class="cart-list__info">${article.color}</div>
        <div class="cart-list__info">` +
        getFormattedPrice(`${article.price}`) +
        ` €</div>
        <div class="cart-list__info"><button class="mini-button minus">-</button>${article.quantity}<button class="mini-button plus">+</button></div>
        <div class="cart-list__info">` +
        getFormattedPrice(`${article.price}` * `${article.quantity}`) +
        ` €</div>
        <button class="fas fa-trash-alt mini-button cart-list__info"></button></section>`
    )
    .join("");

  const calculateTotal = () => {
    const total = arrayOfProducts
      .map((article) => `${article.price}` * `${article.quantity}`)
      .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10));
    return getFormattedPrice(total);
  };

  cartElement.innerHTML +=
    `<h2 class="total-line">Total : <span class="total-line__number">` + calculateTotal() + ` €</span></h2>`;
      setStorageItem("total", calculateTotal());

  cartElement.innerHTML += `<a href="cart.html"><button class="button" id="empty-cart"><span>Vider le panier</span></button></a>`;

  cartElement.innerHTML += `<button class="button" id="validate-cart"><span>Valider le panier</span></button>`;

  // fonctions modifications des produits du panier
  const trashButton = document.querySelectorAll(".fa-trash-alt");
  Array.from(trashButton).forEach((button, index) =>
    button.addEventListener("click", () => {
      if (arrayOfProducts.length == 1) {
        localStorage.removeItem("products");
      } else {arrayOfProducts.splice(index, 1);
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
      } else if (arrayOfProducts[index].quantity == 1) {arrayOfProducts.splice(index, 1)
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
