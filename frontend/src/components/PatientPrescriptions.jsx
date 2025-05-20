import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import "../styles/DoctorPage.css";

const doctor = {
  nom: "Dr. Exemple Docteur",
  specialite: "Médecin Généraliste",
  tel: "0555 55 55 55",
  adresse: "123 Rue Principale, Alger"
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

export default function PatientPrescriptions({ patients }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [prescriptionsState, setPrescriptionsState] = useState(() => {
    const patient = patients.find((p) => p.id === Number(id));
    return patient ? [...patient.prescriptions].sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
  });

  const patient = patients.find((p) => p.id === Number(id));
  if (!patient) return <div>Patient introuvable.</div>;

  // Form state for new prescription
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    medicaments: [{ nom: "", posologie: "", duree: "", notes: "" }]
  });

  // Handle form changes
  const handleMedChange = (idx, field, value) => {
    setForm((prev) => {
      const meds = [...prev.medicaments];
      meds[idx][field] = value;
      return { ...prev, medicaments: meds };
    });
  };

  const handleAddMed = () => {
    setForm((prev) => ({
      ...prev,
      medicaments: [...prev.medicaments, { nom: "", posologie: "", duree: "", notes: "" }]
    }));
  };

  const handleRemoveMed = (idx) => {
    setForm((prev) => ({
      ...prev,
      medicaments: prev.medicaments.filter((_, i) => i !== idx)
    }));
  };

  // Save new prescription
  const handleSave = () => {
    const newPresc = {
      id: Date.now(),
      date: form.date,
      medicaments: form.medicaments.filter(med => med.nom && med.posologie)
    };
    setPrescriptionsState((prev) => [newPresc, ...prev]);
    setShowForm(false);
    // Optionally update the patient in a parent/global state or backend here
  };

  return (
    <div
      className="doctor-dashboard-bg"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 0,
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Top text */}
      <div
        style={{
          color: "#3d5a40",
          fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
          fontWeight: 700,
          fontSize: "2.3rem",
          margin: "36px 0 36px 0",
          textAlign: "center",
          letterSpacing: "-1px",
        }}
      >
        Ordonnances de {patient.prenom} {patient.nom}
      </div>

      {/* Prescription Card or Form */}
      {showForm ? (
        <div
          className="patient-card"
          style={{
            background: "#fff",
            border: "1.5px solid #222",
            borderRadius: "12px",
            color: "#222",
            width: "100%",
            maxWidth: 540,
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
            boxShadow: "0 2px 12px #0001",
            padding: "32px 32px 24px 32px",
            margin: "0 0 0 0",
            minHeight: "unset",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 18,
          }}
        >
          {/* Header Row */}
          <div style={{
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 24,
  width: "100%"
}}>
  {/* Doctor info */}
  <div style={{
    width: 260, // Fixed width for alignment
    fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif"
  }}>
    <div style={{ fontWeight: 700, fontSize: "1.18rem", color: "#222" }}>
      Dr. Exemple Docteur
    </div>
    <div style={{ fontWeight: 400, fontSize: "1.05rem", color: "#222" }}>
      Médecin Généraliste
    </div>
    <div style={{ fontWeight: 400, fontSize: "1.05rem", color: "#222", marginTop: 2 }}>
      Téléphone: 06 99 99 99 99<br />
      13, Rue des Lilas 13000 Marseille
    </div>
  </div>
  {/* Patient info box */}
  <div
    style={{
      minWidth: 210,
      maxWidth: 260, // Match or slightly less than doctor info width
      border: "1.5px solid #888",
      borderRadius: 3,
      background: "#fff",
      padding: "6px 10px",
      fontSize: "0.98rem",
      marginLeft: 0,
      marginTop: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      boxSizing: "border-box"
    }}
  >
    <div>
      <span style={{ fontWeight: 700 }}>Nom:</span> {patient.nom}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Prénom:</span> {patient.prenom}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Date de naissance:</span> {patient.dateNaissance}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Âge:</span> {getAge(patient.dateNaissance)}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Sexe:</span> {patient.sexe}
    </div>
  </div>
</div>
          {/* Form for meds */}
          <div style={{ margin: "12px 0 0 0" }}>
            <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>
              Date:{" "}
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                style={{ fontFamily: "inherit", fontSize: "1rem", marginLeft: 8 }}
              />
            </label>
            <ul style={{ color: "#222", marginLeft: 0, paddingLeft: 0, listStyle: "none" }}>
              {form.medicaments.map((med, idx) => (
                <li key={idx} style={{ marginBottom: 12, fontSize: "1.13rem", display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={med.nom}
                    onChange={e => handleMedChange(idx, "nom", e.target.value)}
                    style={{ width: 110, fontSize: "1rem" }}
                  />
                  <input
                    type="text"
                    placeholder="Posologie"
                    value={med.posologie}
                    onChange={e => handleMedChange(idx, "posologie", e.target.value)}
                    style={{ width: 110, fontSize: "1rem" }}
                  />
                  <input
                    type="text"
                    placeholder="Durée"
                    value={med.duree}
                    onChange={e => handleMedChange(idx, "duree", e.target.value)}
                    style={{ width: 80, fontSize: "1rem" }}
                  />
                  <input
                    type="text"
                    placeholder="Notes"
                    value={med.notes}
                    onChange={e => handleMedChange(idx, "notes", e.target.value)}
                    style={{ width: 110, fontSize: "1rem" }}
                  />
                  {form.medicaments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMed(idx)}
                      style={{ marginLeft: 4, color: "#b00", background: "none", border: "none", cursor: "pointer" }}
                    >
                      ✕
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddMed}
              style={{
                background: "#e0e0e0",
                color: "#222",
                borderRadius: 6,
                border: "none",
                padding: "6px 16px",
                fontWeight: 600,
                fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              + Ajouter un médicament
            </button>
          </div>
          {/* Footer Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 18 }}>
            {/* Barcode bottom left */}
            <div style={{ alignSelf: "flex-end" }}>
              <Barcode
                value={"NOUVEAU"}
                width={1.2}
                height={40}
                fontSize={12}
                background="#fff"
                lineColor="#222"
                displayValue={false}
              />
            </div>
            {/* Date et signature bottom right */}
            <div style={{ fontSize: "1rem", color: "#b7b7b7", textAlign: "right", fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif" }}>
              Date: {form.date} &nbsp;&nbsp;&nbsp; Signature: <span style={{ borderBottom: "1.5px solid #888", width: 100, display: "inline-block", height: 18, verticalAlign: "middle" }}></span>
            </div>
          </div>
          {/* Save/Cancel buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
            <button
              style={{
                background: "#3d5a40",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 700,
                border: "none",
                padding: "12px 0",
                width: "100%",
                fontSize: "1.1rem",
                fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              Enregistrer
            </button>
            <button
              style={{
                background: "#888",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 700,
                border: "none",
                padding: "12px 0",
                width: "100%",
                fontSize: "1.1rem",
                fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
                cursor: "pointer",
              }}
              onClick={() => setShowForm(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        prescriptionsState.length === 0 ? (
          <div className="empty">Aucune ordonnance.</div>
        ) : (
          <div
            className="patient-card"
            style={{
              background: "#fff",
              border: "1.5px solid #222",
              borderRadius: "12px",
              color: "#222",
              width: "100%",
              maxWidth: 540,
              fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
              boxShadow: "0 2px 12px #0001",
              padding: "32px 32px 24px 32px",
              margin: "0 0 0 0",
              minHeight: "unset",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 18,
            }}
          >
            {/* Header Row */}
            <div style={{
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 24,
  width: "100%"
}}>
  {/* Doctor info */}
  <div style={{
    width: 260, // Fixed width for alignment
    fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif"
  }}>
    <div style={{ fontWeight: 700, fontSize: "1.18rem", color: "#222" }}>
      Dr. Exemple Docteur
    </div>
    <div style={{ fontWeight: 400, fontSize: "1.05rem", color: "#222" }}>
      Médecin Généraliste
    </div>
    <div style={{ fontWeight: 400, fontSize: "1.05rem", color: "#222", marginTop: 2 }}>
      N° Identifiant: 333555778<br />
      Téléphone: 06 99 99 99 99<br />
      13, Rue des Lilas 13000 Marseille
    </div>
  </div>
  {/* Patient info box (no label) */}
  <div
    style={{
      minWidth: 210,
      maxWidth: 260, // Match or slightly less than doctor info width
      border: "1.5px solid #888",
      borderRadius: 3,
      background: "#fff",
      padding: "6px 10px",
      fontSize: "0.98rem",
      marginLeft: 0,
      marginTop: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      boxSizing: "border-box"
    }}
  >
    <div>
      <span style={{ fontWeight: 700 }}>Nom:</span> {patient.nom}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Prénom:</span> {patient.prenom}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Date de naissance:</span> {patient.dateNaissance}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Âge:</span> {getAge(patient.dateNaissance)}
    </div>
    <div>
      <span style={{ fontWeight: 700 }}>Sexe:</span> {patient.sexe}
    </div>
  </div>
</div>
            {/* Meds */}
            <div style={{ margin: "12px 0 0 0" }}>
              <ul style={{ color: "#222", marginLeft: 0, paddingLeft: 22 }}>
                {prescriptionsState[0].medicaments.map((med, idx) => (
                  <li key={idx} style={{ marginBottom: 6, fontSize: "1.13rem" }}>
                    <strong style={{ fontWeight: 700 }}>{med.nom}</strong> — {med.posologie}
                    {med.duree && <> | <span>Durée: {med.duree}</span></>}
                    {med.notes && <> | <span>Notes: {med.notes}</span></>}
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer Row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 18 }}>
              {/* Barcode bottom left */}
              <div style={{ alignSelf: "flex-end" }}>
                <Barcode
                  value={prescriptionsState[0].id ? prescriptionsState[0].id.toString() : "1"}
                  width={1.2}
                  height={40}
                  fontSize={12}
                  background="#fff"
                  lineColor="#222"
                  displayValue={false}
                />
              </div>
              {/* Date et signature bottom right */}
              <div style={{ fontSize: "1rem", color: "#b7b7b7", textAlign: "right", fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif" }}>
                Date: {prescriptionsState[0].date} &nbsp;&nbsp;&nbsp; Signature: <span style={{ borderBottom: "1.5px solid #888", width: 100, display: "inline-block", height: 18, verticalAlign: "middle" }}></span>
              </div>
            </div>
          </div>
        )
      )}

      {/* Buttons under the card */}
      {!showForm && (
        <div
          style={{
            width: "100%",
            maxWidth: 540,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            margin: "18px 0 0 0",
          }}
        >
          <button
            style={{
              background: "#3d5a40",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 700,
              border: "none",
              padding: "14px 0",
              width: "100%",
              fontSize: "1.18rem",
              fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
              boxShadow: "0 2px 8px #3d5a4012",
              cursor: "pointer",
              transition: "background 0.18s",
            }}
            onClick={() => setShowForm(true)}
          >
            + Ajouter une ordonnance
          </button>
          <button
            style={{
              background: "#3d5a40",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 700,
              border: "none",
              padding: "14px 0",
              width: "100%",
              fontSize: "1.18rem",
              fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
              boxShadow: "0 2px 8px #3d5a4012",
              cursor: "pointer",
              transition: "background 0.18s",
            }}
            onClick={() => navigate(-1)}
          >
            Retour
          </button>
        </div>
      )}
    </div>
  );
}