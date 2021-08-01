import { getTeddies, formatDataTeddies } from "./modules/getTeddies.js";
import { articles } from "./modules/getCart.js";
import { getFormattedPrice } from "./modules/getFormattedPrice.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";

// affichage du bloc produit

const displayOneTeddy = async (teddy) => {
  teddy = teddy[0];
  const teddyElement = document.querySelector("#product-detail");

  teddyElement.innerHTML =
    `<form class="teddy-item">
  <img src="${teddy.img}" class="teddy-item__img" alt="image ourson ${teddy.name}" />
  <div class="teddy-item__detail">
  <div class="teddy-item__id">Ref : ${teddy.id}</div>
          <h1 class="teddy-item__name">${teddy.name}</h1>
          <h2 class="teddy-item__price">` +
    getFormattedPrice(`${teddy.price}`) +
    ` €</h2>
          <p class="teddy-item__desc">
          <h3>Description du produit :</h3>
          ${teddy.description}</p>
          <div class="teddy-item__options">
          <h3>Options :</h3> 
          <div class="teddy-item__color">Coloris disponibles :
          <div id="teddy-item__color__list" class="teddy-item__color__list"></div></div>
          <div class="teddy-item__quantity"><label for="teddy-item__quantity">Quantité choisie :</label>
          <select id="teddy-item__quantity" class="teddy-item__quantity__selector"></select></div>
          <div id="color-error" class="error-hidden">Veuillez choisir une couleur.</div></div></form>`;

  const optionQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let blocOptionQuantity = [];
  for (let i = 0; i < optionQuantity.length; i++) {
    blocOptionQuantity = blocOptionQuantity + `<option value="${i + 1}">${optionQuantity[i]}</option>`;
  }
  document.getElementById("teddy-item__quantity").innerHTML += blocOptionQuantity;

  teddyElement.innerHTML += `<button class="button" id="add-to-cart"><span>Ajouter au panier</span></button>`;
};

// fonction affichage de la pastille de couleur en fonction des données colors

let choiceColor = "";
const selectColor = async (teddy) => {
  teddy = teddy[0];
  const colorElement = document.querySelector("#teddy-item__color__list");
  for (const color of teddy.colors) {
    const lowercaseColor = color.toLowerCase().replace(/ /g, "");
    colorElement.innerHTML += `<label for="toggle-${lowercaseColor}" id="toggle-${lowercaseColor}-label" class="teddy-item__color__list__bullet teddy-item__color__list__bullet--${lowercaseColor}" title="${color}">
    </label><input type="radio" name="teddy-item__color__list" id="toggle-${lowercaseColor}" class="visually-hidden" title="${color}">`;
  }

  (async () => {
    const selectedColor = document.querySelector("#teddy-item__color__list");
    const otherColor = document.querySelectorAll(".teddy-item__color__list__bullet");
    selectedColor.addEventListener("change", () => {
      const elts = document.querySelectorAll("input");
      otherColor.forEach((element) => element.classList.remove("teddy-item__color__list__bullet--active"));
      for (let m = 0; m < elts.length; m++) {
        if (elts[m].checked === true) {
          const idSelected = "#" + elts[m].id + "-label";
          document.querySelector(idSelected).classList.add("teddy-item__color__list__bullet--active");
          choiceColor = elts[m].title;
          break;
        }
      }
      return choiceColor;
    });
  })();
};

// fonction Ajouter au panier

const addToCart = async (teddy) => {
  teddy = teddy[0];
  const addToCartButton = document.querySelector("#add-to-cart");
  addToCartButton.addEventListener("click", async () => {
    const choiceQuantity = parseInt(document.querySelector("#teddy-item__quantity").value);
    const optionsArticle = {
      name: teddy.name,
      id: teddy.id,
      color: choiceColor,
      price: teddy.price,
      quantity: choiceQuantity,
    };

    const error = document.querySelector("#color-error");
    if (optionsArticle.color == "") {
      error.classList.remove("error-hidden");
      error.classList.add("error-visible");
    } else {
      error.classList.remove("error-visible");
      error.classList.add("error-hidden");

      // pop-up

      let popupContainer = document.createElement("div");
      popupContainer.setAttribute("id", "popup");
      popupContainer.classList.add("popup-container");
      let popupBloc = document.createElement("div");
      popupBloc.classList.add("popup-bloc");

      const createPopup = () => {
        popupBloc.innerHTML = `<p>L'ourson <span class="teddy-item__name">${optionsArticle.name}</span> (${optionsArticle.color})<br />a bien été ajouté au panier !</p>`;
        popupBloc.innerHTML +=
          '<a href="cart.html"><button class="button popup-button" id="go-to-cart">Voir le panier</button></a>';
        popupBloc.innerHTML +=
          '<a href="../../index.html"><button class="button popup-button" id="continue-shopping">Continuer votre shopping</button></a>';
        openPopup();
      };

      function openPopup() {
        document.body.append(popupContainer);
        popupContainer.append(popupBloc);
        document.getElementById("continue-shopping").addEventListener("click", function () {
          closePopup();
        });
        document.getElementById("go-to-cart").addEventListener("click", function () {
          closePopup();
        });
      }

      function closePopup() {
        while (popupContainer.hasChildNodes()) {
          popupContainer.removeChild(popupContainer.firstChild);
        }
        document.getElementById("product-detail").removeChild(popupContainer);
      }

      // ajout des articles au localStorage

      (() => {
        if (!articles) {
          localStorage.setItem("products", JSON.stringify(optionsArticle));
        } else {
          const addSelectedArticle = (listOfArticles) => {
            if (
              listOfArticles.every((value) => value.color !== optionsArticle.color || value.id !== optionsArticle.id)
            ) {
              listOfArticles.push(optionsArticle);
              localStorage.setItem("products", JSON.stringify(listOfArticles));
            } else {
              for (let n = 0; n < listOfArticles.length; n++) {
                if (listOfArticles[n].color === optionsArticle.color && listOfArticles[n].id === optionsArticle.id) {
                  listOfArticles[n].quantity =
                    parseInt(listOfArticles[n].quantity, 10) + parseInt(optionsArticle.quantity, 10);
                  localStorage.setItem("products", JSON.stringify(listOfArticles));
                }
              }
            }
            return;
          };
          if (!articles[0]) {
            let listOfArticles = Array.of(articles);
            addSelectedArticle(listOfArticles);
          } else {
            let listOfArticles = articles;
            addSelectedArticle(listOfArticles);
          }
        }
        createPopup();
      })();
    }
  });
};

// appels

(async () => {
  const { teddy } = await formatDataTeddies(
    Array.of(await getTeddies("http://localhost:3000/api/teddies/" + new URL(location.href).searchParams.get("id")))
  );
  displayOneTeddy(teddy); // affichage du bloc produit
  selectColor(teddy); // affichage des pastilles de couleur
  addToCart(teddy); // bouton Ajouter au panier
})();
displayTotalQuantity();
