function realToCents(price: any) {
  const numericPrice = parseFloat(price.replace(/\./g, "").replace(",", "."));
  const priceInCentes = Math.round(numericPrice * 100);
  const priceIntsToString = priceInCentes.toString();

  return priceIntsToString;
}

function centsToReal(price: any) {
  const priceInReal = price / 100;
  const priceInRealString = priceInReal.toFixed(2).replace(".", ",");

  return priceInRealString;
}

const ConvertCurrency = {
  realToCents,
  centsToReal,
};

export { ConvertCurrency };
