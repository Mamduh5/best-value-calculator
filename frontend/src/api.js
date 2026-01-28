const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function calculate(options) {
  const res = await fetch(`${API_URL}/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ options }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.results;
}
