import { getTeddies, formatDataTeddies } from "./modules/getTeddies.js";
import { displayTotalQuantity } from "./modules/getNumberOfProducts.js";
import { displayTeddies } from "./modules/htmlContent.js";

// création de l'objet teddy à afficher

const { teddy } = await formatDataTeddies(await getTeddies("http://localhost:3000/api/teddies"));

// appels des fonctions pour affichage

displayTeddies(teddy);

displayTotalQuantity();
