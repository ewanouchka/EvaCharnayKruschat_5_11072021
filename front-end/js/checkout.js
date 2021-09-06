import { emptyLocalStorage } from "./modules/storage.js";
import { checkoutContent } from "./modules/htmlContent.js";

checkoutContent();

Array.from(document.querySelectorAll("#back-to-index, #index-logo, #cart-logo")).map((item) => {
  item.addEventListener("click", function () {
    emptyLocalStorage("orderId", "total");
  });
});
