import { emptyLocalStorage } from "./modules/storage.js";
import { checkoutContent } from "./modules/htmlContent.js";

checkoutContent();

Array.from(
  document.querySelectorAll("#back-to-index, #index-logo, #cart-logo, .footer-list__link, .footer-list__link__social")
).map((item) => {
  item.addEventListener("click", function () {
    emptyLocalStorage("orderId", "total");
  });
});
