const { applyPromotion } = require("./promotions");
const AppError = require("../utils/appError");

function calculateBestValue(options) {
  if (!Array.isArray(options) || options.length === 0) {
     throw new AppError(
      "Options must be a non-empty array",
      400,
      "INVALID_OPTIONS"
    );
  }

  const calculated = options.map((option) => {
    const { effectivePrice, effectiveQuantity } = applyPromotion(option);

    if (effectiveQuantity <= 0) {
       throw new AppError(
      "Ouantity can't be 0 or null",
      400,
      "INVALID_QUANTITY"
    );
    }

    const costPerUnit = effectivePrice / effectiveQuantity;

    return {
      name: option.name,
      unit: option.unit,
      effectivePrice,
      effectiveQuantity,
      costPerUnit,
    };
  });

  // Sort by best value (lowest cost per unit)
  calculated.sort((a, b) => a.costPerUnit - b.costPerUnit);

  return calculated.map((item, index) => ({
    ...item,
    rank: index + 1,
    isBest: index === 0,
  }));
}

module.exports = { calculateBestValue };
