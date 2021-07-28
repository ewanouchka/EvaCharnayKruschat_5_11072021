// fonction affichage du bloc produit
const displayOneTeddy = async (teddy) => {
  const teddyElement = document.querySelector("#product-detail"); // on sélectionne le bloc product-detail

  // on change son contenu avec les informations récupérées du teddy
  teddyElement.innerHTML = `<form class="teddyItem">
  <img src="${teddy.img}" class="teddyImg" alt="image ourson ${teddy.name}" />
  <div class="teddyDetail">
  <div class="teddyId">Ref : ${teddy.id}</div>
          <h1 class="teddyName">${teddy.name}</h1>
          <h2 class="teddyPrice">${teddy.price} €</h2>
          <p class="teddyDesc">
          <h3>Description du produit :</h3>
          ${teddy.description}</p>
          <div class="teddyOptions">
          <h3>Options :</h3> 
          <div class="teddyColor">Coloris disponibles :
          <div id="teddyColor"></div></div>
          <div class="teddyQuantity"><label for="teddyQuantity">Quantité choisie :</label>
          <select id="teddyQuantity"></select></div>
          <div id="color-error" class="error-hidden">Veuillez choisir une couleur.</div></div></form>`;

  // on crée un tableau supplémentaire pour le choix de la quantité
  const optionQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let blocOptionQuantity = [];

  // on passe par toutes les valeurs du tableau pour créer les lignes <option>
  for (let i = 0; i < optionQuantity.length; i++) {
    blocOptionQuantity = blocOptionQuantity + `<option value="${i + 1}">${optionQuantity[i]}</option>`;
  }

  // on intègre le bloc quantité dans le bloc produit
  document.getElementById("teddyQuantity").innerHTML += blocOptionQuantity;

  teddyElement.innerHTML += `<button class="button" id="addToCart"><span>Ajouter au panier</span></button>`; // on ajoute le bouton "Ajouter au panier"
};

// récupération des données de l'api pour l'id concernée
const getOneTeddy = async (url = "http://localhost:3000/api/teddies/") => {
  url = url + new URL(location.href).searchParams.get("id"); // on change l'adresse url en ajoutant l'id du produit sur lequel on a cliqué
  const teddy = await fetch(url);
  return teddy.json();
};

// mise en forme des données de l'api pour l'id concernée
const formatDataProduct = async (oneTeddyJSON) => {
  let teddy = oneTeddyJSON;
  let { _id: id, name, price, imageUrl: img, colors, description } = teddy; // on déstructure teddy

  // on met en forme les éléments
  teddy = {
    id,
    name,
    price: getFormattedPrice(price / 100), // on intègre le total au format 00.00
    img,
    colors,
    description,
  };

  return { teddy };
};

// fonction affichage de la pastille de couleur en fonction des données colors
let choiceColor = "";

