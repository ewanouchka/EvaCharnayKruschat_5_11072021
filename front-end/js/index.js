const displayTeddies = async (teddies) => {
  const teddiesElement = document.querySelector("#products");

  teddiesElement.innerHTML = teddies
    .map(
      (teddies) =>
        `<a href="pages/product.html?id=${teddies.id}" class="teddyItem" id="${teddies.id}">
        <img src="${teddies.img}" class="teddyImg" />
        <h1 class="teddyName">${teddies.name}</h1>
        <h2 class="teddyPrice">${teddies.price}</h2>
        <div class="teddyColor">Coloris disponibles : ${teddies.colors}</div></a>`
    )
    .join("");
};

const getTeddies = async (url) => {
  const teddies = await fetch((url = "http://localhost:3000/api/teddies"));

  return teddies.json();
};

const formatData = async (teddyApiJSON) => {
  const results = teddyApiJSON;

  const teddies = await Promise.all(
    results.map((teddies) => {
      let { _id, name, price, imageUrl, colors, description } = teddies;
      const id = _id;
      const img = imageUrl;

      const changePrice = () => {
        const euro = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        });
        return euro.format(price / 100);
      };
      price = changePrice(teddies);

      return {
        id,
        name,
        price,
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

const loadScript = async () => {
  const { teddies } = await formatData(await getTeddies());
  displayTeddies(teddies);
};

loadScript();
