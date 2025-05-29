import React, { useState } from "react";
import DoctorHeader from "../components/doctor/DoctorHeader";
import DoctorProfile from "../components/doctor/DoctorProfile";

// Sample profile
const sampleProfile = {
  nom: "Yacine",
  prenom: "B.",
  email: "yacine.b@email.com",
  date_naissance: "1980-04-15",
  sexe: "Masculin",
  specialite: "Médecin Généraliste",
  wilaya: "Alger",
  commune: "El Madania",
  adresse: "12, Rue des Lilas, Alger",
  telephone: "+213 555 987 654",
  cachet: "/assets/doctor-cachet.png",
  signature: "/assets/doctor-signature.png",
  agrement: "/assets/doctor-agrement.pdf"
};

const DoctorProfilePage = () => {
  const [profile, setProfile] = useState(sampleProfile);

  return (
    <div className="min-h-screen bg-lfond">
      <DoctorHeader profile={profile} />
      <main className="max-w-6xl mx-auto pt-10 px-4">
        <DoctorProfile profile={profile} setProfile={setProfile} />
      </main>
    </div>
  );
};

export default DoctorProfilePage;