import { formContent } from "./modules/htmlContent.js";
import { createPopup, createContentOrderInvalid, createContentValidateOrder } from "./modules/popup.js";

// affichage du formulaire

const validateCart = document.querySelector("#validate-cart");

if (validateCart)
  (async () => {
    validateCart.addEventListener("click", function () {
      formContent();

      // vérification en cours de frappe des champs du formulaire

      const inputToCheck = document.querySelectorAll("input");
      const inputChecked = document.createElement("div");
      for (const eachInput of inputToCheck) {
        const errorMessage = document.querySelector(`#error-message-${eachInput.name}`);
        eachInput.addEventListener("keyup", function () {
          if (eachInput.validity.patternMismatch || eachInput.validity.valueMissing) {
            inputChecked.classList.add("check-false");
            inputChecked.innerHTML = `&#xD7;`;
          } else {
            inputChecked.classList.remove("check-false");
            inputChecked.classList.add("check-true");
            inputChecked.innerHTML = `&#x2713;`;
            errorMessage.innerHTML = "";
          }
          eachInput.parentNode.insertBefore(inputChecked, eachInput);
        });
      }

      // vérification au clic sur le bouton "valider la commande"

      const checkValidity = (inputId, errorMess) => {
        const inputName = document.querySelector(`#${inputId}`);
        const submitButton = document.querySelector(`#order-confirm`);

        submitButton.addEventListener("click", function () {
          if (inputName.validity.valueMissing) {
            inputName.setCustomValidity(`Merci de compléter cette information.`);

            const errorMessage = document.querySelector(`#error-message-${inputId}`);
            errorMessage.innerHTML = "Merci de compléter cette information.";

            inputName.classList.add("bloc-form__input--invalid");
          } else if (inputName.validity.patternMismatch) {
            inputName.setCustomValidity(`${errorMess}`);

            const errorMessage = document.querySelector(`#error-message-${inputId}`);
            errorMessage.innerHTML = `${errorMess}`;

            inputName.classList.add("bloc-form__input--invalid");
          } else {
            inputName.setCustomValidity("");
            inputName.classList.add("bloc-form__input:valid");
          }
        });
      };

      // messages d'erreur personnalisés

      checkValidity(
        "Name",
        'Le nom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-" (minimum 2 caractères).'
      );
      checkValidity(
        "Surname",
        'Le prénom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-" (minimum 2 caractères).'
      );
      checkValidity("Address", "Merci de saisir votre adresse complète.");
      checkValidity("Postcode", "Le code postal doit comporter quatre ou cinq chiffres.");
      checkValidity(
        "Town",
        'La ville doit être composée uniquement de lettres, accentuées ou non, espaces et/ou "-" (minimum 2 caractères).'
      );
      checkValidity("Email", 'Un e-mail doit comporter un "@" et un ".".');
      checkValidity("Phone", "Le numéro de téléphone doit comporter 10 chiffres.");

      // récupération des valeurs du formulaire au clic sur le bouton "Valider la commande" si tout est OK

      const validateOrder = document.querySelector("#order-confirm");

      validateOrder.addEventListener("click", function (event) {
        event.preventDefault();

        const inputValues = document.querySelectorAll(".bloc-form__input");

        const checkAllValidity = () => {
          let validity = true;
          for (const inputValue of inputValues) {
            if (inputValue.validity.valid == false) {
              validity = false;
            }
          }
          return validity;
        };

        // pop-up

        createPopup();

        if (checkAllValidity()) {
          createContentValidateOrder();
        } else {
          createContentOrderInvalid();
        }
      });
    });
  })();
