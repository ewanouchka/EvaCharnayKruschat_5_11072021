import { displayOneTeddy, selectColor } from "./modules/htmlContent.js";
import { formatDataOneTeddy, getOneTeddy } from "./modules/getTeddies.js";
import { displayTotalQuantity } from "./modules/getNumberOfProducts.js";
import { addToCart } from "./modules/addToCart.js";
import { createErrorMessage } from "./modules/popup.js";

(async () => {
  const { teddy } = await formatDataOneTeddy(
    await getOneTeddy().catch((error) => {
      createErrorMessage(error);
    })
  );
  displayOneTeddy(teddy);
  selectColor(teddy);
  addToCart(teddy);
})();
displayTotalQuantity();
