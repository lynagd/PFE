import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

// Sample commandes with ordonnance details
const sampleCommandes = [
  {
    id: 1,
    client: {
      nom: "Ahmed Benali",
      adresse: "Rue des Fleurs 5, Alger",
      telephone: "+213 555 123 456",
    },
    date: "2024-05-18",
    total: 850,
    etat: "non livré", // <-- add initial state
    ordonnance: [
      { nom: "Amoxicilline 500mg", quantite: 2 },
      { nom: "Doliprane 1000mg", quantite: 1 },
    ],
  },
  {
    id: 2,
    client: {
      nom: "Nadia Abdat",
      adresse: "Rue de la Liberté 10, Alger",
      telephone: "+213 555 333 444",
    },
    date: "2024-05-19",
    total: 320,
    etat: "non livré", // <-- add initial state
    ordonnance: [
      { nom: "Ibuprofène 400mg", quantite: 2 },
    ],
  },
];

// Sample livreurs (copy from PharmacyLivreurs.jsx)
const sampleLivreurs = [
  { id: 1, nom: "Ali", prenom: "Benali", telephone: "+213 555 123 456", email: "ali.livreur@mail.com", disponibilite: "Disponible" },
  { id: 2, nom: "Sara", prenom: "Boukhalfa", telephone: "+213 555 654 321", email: "sara.livreur@mail.com", disponibilite: "Non-disponible" },
];

const disponibiliteColor = (dispo) => {
  if (dispo === "Disponible")
    return "font-bold rounded-xl px-6 py-3 text-base flex items-center justify-center";
  if (dispo === "Non-disponible")
    return "bg-yellow-100 text-yellow-900 font-bold rounded-xl px-6 py-3 text-base flex items-center justify-center";
  return "bg-gray-200 text-gray-700 font-bold rounded-xl px-6 py-3 text-base flex items-center justify-center";
};

const etatColor = (etat) => {
  if (etat === "non livré")
    return "bg-[#f4f4f4] text-[#444] font-bold rounded-lg px-6 py-1"; // greyish
  if (etat === "en cours")
    return "bg-[#fff7d6] text-[#b89c33] font-bold rounded-lg px-6 py-1"; // slightly yellowish
  if (etat === "livrée")
    return "bg-[#d7f5df] text-[#3d5a40] font-bold rounded-lg px-6 py-1"; // greenish
  return "";
};

