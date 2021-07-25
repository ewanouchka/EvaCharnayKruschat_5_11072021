// affichage du formulaire

(async () => {
  // on sélectionne le bouton "Valider le panier"
  const validate1 = document.querySelector("#validateCart");
  validate1.addEventListener("click", function () {
    const blocForm = document.getElementById("order-form");

    blocForm.innerHTML = `<section class="blocForm">
    <h2 class="blocForm__title">Merci de remplir ce formulaire pour valider votre commande</h2>
    <label for="Name" id="Name" class="blocForm__input-large">Votre nom :
    </label>
    <input name="Name" id="Name" class="blocForm__input-large">

    <label for="Surname" id="Surname" class="blocForm__input-large">Votre prénom :
    </label>
    <input name="Surname" id="Surname" class="blocForm__input-large">
    
    <label for="Address" id="Address" class="blocForm__input-large">Votre adresse :
    </label>
    <input name="Address" id="Address" class="blocForm__input-large">
    
    <label for="Postcode" id="Postcode" class="blocForm__input-large">Votre code postal :
    </label>
    <input name="Postcode" id="Postcode" class="blocForm__input-large">
    
    <label for="Town" id="Town" class="blocForm__input-large">Votre ville :
    </label>
    <input name="Town" id="Town" class="blocForm__input-large">
    
    <label for="Email" id="Email" class="blocForm__input-large">Votre e-mail :
    </label>
    <input name="Email" id="Email" class="blocForm__input-large">
    </section>`;

    blocForm.innerHTML += `<button class="button" id="order-confirm"><span>Valider la commande</span></button>`; // ajout du bouton "Valider la commande"

    blocForm.classList.remove("visually-hidden");
  });
})();

// validation du formulaire
