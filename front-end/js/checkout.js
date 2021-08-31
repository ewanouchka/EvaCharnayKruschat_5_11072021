import { emptyLocalStorage } from "./modules/storage.js";
import { checkoutContent } from "./modules/htmlContent.js";

checkoutContent();

document.getElementById("back-to-index").addEventListener("click", function () {
  emptyLocalStorage("orderId", "total");
});
