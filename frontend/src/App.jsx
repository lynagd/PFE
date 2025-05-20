import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PharmacyDashboard from "./components/PharmacyDashboard.jsx";
import PharmacyProfile from "./components/PharmacyProfile.jsx";
import NearbyPharmacies from "./components/NearbyPharmacies.jsx";
import DoctorPage from "./components/DoctorPage.jsx";
import PatientPrescriptions from "./components/PatientPrescriptions.jsx";

function App() {
  const [patients, setPatients] = useState([
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
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
        <Route
          path="/pharmacy-profile"
          element={<PharmacyProfile pharmacie={{
            nom_pharmacie: "Pharmacie Centrale",
            nom_proprietaire: "Dr. Benali",
            localisation: "123 Rue Principale, Alger",
            heure_ouverture: "08:00",
            heure_fermeture: "20:00",
            personne: { num_tel: "0555 55 55 55" },
            offre_livraison: true,
            latitude: 36.752887,
            longitude: 3.042048
          }} />}
        />
        <Route path="/nearby-pharmacies" element={<NearbyPharmacies />} />
        <Route path="/doctor" element={<DoctorPage patients={patients} setPatients={setPatients} />} />
        <Route path="/doctor/patient/:id/prescriptions" element={<PatientPrescriptions patients={patients} />} />
      </Routes>
    </Router>
  );
}

export default App;

