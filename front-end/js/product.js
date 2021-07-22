const displayOneTeddy = async (teddy) => {
  const teddyElement = document.querySelector("#product-detail");

  teddyElement.innerHTML = `<form class="teddyItem">
  <img src="${teddy.img}" class="teddyImg" />
  <div class="teddyDetail">
  <div class="teddyId">Ref : ${teddy.id}</div>
          <h1 class="teddyName">${teddy.name}</h1>
          <h2 class="teddyPrice">${teddy.price}</h2>
          <p class="teddyDesc">
          <h3>Description du produit :</h3>
          ${teddy.description}</p>
          <div class="teddyOptions">
          <h3>Options :</h3> 
          <div class="teddyColor">Coloris disponibles : ${teddy.colors}</div>
          <div class="teddyQuantity">Quantité : - </div></div></form>`;

  teddyElement.innerHTML += `<button class="button">Ajouter au panier</button>`;
};

const getOneTeddy = async (url = "http://localhost:3000/api/teddies/") => {
  url = url + new URL(location.href).searchParams.get("id");
  const teddy = await fetch(url);
  return teddy.json();
};

const formatData = async (oneTeddyJSON) => {
  let teddy = oneTeddyJSON;
  let { _id, name, price, imageUrl, colors, description } = teddy;
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
  price = changePrice(teddy);

  teddy = { id, name, price, img, colors: colors.join(", "), description };

  return { teddy };
};

const loadScript = async () => {
  const { teddy } = await formatData(await getOneTeddy());
  displayOneTeddy(teddy);
};

loadScript();

/*
const getColor = async () => {
  const { teddy } = await formatData(await getOneTeddy());
  const colorElement = document.querySelector(".teddyColor");
  const { colors } = teddy;

  console.log(colorElement);
  console.log(teddy);
  console.log(colors);

  for (const color of colors) {
    colorElement.classList.add(color);
  }
};
getColor();
*/
