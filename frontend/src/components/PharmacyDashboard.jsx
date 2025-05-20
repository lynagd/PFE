import React, { useState } from "react";
import "../styles/PharmacyDashboard.css";

const PharmacyDashboard = ({ pharmacyName = "Ma Pharmacie", invitationLink = "https://..." }) => {
  const [messages, setMessages] = useState([]);
  const [link, setLink] = useState(invitationLink);

  const handleRegenerate = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call to regenerate the link
    setLink("https://nouveau-lien.com/invitation");
    setMessages([{ text: "Lien d'invitation régénéré avec succès", type: "success" }]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setMessages([{ text: "Lien copié dans le presse-papiers !", type: "success" }]);
    }).catch(() => {
      setMessages([{ text: "Erreur lors de la copie du lien.", type: "error" }]);
    });
  };

  return (
    <div className="pharmacy-dashboard-container">
      <h1>Tableau de bord de la pharmacie : <span>{pharmacyName}</span></h1>

      {messages.length > 0 && (
        <div className="messages">
          {messages.map((msg, idx) => (
            <p key={idx} className={msg.type}>{msg.text}</p>
          ))}
        </div>
      )}

      <div className="invitation-section">
        <label className="invitation-label" htmlFor="invitationLink">Inviter un livreur</label>
        <button className="btn btn-regenerate" onClick={handleRegenerate}>Régénérer</button>
        <input
          id="invitationLink"
          className="invitation-link"
          type="text"
          value={link}
          readOnly
          onFocus={e => e.target.select()}
        />
        <button className="btn btn-copy" onClick={handleCopy}>Copier</button>
      </div>
    </div>
  );
};

export default PharmacyDashboard;