import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PharmacyProfile from "./components/PharmacyProfile.jsx";
import NearbyPharmacies from "./components/NearbyPharmacies.jsx";
import DoctorMainPage from "./Pages/DoctorMainPage.jsx";
import PharmacyLivreurs from "./components/PharmacyLivreurs.jsx";
import PharmacyCommandes from "./components/PharmacyCommandes.jsx";
import PharmacyDashboard from "./components/PharmacyDashboard.jsx";
import ClientDashboardPage from "./Pages/ClientDashboardPage.jsx";
import LivreurMainPage from "./Pages/LivreurMainPage";


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
        <Route path="/nearby-pharmacies" element={<NearbyPharmacies />} />
        <Route path="/doctor/*" element={<DoctorMainPage />} />
        <Route path="/client-dashboard" element={<ClientDashboardPage />} />
        <Route path="/livreur/*" element={<LivreurMainPage />} />
        <Route path="/pharmacy-profile" element={<PharmacyProfile />} />
        <Route path="/pharmacy-livreurs" element={<PharmacyLivreurs />} />
        <Route path="/pharmacy-commandes" element={<PharmacyCommandes />} />
        <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
