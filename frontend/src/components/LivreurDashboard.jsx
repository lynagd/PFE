import React, { useState } from "react";
import { User, Truck, Home } from "lucide-react"; // Replace UserRound with Truck

// Mock data
const livreurProfile = {
  nom: "Ali Benali",
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
      },
      {
        id: "CMD002",
        client: "Sara Bouzid",
        telephone: "+213 555 333 444",
        adresse: "45 Rue Didouche Mourad, Alger",
        date: "2024-05-21",
        status: "Livrée",
        total: "320 DA",
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
      },
    ],
  },
];

const sidebarItems = [
  { id: "profile", label: "Mon profil", icon: User },
  { id: "pharmacies", label: "Pharmacies", icon: Home },
  { id: "commandes", label: "Commandes", icon: Truck },
];

const statusColor = (status) => {
  if (status === "En cours" || status === "Acceptée")
    // Acceptée: pale yellow background, dark yellow text, bold (like screenshot)
    return "bg-[#fff7d6] text-[#8d7b2a] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
  if (status === "Livrée")
    // Livrée: slightly darker blue background, green text, bold
    return "bg-[#dbeaf3] text-[#3d5a40] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
  if (status === "Non livrée" || status === "En attente")
    return "bg-[#f4f4f4] text-[#444] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
  return "bg-gray-300 text-[#222] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
};

const LivreurDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [commandes, setCommandes] = useState(commandesData);

  // Profile section (read-only)
  const renderProfile = () => (
    <div className="bg-lfond rounded-2xl shadow-none px-8 py-8 w-full max-w-xl flex flex-col items-stretch mt-10">
      <h2 className="text-xl font-bold text-khder mb-6">profil</h2>
      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Nom complet</label>
            <input type="text" value={livreurProfile.nom} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Email</label>
            <input type="email" value={livreurProfile.email} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Téléphone</label>
            <input type="text" value={livreurProfile.telephone} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Adresse</label>
            <input type="text" value={livreurProfile.adresse} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
      </form>
    </div>
  );

  // Pharmacies section
  const renderPharmacies = () => (
    <div className="bg-lfond rounded-2xl shadow-none px-8 py-8 w-full max-w-xl flex flex-col items-stretch mt-10">
      <h2 className="text-xl font-bold text-khder mb-6">Pharmacies</h2>
      <div className="flex flex-col gap-4">
        {pharmaciesList.map((ph, idx) => (
          <div
            key={idx}
            className="bg-smth rounded-lg shadow p-5 w-full flex flex-col mb-2"
          >
            <div>
              <b>{ph.nom}</b>
              <div className="text-[0.98rem]">📍 {ph.adresse}</div>
              <div className="text-[0.98rem]">📞 {ph.telephone} | ✉️ {ph.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Commandes section (table)
  const renderCommandes = () => (
    <div className="w-full flex flex-col gap-8 mt-10">
      {commandes.map((pharmacy, idx) => (
        <div
          key={idx}
          className="bg-lfond rounded-[32px] shadow-none px-8 py-8 w-full max-w-3xl flex flex-col items-stretch"
        >
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-khder text-left mb-2 font-sans">
              {pharmacy.pharmacyName}
            </h2>
            <div className="text-khder text-lg text-left mb-4 font-sans">
              {pharmacy.pharmacyAddress}
            </div>
          </div>
          <div>
            {pharmacy.commandes.length === 0 ? (
              <div className="text-gray-400 italic py-6">
                Aucune commande assignée.
              </div>
            ) : (
              <div>
                <table className="min-w-full border-separate border-spacing-0 font-sans">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Commande
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Client
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Téléphone
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Adresse
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Date
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Total
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pharmacy.commandes.map((cmd, i) => (
                      <tr
                        key={cmd.id}
                        className={i % 2 === 1 ? "bg-smth" : ""}
                      >
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.id}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top whitespace-pre-line font-sans">
                          {cmd.client}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.telephone}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top whitespace-pre-line font-sans">
                          {cmd.adresse}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.date}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.total}
                        </td>
                        <td className="py-4 px-4 align-top font-sans">
                          {cmd.status === "En cours" ? (
                            <span
                              className={statusColor("Acceptée")}
                              style={{
                                minWidth: "110px",
                                minHeight: "56px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                border: "none",
                              }}
                              title="Cliquer pour marquer comme Livrée"
                              onClick={() => handleStatusClick(idx, i)}
                            >
                              Acceptée
                            </span>
                          ) : (
                            <span
                              className={statusColor(cmd.status)}
                              style={{
                                minWidth: "110px",
                                minHeight: "56px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                border: "none",
                              }}
                            >
                              {cmd.status === "Livrée" ? "Livrée" : cmd.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const handleStatusClick = (pharmacyIdx, cmdIdx) => {
    setCommandes(prev =>
      prev.map((ph, pIdx) =>
        pIdx !== pharmacyIdx
          ? ph
          : {
              ...ph,
              commandes: ph.commandes.map((cmd, cIdx) =>
                cIdx !== cmdIdx
                  ? cmd
                  : cmd.status === "En cours"
                    ? { ...cmd, status: "Livrée" }
                    : cmd
              ),
            }
      )
    );
  };

  // Section switch
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfile();
      case "pharmacies":
        return renderPharmacies();
      case "commandes":
        return renderCommandes();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="flex min-h-screen bg-lfond">
      <aside className="fixed top-0 left-0 h-full w-60 bg-khder text-white flex flex-col items-center z-50 shadow-lg">
        <div className="flex items-center gap-3 mt-8 mb-10 tracking-wide text-xl font-bold">
          <Truck size={28} className="text-white" />
          <span>{livreurProfile.nom}</span>
        </div>
        <nav className="flex flex-col w-full gap-0 mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 px-6 py-3 w-full text-base font-medium transition border-l-4 ${
                  activeSection === item.id
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

export default LivreurDashboard;