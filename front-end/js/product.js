import { productContent } from "./modules/htmlContent.js";
import { getOneTeddy, formatDataOneTeddy } from "./modules/getTeddies.js";
import { setStorageItem } from "./modules/storage.js";
import { productsInCart, arrayOfProducts } from "./modules/getCart.js";
import { displayTotalQuantity } from "./modules/getNumberOfArticles.js";
import { createPopup, createContentAddToCart } from "./modules/popup.js";

// affichage du bloc produit

const displayOneTeddy = async (teddy) => {
  productContent(teddy);
};

// fonction affichage de la pastille de couleur en fonction des données colors

let choiceColor = "";
const selectColor = async (teddy) => {
  const colorElement = document.querySelector("#teddy-item__color__list");
  for (const color of teddy.colors) {
    const lowercaseColor = color.toLowerCase().replace(/ /g, "");
    colorElement.innerHTML += `<label for="toggle-${lowercaseColor}" id="toggle-${lowercaseColor}-label" class="teddy-item__color__list__bullet teddy-item__color__list__bullet--${lowercaseColor}" title="${color}">
    </label><input type="radio" name="teddy-item__color__list" id="toggle-${lowercaseColor}" class="visually-hidden" title="${color}">`;
  }

  (async () => {
    const selectedColor = document.querySelector("#teddy-item__color__list");
    const otherColor = document.querySelectorAll(".teddy-item__color__list__bullet");
    selectedColor.addEventListener("change", () => {
      const elts = document.querySelectorAll("input");
      otherColor.forEach((element) => element.classList.remove("teddy-item__color__list__bullet--active"));
      for (let m = 0; m < elts.length; m++) {
        if (elts[m].checked === true) {
          const idSelected = "#" + elts[m].id + "-label";
          document.querySelector(idSelected).classList.add("teddy-item__color__list__bullet--active");
          choiceColor = elts[m].title;
          break;
        }
      }
      return choiceColor;
    });
  })();
};

// fonction Ajouter au panier

const addToCart = async (teddy) => {
  const addToCartButton = document.querySelector("#add-to-cart");
  addToCartButton.addEventListener("click", async () => {
    const choiceQuantity = parseInt(document.querySelector("#teddy-item__quantity").value);
    const optionsItemSelected = {
      name: teddy.name,
      id: teddy.id,
      color: choiceColor,
      price: teddy.price,
      quantity: choiceQuantity,
    };

    const error = document.querySelector("#color-error");
    if (optionsItemSelected.color == "") {
      error.classList.remove("error-hidden");
      error.classList.add("error-visible");
    } else {
      error.classList.remove("error-visible");
      error.classList.add("error-hidden");

      // pop-up

      createPopup();
      createContentAddToCart(optionsItemSelected);

      // ajout des articles au localStorage

      (() => {
        if (!productsInCart) {
          setStorageItem("products", optionsItemSelected);
        } else {
          const addSelectedArticle = (arrayOfProducts) => {
            if (
              arrayOfProducts.every(
                (value) => value.color !== optionsItemSelected.color || value.id !== optionsItemSelected.id
              )
            ) {
              arrayOfProducts.push(optionsItemSelected);
              setStorageItem("products", arrayOfProducts);
            } else {
              for (let n = 0; n < arrayOfProducts.length; n++) {
                if (
                  arrayOfProducts[n].color === optionsItemSelected.color &&
                  arrayOfProducts[n].id === optionsItemSelected.id
                ) {
                  arrayOfProducts[n].quantity =
                    parseInt(arrayOfProducts[n].quantity, 10) + parseInt(optionsItemSelected.quantity, 10);
                  setStorageItem("products", arrayOfProducts);
                }
              }
            }
            return;
          };
          addSelectedArticle(arrayOfProducts);
        }
      })();
    }
  });
};

// appels

(async () => {
  const { teddy } = await formatDataOneTeddy(await getOneTeddy());
  displayOneTeddy(teddy);
  selectColor(teddy);
  addToCart(teddy);
})();
displayTotalQuantity();
