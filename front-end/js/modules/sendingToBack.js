import { setStorageItem, removeStorageItem } from "./storage.js";
import { addErrorMessage } from "./popup.js";

export const sendingToBack = async (contact, productsID) => {
  try {
    const orderSent = await fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      body: JSON.stringify({
        contact: contact,
        products: productsID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const orderFromBack = await orderSent.json();

    if (orderFromBack.orderId) {
      // envoi de l'ID de commande retourné par le back au localStorage
      setStorageItem("orderId", orderFromBack.orderId);

      // vider les produits du localStorage à la validation de la commande
      removeStorageItem("products");

      // redirection vers la page checkout
      window.location = "../pages/checkout.html";
    } else {
      // Si l'ID n'est pas retourné : message d'erreur et fermeture du popup de confirmation de commande
      addErrorMessage(`TypeError: error ${orderSent.status}`);
    }
  } catch (error) {
    // Si l'envoi ne se fait pas : message d'erreur et fermeture du popup de confirmation de commande
    addErrorMessage(`${error}`);
  }
};
