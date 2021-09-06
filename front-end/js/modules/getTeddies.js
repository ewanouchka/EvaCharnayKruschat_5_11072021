import { createPopup, closePopup, popupBloc } from "./popup.js";

export const getTeddies = async (url) => {
  const teddy = await fetch(url);

  return teddy.json();
};

export const formatDataTeddies = async (teddyApiJSON) => {
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
};

export const getOneTeddy = () =>
  getTeddies("http://localhost:3000/api/teddies/" + new URL(location.href).searchParams.get("id"));

export const formatDataOneTeddy = async (oneTeddyJSON) => {
  const { _id: id, name, price, imageUrl: img, colors, description } = oneTeddyJSON;

  const teddy = { id, name, price, img, colors, description };

  return { teddy };
};
