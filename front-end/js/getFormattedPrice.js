const getFormattedPrice = (format = "fr-FR") => {
  const euro = new Intl.NumberFormat(format, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return euro.format(price / 100);
};
