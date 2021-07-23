const displayOneTeddy = async (teddy) => {
  const teddyElement = document.querySelector("#product-detail");

  teddyElement.innerHTML = `<form class="teddyItem">
  <img src="${teddy.img}" class="teddyImg" alt="image ourson ${teddy.name}" />
  <div class="teddyDetail">
  <div class="teddyId">Ref : ${teddy.id}</div>
          <h1 class="teddyName">${teddy.name}</h1>
          <h2 class="teddyPrice">${teddy.price}</h2>
          <p class="teddyDesc">
          <h3>Description du produit :</h3>
          ${teddy.description}</p>
          <div class="teddyOptions">
          <h3>Options :</h3> 
          <div class="teddyColor">Coloris disponibles : <div id="teddyColor"></div></div>
          <div class="teddyQuantity"><label for="teddyQuantity">Quantité choisie :</label>
          <select id="teddyQuantity"><option>-</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option></select></div></div></form>`;

  teddyElement.innerHTML += `<button class="button">Ajouter au panier</button>`;
};

const getOneTeddy = async (url = "http://localhost:3000/api/teddies/") => {
  url = url + new URL(location.href).searchParams.get("id");
  const teddy = await fetch(url);
  return teddy.json();
};

const formatData = async (oneTeddyJSON) => {
  let teddy = oneTeddyJSON;
  let { _id: id, name, price, imageUrl: img, colors, description } = teddy;

  const getFormattedPrice = (format = "fr-FR") => {
    const euro = new Intl.NumberFormat(format, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
    return euro.format(price / 100);
  };

  teddy = { id, name, price: getFormattedPrice(teddy), img, colors, description };

  return { teddy };
};

const getColor = async (teddy) => {
  const { colors } = teddy;
  const colorElement = document.querySelector("#teddyColor");
  for (const color of colors) {
    const lowercase_color = color.toLowerCase().replace(/ /g, "");

    colorElement.innerHTML += `<div class="teddyColor__bullet teddyColor__bullet-${lowercase_color}"></div>`;
  }
};

(async () => {
  const { teddy } = await formatData(await getOneTeddy());
  displayOneTeddy(teddy);
  getColor(teddy);
})();
