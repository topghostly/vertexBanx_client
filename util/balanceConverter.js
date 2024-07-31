const currencyConverter = (balance) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
    .format(balance)
    .replace("$", "₦");
};

export default currencyConverter;
