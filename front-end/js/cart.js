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
  const supprButton = document.querySelectorAll(".cartSuppr"); // on sélectionne les icônes de suppression d'un élément

  for (let i = 0; i < supprButton.length; i++) {
    // on boucle sur toutes les lignes
    supprButton[i].addEventListener("click", () => {
      articles.splice(i, 1); // on supprime la ligne sur laquelle on a cliqué
      itemLocalStorage = articles; // on change la valeur de la variable à renvoyer au localStorage
      localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // on ajoute la nouvelle valeur de la liste du localStorage dans le localStorage
      window.location.reload();
    });
  }

  // fonction suppression de tous les articles du panier
  const supprAll = document.getElementById("emptyCart"); // on sélectionne le bouton "vider le panier"

  supprAll.addEventListener("click", () => {
    itemLocalStorage = []; // on donne une valeur vide à la variable du localStorage
    localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // on ajoute la nouvelle valeur de la liste du localStorage dans le localStorage
  });

  // fonction ajout quantité +
  const plusOne = document.querySelectorAll(".plus"); // on sélectionne les icônes "+"

  for (let j = 0; j < plusOne.length; j++) {
    // on boucle sur toutes les lignes
    plusOne[j].addEventListener("click", () => {
      articles[j].quantity = parseInt(articles[j].quantity, 10) + 1; // on ajoute 1 à la quantité déjà présente dans la ligne
      itemLocalStorage = articles; // on change la valeur de la variable à renvoyer au localStorage
      localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // on ajoute la nouvelle valeur de la liste du localStorage dans le localStorage
      window.location.reload(); // on recharge la page avec les nouvelles informations
    });
  }

  // fonction retrait quantité -
  const minusOne = document.querySelectorAll(".minus"); // on sélectionne les icônes "-"

  for (let k = 0; k < minusOne.length; k++) {
    // on boucle sur toutes les lignes
    minusOne[k].addEventListener("click", () => {
      articles[k].quantity = parseInt(articles[k].quantity, 10) - 1; // on retire 1 à la quantité déjà présente dans la ligne
      if (articles[k].quantity == 0) {
        // si on arrive à 0, on supprime la ligne
        articles.splice(k, 1);
        itemLocalStorage = articles; // on change la valeur de la variable à renvoyer au localStorage
        localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // on ajoute la nouvelle valeur de la liste du localStorage dans le localStorage
        window.location.reload();
      } else {
        // sinon, on change juste la valeur
        itemLocalStorage = articles; // on change la valeur de la variable à renvoyer au localStorage
        localStorage.setItem("selectedArticles", JSON.stringify(itemLocalStorage)); // on ajoute la nouvelle valeur de la liste du localStorage dans le localStorage
        window.location.reload(); // on recharge la page avec les nouvelles informations
      }
    });
  }
};

// appel de la fonction affichage du panier
(async () => {
  const articles = await formatData(await getArticles());
  if (!articles[0]) {
    // on affiche la page que s'il existe des articles au panier
  } else {
    displayCart(articles);
  }
})();
