// fonction affichage du bloc produit
const displayOneTeddy = async (teddy) => {
  const teddyElement = document.querySelector("#product-detail");

  teddyElement.innerHTML = `<form class="teddyItem">
  <img src="${teddy.img}" class="teddyImg" alt="image ourson ${teddy.name}" />
  <div class="teddyDetail">
  <div class="teddyId">Ref : ${teddy.id}</div>
          <h1 class="teddyName">${teddy.name}</h1>
          <h2 class="teddyPrice">${teddy.price}</h2>
          <p class="teddyDesc">
          <h3>Description du produit :</h3>
          ${teddy.description}</p>
          <div class="teddyOptions">
          <h3>Options :</h3> 
          <div class="teddyColor">Coloris disponibles :
          <div id="teddyColor"></div></div>
          <div class="teddyQuantity"><label for="teddyQuantity">Quantité choisie :</label>
          <select id="teddyQuantity"><option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option></select></div>
          <div id="color-error" class="error-hidden">Veuillez choisir une couleur.</div></div></form>`;

  teddyElement.innerHTML += `<button class="button" id="addToCart"><span>Ajouter au panier</span></button>`; // ajout du bouton "ajout au panier"
};

// récupération des données de l'api pour l'id concernée
const getOneTeddy = async (url = "http://localhost:3000/api/teddies/") => {
  url = url + new URL(location.href).searchParams.get("id");
  const teddy = await fetch(url);
  return teddy.json();
};

// mise en forme des données de l'api pour l'id concernée
const formatData = async (oneTeddyJSON) => {
  let teddy = oneTeddyJSON;
  let { _id: id, name, price, imageUrl: img, colors, description } = teddy;

  const getFormattedPrice = (format = "fr-FR") => {
    // fonction changement du format du prix 0000 -> 00.00 €
    const euro = new Intl.NumberFormat(format, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
    return euro.format(price / 100);
  };

  teddy = { id, name, price: getFormattedPrice(teddy), img, colors, description };

  return { teddy };
};

// fonction affichage de la pastille de couleur en fonction des données colors
let choiceColor = "";

const selectColor = async (teddy) => {
  const { colors } = teddy;
  const colorElement = document.querySelector("#teddyColor");
  for (const color of colors) {
    const lowercaseColor = color.toLowerCase().replace(/ /g, ""); // transposition du nom de la couleur en bas de casse sans espace

    colorElement.innerHTML += `<label for="toggle-${lowercaseColor}" id="toggle-${lowercaseColor}-label" class="teddyColor__bullet teddyColor__bullet-${lowercaseColor}" title="${color}">
    </label>
    <input type="radio" name="teddyColor__bullet" id="toggle-${lowercaseColor}" class="visually-hidden" title="${color}">`;
  }

  // fonction pour sélectionner la couleur de la pastille active
  (async () => {
    const selectedColor = document.querySelector(`#teddyColor`); // la pastille de la couleur sur laquelle on clique
    const otherColor = document.querySelectorAll(`.teddyColor__bullet`); // un tableau des autres pastilles

    selectedColor.addEventListener("change", () => {
      const elts = document.querySelectorAll("input");
      // on écoute au changement de sélection de pastille de couleur
      otherColor.forEach((element) => element.classList.remove("teddyColor__bullet-active")); // on enlève la class pastille active potentiellement rajoutée au précédent changement de sélection de pastille de couleur

      for (let i = 0; i < elts.length; i++) {
        // on boucle sur les inputs liés à toutes les pastilles
        if (elts[i].checked === true) {
          // on vérifie que l'input radio est sélectionné
          const idSelected = "#" + elts[i].id + "-label"; // on sélectionne la class du label correspondant
          document.querySelector(idSelected).classList.add("teddyColor__bullet-active"); // on ajoute la class pastille active
          choiceColor = elts[i].title;
          break;
        }
      }
      return choiceColor;
    });
  })();
};
// fonction sur le bouton Ajouter au panier
const addToCart = async (teddy) => {
  const addToCartButton = document.querySelector("#addToCart");

  addToCartButton.addEventListener("click", () => {
    // on écoute le clic sur le bouton Ajouter au panier
    const choiceQuantity = document.querySelector("#teddyQuantity").value; // on retient la valeur de la quantité sélectionnée
    const optionsArticle = {
      // on crée un objet recensant les informations du produit à ajouter au panier
      name: teddy.name,
      id: teddy.id,
      color: choiceColor,
      quantity: choiceQuantity,
      price: teddy.price,
    };

    // affichage du message d'erreur si absence de couleur sélectionnée
    const error = document.querySelector("#color-error");

    if (optionsArticle.color == "") {
      error.classList.remove("error-hidden");
      error.classList.add("error-visible");
    } else {
      // si tout ok, ne pas afficher le message d'erreur
      error.classList.remove("error-visible");
      error.classList.add("error-hidden");

      // et envoyer l'objet au local storage

      let itemLocalStorage = JSON.parse(localStorage.getItem("selectedArticles"));

      if (!itemLocalStorage) {
        // si le panier est vide
        itemLocalStorage = []; // création de la variable
        itemLocalStorage.push(optionsArticle); // ajout de l'article sélectionné
        localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // ajout de l'item dans le localStorage
      } else {
        // si le panier n'est pas vide
        itemLocalStorage.push(optionsArticle); // ajout de l'article sélectionné
        localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // ajout de l'item dans le localStorage
      }
    }
  });
};

// appel global des fonctions
(async () => {
  const { teddy } = await formatData(await getOneTeddy());
  displayOneTeddy(teddy); // affichage du bloc produit
  selectColor(teddy); // affichage des pastilles de couleur
  addToCart(teddy); // bouton Ajouter au panier
})();
