"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertCurrency = void 0;
function realToCents(price) {
    const numericPrice = parseFloat(price.replace(/\./g, "").replace(",", "."));
    const priceInCentes = Math.round(numericPrice * 100);
    const priceIntsToString = priceInCentes.toString();
    return priceIntsToString;
}
function centsToReal(price) {
    const priceInReal = price / 100;
    const priceInRealString = priceInReal.toFixed(2).replace(".", ",");
    return priceInRealString;
}
const ConvertCurrency = {
    realToCents,
    centsToReal,
};
exports.ConvertCurrency = ConvertCurrency;
