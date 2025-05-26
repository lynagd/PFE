import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

// Sample data with disponibilite
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

const PharmacyLivreurs = () => {
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInviteLivreur = () => {
    const link = `${window.location.origin}/livreur-invite/${Math.random().toString(36).substring(2, 10)}`;
    setInviteLink(link);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-lfond py-12 px-2">
      <div className="bg-white rounded-[32px] shadow-xl px-8 py-8 w-full max-w-3xl flex flex-col items-stretch">
        {/* Header aligned left */}
        <h2 className="text-2xl font-bold text-khder font-sans mb-8 text-left"> livreurs</h2>
        <div className="w-full">
          <table className="min-w-full border-separate border-spacing-0 font-sans">
            <thead>
              <tr>
                <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">Nom</th>
                <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">Prénom</th>
                <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">Téléphone</th>
                <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">Email</th>
                <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">Disponibilité</th>
              </tr>
            </thead>
            <tbody>
              {sampleLivreurs.map((livreur, i) => (
                <tr key={livreur.id} className={i % 2 === 1 ? "bg-smth" : ""}>
                  <td className="py-6 px-4 text-[#222] align-top font-sans">{livreur.nom}</td>
                  <td className="py-6 px-4 text-[#222] align-top font-sans">{livreur.prenom}</td>
                  <td className="py-6 px-4 text-[#222] align-top font-sans">{livreur.telephone}</td>
                  <td className="py-6 px-4 text-[#222] align-top font-sans">{livreur.email}</td>
                  <td className="py-4 px-4 align-top font-sans">
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
                </tr>
              ))}
            </tbody>
          </table>
          {/* Invite controls at the bottom, left-aligned */}
          <div className="flex flex-col items-start gap-3 mt-8">
            <button
              type="button"
              onClick={handleInviteLivreur}
              className="bg-yellow-100 text-yellow-900 font-bold rounded-lg px-6 py-2 shadow hover:bg-yellow-200 transition outline-none border-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
              style={{ boxShadow: "0 1px 2px 0 rgba(60,60,60,0.03)" }}
            >
              Inviter un livreur
            </button>
            {inviteLink && (
              <div className="flex items-center gap-3 mt-0">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="w-64 text-base rounded-md border border-[#b6d1c2] px-3 py-2 bg-[#f9fbf7]"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-khder text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-green-700 transition"
                >
                  <FaCopy />
                  {copied ? "Copié !" : "Copier"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyLivreurs;