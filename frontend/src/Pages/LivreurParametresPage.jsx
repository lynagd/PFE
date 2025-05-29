import React from "react";
import LivreurHeader from "../components/livreur/LivreurHeader";
import LivreurParametres from "../components/livreur/LivreurParametres";

const livreurProfile = {
  nom: "Ali",
  prenom: "Benali",
};

const LivreurParametresPage = () => (
  <div className="flex flex-col min-h-screen bg-lfond">
    <LivreurHeader profile={livreurProfile} />
    <main className="flex-1 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
      <LivreurParametres />
    </main>
  </div>
);

export default LivreurParametresPage;