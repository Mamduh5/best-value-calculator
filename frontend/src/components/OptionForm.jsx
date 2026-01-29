export default function OptionForm({ option, onChange }) {
  const update = (field, value) => {
    onChange({ ...option, [field]: value });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
      <input
        style={{ padding: 8, marginBottom: 6 }}
        placeholder="Name"
        value={option.name}
        onChange={(e) => update("name", e.target.value)}
      />

      <input
        style={{ padding: 8, marginBottom: 6 }}
        type="text"
        inputMode="decimal"
        value={option.price}
        onChange={(e) => update("price", e.target.value)}
      />

      <input
        style={{ padding: 8, marginBottom: 6 }}
        type="text"
        inputMode="decimal"
        value={option.size}
        onChange={(e) => update("size", e.target.value)}
      />

      <select
        value={option.unit}
        onChange={(e) => update("unit", e.target.value)}
      >
        <option value="g">g</option>
        <option value="ml">ml</option>
        <option value="pcs">pcs</option>
      </select>

      <select
        value={option.promoType}
        onChange={(e) => update("promoType", e.target.value)}
      >
        <option value="none">No Promo</option>
        <option value="buyXgetY">Buy X Get Y</option>
        <option value="discount">% Discount</option>
        <option value="extra">Extra %</option>
      </select>

      {option.promoType === "buyXgetY" && (
        <>
          <input
            style={{ padding: 8, marginBottom: 6 }}
            type="number"
            placeholder="Buy X"
            onChange={(e) => update("promoValue", Number(e.target.value))}
          />
          <input
            style={{ padding: 8, marginBottom: 6 }}
            type="number"
            placeholder="Get Y"
            onChange={(e) => update("promoExtra", Number(e.target.value))}
          />
        </>
      )}

      {option.promoType === "discount" && (
        <input
          style={{ padding: 8, marginBottom: 6 }}
          type="number"
          placeholder="Discount %"
          onChange={(e) => update("promoValue", Number(e.target.value))}
        />
      )}

      {option.promoType === "extra" && (
        <input
          style={{ padding: 8, marginBottom: 6 }}
          type="number"
          placeholder="Extra %"
          onChange={(e) => update("promoValue", Number(e.target.value))}
        />
      )}
    </div>
  );
}
