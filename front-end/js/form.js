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
    <input placeholder="ex: Jeanne" name="Surname" id="Surname" class="blocForm__input" type="text" required pattern="^[àáâãäåçèéêëìíîïðòóôõöùúûüýÿa-zA-Z\-\ ]{2,}$">
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
      const inputChecked = document.createElement("div"); // on crée une div supplémentaire

      for (const eachInput of inputToCheck) {
        // on boucle sur les input
        eachInput.addEventListener("change", function () {
          if (eachInput.validity.patternMismatch || eachInput.validity.valueMissing) {
            // si le libellé du champ ne correspond pas au pattern (=) n'est pas valide) ou si le champ est vide
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
      const checkValidity = (inputId, errorMess) => {
        const inputName = document.getElementById(`${inputId}`); // on récupère le champ à partir de son ID

        inputName.addEventListener("keyup", function () {
          // on écoute au changement du champ
          if (inputName.validity.patternMismatch) {
            // si le champ n'est pas valide
            inputName.setCustomValidity(
              // on change le texte du message d'erreur
              `${errorMess}`
            );
          } else {
            // si le champ est valide
            inputName.setCustomValidity(""); // on laisse vide
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

        const getInputValue = (inputId) => {
          const inputValue = document.getElementById(`${inputId}`).value; // on récupère le champ à partir de son ID
          return inputValue;
        };

        const formularData = {
          // on construit un objet à partir des informations récupérées dans le formulaire
          name: getInputValue("Name"),
          surname: getInputValue("Surname"),
          address: getInputValue("Address"),
          postcode: getInputValue("Postcode"),
          town: getInputValue("Town"),
          email: getInputValue("Email"),
          phone: getInputValue("Phone"),
        };

        (async () => {
          localStorage.setItem("formularDataSent", JSON.stringify(formularData)); // on ajoute les infos du formulaire dans une nouvelle clé dans le localStorage
        })();
      });

      // fin des scripts
    });
  })();
