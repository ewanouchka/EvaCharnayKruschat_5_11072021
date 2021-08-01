import { articles } from "./modules/getCart.js";
import { getFormattedPrice } from "./modules/getFormattedPrice.js";
import { getTotalQuantity, displayTotalQuantity } from "./modules/getNumberOfArticles.js";

let listOfArticles;
if (!articles[0]) {
  listOfArticles = Array.of(articles);
} else {
  listOfArticles = articles;
}

// affichage du panier

const displayCart = async (articles) => {
  const cartElement = document.querySelector("#cart");

  cartElement.innerHTML = `<ul class="cart-head"> 
  <li class="cart-head__label" title="Article">Article</li>
  <li class="cart-head__label" title="Couleur">Couleur</li>
  <li class="cart-head__label" title="Prix">Prix</li>
  <li class="cart-head__label" title="Quantité">Quantité</li>
  <li class="cart-head__label" title="Total">Total</li>
  <li class="cart-head__label" title="Supprimer">Suppr.</li></ul>`;

  cartElement.innerHTML += listOfArticles
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
    const total = listOfArticles
      .map((article) => `${article.price}` * `${article.quantity}`)
      .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10));
    return getFormattedPrice(total);
  };

  cartElement.innerHTML +=
    `<h2 class="total-line">Total : <span class="total-line__number">` + calculateTotal() + ` €</span></h2>`;

  cartElement.innerHTML += `<a href="cart.html"><button class="button" id="empty-cart"><span>Vider le panier</span></button></a>`;

  cartElement.innerHTML += `<button class="button" id="validate-cart"><span>Valider le panier</span></button>`;

  // fonctions modifications des produits du panier

  const trashButton = document.querySelectorAll(".fa-trash-alt");
  Array.from(trashButton).forEach((button, index) =>
    button.addEventListener("click", () => {
      if (articles.length == 1) {
        localStorage.removeItem("products");
      } else {
        localStorage.setItem("products", JSON.stringify(articles.splice(index, 1)));
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
          listOfArticles.map((article, indexArticle) => {
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
      if (getTotalQuantity(articles) == 1) {
        localStorage.removeItem("products");
      } else if (articles[index].quantity == 1) {
        localStorage.setItem("products", JSON.stringify(articles.splice(index, 1)));
      } else {
        localStorage.setItem(
          "products",
          JSON.stringify(
            articles.map((article, indexArticle) => {
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
  if (!articles) {
  } else {
    displayCart(articles);
  }
})();
displayTotalQuantity();
