export let cart = JSON.parse(localStorage.getItem("products"));

export const getCart = () => {
  let articles = "";
  if (!cart) {
    return articles;
  } else if (cart[1]) {
    articles = cart.map((articles) => {
      return articles;
    });
    return articles;
  } else {
    let articles = cart;
    return articles;
  }
};

export let articles = getCart();
