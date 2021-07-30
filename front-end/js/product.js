import { getTeddies, formatDataTeddies } from "./modules/getTeddies.js";
import { articles } from "./modules/getCart.js";
import { getFormattedPrice } from "./modules/getFormattedPrice.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";

// fonction affichage du bloc produit
const displayOneTeddy = async (teddy) => {
  teddy = teddy[0];
  const teddyElement = document.querySelector("#product-detail");

  // on change son contenu avec les informations récupérées du teddy
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

  // on crée un tableau supplémentaire pour le choix de la quantité
  const optionQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let blocOptionQuantity = [];

  // on passe par toutes les valeurs du tableau pour créer les lignes <option>
  for (let i = 0; i < optionQuantity.length; i++) {
    blocOptionQuantity = blocOptionQuantity + `<option value="${i + 1}">${optionQuantity[i]}</option>`;
  }

  // on intègre le bloc quantité dans le bloc produit
  document.getElementById("teddy-item__quantity").innerHTML += blocOptionQuantity;

  teddyElement.innerHTML += `<button class="button" id="add-to-cart"><span>Ajouter au panier</span></button>`; // on ajoute le bouton "Ajouter au panier"
};

// fonction affichage de la pastille de couleur en fonction des données colors
let choiceColor = "";

const selectColor = async (teddy) => {
  teddy = teddy[0];
  const colorElement = document.querySelector("#teddy-item__color__list"); // on sélectionne le bloc teddyColor
  for (const color of teddy.colors) {
    // on boucle sur les couleurs
    const lowercaseColor = color.toLowerCase().replace(/ /g, ""); // on transpose le nom de la couleur en bas de casse sans espace

    // on intègre les pastilles de couleur dans le bloc teddyColor
    colorElement.innerHTML += `<label for="toggle-${lowercaseColor}" id="toggle-${lowercaseColor}-label" class="teddy-item__color__list__bullet teddy-item__color__list__bullet--${lowercaseColor}" title="${color}">
    </label><input type="radio" name="teddy-item__color__list" id="toggle-${lowercaseColor}" class="visually-hidden" title="${color}">`;
  }

  // fonction pour sélectionner la couleur de la pastille active
  (async () => {
    const selectedColor = document.querySelector("#teddy-item__color__list"); // on sélectionne la pastille de la couleur sur laquelle on a cliqué
    const otherColor = document.querySelectorAll(".teddy-item__color__list__bullet"); // on crée une variable tableau de toutes les pastilles

    selectedColor.addEventListener("change", () => {
      // on écoute au changement de sélection de pastille de couleur
      const elts = document.querySelectorAll("input"); // on sélectionne tous les boutons radio cachés liés à toutes les pastilles
      otherColor.forEach((element) => element.classList.remove("teddy-item__color__list__bullet--active")); // on enlève la class pastille active potentiellement rajoutée au précédent changement de sélection de pastille de couleur

      for (let m = 0; m < elts.length; m++) {
        // on boucle sur tous les boutons radio cachés liés à toutes les pastilles
        if (elts[m].checked === true) {
          // on vérifie que l'input radio est sélectionné
          const idSelected = "#" + elts[m].id + "-label"; // on sélectionne la class du label correspondant
          document.querySelector(idSelected).classList.add("teddy-item__color__list__bullet--active"); // on ajoute la class pastille active
          choiceColor = elts[m].title; // on crée une variable qui reprend le titre de la couleur sélectionnée
          break;
        }
      }
      return choiceColor; // on retourne cette couleur
    });
  })();
};

