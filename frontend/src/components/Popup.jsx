import "../css/Popup.css";

export default function Popup({ message, type = "info", onClose }) {
  return (
    <div className={`popup popup-${type}`}>
      <span className="popup-message">{message}</span>

      <button className="popup-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}