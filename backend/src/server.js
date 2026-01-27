const { calculateBestValue } = require("./calculator/calculate");

const options = [
  {
    name: "Small",
    price: 20,
    size: 125,
    unit: "g",
    promoType: "none",
  },
  {
    name: "Medium",
    price: 40,
    size: 200,
    unit: "g",
    promoType: "none",
  },
  {
    name: "Large",
    price: 100,
    size: 450,
    unit: "g",
    promoType: "buyXgetY",
    promoValue: 2,
    promoExtra: 1,
  },
];

console.log(calculateBestValue(options));
