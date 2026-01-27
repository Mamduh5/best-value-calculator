const { applyPromotion } = require("./promotions");

function calculateBestValue(options) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error("options must be a non-empty array");
  }

  const calculated = options.map((option) => {
    const { effectivePrice, effectiveQuantity } = applyPromotion(option);

    if (effectiveQuantity <= 0) {
      throw new Error("effective quantity must be greater than 0");
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
