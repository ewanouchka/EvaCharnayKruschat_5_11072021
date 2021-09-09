import { displayOneTeddy, selectColor } from "./modules/htmlContent.js";
import { formatDataOneTeddy, getOneTeddy } from "./modules/getTeddies.js";
import { displayTotalQuantity } from "./modules/getNumberOfProducts.js";
import { addToCart } from "./modules/addToCart.js";
import { createErrorMessage } from "./modules/popup.js";

// création de l'objet teddy à afficher

const { teddy } = await formatDataOneTeddy(
  await getOneTeddy().catch((error) => {
    createErrorMessage(error);
  })
);

// appels des fonctions pour affichage

displayOneTeddy(teddy);

selectColor(teddy);

displayTotalQuantity();

// appel de la fonction d'ajout au panier

addToCart(teddy);
