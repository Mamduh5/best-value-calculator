import "../css/Popup.css";
import Popup from "./Popup";

export default function PopupStack({ popups, removePopup }) {
  return (
    <div className="popup-stack">
      {popups.map((p) => (
        <Popup
          key={p.id}
          message={p.message}
          type={p.type}
          onClose={() => removePopup(p.id)}
        />
      ))}
    </div>
  );
}