const selectColor = async (teddy) => {
  const { colors } = teddy; // on n'a besoin que de l'information couleur
  const colorElement = document.querySelector("#teddyColor"); // on sélectionne le bloc teddyColor
  for (const color of colors) {
    // on boucle sur les couleurs
    const lowercaseColor = color.toLowerCase().replace(/ /g, ""); // on transpose le nom de la couleur en bas de casse sans espace

    // on intègre les pastilles de couleur dans le bloc teddyColor
    colorElement.innerHTML += `<label for="toggle-${lowercaseColor}" id="toggle-${lowercaseColor}-label" class="teddyColor__bullet teddyColor__bullet-${lowercaseColor}" title="${color}">
    </label>
    <input type="radio" name="teddyColor__bullet" id="toggle-${lowercaseColor}" class="visually-hidden" title="${color}">`;
  }

  // fonction pour sélectionner la couleur de la pastille active
  (async () => {
    const selectedColor = document.querySelector(`#teddyColor`); // on sélectionne la pastille de la couleur sur laquelle on a cliqué
    const otherColor = document.querySelectorAll(`.teddyColor__bullet`); // on crée une variable tableau de toutes les pastilles

    selectedColor.addEventListener("change", () => {
      // on écoute au changement de sélection de pastille de couleur
      const elts = document.querySelectorAll("input"); // on sélectionne tous les boutons radio cachés liés à toutes les pastilles
      otherColor.forEach((element) => element.classList.remove("teddyColor__bullet-active")); // on enlève la class pastille active potentiellement rajoutée au précédent changement de sélection de pastille de couleur

      for (let m = 0; m < elts.length; m++) {
        // on boucle sur tous les boutons radio cachés liés à toutes les pastilles
        if (elts[m].checked === true) {
          // on vérifie que l'input radio est sélectionné
          const idSelected = "#" + elts[m].id + "-label"; // on sélectionne la class du label correspondant
          document.querySelector(idSelected).classList.add("teddyColor__bullet-active"); // on ajoute la class pastille active
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
  const addToCartButton = document.querySelector("#addToCart"); // on sélectionne le bouton "Ajouter au panier"

  addToCartButton.addEventListener("click", async () => {
    // on écoute le clic sur le bouton "Ajouter au panier"
    const choiceQuantity = parseInt(document.querySelector("#teddyQuantity").value); // on retient la valeur de la quantité sélectionnée et on convertit la chaîne en nombre
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

      const createPopup = () => {
        // on intègre le contenu du popup dans la nouvelle div
        popupContainer.innerHTML = `<p>L'ourson <span class="teddyName">${optionsArticle.name}</span> (${optionsArticle.color})<br />a bien été ajouté au panier !</p>`;
        popupContainer.innerHTML +=
          '<a href="cart.html"><button class="button button-popup" id="goToCart">Voir le panier</button></a>'; // on ajoute le bouton "voir le panier"
        popupContainer.innerHTML +=
          '<a href="../../index.html"><button class="button button-popup" id="continueShopping">Continuer votre shopping</button></a>'; // on ajoute le bouton "continuer votre shopping"
        openPopup(); // on applique la fonction pour ouvrir le popup créé
      };

      // fonction pour ouvrir le popup de confirmation de l'ajout au panier
      function openPopup() {
        document.getElementById("product-detail").prepend(popupContainer); // on ajoute la nouvelle div au DOM

        document.getElementById("continueShopping").addEventListener("click", function () {
          // on écoute au clic sur le bouton "continuer votre shopping"
          closePopup(); // on applique la fonction pour fermer le popup
        });
        document.getElementById("goToCart").addEventListener("click", function () {
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

      // fonction pour envoyer l'objet au local storage
      const articles = await formatData(await getArticles());

      // fonction pour modifier le nombre d'article d'un item déjà présent en au moins un exemplaire au panier
      const addSelectedArticle = () => {
        if (!itemLocalStorage[0]) {
          // si le localStorage est vide
          itemLocalStorage.push(optionsArticle); // on ajoute l'article sélectionné à la liste du localStorage
        } else if (articles.every((value) => value.color !== optionsArticle.color || value.id !== optionsArticle.id)) {
          // si pour toutes les lignes du localStorage, la couleur ou l'id diffère
          itemLocalStorage.push(optionsArticle); // on ajoute l'article sélectionné à la liste du localStorage
        } else {
          // sinon (donc si une ligne présente couleur et id identique à celles sélectionnées)
          for (let n = 0; n < articles.length; n++) {
            // on reboucle sur les lignes
            if (articles[n].color === optionsArticle.color && articles[n].id === optionsArticle.id) {
              // pour la ligne identique uniquement
              itemLocalStorage[n].quantity = parseInt(articles[n].quantity, 10) + parseInt(optionsArticle.quantity, 10); // on modifie la quantité initialement présente dans le localStorage en y ajoutant la quantité sélectionnée
            }
          }
        }
        localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // on ajoute la nouvelle valeur de la liste du localStorage dans le localStorage)
      };

      addSelectedArticle(); // on applique la fonction d'ajout de l'article
      createPopup(); // on applique la fonction d'ouverture du popup de confirmation d'ajout au panier
    }
  });
};

// appel global des fonctions
(async () => {
  const { teddy } = await formatDataProduct(await getOneTeddy());
  displayOneTeddy(teddy); // affichage du bloc produit
  selectColor(teddy); // affichage des pastilles de couleur
  addToCart(teddy); // bouton Ajouter au panier
})();
