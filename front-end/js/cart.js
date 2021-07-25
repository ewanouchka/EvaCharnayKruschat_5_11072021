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
        <div class="cartInfo">${article.price}</div>
        <div class="cartInfo"><button class="mini-button">-</button>${article.quantity}<button class="mini-button">+</button></div>
        <div class="cartTotal cartInfo">${article.total}</div>
        <button class="fas fa-trash-alt cartSuppr mini-button"></button></section>`
    )
    .join("");

  const somme = () => {
    // fonction calculant le prix total du panier
    let tableauTotaux = [];
    tableauTotaux = articles.map((article) => `${article.total}`); // on récupère les valeurs totales pour chaque ligne d'article

    const sommeTotale = tableauTotaux.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10)); // on additionne toutes les valeurs de l'array, ramenées en nombres en base 10
    return sommeTotale;
  };

  cartElement.innerHTML +=
    `<h2 class="cartTotal lastLineCart">Total : <span class="lastLineTotal">` + somme() + `,00 €</span></h2>`; // on affiche le total du panier

  cartElement.innerHTML += `<button class="button" id="validateCart"><span>Valider le panier</span></button>`; // ajout du bouton "Valider le panier"
};

// récupération des articles dans le localStorage

const getArticles = async () => {
  const itemLocalStorage = JSON.parse(localStorage.getItem("selectedArticles"));

  return itemLocalStorage;
};

// mise en forme des données de l'api pour l'id concernée
const formatData = async (itemLocalStorage) => {
  let results = itemLocalStorage;

  const articles = await Promise.all(
    results.map((articles) => {
      const { name, id, color, price, quantity } = articles;

      const getFormattedPrice = (format = "fr-FR") => {
        // fonction changement du format du prix 0000 -> 00.00 €
        const euro = new Intl.NumberFormat(format, {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        });
        return euro.format(price);
      };
      const getFormattedTotal = (format = "fr-FR") => {
        // fonction changement du format du prix 0000 -> 00.00 €
        const euro = new Intl.NumberFormat(format, {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        });
        return euro.format(price * quantity);
      };

      return {
        name,
        id,
        color,
        price: getFormattedPrice(articles),
        quantity,
        total: getFormattedTotal(articles),
      };
    })
  );

  return articles;
};

// appel de la fonction affichage du panier
(async () => {
  const articles = await formatData(await getArticles());
  displayCart(articles);

  const nombreProduits = () => {
    // fonction calculant le prix total du panier
    let tableauNombres = [];
    tableauNombres = articles.map((article) => `${article.quantity}`); // on récupère les valeurs totales pour chaque ligne d'article

    const sommeProduits = tableauNombres.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10)); // on additionne toutes les valeurs de l'array, ramenées en nombres en base 10
    return sommeProduits;
  };
  nombreProduits();

  const cartLogo = document.querySelector("#cartLogo"); // on sélectionne le logo du panier
  cartLogo.innerHTML += `<span class="cartNumber">` + nombreProduits() + `</span>`; // on affiche le nombre d'articles dans le panier
})();

// fonctions modifications des produits à voir
