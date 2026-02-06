import { COPY } from "../copy";

export default function ResultList({ results }) {
    if (!results.length) return null;

    return (
        <div>
            <h3>{COPY[lang].resultTitle}</h3>
            <ul>
                {results.map((r) => (
                    <li
                        key={r.name}
                        style={{
                            fontWeight: r.isBest ? "bold" : "normal",
                            color: r.isBest ? "green" : "black",
                        }}

                    >
                        {r.isBest && (
                            <span
                                style={{
                                    marginLeft: 8,
                                    padding: "2px 6px",
                                    background: "#16a34a",
                                    color: "white",
                                    borderRadius: 4,
                                    fontSize: 12,
                                }}
                            >
                                {COPY[lang].best}
                            </span>
                        )}
                        {"  "}
                        {r.name} – {r.costPerUnit.toFixed(4)} / {r.unit}
                    </li>
                ))}
            </ul>
        </div>
    );
}
