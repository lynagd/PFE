import React from "react";
import "../styles/PharmacyProfile.css";
import { FaUserMd, FaMapMarkerAlt, FaClock, FaPhoneAlt, FaTruck } from "react-icons/fa";

const PharmacyProfile = ({ pharmacie }) => {
  return (
    <div className="pharmacy-profile-bg">
      <div className="pharmacy-hero">
        <div className="pharmacy-hero-content">
          <h1>
            <span>Votre Pharmacie</span> <br />
            <span className="pharmacy-name">{pharmacie.nom_pharmacie}</span>
          </h1>
        </div>
      </div>

      <div className="pharmacy-profile-card">
        <h2>Informations de la pharmacie</h2>
        <div className="pharmacy-info-list">
          <div className="pharmacy-info-item">
            <FaUserMd className="pharmacy-icon" />
            <span>
              <strong>Propriétaire :</strong> {pharmacie.nom_proprietaire}
            </span>
          </div>
          <div className="pharmacy-info-item">
            <FaMapMarkerAlt className="pharmacy-icon" />
            <span>
              <strong>Adresse :</strong> {pharmacie.localisation}
            </span>
          </div>
          <div className="pharmacy-info-item">
            <FaClock className="pharmacy-icon" />
            <span>
              <strong>Horaires :</strong> {pharmacie.heure_ouverture} - {pharmacie.heure_fermeture}
            </span>
          </div>
          <div className="pharmacy-info-item">
            <FaPhoneAlt className="pharmacy-icon" />
            <span>
              <strong>Téléphone :</strong> {pharmacie.personne.num_tel}
            </span>
          </div>
          <div className="pharmacy-info-item">
            <FaTruck className="pharmacy-icon" />
            <span>
              <strong>Livraison :</strong> {pharmacie.offre_livraison ? "Oui" : "Non"}
            </span>
          </div>
        </div>
        <div className="pharmacy-back-link">
          <a href="/nearby-pharmacies">← Retour à la liste des pharmacies</a>
        </div>
      </div>
    </div>
  );
};

export default PharmacyProfile;