const PharmacyCommandes = () => {
  const [selected, setSelected] = useState(null);
  const [showLivreurModal, setShowLivreurModal] = useState(false);
  const [selectedCommandeIdx, setSelectedCommandeIdx] = useState(null);
  const [assignedLivreur, setAssignedLivreur] = useState({});
  // Etat is now managed per commande, not as a separate array
  const [commandes, setCommandes] = useState(sampleCommandes);

  const handleAssocierClick = (idx) => {
    setSelectedCommandeIdx(idx);
    setShowLivreurModal(true);
  };

  const handleChooseLivreur = (livreur) => {
    setAssignedLivreur((prev) => ({
      ...prev,
      [commandes[selectedCommandeIdx].id]: livreur,
    }));
    // Update the commande with the assigned livreurId
    setCommandes((prev) =>
      prev.map((cmd, i) =>
        i === selectedCommandeIdx
          ? { ...cmd, livreurId: livreur.id }
          : cmd
      )
    );
    setShowLivreurModal(false);
    setSelectedCommandeIdx(null);
  };

  // Only allow changing from "non livré" to "en cours"
  const handleEtatChange = (idx) => {
    setCommandes((prev) =>
      prev.map((cmd, i) =>
        i === idx && cmd.etat === "non livré"
          ? { ...cmd, etat: "en cours" }
          : cmd
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-10">
      <h2 className="text-2xl font-semibold text-[#3d5a40] mb-8 text-left">
        Commandes
      </h2>
      <div>
        <table className="w-full rounded-xl overflow-hidden min-w-[1100px]">
          <thead>
            <tr className="bg-[#faf8f3] border-b border-[#e5e5e5]">
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Commande</th>
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Client</th>
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Téléphone</th>
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Adresse</th>
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Date</th>
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Total</th>
              <th className="py-3 px-10 text-left font-bold text-[#3d5a40] text-lg w-56">Etat</th>
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Actions</th>
              <th className="py-3 px-4 text-left font-bold text-[#3d5a40] text-lg">Livreur</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((cmd, idx) => (
              <tr key={cmd.id} className={idx % 2 === 1 ? "bg-[#f7f8f5]" : ""}>
                <td className="py-3 px-4 font-medium">
                  CMD{String(cmd.id).padStart(3, "0")}
                </td>
                <td className="py-3 px-4">{cmd.client.nom}</td>
                <td className="py-3 px-4">{cmd.client.telephone}</td>
                <td className="py-3 px-4 whitespace-pre-line">{cmd.client.adresse}</td>
                <td className="py-3 px-4">{cmd.date}</td>
                <td className="py-3 px-4">{cmd.total} DA</td>
                <td className="py-3 px-10 w-56">
                  <span
                    className={
                      etatColor(cmd.etat) +
                      " flex items-center justify-center"
                    }
                    style={{ cursor: cmd.etat === "non livré" ? "pointer" : "default" }}
                    onClick={() => {
                      if (cmd.etat === "non livré") handleEtatChange(idx);
                    }}
                  >
                    {cmd.etat === "en cours"
                      ? "Acceptée"
                      : cmd.etat.charAt(0).toUpperCase() + cmd.etat.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 w-40">
                  <div className="flex justify-center items-center h-full">
                    <button
                      className="bg-[#3d5a40] text-white font-bold rounded-lg px-4 py-2 shadow hover:bg-[#355c3a] transition"
                      onClick={() => setSelected(idx)}
                    >
                      Détails
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {assignedLivreur[cmd.id] ? (
                    <span className="inline-block bg-[#cce3d1] text-[#222] font-bold rounded-lg px-4 py-2">
                      {assignedLivreur[cmd.id].nom} {assignedLivreur[cmd.id].prenom}
                    </span>
                  ) : (
                    <button
                      className="bg-[#FFD600] text-[#222] font-bold rounded-lg px-4 py-2 shadow hover:bg-yellow-400 transition flex items-center gap-2"
                      onClick={() => handleAssocierClick(idx)}
                    >
                      <FaUserPlus /> Associer un livreur
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selected !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-[#3d5a40]">
              Détails de la commande
            </h3>
            <div className="mb-2">
              <b>Nom:</b> {sampleCommandes[selected].client.nom}
            </div>
            <div className="mb-2">
              <b>Téléphone:</b> {sampleCommandes[selected].client.telephone}
            </div>
            <div className="mb-2">
              <b>Adresse:</b> {sampleCommandes[selected].client.adresse}
            </div>
            <div className="mb-2">
              <b>Date:</b> {sampleCommandes[selected].date}
            </div>
            <div className="mb-2">
              <b>Total:</b> {sampleCommandes[selected].total} DA
            </div>
            <div className="mb-4">
              <b>Liste des produits:</b>
              <ul className="list-disc ml-6">
                {sampleCommandes[selected].ordonnance.map((med, i) => (
                  <li key={i}>
                    {med.nom}  | Quantité: {med.quantite}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setSelected(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Associer un livreur Modal */}
      {showLivreurModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
            <h3 className="text-xl font-bold mb-4 text-[#3d5a40]">Choisir un livreur</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 font-sans mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-3 text-khder font-bold text-base border-b-2 border-gray-200 bg-lfond text-left font-sans">Nom</th>
                    <th className="py-2 px-3 text-khder font-bold text-base border-b-2 border-gray-200 bg-lfond text-left font-sans">Prénom</th>
                    <th className="py-2 px-3 text-khder font-bold text-base border-b-2 border-gray-200 bg-lfond text-left font-sans">Téléphone</th>
                    <th className="py-2 px-3 text-khder font-bold text-base border-b-2 border-gray-200 bg-lfond text-left font-sans">Disponibilité</th>
                    <th className="py-2 px-3 text-khder font-bold text-base border-b-2 border-gray-200 bg-lfond text-left font-sans">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleLivreurs.map((livreur, i) => (
                    <tr key={livreur.id} className={i % 2 === 1 ? "bg-smth" : ""}>
                      <td className="py-2 px-3 text-[#222] align-top font-sans">{livreur.nom}</td>
                      <td className="py-2 px-3 text-[#222] align-top font-sans">{livreur.prenom}</td>
                      <td className="py-2 px-3 text-[#222] align-top font-sans whitespace-pre-line">{livreur.telephone}</td>
                      <td className="py-2 px-3 align-top font-sans">
                        <span
                          className={disponibiliteColor(livreur.disponibilite)}
                          style={
                            livreur.disponibilite === "Disponible"
                              ? { backgroundColor: "#cce3d1", color: "#222" }
                              : undefined
                          }
                        >
                          {livreur.disponibilite}
                        </span>
                      </td>
                      <td className="py-2 px-3 align-top font-sans">
                        {livreur.disponibilite === "Disponible" && (
                          <button
                            className="bg-[#FFD600] text-[#222] font-bold rounded px-3 py-1 shadow hover:bg-yellow-400 transition text-sm flex items-center gap-1 whitespace-nowrap"
                            onClick={() => handleChooseLivreur(livreur)}
                          >
                            Choisir
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-sm"
                onClick={() => setShowLivreurModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyCommandes;