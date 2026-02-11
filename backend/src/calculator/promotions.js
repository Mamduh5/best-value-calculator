function applyPromotion(option) {
  const { price, size, promoType, promoValue, promoExtra } = option;

  switch (promoType) {
    case "buyXgetY": {
      const buyX = promoValue;
      const getY = promoExtra;

      if (!buyX || !getY) {
        throw new AppError(
          "Require value x and y",
          400,
          "INVALID_INPUT"
        );
      }

      return {
        effectivePrice: price * buyX,
        effectiveQuantity: size * (buyX + getY),
      };
    }

    case "discount": {
      const discountPercent = promoValue;

      if (discountPercent < 0 || discountPercent > 100) {
        throw new AppError(
          "Discount must be between 1 - 100",
          400,
          "INVALID_DISCOUNT"
        );
      }

      return {
        effectivePrice: price * (1 - discountPercent / 100),
        effectiveQuantity: size,
      };
    }

    case "extra": {
      const extraPercent = promoValue;

      if (extraPercent < 0) {
        throw new AppError(
          "Extra percent must be more than 0",
          400,
          "INVALID_EXTRAPERCENT"
        );
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
