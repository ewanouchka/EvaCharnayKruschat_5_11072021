// récupération des articles dans le localStorage
const getArticles = async () => {
  return itemLocalStorage;
};

// mise en forme des données du localStorage pour l'id concernée
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

// appel des fonctions
(async () => {
  await formatData(await getArticles());
})();
