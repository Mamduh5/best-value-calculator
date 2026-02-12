import { useEffect, useRef } from "react";
import { COPY } from "../copy";

export default function OptionForm({ option, onChange, isLast, lang  }) {
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
  <div className="card option-card">

    <input
      className="input"
      placeholder="Name (optional)"
      value={option.name}
      onChange={(e) => update("name", e.target.value)}
    />

    <div className="input-group">
      <input
        ref={priceRef}
        className="input price-input"
        type="text"
        inputMode="decimal"
        placeholder={COPY[lang].price}
        value={option.price}
        onChange={(e) => update("price", e.target.value)}
      />

      <input
        className="input"
        type="text"
        inputMode="decimal"
        placeholder={`${COPY[lang].size} (${option.unit})`}
        value={option.size}
        onChange={(e) => update("size", e.target.value)}
      />
    </div>

    <div className="select-group">
      <select
        className="input"
        value={option.unit}
        onChange={(e) => update("unit", e.target.value)}
      >
        <option value="g">g</option>
        <option value="ml">ml</option>
        <option value="pcs">pcs</option>
      </select>

      <select
        className="input"
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
