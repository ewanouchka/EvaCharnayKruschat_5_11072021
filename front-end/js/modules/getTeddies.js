import { createErrorMessage } from "./popup.js";

// pour la page d'index : accès à la liste des produits du serveur et formattage de l'objet

export const getTeddies = async (url) => {
  try {
    const teddy = await fetch(url);
    const teddyApiJSON = await teddy.json();

    if (teddyApiJSON) {
      return teddyApiJSON;
    }
  } catch (error) {
    createErrorMessage("TypeError: Failed to fetch");
  }
};

export const formatDataTeddies = async (teddyApiJSON) => {
  try {
    if (teddyApiJSON) {
      const teddy = await Promise.all(
        teddyApiJSON.map((teddy) => {
          const { _id: id, name, price, imageUrl: img, colors, description } = teddy;

          return {
            id,
            name,
            price,
            img,
            colors: colors.join(", "),
            description,
          };
        })
      );

      return {
        teddy,
      };
    }
  } catch (error) {
    createErrorMessage("TypeError: Invalid data format");
  }
};

// pour la page produit : accès au détail du produit sélectionné en page d'accueil et formattage de l'objet

export const getOneTeddy = () =>
  getTeddies("http://localhost:3000/api/teddies/" + new URL(location.href).searchParams.get("id"));

export const formatDataOneTeddy = async (oneTeddyJSON) => {
  try {
    const { _id: id, name, price, imageUrl: img, colors, description } = oneTeddyJSON;

    const teddy = { id, name, price, img, colors, description };

    const arrayOfTeddyElements = [];

    for (const element in teddy) {
      arrayOfTeddyElements.push(`${teddy[element]}`);
    }
    if (arrayOfTeddyElements.some((value) => value == "undefined")) {
      createErrorMessage("TypeError: Invalid data format");
    }

    return { teddy };
  } catch (error) {
    createErrorMessage("TypeError: Failed to fetch");
  }
};
