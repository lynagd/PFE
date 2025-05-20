import React, { useState } from "react";
import { FaUserMd, FaUser, FaCalendarAlt, FaVenusMars, FaPills, FaPlus, FaSignOutAlt, FaUserCog, FaClipboardList, FaTimes, FaTrash, FaUserClock } from "react-icons/fa";
import Barcode from "react-barcode";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorPage.css";

const initialPatients = [
  {
    id: 1,
    nom: "Alice",
    prenom: "Dupont",
    dateNaissance: "1990-05-12",
    sexe: "Femme",
    prescriptions: [
      {
        id: 1,
        date: "2024-05-10",
        medicaments: [
          { nom: "Paracétamol 500mg", posologie: "3x/jour", duree: "5 jours", notes: "" },
          { nom: "Ibuprofène 200mg", posologie: "2x/jour", duree: "3 jours", notes: "Après repas" },
        ],
      },
    ],
  },
  {
    id: 2,
    nom: "Jean-Pierre",
    prenom: "Martin",
    dateNaissance: "1985-11-03",
    sexe: "Homme",
    prescriptions: [
      {
        id: 1,
        date: "2024-05-01",
        medicaments: [
          { nom: "Amoxicilline 1g", posologie: "2x/jour", duree: "7 jours", notes: "" },
        ],
      },
    ],
  },
  {
    id: 3,
    nom: "Sophie",
    prenom: "Bernard",
    dateNaissance: "2000-07-19",
    sexe: "Femme",
    prescriptions: [],
  },
];

const emptyMedicament = { nom: "", posologie: "", duree: "", notes: "" };

const doctor = {
  nom: "Exemple",
  prenom: "Docteur",
  specialite: "Médecin Généraliste",
  tel: "0555 55 55 55",
  adresse: "123 Rue Principale, Alger"
};

const DoctorPage = ({ patients, setPatients }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalPatientId, setModalPatientId] = useState(null);
  const [medicaments, setMedicaments] = useState([{ ...emptyMedicament }]);
  const [activeMenu, setActiveMenu] = useState("patients");

  const openModal = (patientId) => {
    setModalPatientId(patientId);
    setMedicaments([{ ...emptyMedicament }]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalPatientId(null);
    setMedicaments([{ ...emptyMedicament }]);
  };

  const handleMedicamentChange = (idx, e) => {
    const { name, value } = e.target;
    setMedicaments((prev) =>
      prev.map((med, i) => (i === idx ? { ...med, [name]: value } : med))
    );
  };

  const addMedicamentField = () => {
    setMedicaments((prev) => [...prev, { ...emptyMedicament }]);
  };

  const removeMedicamentField = (idx) => {
    setMedicaments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // At least one valid medicament
    const validMeds = medicaments.filter((m) => m.nom && m.posologie);
    if (validMeds.length === 0) return;
    setPatients((prev) =>
      prev.map((p) =>
        p.id === modalPatientId
          ? {
              ...p,
              prescriptions: [
                {
                  id: Date.now(),
                  date: new Date().toISOString().slice(0, 10),
                  medicaments: validMeds,
                },
                ...p.prescriptions,
              ],
            }
          : p
      )
    );
    closeModal();
  };

  const getAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Helper to sort prescriptions by date (descending)
  const sortPrescriptionsByDate = (prescriptions) =>
    [...prescriptions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="doctor-dashboard-bg">
      <aside className="doctor-sidebar">
        <div className="sidebar-header">
          <FaUserMd className="sidebar-avatar" />
          <div>
            <div className="sidebar-name">Dr. Exemple</div>
            <div className="sidebar-role">Médecin Généraliste</div>
          </div>
        </div>
        <nav className="sidebar-menu">
          <button className={activeMenu === "patients" ? "active" : ""} onClick={() => setActiveMenu("patients")}>
            <FaClipboardList /> Mes Patients
          </button>
          <button className={activeMenu === "profile" ? "active" : ""} onClick={() => setActiveMenu("profile")}>
            <FaUserCog /> Mon Profil
          </button>
          <button className="logout-btn">
            <FaSignOutAlt /> Déconnexion
          </button>
        </nav>
      </aside>
      <main className="doctor-main">
        <header className="doctor-header">
          <h1>
            <FaClipboardList /> Liste des Patients
          </h1>
        </header>
        <section className="patients-list-section">
          {patients.map((patient) => (
            <div className="patient-card" key={patient.id}>
              <div className="patient-info">
                <div className="patient-row">
                  <FaUser className="patient-icon" />
                  <span className="patient-name">
                    {patient.nom} {patient.prenom}
                  </span>
                </div>
                <div className="patient-row">
                  <FaCalendarAlt className="patient-icon" />
                  <span>Date de naissance : {patient.dateNaissance}</span>
                </div>
                <div className="patient-row">
                  <FaVenusMars className="patient-icon" />
                  <span>Sexe : {patient.sexe}</span>
                </div>
                <div className="patient-row">
                  <FaUserClock className="patient-icon" />
                  <span>Âge : {getAge(patient.dateNaissance)} ans</span>
                </div>
                <button
                  className="expand-btn"
                  onClick={() => navigate(`/doctor/patient/${patient.id}/prescriptions`)}
                >
                  Voir les prescriptions
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal} title="Annuler">
              <FaTimes />
            </button>
            <h2>Nouvelle ordonnance</h2>
            <form onSubmit={handleFormSubmit} className="prescription-form">
              {medicaments.map((med, idx) => (
                <div key={idx} className="medicament-fields" style={{ position: "relative", marginBottom: 16 }}>
                  <label>
                    Médicament<span>*</span>
                    <input
                      type="text"
                      name="nom"
                      value={med.nom}
                      onChange={(e) => handleMedicamentChange(idx, e)}
                      required
                    />
                  </label>
                  <label>
                    Posologie<span>*</span>
                    <input
                      type="text"
                      name="posologie"
                      value={med.posologie}
                      onChange={(e) => handleMedicamentChange(idx, e)}
                      required
                    />
                  </label>
                  <label>
                    Durée
                    <input
                      type="text"
                      name="duree"
                      value={med.duree}
                      onChange={(e) => handleMedicamentChange(idx, e)}
                      placeholder="ex: 7 jours"
                    />
                  </label>
                  <label>
                    Notes
                    <textarea
                      name="notes"
                      value={med.notes}
                      onChange={(e) => handleMedicamentChange(idx, e)}
                      rows={1}
                    />
                  </label>
                  {medicaments.length > 1 && (
                    <button
                      type="button"
                      className="remove-med-btn"
                      onClick={() => removeMedicamentField(idx)}
                      title="Supprimer ce médicament"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-btn" style={{ marginBottom: 12 }} onClick={addMedicamentField}>
                <FaPlus /> Ajouter un médicament
              </button>
              <button type="submit" className="add-btn" style={{ width: "100%" }}>
                <FaPlus /> Ajouter l'ordonnance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
