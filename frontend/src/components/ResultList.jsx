import { COPY } from "../copy";

export default function ResultList({ results, lang }) {
  if (!results.length) return null;

  return (
    <div className="results-section">
      <h3 className="results-title">{COPY[lang].resultTitle}</h3>

      <div className="results-list">
        {results.map((r) => (
          <div
            key={r.name}
            className={`result-card ${r.isBest ? "best" : ""}`}
          >
            <div className="result-left">
              <span className="result-name">{r.name}</span>
              {r.isBest && (
                <span className="best-badge">
                  {COPY[lang].best}
                </span>
              )}
            </div>

            <div className="result-right">
              {r.costPerUnit.toFixed(2)} / {r.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
