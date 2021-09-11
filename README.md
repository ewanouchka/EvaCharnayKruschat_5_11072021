# Orinoco

## Projet 5 OpenClassrooms - parcours développeur web

L'objectif principal consiste en la création du front-end d'un site e-commerce en Javascript par la consommation d'une API préalablement fournie.

Il ne s'agit là que d'un MVP, aucune réelle gestion des transactions n'est effectuée.

Aucune maquette n'est donnée. Il est demandé d'improviser l'interface utilisateur.

### Pages html

    Création d'une page présentant tous les produits.
    Création d'une page présentant les détails d'un produit et la possibilité de l'ajouter au panier.
    Création d'une page panier contenant la liste des produits présents ainsi qu'un formulaire pour effectuer l'achat.
    Création d'une page de remerciement après achat comportant le numéro de commande renvoyé par l'API et le montant total des achats.

Les pages devront être créés en HTML, CSS et vanilla javascript.

### Qualité de code

    Le code devra être indenté.
    Le code devra contenir des commentaires.
    Les promesses devront être utilisées lors des appels.

Le code devra être accompagné d'un document planifiant de futurs test unitaires --> plan_de_tests.pdf.

### Expérience utilisateur

    Les inputs du formulaire d'achat devront être validés avant l'envoi à l'API.

### Prérequis

Installation préalable : `Node, npm`.

Afin de faire fonctionner l'API et de visualiser le MVP intégralement, il est nécessaire de cloner ce repo, et de lancer `npm install`. Lancer ensuite `node server` dans ce même dossier. Le serveur doit écouter `le port 3000`, faute de quoi l'accès aux informations reçues et générées par l'API ne sera pas possible.
