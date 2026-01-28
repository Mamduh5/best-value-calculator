import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// ✅ register service worker OUTSIDE React
registerSW({
  onNeedRefresh() {},
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});
