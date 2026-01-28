export default function HistoryList({ history, onSelect }) {
  if (!history.length) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Recent</h3>

      {history.map(item => {
        const best = item.results.find(r => r.isBest);

        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            style={{
              padding: 8,
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            <strong>{best?.name}</strong>{" "}
            <span style={{ fontSize: 12, color: "#666" }}>
              ({timeAgo(item.createdAt)})
            </span>
          </div>
        );
      })}
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
