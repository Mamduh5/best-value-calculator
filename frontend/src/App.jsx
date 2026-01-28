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

      <hr />

      <button onClick={calculateBest}>Calculate</button>

      <ResultList results={results} />
    </div>
  );
}
