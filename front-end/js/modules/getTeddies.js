// pour la page d'index : accès à la liste des produits du serveur et formattage de l'objet

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

// pour la page produit : accès au détail du produit sélectionné en page d'accueil et formattage de l'objet

export const getOneTeddy = () =>
  getTeddies("http://localhost:3000/api/teddies/" + new URL(location.href).searchParams.get("id"));

export const formatDataOneTeddy = async (oneTeddyJSON) => {
  const { _id: id, name, price, imageUrl: img, colors, description } = oneTeddyJSON;

  const teddy = { id, name, price, img, colors, description };

  return { teddy };
};
