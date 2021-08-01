export const getFormattedPrice = (number) => {
  const newPrice = new Intl.NumberFormat("Fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return newPrice.format(number / 100);
};
