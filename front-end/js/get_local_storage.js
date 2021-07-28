// récupération des articles dans le localStorage
let itemLocalStorage = JSON.parse(localStorage.getItem("selectedArticles"));

const getArticles = async () => {
  return itemLocalStorage;
};

// mise en forme des données du localStorage pour l'id concernée
const formatData = async (itemLocalStorage) => {
  let results = itemLocalStorage;

  const articles = await Promise.all(
    results.map((articles) => {
      const { name, id, color, price, quantity } = articles; // on déstructure articles

      return {
        // on met en forme les éléments
        name,
        id,
        color,
        price: getFormattedPrice(price), // on intègre le prix au format 00.00
        quantity,
        total: getFormattedPrice(price * quantity), // on intègre le total au format 00.00
      };
    })
  );

  return articles; // on retourne l'objet
};

// appel des fonctions
(async () => {
  await formatData(await getArticles());
})();
