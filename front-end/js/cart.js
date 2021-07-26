// récupération des articles dans le localStorage
const getArticles = async () => {
  return itemLocalStorage;
};

// fonction affichage du panier
const displayCart = async (articles) => {
  const cartElement = document.querySelector("#cart"); // on sélectionne la section du panier

  cartElement.innerHTML =
    // on crée la ligne d'en-tête
    `<ul class="cartHead"> 
  <li class="cartArticle" title="Article">Article</li>
  <li class="cartCouleur" title="Couleur">Couleur</li>
  <li title="Prix">Prix</li>
  <li title="Quantité">Quantité</li>
  <li title="Total">Total</li>
  <li title="Supprimer">Suppr.</li></ul>`;

  cartElement.innerHTML += articles // on crée les lignes pour chaque article enregistré au panier
    .map(
      (article) =>
        `<section class="cartList">
        <a href="product.html?id=${article.id}" class="cartArticle">
        <div class="cartName">Ourson ${article.name}</div></a>
        <div class="cartInfo">${article.color}</div>
        <div class="cartInfo">${article.price} €</div>
        <div class="cartInfo"><button class="mini-button minus">-</button>${article.quantity}<button class="mini-button plus">+</button></div>
        <div class="cartTotal cartInfo">${article.total} €</div>
        <button class="fas fa-trash-alt cartSuppr mini-button"></button></section>`
    )
    .join("");

  const somme = () => {
    // fonction calculant le prix total du panier
    let tableauTotaux = [];
    tableauTotaux = articles.map((article) => `${article.total}`); // on récupère les valeurs totales pour chaque ligne d'article

    const sommeTotale = tableauTotaux.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10)); // on additionne toutes les valeurs de l'array, ramenées en nombres en base 10

    return getFormattedPrice(sommeTotale);
  };

  cartElement.innerHTML +=
    `<h2 class="cartTotal lastLineCart">Total : <span class="lastLineTotal">` + somme() + ` €</span></h2>`; // on affiche le total du panier

  cartElement.innerHTML += `<a href="cart.html"><button class="button" id="emptyCart"><span>Vider le panier</span></button></a>`; // ajout du bouton "Vider le panier"

  cartElement.innerHTML += `<button class="button" id="validateCart"><span>Valider le panier</span></button>`; // ajout du bouton "Valider le panier"

  // fonctions modifications des produits du panier

  // fonction suppression d'un article au clic sur la petite corbeille
  const supprButton = document.querySelectorAll(".cartSuppr");

  for (let i = 0; i < supprButton.length; i++) {
    supprButton[i].addEventListener("click", () => {
      articles.splice(i, 1);
      itemLocalStorage = articles;
      localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // ajout de la nouvelle valeur de la liste du localStorage dans le localStorage
      window.location.reload();
    });
  }

  // fonction suppression de tous les articles du panier
  const supprAll = document.getElementById("emptyCart");

  supprAll.addEventListener("click", () => {
    itemLocalStorage = [];
    localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // ajout de la nouvelle valeur de la liste du localStorage dans le localStorage
  });

  // fonction ajout quantité +
  const plusOne = document.querySelectorAll(".plus");

  for (let j = 0; j < plusOne.length; j++) {
    plusOne[j].addEventListener("click", () => {
      articles[j].quantity = parseInt(articles[j].quantity, 10) + 1;
      console.log(articles[j].quantity);
      itemLocalStorage = articles;
      localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // ajout de la nouvelle valeur de la liste du localStorage dans le localStorage
      window.location.reload();
    });
  }

  // fonction retrait quantité -
  const minusOne = document.querySelectorAll(".minus");
  for (let k = 0; k < minusOne.length; k++) {
    minusOne[k].addEventListener("click", () => {
      articles[k].quantity = parseInt(articles[k].quantity, 10) - 1;
      if (articles[k].quantity == 0) {
        articles.splice(k, 1);
        itemLocalStorage = articles;
        localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // ajout de la nouvelle valeur de la liste du localStorage dans le localStorage
        window.location.reload();
      } else {
        itemLocalStorage = articles;
        localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // ajout de la nouvelle valeur de la liste du localStorage dans le localStorage
        window.location.reload();
      }
    });
  }
};

// mise en forme des données de l'api pour l'id concernée
const formatData = async (itemLocalStorage) => {
  let results = itemLocalStorage;

  const articles = await Promise.all(
    results.map((articles) => {
      const { name, id, color, price, quantity } = articles;

      return {
        name,
        id,
        color,
        price: getFormattedPrice(price),
        quantity,
        total: getFormattedPrice(price * quantity),
      };
    })
  );

  return articles;
};

// appel de la fonction affichage du panier
(async () => {
  const articles = await formatData(await getArticles());
  if (!articles[0]) {
  } else {
    displayCart(articles);
  }
})();
