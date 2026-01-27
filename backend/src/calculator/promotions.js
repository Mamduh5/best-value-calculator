function applyPromotion(option) {
  const { price, size, promoType, promoValue, promoExtra } = option;

  switch (promoType) {
    case "buyXgetY": {
      const buyX = promoValue;
      const getY = promoExtra;

      if (!buyX || !getY) {
        throw new Error("buyXgetY requires promoValue (buyX) and promoExtra (getY)");
      }

      return {
        effectivePrice: price * buyX,
        effectiveQuantity: size * (buyX + getY),
      };
    }

    case "discount": {
      const discountPercent = promoValue;

      if (discountPercent < 0 || discountPercent > 100) {
        throw new Error("discount must be between 0 and 100");
      }

      return {
        effectivePrice: price * (1 - discountPercent / 100),
        effectiveQuantity: size,
      };
    }

    case "extra": {
      const extraPercent = promoValue;

      if (extraPercent < 0) {
        throw new Error("extra percent must be >= 0");
      }

      return {
        effectivePrice: price,
        effectiveQuantity: size * (1 + extraPercent / 100),
      };
    }

    case "none":
    default:
      return {
        effectivePrice: price,
        effectiveQuantity: size,
      };
  }
}

module.exports = { applyPromotion };
