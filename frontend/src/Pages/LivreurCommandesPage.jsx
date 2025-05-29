import React, { useState } from "react";
import LivreurHeader from "../components/livreur/LivreurHeader";
import LivreurCommandes from "../components/livreur/LivreurCommandes";

const livreurProfile = {
  id: "LIV001",
  nom: "Ali",
  prenom: "Benali",
};

const commandesData = [
  {
    pharmacyName: "Pharmacie Central",
    pharmacyAddress: "12, Rue des Lilas, Alger",
    commandes: [
      {
        id: "CMD001",
        client: "Ahmed Benali",
        telephone: "+213 555 111 222",
        adresse: "123 Rue des Martyrs, Bab Ezzouar, Alger",
        date: "2024-05-22",
        status: "En cours",
        total: "850 DA",
        livreurId: "LIV001",
      },
      {
        id: "CMD002",
        client: "Sara Bouzid",
        telephone: "+213 555 333 444",
        adresse: "45 Rue Didouche Mourad, Alger",
        date: "2024-05-21",
        status: "Livrée",
        total: "320 DA",
        livreurId: "LIV002",
      },
    ],
  },
  {
    pharmacyName: "Pharmacie du Centre",
    pharmacyAddress: "5, Avenue Pasteur, Alger",
    commandes: [
      {
        id: "CMD003",
        client: "Yacine Amrani",
        telephone: "+213 555 555 666",
        adresse: "67 Rue Hassiba Ben Bouali, Alger",
        date: "2024-05-20",
        status: "Non livrée",
        total: "410 DA",
        livreurId: "LIV001",
      },
    ],
  },
];

const LivreurCommandesPage = () => {
  const [commandes, setCommandes] = useState(commandesData);

  const myCommandes = commandes
    .map((pharmacy) => ({
      ...pharmacy,
      commandes: pharmacy.commandes.filter(
        (cmd) => cmd.livreurId === livreurProfile.id
      ),
    }))
    .filter((pharmacy) => pharmacy.commandes.length > 0);

  const handleStatusClick = (pharmacyIdx, cmdIdx) => {
    setCommandes((prev) =>
      prev.map((ph, pIdx) =>
        pIdx !== pharmacyIdx
          ? ph
          : {
              ...ph,
              commandes: ph.commandes.map((cmd, cIdx) =>
                cIdx !== cmdIdx
                  ? cmd
                  : (cmd.status === "En cours" || cmd.status === "Acceptée")
                  ? { ...cmd, status: "Livrée" }
                  : cmd
              ),
            }
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <LivreurHeader profile={livreurProfile} />
      <main className="flex-1 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
        <LivreurCommandes myCommandes={myCommandes} handleStatusClick={handleStatusClick} />
      </main>
    </div>
  );
};

export default LivreurCommandesPage;