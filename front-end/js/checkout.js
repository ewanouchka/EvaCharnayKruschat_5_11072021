import { emptyLocalStorage } from "./modules/storage.js";
import { checkoutContent } from "./modules/htmlContent.js";

checkoutContent();

// fonction pour vider le localStorage au clic sur n'importe quel lien de la page

Array.from(
  document.querySelectorAll("#back-to-index, #index-logo, #cart-logo, .footer-list__link, .footer-list__link__social")
).map((item) => {
  item.addEventListener("click", function () {
    emptyLocalStorage("orderId", "total");
  });
});
