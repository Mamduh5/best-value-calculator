import { useState, useEffect } from "react";
import OptionForm from "./components/OptionForm";
import ResultList from "./components/ResultList";
import { calculate, warmUp } from "./api";
import { loadHistory, saveToHistory } from "./history";
import HistoryList from "./components/HistoryList";
import { calculateBestValue } from "./calculator/calculate";
import { COPY } from "./copy";
import PopupStack from "./components/PopupStack"
import "./App.css";

const LANG = "th"; // default for wife

export default function App() {
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState(loadHistory());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [popups, setPopups] = useState([]);

  const addPopup = (message, type = "info") => {
    const id = crypto.randomUUID();

    setPopups((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 3000);
  };

  const removePopup = (id) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };


  const createEmptyOption = (overrides = {}) => ({
    name: overrides.name ?? COPY[LANG].option1,
    price: "",
    size: "",
    unit: overrides.unit ?? "g",
    promoType: overrides.promoType ?? "none",
  });

  const [options, setOptions] = useState(() => [
    createEmptyOption({ name: COPY[LANG].option1 }),
    createEmptyOption({ name: COPY[LANG].option2 }),
  ]);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    globalThis.addEventListener("online", onOnline);
    globalThis.addEventListener("offline", onOffline);

    return () => {
      globalThis.removeEventListener("online", onOnline);
      globalThis.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    const hasWarmed = sessionStorage.getItem("apiWarmed");

    if (!hasWarmed && navigator.onLine) {
      warmUp();
      sessionStorage.setItem("apiWarmed", "true");
    }
  }, []);

  const loadFromHistory = (item) => {
    setOptions(item.options);
    setResults(item.results);
  };

  const addOption = () => {
    const last = options.at(-1);

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
        `${COPY[LANG].calculate} ${i + 1}`,
    }));

  const calculateBest = async () => {

    if (options.length < 2) {
      addPopup("ต้องมีอย่างน้อย 2 ตัวเลือก", "error");
      return;
    }

    for (let i = 0; i < options.length; i++) {
    const opt = options[i];

    if (!opt.price) {
      addPopup("กรอกราคาให้ครบ", "error");

      const el = document.querySelectorAll(".price-input")[i];
      el?.focus();

      return;
    }

    if (!opt.size) {
      addPopup("กรอกขนาดให้ครบ", "error");

      const el = document.querySelectorAll(".input-group input")[i * 2 + 1];
      el?.focus();

      return;
    }
  }

    const normalizedOptions = options.map(o => ({
      ...o,
      price: Number(o.price),
      size: Number(o.size),
    }));

    let res;

    if (isOnline) {
      res = await calculate(normalizedOptions);
    } else {
      res = calculateBestValue(normalizedOptions);
    }

    setResults(res);
    addPopup("คำนวณสำเร็จ!", "success");

    const item = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      options: withFallbackNames(options),
      results: res,
    };

    const updatedHistory = saveToHistory(item);
    setHistory(updatedHistory);
  };

  // const canCalculate =
  //   options.length >= 2 &&
  //   options.every(
  //     (o) => Number(o.price) > 0 && Number(o.size) > 0
  //   );

  return (
    <div className="app-container">

      <PopupStack popups={popups} removePopup={removePopup} />

      <header className="app-header">
        <h2 className="title">{COPY[LANG].title}</h2>
        <p className="subtitle">{COPY[LANG].subtitle}</p>
      </header>

      <div className="surface">
        <section className="options-section">
          {options.map((opt, i) => (
            <OptionForm
              key={i}
              option={opt}
              isLast={i === options.length - 1}
              lang={LANG}
              onChange={(updated) => updateOption(i, updated)}
            />
          ))}

          <div className="option-actions">
            <button className="btn btn-primary" onClick={addOption}>{COPY[LANG].addOption}</button>
            {options.length > 1 && (
              <button
                className="btn btn-primary-clear"
                onClick={() => {
                  setOptions([createEmptyOption({ name: COPY[LANG].option1 }), createEmptyOption({ name: COPY[LANG].option2 })]);
                  setResults([]);
                }}
              >
                {COPY[LANG].clear}
              </button>
            )}
          </div>
        </section>


        {options.length >= 2 && (
          <section className="action-section">
            <button
              onClick={calculateBest}
              // disabled={!canCalculate}
              className="btn btn-primary"
            >
              {isOnline ? `${COPY[LANG].calculate}` : "Calculate (Offline)"}
            </button>
          </section>
        )}


        <ResultList results={results} lang={LANG} />
        <HistoryList history={history} lang={LANG} onSelect={loadFromHistory} />
      </div>
    </div>
  );
}
