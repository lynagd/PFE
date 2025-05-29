import React, { useState } from "react";

const LivreurParametres = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="bg-lfond rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-2xl font-bold text-khder mb-8">Paramètres</h2>

      {showPasswordForm ? (
        <form className="flex flex-col gap-6 max-w-xl w-full mb-8">
          <div>
            <label className="block text-khder font-semibold mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]"
              placeholder="Mot de passe actuel"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]"
              placeholder="Confirmer le nouveau mot de passe"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 px-8 shadow hover:bg-yellow-600 transition"
            >
              Enregistrer les modifications
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white font-semibold rounded-lg py-3 px-8 shadow hover:bg-gray-500 transition"
              onClick={() => setShowPasswordForm(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4 items-start w-full mb-8">
          <button
            className="bg-khder text-white font-bold rounded-lg py-4 px-8 text-lg shadow hover:bg-[#355c3a] transition"
            style={{ minWidth: 320, maxWidth: 400, textAlign: "center" }}
            onClick={() => setShowPasswordForm(true)}
          >
            Changer le mot de passe
          </button>
          <button
            className="bg-red-100 text-red-600 font-bold rounded-lg py-4 px-8 text-lg shadow hover:bg-red-200 transition"
            style={{ minWidth: 320, maxWidth: 400, textAlign: "center" }}
            // Add your delete logic here
          >
            Supprimer mon compte
          </button>
        </div>
      )}
    </div>
  );
};

export default LivreurParametres;