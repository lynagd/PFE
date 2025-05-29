import React from "react";
import LivreurSidebar from "../components/livreur/LivreurHeader";
import LivreurPharmacies from "../components/livreur/LivreurPharmacies";

const pharmaciesList = [
  {
    nom: "Pharmacie Central",
    adresse: "12, Rue des Lilas, Alger",
    telephone: "+213 555 987 654",
    email: "central@pharma.com",
  },
  {
    nom: "Pharmacie du Centre",
    adresse: "5, Avenue Pasteur, Alger",
    telephone: "+213 555 222 111",
    email: "centre@pharma.com",
  },
];

const LivreurPharmaciesPage = () => (
  <div className="flex min-h-screen bg-lfond">
    <LivreurSidebar active="pharmacies" />
    <main className="flex-1 ml-60 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
      <LivreurPharmacies pharmaciesList={pharmaciesList} />
    </main>
  </div>
);

export default LivreurPharmaciesPage;