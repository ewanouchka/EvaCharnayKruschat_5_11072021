// affichage du formulaire

// on sélectionne le bouton "Valider le panier"
const validate1 = document.getElementById("validateCart");

if (validate1)
  // on vérifie la présence du bouton valider le panier et on applique la fonction en conséquence
  (async () => {
    validate1.addEventListener("click", function () {
      const blocForm = document.getElementById("order-form");

      //on crée le bloc formulaire avec les champs requis
      blocForm.innerHTML = `<section class="blocForm">
    <h2 class="blocForm__title">Merci de remplir ce formulaire pour valider votre commande</h2>
    <label for="Name" class="blocForm__input">Votre nom :
    </label>
    <input placeholder="ex: Dupont" name="Name" id="Name" class="blocForm__input" type="text" required pattern="^[a-zA-Z\-\ ]{2,}$">
    </input>

    <label for="Surname" class="blocForm__input">Votre prénom :
    </label>
    <input placeholder="ex: Jeanne" name="Surname" id="Surname" class="blocForm__input" type="text" required pattern="^[a-zA-Z\-]{2,}$">
    </input>
    
    <label for="Address" class="blocForm__input">Votre adresse :
    </label>
    <input placeholder="ex: 1 place du marché" name="Address" id="Address" class="blocForm__input" type="text" required pattern="^.*[a-zA-Z0-9]+.*$">
    </input>
    
    <label for="Postcode" class="blocForm__input">Votre code postal :
    </label>
    <input placeholder="ex: 75001" name="Postcode" id="Postcode" class="blocForm__input" type="text" required pattern="^[0-9]{4,5}$">
    </input>
    
    <label for="Town" class="blocForm__input">Votre ville :
    </label>
    <input placeholder="ex: Paris" name="Town" id="Town" class="blocForm__input" type="text" required pattern="^[a-zA-Z]+[a-zA-Z\-\ ]*[a-zA-Z]+$">
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

      const inputToCheck = document.getElementsByTagName("input");
      let inputChecked = document.createElement("div");

      for (let eachInput of inputToCheck) {
        eachInput.addEventListener("change", function () {
          if (eachInput.validity.patternMismatch) {
            inputChecked.classList.add("checkFalse");
            inputChecked.innerHTML = `&#xD7;`;
          } else {
            inputChecked.classList.remove("checkFalse");
            inputChecked.classList.add("checkTrue");
            inputChecked.innerHTML = `&#x2713;`;
          }
          eachInput.parentNode.insertBefore(inputChecked, eachInput);
        });
      }
    });
  })();
