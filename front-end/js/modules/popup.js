import { arrayOfProducts } from "./getCart.js";
import { setStorageItem, removeStorageItem } from "./storage.js";

// fonction création du bloc popup

export const popupContainer = document.createElement("div");
export const popupBloc = document.createElement("div");

export const createPopup = () => {
  popupContainer.setAttribute("id", "popup");
  popupContainer.classList.add("popup-container");
  popupBloc.classList.add("popup-bloc");
  document.body.append(popupContainer);
  popupContainer.append(popupBloc);
};

// fonction fermeture du popup

export const closePopup = () => {
  while (popupContainer.hasChildNodes()) {
    popupContainer.removeChild(popupContainer.firstChild);
  }
  document.body.removeChild(popupContainer);
};

// création des contenus

// page produit -> ajout au panier

export const createContentAddToCart = (optionsItemSelected) => {
  popupBloc.innerHTML = `<p>L'ourson <span class="teddy-item__name">${optionsItemSelected.name}</span> (${optionsItemSelected.color})<br />a bien été ajouté au panier !</p>
<a href="../pages/cart.html"><button class="button popup-button" id="go-to-cart">Voir le panier</button></a>
<a href="../../index.html"><button class="button popup-button" id="continue-shopping">Continuer votre shopping</button></a>`;

  document.getElementById("continue-shopping").addEventListener("click", function () {
    closePopup();
  });
  document.getElementById("go-to-cart").addEventListener("click", function () {
    closePopup();
  });
};

// page panier -> formulaire invalide

export const createContentOrderInvalid = () => {
  popupBloc.innerHTML = `<p>Le formulaire n'est pas valide. Merci de le compléter entièrement.</p>
    <button class="button popup-button" id="order-invalid">Revenir au formulaire</button>`;
  document.getElementById("order-invalid").addEventListener("click", function () {
    closePopup();
  });
};

// page panier -> confirmation validation de commande

export const createContentValidateOrder = () => {
  popupBloc.innerHTML = `<p>Êtes-vous sûr de vouloir valider ?</p>
    <a href="../pages/checkout.html"><button class="button popup-button" id="validate-order">Confirmer votre commande</button></a>`;
  document.getElementById("validate-order").addEventListener("click", function () {
    // création de l'objet contact à partir des champs du formulaire

    const getInputValue = (inputId) => {
      const inputValue = document.getElementById(`${inputId}`).value;
      return inputValue;
    };

    const contact = {
      firstName: getInputValue("Surname"),
      lastName: getInputValue("Name"),
      address: getInputValue("Address"),
      city: getInputValue("Town"),
      email: getInputValue("Email"),
    };

    // récupération des ID des objets commandés

    const productsID = arrayOfProducts.map((product) => product.id);

    // envoi au back de l'objet contact et du tableau d'ID

    const orderSent = fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      body: JSON.stringify({
        contact: contact,
        products: productsID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // envoi de l'ID de commande retourné par le back au localStorage

    orderSent.then(async (response) => {
      const orderFromBack = await response.json();
      setStorageItem("orderId", orderFromBack.orderId);
    });

    // vider les produits du localStorage à la validation de la commande

    removeStorageItem("products");

    closePopup();
  });
};
