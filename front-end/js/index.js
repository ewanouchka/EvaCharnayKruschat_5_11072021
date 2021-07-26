// fonction affichage des cartes des teddies
const displayTeddies = async (teddies) => {
  const teddiesElement = document.querySelector("#products");

  teddiesElement.innerHTML = teddies
    .map(
      (teddies) =>
        `<a href="front-end/pages/product.html?id=${teddies.id}" class="teddyItem">
        <img src="${teddies.img}" class="teddyImg" alt="image ourson ${teddies.name}" />
        <h1 class="teddyName">${teddies.name}</h1>
        <h2 class="teddyPrice">${teddies.price} €</h2>
        <div class="teddyColor">Coloris disponibles : ${teddies.colors}</div></a>`
    )
    .join("");
};

// récupération des données de l'api
const getTeddies = async (url) => {
  const teddies = await fetch((url = "http://localhost:3000/api/teddies"));

  return teddies.json();
};

// mise en forme des données de l'api
const formatData = async (teddyApiJSON) => {
  const results = teddyApiJSON;

  const teddies = await Promise.all(
    results.map((teddies) => {
      const { _id: id, name, price, imageUrl: img, colors, description } = teddies;

      return {
        id,
        name,
        price: getFormattedPrice(price / 100),
        img,
        colors: colors.join(", "),
        description,
      };
    })
  );

  return {
    teddies,
  };
};

// appel de la fonction affichage des cartes des teddies
(async () => {
  const { teddies } = await formatData(await getTeddies());
  displayTeddies(teddies);
})();
