import { COPY } from "../copy";

export default function HistoryList({ history, onSelect, lang }) {
  if (!history.length) return null;

  return (
    <div className="history-section">
      <h3 className="history-title">{COPY[lang].history}</h3>

      <div className="history-list">
        {history.map((item) => {
          const bestOption = item.results?.[0];
          
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="history-item"
            >
              <div className="history-left">
                <span className="history-name">
                  🥇 {bestOption?.name}
                </span>
                <span className="history-time">
                  {timeAgo(item.createdAt)}
                </span>
              </div>

              <span className="history-arrow">→</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
