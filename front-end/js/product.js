import { displayOneTeddy, selectColor } from "./modules/htmlContent.js";
import { teddy } from "./modules/getTeddies.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";
import { addToCart } from "./modules/addToCart.js";

(async () => {
  displayOneTeddy(teddy);
  selectColor(teddy);
  addToCart(teddy);
})();
displayTotalQuantity();
