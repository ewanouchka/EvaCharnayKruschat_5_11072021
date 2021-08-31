import { emptyLocalStorage } from "./modules/storage.js";
import { checkoutContent } from "./modules/htmlContent.js";

checkoutContent();

document.querySelector("#back-to-index").addEventListener("click", function () {
  emptyLocalStorage("orderId", "total");
});
