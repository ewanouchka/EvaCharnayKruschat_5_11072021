// affichage du formulaire

// on sélectionne le bouton "Valider le panier"
const validate1 = document.getElementById("validateCart");

if (validate1)
  // on vérifie la présence du bouton valider le panier et on applique la fonction en conséquence
  (async () => {
    validate1.addEventListener("click", function () {
      const blocForm = document.getElementById("order-form"); // on récupère le bloc formulaire

      //on crée le bloc formulaire avec les champs requis
      blocForm.innerHTML = `<section class="blocForm">
    <h2 class="blocForm__title">Merci de remplir ce formulaire pour valider votre commande</h2>
    <label for="Name" class="blocForm__input">Votre nom :
    </label>
    <input placeholder="ex: Dupont" name="Name" id="Name" class="blocForm__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ ]{2,}$">
    </input>

    <label for="Surname" class="blocForm__input">Votre prénom :
    </label>
    <input placeholder="ex: Jeanne" name="Surname" id="Surname" class="blocForm__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-]{2,}$">
    </input>
    
    <label for="Address" class="blocForm__input">Votre adresse :
    </label>
    <input placeholder="ex: 1 place du marché" name="Address" id="Address" class="blocForm__input" type="text" required pattern="^.+[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z0-9]+.+$">
    </input>
    
    <label for="Postcode" class="blocForm__input">Votre code postal :
    </label>
    <input placeholder="ex: 75001" name="Postcode" id="Postcode" class="blocForm__input" type="text" required pattern="^[0-9]{4,5}$">
    </input>
    
    <label for="Town" class="blocForm__input">Votre ville :
    </label>
    <input placeholder="ex: Paris" name="Town" id="Town" class="blocForm__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z]+[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ ]*[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z]+$">
    </input>
    
    <label for="Email" class="blocForm__input">Votre e-mail :
    </label>
    <input placeholder="contact@orinoco.fr" name="Email" id="Email" class="blocForm__input" type="email" required pattern="^[a-zA-Z0-9]+[a-zA-Z\-\.\_]*@{1}[a-zA-Z0-9]+[\.]{1}[a-zA-Z]+$">
    </input>
    
    <label for="Phone" class="blocForm__input">Votre téléphone (facultatif) :
    </label>
    <input placeholder="0123456789" name="Phone" id="Phone" class="blocForm__input" type="text" pattern="^[0-9]{10}$">
    </input>
    </section>`;

      blocForm.innerHTML += `<button class="button" id="order-confirm"><span>Valider la commande</span></button>`; // ajout du bouton "Valider la commande"

      blocForm.classList.remove("visually-hidden"); // on enlève la classe qui dissimule le bloc formulaire lorsque le panier est vide

      // ajout d'une icone à la modification des champs du formulaire
      const inputToCheck = document.getElementsByTagName("input"); // on sélectionne les input
      let inputChecked = document.createElement("div"); // on crée une div supplémentaire

      for (let eachInput of inputToCheck) {
        // on boucle sur les input
        eachInput.addEventListener("change", function () {
          if (eachInput.validity.patternMismatch) {
            // si la fonction n'est pas valide
            inputChecked.classList.add("checkFalse"); // on applique la class invalide
            inputChecked.innerHTML = `&#xD7;`; // on insère une croix dans la div vide
          } else {
            inputChecked.classList.remove("checkFalse"); // si la fonction est valide
            inputChecked.classList.add("checkTrue"); // on applique la class valide
            inputChecked.innerHTML = `&#x2713;`; // on insère une coche dans la div vide
          }
          eachInput.parentNode.insertBefore(inputChecked, eachInput); // on insère la div créée dans le DOM
        });
      }

      // personnalisation des messages d'erreur

      // message d'erreur pour le nom
      let inputName = document.getElementById("Name"); // on récupère le champ nom

      inputName.addEventListener("keyup", function () {
        if (inputName.validity.patternMismatch) {
          // si le champ n'est pas valide
          inputName.setCustomValidity(
            // on change le texte du message d'erreur
            'Le nom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-".'
          );
        } else {
          // sinon on laisse vide
          inputName.setCustomValidity("");
        }
      });

      // message d'erreur pour le prénom
      let inputSurname = document.getElementById("Surname"); // on récupère le champ prénom

      inputSurname.addEventListener("keyup", function () {
        if (inputSurname.validity.patternMismatch) {
          // si le champ n'est pas valide
          inputSurname.setCustomValidity(
            // on change le texte du message d'erreur
            'Le prénom doit être composé uniquement de lettres, accentuées ou non, espaces et/ou "-".'
          );
        } else {
          // sinon on laisse vide
          inputSurname.setCustomValidity("");
        }
      });

      // message d'erreur pour l'adresse
      let inputAddress = document.getElementById("Address"); // on récupère le champ adresse

      inputAddress.addEventListener("keyup", function () {
        if (inputAddress.validity.patternMismatch) {
          // si le champ n'est pas valide
          inputAddress.setCustomValidity("Merci de saisir votre adresse complète."); // on change le texte du message d'erreur
        } else {
          // sinon on laisse vide
          inputAddress.setCustomValidity("");
        }
      });

      // message d'erreur pour le code postal
      let inputPostcode = document.getElementById("Postcode"); // on récupère le champ code postal

      inputPostcode.addEventListener("keyup", function () {
        if (inputPostcode.validity.patternMismatch) {
          // si le champ n'est pas valide
          inputPostcode.setCustomValidity("Le code postal doit comporter quatre ou cinq chiffres."); // on change le texte du message d'erreur
        } else {
          // sinon on laisse vide
          inputPostcode.setCustomValidity("");
        }
      });

      // message d'erreur pour la ville
      let inputTown = document.getElementById("Town"); // on récupère le champ ville

      inputTown.addEventListener("keyup", function () {
        if (inputTown.validity.patternMismatch) {
          // si le champ n'est pas valide
          inputTown.setCustomValidity(
            // on change le texte du message d'erreur
            "La ville doit être composée uniquement de lettres, accentuées ou non, espaces et/ou -."
          );
        } else {
          // sinon on laisse vide
          inputTown.setCustomValidity("");
        }
      });

      // message d'erreur pour l'e-mail
      let inputEmail = document.getElementById("Email"); // on récupère le champ e-mail

      inputEmail.addEventListener("keyup", function () {
        if (inputEmail.validity.patternMismatch) {
          // si le champ n'est pas valide
          inputEmail.setCustomValidity('Un e-mail doit comporter un "@" et un ".".'); // on change le texte du message d'erreur
        } else {
          // sinon on laisse vide
          inputEmail.setCustomValidity("");
        }
      });

      // message d'erreur pour le téléphone
      let inputPhone = document.getElementById("Phone"); // on récupère le champ téléphone

      inputPhone.addEventListener("keyup", function () {
        if (inputPhone.validity.patternMismatch) {
          // si le champ n'est pas valide
          inputPhone.setCustomValidity("Le numéro de téléphone doit comporter 10 chiffres."); // on change le texte du message d'erreur
        } else {
          // sinon on laisse vide
          inputPhone.setCustomValidity("");
        }
      });
    });
  })();
