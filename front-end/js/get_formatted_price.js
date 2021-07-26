// fonction changement du format du prix 0000 -> 00.00
const getFormattedPrice = (number) => {
  const newPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return newPrice.format(number);
};
