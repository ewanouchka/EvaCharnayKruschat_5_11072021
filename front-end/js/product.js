import { displayOneTeddy, selectColor } from "./modules/htmlContent.js";
import { formatDataOneTeddy, getOneTeddy } from "./modules/getTeddies.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";
import { addToCart } from "./modules/addToCart.js";

(async () => {
  const { teddy } = await formatDataOneTeddy(await getOneTeddy());
  displayOneTeddy(teddy);
  selectColor(teddy);
  addToCart(teddy);
})();
displayTotalQuantity();
