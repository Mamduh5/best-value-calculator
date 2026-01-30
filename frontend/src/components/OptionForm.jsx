import { useEffect, useRef } from "react";

export default function OptionForm({ option, onChange, isLast }) {
  const priceRef = useRef(null);

  useEffect(() => {
    if (isLast && priceRef.current) {
      priceRef.current.focus();
    }
  }, [isLast]);

  const update = (field, value) => {
    onChange({ ...option, [field]: value });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
      <input
        style={{ padding: 8, marginBottom: 6 }}
        placeholder="Name (optional)"
        value={option.name}
        onChange={(e) => update("name", e.target.value)}
      />

      <input
        ref={priceRef}
        style={{ padding: 10, marginBottom: 6, fontSize: 18 }}
        type="text"
        inputMode="decimal"
        placeholder="Price"
        value={option.price}
        onChange={(e) => update("price", e.target.value)}
      />

      <input
        style={{ padding: 10, marginBottom: 6, fontSize: 16 }}
        type="text"
        inputMode="decimal"
        placeholder={`Size (${option.unit})`}
        value={option.size}
        onChange={(e) => update("size", e.target.value)}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
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
      </div>
    </div>
  );
}
