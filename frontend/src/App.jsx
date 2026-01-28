import { useState, useEffect } from "react";
import OptionForm from "./components/OptionForm";
import ResultList from "./components/ResultList";
import { calculate } from "./api";
import { loadHistory, saveToHistory } from "./history";
import HistoryList from "./components/HistoryList";

export default function App() {
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState(loadHistory());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
    if (!isOnline) {
      alert("You are offline. New calculations require internet.");
      return;
    }

    const res = await calculate(options);
    setResults(res);

    const item = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      options,
      results: res,
    };

    const updatedHistory = saveToHistory(item);
    setHistory(updatedHistory);
  };


  const canCalculate =
    options.length > 0 &&
    options.every(
      (o) => o.price > 0 && o.size > 0 && o.name.trim() !== ""
    );



  return (
    <div style={{ padding: 16, maxWidth: 600, margin: "auto" }}>
      <h2>Best Value Calculator</h2>

      {!isOnline && (
        <div
          style={{
            background: "#fef3c7",
            color: "#92400e",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "12px",
            fontSize: "14px",
          }}
        >
          You are offline. Viewing saved results only.
        </div>
      )}

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
        disabled={!canCalculate || !isOnline}
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
        {isOnline ? "Calculate" : "Offline"}
      </button>




      <ResultList results={results} />
      <HistoryList
        history={history}
        onSelect={loadFromHistory}
      />
    </div>
  );
}
