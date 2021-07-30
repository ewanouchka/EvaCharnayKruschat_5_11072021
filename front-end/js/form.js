// affichage du formulaire

// on sélectionne le bouton "Valider le panier"
const validate1 = document.getElementById("validate-cart");

if (validate1)
  // on vérifie la présence du bouton valider le panier et on applique la fonction en conséquence
  (async () => {
    validate1.addEventListener("click", function () {
      const blocForm = document.getElementById("order-form"); // on récupère le bloc formulaire

      //on crée le bloc formulaire avec les champs requis
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

      blocForm.innerHTML += `<button class="button" id="order-confirm"><span>Valider la commande</span></button>`; // ajout du bouton "Valider la commande"

      blocForm.classList.remove("visually-hidden"); // on enlève la classe qui dissimule le bloc formulaire lorsque le panier est vide

      // ajout d'une icone à la modification des champs du formulaire
      const inputToCheck = document.getElementsByTagName("input"); // on sélectionne les input
      const inputChecked = document.createElement("div"); // on crée une div supplémentaire

      for (const eachInput of inputToCheck) {
        const errorMessage = document.getElementById(`error-message-${eachInput.name}`);
        // on boucle sur les input
        eachInput.addEventListener("keyup", function () {
          eachInput.classList.remove("bloc-form__input--invalid");
          if (eachInput.validity.patternMismatch || eachInput.validity.valueMissing) {
            // si le libellé du champ ne correspond pas au pattern (=) n'est pas valide) ou si le champ est vide
            inputChecked.classList.add("check-false"); // on applique la class invalide
            inputChecked.innerHTML = `&#xD7;`; // on insère une croix dans la div vide
          } else {
            eachInput.classList.remove("bloc-form__input--invalid");
            inputChecked.classList.remove("check-false"); // si la fonction est valide
            inputChecked.classList.add("check-true"); // on applique la class valide
            inputChecked.innerHTML = `&#x2713;`; // on insère une coche dans la div vide
            errorMessage.innerHTML = "";
          }
          eachInput.parentNode.insertBefore(inputChecked, eachInput); // on insère la div créée dans le DOM
        });
      }

      // personnalisation des messages d'erreur
      const checkValidity = (inputId, errorMess) => {
        const inputName = document.getElementById(`${inputId}`); // on récupère le champ à partir de son ID
        const submitButton = document.getElementById(`order-confirm`); // on récupère le champ à partir de son ID
        submitButton.addEventListener("click", function () {
          // on écoute au changement du champ
          if (inputName.validity.valueMissing) {
            inputName.setCustomValidity(`Merci de compléter cette information.`);
            const errorMessage = document.getElementById(`error-message-${inputId}`);
            errorMessage.innerHTML = "Merci de compléter cette information.";
            inputName.classList.add("bloc-form__input--invalid"); // on applique la class invalide
          } else if (inputName.validity.patternMismatch) {
            inputName.setCustomValidity(
              // on change le texte du message d'erreur
              `${errorMess}`
            );
            const errorMessage = document.getElementById(`error-message-${inputId}`);
            errorMessage.innerHTML = `${errorMess}`;
            inputName.classList.add("bloc-form__input--invalid"); // on applique la class invalide
          } else {
            // si le champ est valide
            inputName.setCustomValidity(""); // on laisse vide
            // inputName.classList.add("check-true"); // on applique la class invalide
          }
        });
      };

      // message d'erreur pour le nom
      checkValidity("Name", 'Le nom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-".');

      // message d'erreur pour le prénom
      checkValidity(
        "Surname",
        'Le prénom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-".'
      );

      // message d'erreur pour l'adresse
      checkValidity("Address", "Merci de saisir votre adresse complète.");

      // message d'erreur pour le code postal
      checkValidity("Postcode", "Le code postal doit comporter quatre ou cinq chiffres.");

      // message d'erreur pour la ville
      checkValidity("Town", "La ville doit être composée uniquement de lettres, accentuées ou non, espaces et/ou -.");

      // message d'erreur pour l'e-mail
      checkValidity("Email", 'Un e-mail doit comporter un "@" et un ".".');

      // message d'erreur pour le téléphone
      checkValidity("Phone", "Le numéro de téléphone doit comporter 10 chiffres.");

      // récupération des valeurs du formulaire et envoi au localStorage au clic sur le bouton "Valider la commande"

      const validate2 = document.getElementById("order-confirm");
      validate2.addEventListener("click", function (event) {
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
          // si la fonction checkAllValidity retourne "true"
          const getInputValue = (inputId) => {
            const inputValue = document.getElementById(`${inputId}`).value; // on récupère le champ à partir de son ID
            return inputValue;
          };

          const contact = {
            // on construit un objet à partir des informations récupérées dans le formulaire
            firstName: getInputValue("Surname"),
            lastName: getInputValue("Name"),
            address: getInputValue("Address"),
            city: getInputValue("Town"),
            email: getInputValue("Email"),
          };

          (async () => {
            localStorage.setItem("contact", JSON.stringify(contact)); // on ajoute les infos du formulaire dans une nouvelle clé dans le localStorage
          })();
        } else {
          // on vérifie si la fonction checkAllValidity a renvoyé "false"
          console.log("le formulaire  n'est pas valide");
        }
        // fin des scripts
      });
    });
  })();
