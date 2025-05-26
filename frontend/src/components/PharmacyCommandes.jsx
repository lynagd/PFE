import React, { useState } from "react";

// Sample commandes with ordonnance details
const sampleCommandes = [
  {
    id: 1,
    client: {
      nom: "Ahmed Benali",
      adresse: "Rue des Fleurs 5, Alger",
      telephone: "+213 555 123 456",
      email: "ahmed.benali@mail.com",
      age: 34,
    },
    date: "2024-05-18",
    ordonnance: [
      { nom: "Amoxicilline 500mg", quantite: 10, posologie: "3x/jour" },
      { nom: "Doliprane 1000mg", quantite: 6, posologie: "2x/jour" },
    ],
  },
  {
    id: 2,
    client: {
      nom: "Nadia K.",
      adresse: "Rue de la Liberté 10, Alger",
      telephone: "+213 555 333 444",
      email: "nadia.k@mail.com",
      age: 28,
    },
    date: "2024-05-19",
    ordonnance: [
      { nom: "Ibuprofène 400mg", quantite: 8, posologie: "2x/jour" },
    ],
  },
];

const PharmacyCommandes = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-[#3d5a40] mb-8 text-center">
        Commandes à traiter
      </h2>
      <div className="flex flex-col gap-5">
        {sampleCommandes.map((cmd, idx) => (
          <div
            key={cmd.id}
            className="flex justify-between items-center bg-[#f9f8f4] rounded-lg px-6 py-4 shadow-sm"
          >
            <div>
              <span className="font-bold">Client:</span> {cmd.client.nom}
              <br />
              <span className="text-base">
                <span className="font-bold">Adresse:</span> {cmd.client.adresse}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-yellow-400 text-[#222] font-bold rounded-lg px-5 py-2 shadow hover:bg-yellow-300 transition"
              >
                Accepter
              </button>
              <button
                className="bg-[#3d5a40] text-white font-bold rounded-lg px-5 py-2 shadow hover:bg-[#355c3a] transition"
                onClick={() => setSelected(idx)}
              >
                Détails
              </button>
            </div>
          </div>
        ))}
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
              <b>Email:</b> {sampleCommandes[selected].client.email}
            </div>
            <div className="mb-2">
              <b>Téléphone:</b> {sampleCommandes[selected].client.telephone}
            </div>
            <div className="mb-2">
              <b>Adresse:</b> {sampleCommandes[selected].client.adresse}
            </div>
            <div className="mb-2">
              <b>Âge:</b> {sampleCommandes[selected].client.age}
            </div>
            <div className="mb-2">
              <b>Date:</b> {sampleCommandes[selected].date}
            </div>
            <div className="mb-4">
              <b>Ordonnance:</b>
              <ul className="list-disc ml-6">
                {sampleCommandes[selected].ordonnance.map((med, i) => (
                  <li key={i}>
                    {med.nom} — {med.posologie} | Quantité: {med.quantite}
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
    </div>
  );
};

export default PharmacyCommandes;