import { emptyLocalStorage, getStorageItem } from "./modules/storage.js";

const orderId = getStorageItem("orderId");
const totalPrice = getStorageItem("total");

const checkoutElement = document.querySelector("#checkout");
checkoutElement.innerHTML = `<h2>
  Votre commande est bien enregistrée !</h2>
  <p class="checkout-body">
  Nous vous confirmons la réception de votre commande n°${orderId} pour un montant total de ${totalPrice}€ et vous en remercions.</p>
  <div class="">
  A très bientôt chez Orinoco !</div>
  <a href="../../index.html"><button class="button" id="back-to-index">Retour à l'accueil</button></a>`;

document.getElementById("back-to-index").addEventListener("click", function () {
  emptyLocalStorage("orderId", "total");
});
