import { useState, useEffect } from "react";
import OptionForm from "./components/OptionForm";
import ResultList from "./components/ResultList";
import { calculate } from "./api";
import { loadHistory, saveToHistory } from "./history";
import HistoryList from "./components/HistoryList";
import { calculateBestValue } from "./calculator/calculate";

export default function App() {
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState(loadHistory());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const createEmptyOption = (overrides = {}) => ({
    name: "",
    price: "",
    size: "",
    unit: overrides.unit ?? "g",
    promoType: overrides.promoType ?? "none",
  });

  const [options, setOptions] = useState(() => [
    createEmptyOption(),
  ]);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const loadFromHistory = (item) => {
    setOptions(item.options);
    setResults(item.results);
  };

  const addOption = () => {
    const last = options[options.length - 1];

    setOptions([
      ...options,
      {
        name: `Option ${options.length + 1}`,
        price: "",
        size: "",
        unit: last.unit,
        promoType: last.promoType,
      },
    ]);
  };

  const updateOption = (index, updated) => {
    const copy = [...options];
    copy[index] = updated;
    setOptions(copy);
  };

  const withFallbackNames = (options) =>
    options.map((o, i) => ({
      ...o,
      name:
        o.name?.trim() ||
        `Option ${i + 1} — ${o.price}/${o.size}${o.unit}`,
    }));

  const calculateBest = async () => {

    const normalizedOptions = options.map(o => ({
      ...o,
      price: Number(o.price || 0),
      size: Number(o.size || 0),
    }));

    let res;

    if (isOnline) {
      // online → use backend
      res = await calculate(normalizedOptions);
    } else {
      // offline → calculate locally
      res = calculateBestValue(normalizedOptions);
    }

    setResults(res);

    const item = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      options: withFallbackNames(options),
      results: res,
    };

    const updatedHistory = saveToHistory(item);
    setHistory(updatedHistory);
  };

  const canCalculate =
    options.length >= 2 &&
    options.every(
      (o) => Number(o.price) > 0 && Number(o.size) > 0
    );

  return (
    <div style={{ padding: 16, maxWidth: 600, margin: "auto" }}>
      <h2>Best Value Calculator</h2>

      {options.map((opt, i) => (
        <OptionForm
          key={i}
          option={opt}
          isLast={i === options.length - 1}
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

      {options.length >= 2 && (
        <button
          onClick={calculateBest}
          disabled={!canCalculate}
          style={{
            opacity: isOnline ? 1 : 0.6,
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
          {isOnline ? "Calculate" : "Calculate (Offline)"}
        </button>
      )}

      <ResultList results={results} />
      <HistoryList
        history={history}
        onSelect={loadFromHistory}
      />
    </div>
  );
}
