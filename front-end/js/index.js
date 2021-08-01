import { getTeddies, formatDataTeddies } from "./modules/getTeddies.js";
import { getFormattedPrice } from "./modules/getFormattedPrice.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";

const displayTeddies = (teddy) => {
  const teddyElement = document.querySelector("#products");

  teddyElement.innerHTML = teddy
    .map(
      (teddy) =>
        `<a href="front-end/pages/product.html?id=${teddy.id}" class="teddy-item">
        <img src="${teddy.img}" class="teddy-item__img" alt="image ourson ${teddy.name}" />
        <h1 class="teddy-item__name">${teddy.name}</h1>
        <h2 class="teddy-item__price">` +
        getFormattedPrice(`${teddy.price}`) +
        ` €</h2>
        <div class="teddy-item__color">Coloris disponibles : ${teddy.colors}</div></a>`
    )
    .join("");
};

const displayColors = async (teddy) => {
  teddy.map((teddy) => (teddy.colors = teddy.colors.toString().replace(/,/g, ", ")));
};

(async () => {
  const { teddy } = await formatDataTeddies(await getTeddies("http://localhost:3000/api/teddies"));
  displayColors(teddy);
  displayTeddies(teddy);
})();
displayTotalQuantity();
