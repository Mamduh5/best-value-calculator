export default function ResultList({ results }) {
  if (!results.length) return null;

  return (
    <div>
      <h3>Results</h3>
      <ul>
        {results.map((r) => (
          <li
            key={r.name}
            style={{
              fontWeight: r.isBest ? "bold" : "normal",
              color: r.isBest ? "green" : "black",
            }}
          >
            {r.name} – {r.costPerUnit.toFixed(4)} / {r.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}
