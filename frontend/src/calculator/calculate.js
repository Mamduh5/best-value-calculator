function applyPromotion(option) {
  const { price, size, promoType, promoValue, promoExtra } = option;

  switch (promoType) {
    case "buyXgetY": {
      const buyX = promoValue;
      const getY = promoExtra;
      return {
        effectivePrice: price * buyX,
        effectiveQuantity: size * (buyX + getY),
      };
    }

    case "discount":
      return {
        effectivePrice: price * (1 - promoValue / 100),
        effectiveQuantity: size,
      };

    case "extra":
      return {
        effectivePrice: price,
        effectiveQuantity: size * (1 + promoValue / 100),
      };

    default:
      return {
        effectivePrice: price,
        effectiveQuantity: size,
      };
  }
}

export function calculateBestValue(options) {
  const calculated = options.map((option) => {
    const { effectivePrice, effectiveQuantity } =
      applyPromotion(option);

    return {
      ...option,
      costPerUnit: effectivePrice / effectiveQuantity,
    };
  });

  calculated.sort((a, b) => a.costPerUnit - b.costPerUnit);

  return calculated.map((item, index) => ({
    ...item,
    rank: index + 1,
    isBest: index === 0,
  }));
}
    