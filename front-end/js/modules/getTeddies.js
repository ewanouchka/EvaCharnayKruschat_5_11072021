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
        colors,
        description,
      };
    })
  );
  return {
    teddy,
  };
};
