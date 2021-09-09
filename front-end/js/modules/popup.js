import { arrayOfProducts } from "./formatCart.js";
import { sendingToBack } from "./sendingToBack.js";

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

//--- page index + produit -> erreur accès back-end

export const createErrorMessage = (error) => {
  createPopup();

  popupBloc.innerHTML = `<div>Une erreur est survenue : '${error}'. Veuillez renouveler votre demande ultérieurement.</div>
  <button class="button popup-button" id="error-message">Fermer</button>`;

  document.querySelector("#error-message").addEventListener("click", function () {
    closePopup();
  });
};

//--- page produit -> ajout au panier

export const createContentAddToCart = (optionsItemSelected) => {
  popupBloc.innerHTML = `<p>L'ourson <span class="teddy-item__name">${optionsItemSelected.name}</span> (${optionsItemSelected.color})<br />a bien été ajouté au panier !</p>
  <a href="../pages/cart.html"><button class="button popup-button" id="go-to-cart">Voir le panier</button></a>
  <button class="button popup-button" id="continue-shopping">Continuer votre shopping</button>`;

  document.querySelector("#continue-shopping").addEventListener("click", function () {
    window.location.reload();
    closePopup();
  });

  document.querySelector("#go-to-cart").addEventListener("click", function () {
    closePopup();
  });
};

//--- page panier -> formulaire invalide

export const createContentOrderInvalid = () => {
  popupBloc.innerHTML = `<p>Le formulaire n'est pas valide. Merci de le compléter entièrement.</p>
  <button class="button popup-button" id="order-invalid">Revenir au formulaire</button>`;

  document.querySelector("#order-invalid").addEventListener("click", function () {
    closePopup();
  });
};

//--- page panier -> confirmation de la validation de la commande

export const createContentValidateOrder = async () => {
  popupBloc.innerHTML = `<p>Êtes-vous sûr de vouloir valider ?</p>
  <button class="button popup-button" id="validate-order">Confirmer votre commande</button>`;

  document.querySelector("#validate-order").addEventListener("click", function () {
    // création de l'objet contact à partir des champs du formulaire

    const getInputValue = (inputId) => {
      const inputValue = document.querySelector(`#${inputId}`).value;
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

    sendingToBack(contact, productsID);
  });
};

//--- page panier -> modification du contenu du popup si la commande ne peut pas être validée

export const addErrorMessage = (reference) => {
  document.querySelector("#validate-order").classList.add("button-inactive"); // on grise le bouton confirmer la commande

  popupBloc.innerHTML += `<div>Une erreur est survenue. ${reference}. Veuillez renouveler votre demande.</div>
  <button class="button popup-button" id="error-message">Fermer</button>`;

  document.querySelector("#error-message").addEventListener("click", function () {
    closePopup();
  });
};
