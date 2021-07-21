const displayOneTeddy = async (teddy) => {
  const teddyElement = document.querySelector("#product-detail");

  teddyElement.innerHTML = `<a href="pages/product.html?id=${teddy.id}" class="teddyItem" id="${teddy.id}">
          <img src="${teddy.img}" class="teddyImg" />
          <h1 class="teddyName">${teddy.name}</h1>
          <h2 class="teddyPrice">${teddy.price}</h2>
          <div class="teddyColor">Coloris disponibles : ${teddy.colors}</div></a>`;
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

  teddy = { id, name, price, img, colors, description };

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
