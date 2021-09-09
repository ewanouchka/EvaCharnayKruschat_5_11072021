import { getFormattedPrice, calculateTotal } from "./getFormattedPrice.js";
import { setStorageItem, getStorageItem } from "./storage.js";
import { arrayOfProducts } from "./formatCart.js";

// contenu HTML de la page d'index

export const displayTeddies = (teddy) => {
  const teddyElement = document.querySelector("#products");

  teddyElement.innerHTML = teddy
    .map(
      (teddy) => `<a href="front-end/pages/product.html?id=${teddy.id}" class="teddy-item">
        <img src="${teddy.img}" class="teddy-item__img" alt="image ourson ${teddy.name}" />
        <h1 class="teddy-item__name">${teddy.name}</h1>
        <h2 class="teddy-item__price">${getFormattedPrice(`${teddy.price}`)}€</h2>
        <div class="teddy-item__color">Coloris disponibles : ${teddy.colors}</div></a>`
    )
    .join("");
};

// contenu HTML de la page produit
// --> affichage des informations produit

export const displayOneTeddy = (teddy) => {
  const teddyElement = document.querySelector("#product-detail");

  let blocOptionQuantity = [];
  for (let i = 1; i <= 10; i++) {
    blocOptionQuantity = blocOptionQuantity + `<option value="${i}">${i}</option>`;
  }

  teddyElement.innerHTML = `<form class="teddy-item">
  <img src="${teddy.img}" class="teddy-item__img" alt="image ourson ${teddy.name}" />
  <div class="teddy-item__detail">
  <div class="teddy-item__id">Ref : ${teddy.id}</div>
          <h1 class="teddy-item__name">${teddy.name}</h1>
          <h2 class="teddy-item__price">${getFormattedPrice(`${teddy.price}`)} €</h2>
          <p class="teddy-item__desc">
          <h3>Description du produit :</h3>
          ${teddy.description}</p>
          <div class="teddy-item__options">
          <h3>Options :</h3> 
          <div class="teddy-item__color">Coloris disponibles :
          <div id="teddy-item__color__list" class="teddy-item__color__list"></div></div>
          <div class="teddy-item__quantity"><label for="teddy-item__quantity">Quantité choisie :</label>
          <select id="teddy-item__quantity" class="teddy-item__quantity__selector">${blocOptionQuantity}</select></div>
          <div id="color-error" class="error-hidden">Veuillez choisir une couleur.</div></div></form>`;

  teddyElement.innerHTML += `<button class="button" id="add-to-cart"><span>Ajouter au panier</span></button>`;
};

// --> affichage des couleurs : affichage d'une pastille de couleur en fonction des données colors

export let choiceColor = "";
export const selectColor = async (teddy) => {
  const colorElement = document.querySelector("#teddy-item__color__list");

  for (const color of teddy.colors) {
    const lowercaseColor = color.toLowerCase().replace(/ /g, "");

    colorElement.innerHTML += `<label for="toggle-${lowercaseColor}" id="toggle-${lowercaseColor}-label" class="teddy-item__color__list__bullet teddy-item__color__list__bullet--${lowercaseColor}" title="${color}">
    </label><input type="radio" name="teddy-item__color__list" id="toggle-${lowercaseColor}" class="visually-hidden" title="${color}">`;
  }

  const selectedColor = document.querySelector("#teddy-item__color__list");
  const otherColor = document.querySelectorAll(".teddy-item__color__list__bullet");

  selectedColor.addEventListener("change", () => {
    const elements = document.querySelectorAll("input");

    otherColor.forEach((element) => element.classList.remove("teddy-item__color__list__bullet--active"));

    for (let m = 0; m < elements.length; m++) {
      if (elements[m].checked === true) {
        const idSelected = "#" + elements[m].id + "-label";
        document.querySelector(idSelected).classList.add("teddy-item__color__list__bullet--active");
        choiceColor = elements[m].title;
        break;
      }
    }

    return choiceColor;
  });
};

// contenu HTML de la page panier
// --> panier

