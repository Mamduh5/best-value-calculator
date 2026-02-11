const API_URL =
  import.meta.env.VITE_API_URL || "https://best-value-api.onrender.com";

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

export async function warmUp() {
  try {
    await fetch(`${API_URL}/health`, {
      method: "GET",
    });
  } catch (err) {
    // silent fail — no need to crash UI
    console.warn("Health warm-up failed");
  }
}
