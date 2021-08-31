import { getTeddies, formatDataTeddies } from "./modules/getTeddies.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";
import { displayTeddies } from "./modules/htmlContent.js";

(async () => {
  const { teddy } = await formatDataTeddies(await getTeddies("http://localhost:3000/api/teddies"));
  displayTeddies(teddy);
})();
displayTotalQuantity();
