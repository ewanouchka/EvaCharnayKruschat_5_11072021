import { getFormattedPrice } from "./getFormattedPrice.js";

// récupération des données de l'api
export const getTeddies = async (url) => {
  const teddy = await fetch(url);

  return teddy.json();
};
// mise en forme des données de l'api
export const formatDataTeddies = async (teddyApiJSON) => {
  const teddy = await Promise.all(
    teddyApiJSON.map((teddy) => {
      const { _id: id, name, price, imageUrl: img, colors, description } = teddy; // on déstructure teddies

      return {
        // on met en forme les éléments
        id,
        name,
        price,
        img,
        colors,
        description,
      };
    })
  );

  return {
    teddy,
  };
};
