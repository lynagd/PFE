import React from "react";
import LivreurHeader from "../components/livreur/LivreurHeader";
import LivreurProfile from "../components/livreur/LivreurProfile";

const livreurProfile = {
  id: "LIV001",
  nom: "Ali",
  prenom: "Benali",
  sexe: "Masculin",
  dateNaissance: "1990-04-15",
  wilaya: "Alger",
  commune: "Bab El Oued",
  email: "ali.livreur@mail.com",
  telephone: "+213 555 123 456",
  adresse: "45, Rue des Palmiers, Alger",
};

const LivreurProfilePage = () => (
  <div className="flex flex-col min-h-screen bg-lfond">
    <LivreurHeader profile={livreurProfile} />
    <main className="flex-1 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
      <LivreurProfile livreurProfile={livreurProfile} />
    </main>
  </div>
);

export default LivreurProfilePage;