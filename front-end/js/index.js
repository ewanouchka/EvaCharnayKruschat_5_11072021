import { getTeddies, formatDataTeddies } from "./modules/getTeddies.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";
import { indexContent } from "./modules/htmlContent.js";

const displayTeddies = (teddy) => {
  indexContent(teddy);
};

(async () => {
  const { teddy } = await formatDataTeddies(await getTeddies("http://localhost:3000/api/teddies"));
  displayTeddies(teddy);
})();
displayTotalQuantity();