export const cartContent = () => {
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
          <div class="cart-list__info">${getFormattedPrice(`${article.price}`)} €</div>
          <div class="cart-list__info"><button class="mini-button minus">-</button>${
            article.quantity
          }<button class="mini-button plus">+</button></div>
          <div class="cart-list__info">${getFormattedPrice(`${article.price}` * `${article.quantity}`)} €</div>
          <button class="fas fa-trash-alt mini-button cart-list__info"></button></section>`
    )
    .join("");

  cartElement.innerHTML += `<h2 class="total-line">Total : <span class="total-line__number">${calculateTotal()} €</span></h2>`;
  setStorageItem("total", calculateTotal());

  cartElement.innerHTML += `<a href="cart.html"><button class="button" id="empty-cart"><span>Vider le panier</span></button></a>`;

  cartElement.innerHTML += `<button class="button" id="validate-cart"><span>Valider le panier</span></button>`;
};

// --> formulaire

export const formContent = () => {
  const blocForm = document.querySelector("#order-form");

  blocForm.innerHTML = `<section class="bloc-form">
    <h2 class="bloc-form__title">Merci de remplir ce formulaire pour valider votre commande</h2>
    <label for="Name" class="bloc-form__label">Votre nom : <span class="error-visible" id="error-message-Name"></span>
    </label>
    <input placeholder="ex: Dupont" name="Name" id="Name" class="bloc-form__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ \']{2,}$" oninput="checkValidity(this)">
    </input>

    <label for="Surname" class="bloc-form__label">Votre prénom : <span class="error-visible" id="error-message-Surname"></span>
    </label>
    <input placeholder="ex: Jeanne" name="Surname" id="Surname" class="bloc-form__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ ]{2,}$" oninput="checkValidity(this)">
    </input>
    
    <label for="Address" class="bloc-form__label">Votre adresse : <span class="error-visible" id="error-message-Address"></span>
    </label>
    <input placeholder="ex: 1 place du marché" name="Address" id="Address" class="bloc-form__input" type="text" required pattern="^.+[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z0-9]+.+$" oninput="checkValidity(this)">
    </input>
    
    <label for="Postcode" class="bloc-form__label">Votre code postal : <span class="error-visible" id="error-message-Postcode"></span>
    </label>
    <input placeholder="ex: 75001" name="Postcode" id="Postcode" class="bloc-form__input" type="text" required pattern="^[0-9]{4,5}$" oninput="checkValidity(this)">
    </input>
    
    <label for="Town" class="bloc-form__label">Votre ville : <span class="error-visible" id="error-message-Town"></span>
    </label>
    <input placeholder="ex: Paris" name="Town" id="Town" class="bloc-form__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z]+[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ ]*[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z]+$" oninput="checkValidity(this)">
    </input>
    
    <label for="Email" class="bloc-form__label">Votre e-mail : <span class="error-visible" id="error-message-Email"></span>
    </label>
    <input placeholder="contact@orinoco.fr" name="Email" id="Email" class="bloc-form__input" type="email" required pattern="^[a-zA-Z0-9]+[a-zA-Z\-\.\_]*@{1}[a-zA-Z0-9]+[\.]{1}[a-zA-Z]+$" oninput="checkValidity(this)">
    </input>
    
    <label for="Phone" class="bloc-form__label">Votre téléphone (facultatif) : <span class="error-visible" id="error-message-Phone"></span>
    </label>
    <input placeholder="0123456789" name="Phone" id="Phone" class="bloc-form__input" type="text" pattern="^[0-9]{10}$" oninput="checkValidity(this)">
    </input>
    </section>
    <button class="button" id="order-confirm"><span>Valider la commande</span></button>`;

  blocForm.classList.remove("visually-hidden");
};

// contenu HTML de la page checkout

export const checkoutContent = () => {
  const orderId = getStorageItem("orderId");
  const totalPrice = getStorageItem("total");
  const checkoutElement = document.querySelector("#checkout");

  checkoutElement.innerHTML = `<h2>
  Votre commande est bien enregistrée !</h2>
  <p class="checkout-body">
  Nous vous confirmons la réception de votre commande n°${orderId} pour un montant total de ${totalPrice}€ et vous en remercions.</p>
  <div class="">
  A très bientôt chez Orinoco !</div>
  <a href="../../index.html"><button class="button" id="back-to-index">Retour à l'accueil</button></a>`;
};
