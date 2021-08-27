import { createPopup, createContentOrderInvalid, createContentValidateOrder } from "./modules/popup.js";

// affichage du formulaire

const validateCart = document.getElementById("validate-cart");
if (validateCart)
  (async () => {
    validateCart.addEventListener("click", function () {
      const blocForm = document.getElementById("order-form");
      blocForm.innerHTML = `<section class="bloc-form">
    <h2 class="bloc-form__title">Merci de remplir ce formulaire pour valider votre commande</h2>
    <label for="Name" class="bloc-form__label">Votre nom : <span class="error-visible" id="error-message-Name"></span>
    </label>
    <input placeholder="ex: Dupont" name="Name" id="Name" class="bloc-form__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ \']{2,}$" oninput="checkValidity(this)">
    </input>

    <label for="Surname" class="bloc-form__label">Votre prénom : <span class="error-visible" id="error-message-Surname"></span>
    </label>
    <input placeholder="ex: Jeanne" name="Surname" id="Surname" class="bloc-form__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ ]{2,}$" oninput="checkValidity(this)">
    </input>
    
    <label for="Address" class="bloc-form__label">Votre adresse : <span class="error-visible" id="error-message-Address"></span>
    </label>
    <input placeholder="ex: 1 place du marché" name="Address" id="Address" class="bloc-form__input" type="text" required pattern="^.+[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z0-9]+.+$" oninput="checkValidity(this)">
    </input>
    
    <label for="Postcode" class="bloc-form__label">Votre code postal : <span class="error-visible" id="error-message-Postcode"></span>
    </label>
    <input placeholder="ex: 75001" name="Postcode" id="Postcode" class="bloc-form__input" type="text" required pattern="^[0-9]{4,5}$" oninput="checkValidity(this)">
    </input>
    
    <label for="Town" class="bloc-form__label">Votre ville : <span class="error-visible" id="error-message-Town"></span>
    </label>
    <input placeholder="ex: Paris" name="Town" id="Town" class="bloc-form__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z]+[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ ]*[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z]+$" oninput="checkValidity(this)">
    </input>
    
    <label for="Email" class="bloc-form__label">Votre e-mail : <span class="error-visible" id="error-message-Email"></span>
    </label>
    <input placeholder="contact@orinoco.fr" name="Email" id="Email" class="bloc-form__input" type="email" required pattern="^[a-zA-Z0-9]+[a-zA-Z\-\.\_]*@{1}[a-zA-Z0-9]+[\.]{1}[a-zA-Z]+$" oninput="checkValidity(this)">
    </input>
    
    <label for="Phone" class="bloc-form__label">Votre téléphone (facultatif) : <span class="error-visible" id="error-message-Phone"></span>
    </label>
    <input placeholder="0123456789" name="Phone" id="Phone" class="bloc-form__input" type="text" pattern="^[0-9]{10}$" oninput="checkValidity(this)">
    </input>
    </section>`;
      blocForm.innerHTML += `<button class="button" id="order-confirm"><span>Valider la commande</span></button>`;
      blocForm.classList.remove("visually-hidden");

      // vérification en cours de frappe des champs du formulaire

      const inputToCheck = document.getElementsByTagName("input");
      const inputChecked = document.createElement("div");
      for (const eachInput of inputToCheck) {
        const errorMessage = document.getElementById(`error-message-${eachInput.name}`);
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
        const inputName = document.getElementById(`${inputId}`);
        const submitButton = document.getElementById(`order-confirm`);
        submitButton.addEventListener("click", function () {
          if (inputName.validity.valueMissing) {
            inputName.setCustomValidity(`Merci de compléter cette information.`);
            const errorMessage = document.getElementById(`error-message-${inputId}`);
            errorMessage.innerHTML = "Merci de compléter cette information.";
            inputName.classList.add("bloc-form__input--invalid");
          } else if (inputName.validity.patternMismatch) {
            inputName.setCustomValidity(`${errorMess}`);
            const errorMessage = document.getElementById(`error-message-${inputId}`);
            errorMessage.innerHTML = `${errorMess}`;
            inputName.classList.add("bloc-form__input--invalid");
          } else {
            inputName.setCustomValidity("");
            inputName.classList.add("bloc-form__input:valid");
          }
        });
      };

      // messages d'erreur personnalisés

      checkValidity("Name", 'Le nom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-" (minimum 2 caractères).');
      checkValidity(
        "Surname",
        'Le prénom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-" (minimum 2 caractères).'
      );
      checkValidity("Address", "Merci de saisir votre adresse complète.");
      checkValidity("Postcode", "Le code postal doit comporter quatre ou cinq chiffres.");
      checkValidity("Town", 'La ville doit être composée uniquement de lettres, accentuées ou non, espaces et/ou "-" (minimum 2 caractères).');
      checkValidity("Email", 'Un e-mail doit comporter un "@" et un ".".');
      checkValidity("Phone", "Le numéro de téléphone doit comporter 10 chiffres.");

      // récupération des valeurs du formulaire au clic sur le bouton "Valider la commande" si tout est OK

      const validateOrder = document.getElementById("order-confirm");
      validateOrder.addEventListener("click", function (event) {
        event.preventDefault();
        const inputValues = document.getElementsByClassName("bloc-form__input");
        const checkAllValidity = () => {
          let validity = true;
          for (const inputValue of inputValues) {
            if (inputValue.validity.valid == false) {
              validity = false;
            }
          }
          return validity;
        };

        if (checkAllValidity()) {          
          // pop-up

          createPopup();
          createContentValidateOrder();
        } else {
          createPopup();
          createContentOrderInvalid();
        }
      });
    });
  })();
