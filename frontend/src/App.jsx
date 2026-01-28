import { useState } from "react";
import OptionForm from "./components/OptionForm";
import ResultList from "./components/ResultList";
import { calculate } from "./api";

export default function App() {
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);

  const addOption = () => {
    setOptions([
      ...options,
      {
        name: "",
        price: "",
        size: "",
        unit: "g",
        promoType: "none",
      },
    ]);
  };

  const updateOption = (index, updated) => {
    const copy = [...options];
    copy[index] = updated;
    setOptions(copy);
  };

  const calculateBest = async () => {
    const res = await calculate(options);
    setResults(res);
  };

  const canCalculate =
    options.length > 0 &&
    options.every(
      (o) => o.price > 0 && o.size > 0 && o.name.trim() !== ""
    );

  return (
    <div style={{ padding: 16, maxWidth: 600, margin: "auto" }}>
      <h2>Best Value Calculator</h2>

      {options.map((opt, i) => (
        <OptionForm
          key={i}
          option={opt}
          onChange={(updated) => updateOption(i, updated)}
        />
      ))}

      <button onClick={addOption}>+ Add Option</button>
            <button
        onClick={() => {
          setOptions([]);
          setResults([]);
        }}
        style={{ marginTop: 8 }}
      >
        Clear
      </button>
      <hr />

      <button
        onClick={calculateBest}
        disabled={!canCalculate}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "18px",
          marginTop: "8px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Calculate
      </button>




      <ResultList results={results} />
    </div>
  );
}
