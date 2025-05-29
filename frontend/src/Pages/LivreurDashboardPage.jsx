import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Truck, Home } from "lucide-react";
import LivreurProfile from "../components/LivreurProfile";
import LivreurPharmacies from "../components/LivreurPharmacies";
import LivreurCommandes from "../components/LivreurCommandes";

// Mock data
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

const sidebarItems = [
  { id: "profile", label: "Mon profil", icon: User },
  { id: "pharmacies", label: "Pharmacies", icon: Home },
  { id: "commandes", label: "Livraisons", icon: Truck },
];

const LivreurDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read section from URL, default to 'profile'
  const params = new URLSearchParams(location.search);
  const section = params.get("section") || "profile";

  const [commandes, setCommandes] = useState(commandesData);

  // Filter commandes to only show those assigned to the logged-in livreur
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

  // Navigation handler for sidebar
  const handleSidebarClick = (id) => {
    navigate(`?section=${id}`);
  };

  // Render content based on section
  const renderContent = () => {
    switch (section) {
      case "profile":
        return <LivreurProfile livreurProfile={livreurProfile} />;
      case "pharmacies":
        return <LivreurPharmacies pharmaciesList={pharmaciesList} />;
      case "commandes":
        return (
          <LivreurCommandes
            myCommandes={myCommandes}
            handleStatusClick={handleStatusClick}
          />
        );
      default:
        return <LivreurProfile livreurProfile={livreurProfile} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-lfond">
      <aside className="fixed top-0 left-0 h-full w-60 bg-khder text-white flex flex-col items-center z-50 shadow-lg">
        <div className="flex items-center gap-3 mt-8 mb-10 tracking-wide text-xl font-bold">
          <Truck size={28} className="text-white" />
          <span>
            {livreurProfile.nom} {livreurProfile.prenom}
          </span>
        </div>
        <nav className="flex flex-col w-full gap-0 mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`flex items-center gap-3 px-6 py-3 w-full text-base font-medium transition border-l-4 ${
                  section === item.id
                    ? "bg-[#355c3a] text-white border-l-tchini"
                    : "text-[#e6f2e9] border-l-transparent hover:bg-[#355c3a]"
                }`}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 ml-60 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default LivreurDashboardPage;