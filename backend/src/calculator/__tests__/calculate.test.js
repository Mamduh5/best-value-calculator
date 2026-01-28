const { calculateBestValue } = require("../calculate");

describe("Best Value Calculator", () => {
  test("no promotion: compares cost per unit correctly", () => {
    const options = [
      {
        name: "Small",
        price: 20,
        size: 100,
        unit: "g",
        promoType: "none",
      },
      {
        name: "Large",
        price: 50,
        size: 400,
        unit: "g",
        promoType: "none",
      },
    ];

    const results = calculateBestValue(options);

    expect(results[0].name).toBe("Large");
    expect(results[0].isBest).toBe(true);
  });

  test("buy X get Y promotion works correctly", () => {
    const options = [
      {
        name: "Normal",
        price: 30,
        size: 200,
        unit: "g",
        promoType: "none",
      },
      {
        name: "Promo",
        price: 30,
        size: 200,
        unit: "g",
        promoType: "buyXgetY",
        promoValue: 1,
        promoExtra: 1,
      },
    ];

    const results = calculateBestValue(options);

    expect(results[0].name).toBe("Promo");
    expect(results[0].costPerUnit).toBeLessThan(results[1].costPerUnit);
  });

  test("percentage discount promotion works correctly", () => {
    const options = [
      {
        name: "No Discount",
        price: 100,
        size: 100,
        unit: "g",
        promoType: "none",
      },
      {
        name: "30% Off",
        price: 100,
        size: 100,
        unit: "g",
        promoType: "discount",
        promoValue: 30,
      },
    ];

    const results = calculateBestValue(options);

    expect(results[0].name).toBe("30% Off");
  });

  test("extra size promotion works correctly", () => {
    const options = [
      {
        name: "Normal",
        price: 50,
        size: 100,
        unit: "g",
        promoType: "none",
      },
      {
        name: "Extra 50%",
        price: 50,
        size: 100,
        unit: "g",
        promoType: "extra",
        promoValue: 50,
      },
    ];

    const results = calculateBestValue(options);

    expect(results[0].name).toBe("Extra 50%");
  });

  test("throws error on empty options", () => {
    expect(() => calculateBestValue([])).toThrow();
  });
});