// fonction sur le bouton Ajouter au panier
const addToCart = async (teddy) => {
  teddy = teddy[0];
  const addToCartButton = document.querySelector("#add-to-cart"); // on sélectionne le bouton "Ajouter au panier"

  addToCartButton.addEventListener("click", async () => {
    // on écoute le clic sur le bouton "Ajouter au panier"
    const choiceQuantity = parseInt(document.querySelector("#teddy-item__quantity").value); // on retient la valeur de la quantité sélectionnée et on convertit la chaîne en nombre
    const optionsArticle = {
      // on crée un objet recensant les informations du produit à ajouter au panier
      name: teddy.name,
      id: teddy.id,
      color: choiceColor,
      price: teddy.price,
      quantity: choiceQuantity,
    };
    // affichage du message d'erreur si absence de couleur sélectionnée
    const error = document.querySelector("#color-error");

    if (optionsArticle.color == "") {
      // si le champ couleur est vide (la pastille n'est pas cliquée)
      error.classList.remove("error-hidden"); // on retire la class qui rend le message d'erreur invisible
      error.classList.add("error-visible"); // on ajoute la class qui définit le message d'erreur
    } else {
      // si tout ok, ne pas afficher le message d'erreur
      error.classList.remove("error-visible"); // on retire la class qui rend le message d'erreur visible
      error.classList.add("error-hidden"); // on ajoute la class qui rend le message d'erreur invisible

      // fonction pour ouvrir le popup de confirmation de l'ajout au panier
      let popupContainer = document.createElement("div"); // on crée une nouvelle div
      popupContainer.setAttribute("id", "popup"); // on lui attribue un id = "popup"
      popupContainer.classList.add("popup-bloc"); // on lui attribue une class = "bloc-popup"

      const createPopup = () => {
        // on intègre le contenu du popup dans la nouvelle div
        popupContainer.innerHTML = `<p>L'ourson <span class="teddy-item__name">${optionsArticle.name}</span> (${optionsArticle.color})<br />a bien été ajouté au panier !</p>`;
        popupContainer.innerHTML +=
          '<a href="cart.html"><button class="button popup-button" id="go-to-cart">Voir le panier</button></a>'; // on ajoute le bouton "voir le panier"
        popupContainer.innerHTML +=
          '<a href="../../index.html"><button class="button popup-button" id="continue-shopping">Continuer votre shopping</button></a>'; // on ajoute le bouton "continuer votre shopping"
        openPopup(); // on applique la fonction pour ouvrir le popup créé
      };

      // fonction pour ouvrir le popup de confirmation de l'ajout au panier
      function openPopup() {
        document.getElementById("product-detail").prepend(popupContainer); // on ajoute la nouvelle div au DOM

        document.getElementById("continue-shopping").addEventListener("click", function () {
          // on écoute au clic sur le bouton "continuer votre shopping"
          closePopup(); // on applique la fonction pour fermer le popup
        });
        document.getElementById("go-to-cart").addEventListener("click", function () {
          // on écoute au clic sur le bouton "voir le panier"
          closePopup(); // on applique la fonction pour fermer le popup
        });
      }

      // fonction pour fermer le popup de confirmation au clic
      function closePopup() {
        while (popupContainer.hasChildNodes()) {
          // on vérifie si le popup a toujours des nodes descendantes et on boucle tant que c'est le cas
          popupContainer.removeChild(popupContainer.firstChild); // si c'est le cas, on supprime le premier enfant
        }
        document.getElementById("product-detail").removeChild(popupContainer); // on supprime la nouvelle div popup
      }

      // fonction pour modifier le nombre d'article d'un item déjà présent en au moins un exemplaire au panier
      (() => {
        if (!articles) {
          // si le localStorage est vide
          localStorage.setItem("products", JSON.stringify(optionsArticle));
          // on ajoute l'article sélectionné à la liste du localStorage
        } else {
          const addSelectedArticle = (listOfArticles) => {
            if (
              listOfArticles.every((value) => value.color !== optionsArticle.color || value.id !== optionsArticle.id)
            ) {
              // si pour toutes les lignes du localStorage, la couleur ou l'id diffère
              listOfArticles.push(optionsArticle); // on ajoute l'article sélectionné à la liste du localStorage
              localStorage.setItem("products", JSON.stringify(listOfArticles));
            } else {
              // sinon (donc si une ligne présente couleur et id identique à celles sélectionnées)
              for (let n = 0; n < listOfArticles.length; n++) {
                // on reboucle sur les lignes
                if (listOfArticles[n].color === optionsArticle.color && listOfArticles[n].id === optionsArticle.id) {
                  // pour la ligne identique uniquement
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

        createPopup(); // on applique la fonction d'ouverture du popup de confirmation d'ajout au panier
      })();
    }
  });
};

// appel global des fonctions
(async () => {
  const { teddy } = await formatDataTeddies(
    Array.of(await getTeddies("http://localhost:3000/api/teddies/" + new URL(location.href).searchParams.get("id")))
  );
  displayOneTeddy(teddy); // affichage du bloc produit
  selectColor(teddy); // affichage des pastilles de couleur
  addToCart(teddy); // bouton Ajouter au panier
})();

displayTotalQuantity();
