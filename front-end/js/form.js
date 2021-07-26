// affichage du formulaire

// on vérifie la présence du bouton valider le panier
if (document.getElementById("validateCart")) {
  (async () => {
    // on sélectionne le bouton "Valider le panier"
    const validate1 = document.getElementById("validateCart");
    validate1.addEventListener("click", function () {
      const blocForm = document.getElementById("order-form");

      //on crée le bloc formulaire avec les champs requis
      blocForm.innerHTML = `<section class="blocForm">
    <h2 class="blocForm__title">Merci de remplir ce formulaire pour valider votre commande</h2>
    <label for="Name" class="blocForm__input">Votre nom :
    </label>
    <input placeholder="ex: Dupont" name="Name" id="Name" class="blocForm__input" type="text" required>

    <label for="Surname" class="blocForm__input">Votre prénom :
    </label>
    <input placeholder="ex: Jeanne" name="Surname" id="Surname" class="blocForm__input" type="text" required>
    
    <label for="Address" class="blocForm__input">Votre adresse :
    </label>
    <input placeholder="ex: 1 place du marché" name="Address" id="Address" class="blocForm__input" type="text" required>
    
    <label for="Postcode" class="blocForm__input">Votre code postal :
    </label>
    <input placeholder="ex: 75001" name="Postcode" id="Postcode" class="blocForm__input" type="text" pattern="[0-9]*" required>
    
    <label for="Town" class="blocForm__input">Votre ville :
    </label>
    <input placeholder="ex: Paris" name="Town" id="Town" class="blocForm__input" type="text" required>
    
    <label for="Email" class="blocForm__input">Votre e-mail :
    </label>
    <input placeholder="contact@orinoco.fr" name="Email" id="Email" class="blocForm__input" type="email" required>
    
    <label for="Phone" class="blocForm__input">Votre téléphone (facultatif) :
    </label>
    <input placeholder="0123456789" name="Phone" id="Phone" class="blocForm__input" type="text" pattern="[0-9]*">
    </section>`;

      blocForm.innerHTML += `<button class="button" id="order-confirm"><span>Valider la commande</span></button>`; // ajout du bouton "Valider la commande"

      blocForm.classList.remove("visually-hidden"); // on enlève la classe qui dissimule le bloc formulaire lorsque le panier est vide
    });
  })();
}

// validation du formulaire
