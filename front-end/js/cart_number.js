// fonction affichage du nombre de produits dans le panier dans la barre de nav et appel générique du localStorage

if (!itemLocalStorage) {
  // si le panier est vide
  itemLocalStorage = [];
}

// récupération des articles dans le localStorage
const getArticlesCart = async () => {
  return itemLocalStorage;
};

// mise en forme des données de l'api pour l'id concernée
const formatDataCart = async (itemLocalStorage) => {
  let results = itemLocalStorage;

  const articles = await Promise.all(
    results.map((articles) => {
      const { quantity, ...rest } = articles;

      return {
        quantity,
        ...rest,
      };
    })
  );
  return articles;
};

// appel de la fonction affichage du panier
(async () => {
  const articles = await formatDataCart(await getArticlesCart());
  const nombreProduits = () => {
    // fonction calculant le nombre total de produits dans le panier
    if (!articles[0]) {
      return 0;
    } else {
      let tableauNombres = [];
      tableauNombres = articles.map((article) => `${article.quantity}`); // on récupère les valeurs totales pour chaque ligne d'article
      const sommeProduits = tableauNombres.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10)); // on additionne toutes les valeurs de l'array, ramenées en nombres en base 10
      return sommeProduits;
    }
  };
  nombreProduits();

  const cartLogo = document.querySelector("#cartLogo"); // on sélectionne le logo du panier
  cartLogo.innerHTML += `<span class="cartNumber">` + nombreProduits() + `</span>`; // on affiche le nombre d'articles dans le panier
})();
