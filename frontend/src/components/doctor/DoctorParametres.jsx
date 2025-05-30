import React from 'react';
import { useNavigate } from "react-router-dom";

const DoctorParametres = ({
  showPasswordForm,
  setShowPasswordForm,
  passwordFields,
  handlePasswordChange,
  handlePasswordSubmit
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">Paramètres</h2>
      {/* Only show the password form if triggered from the header */}
      {showPasswordForm ? (
        <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Mot de passe actuel</label>
            <input
              type="password"
              name="current"
              value={passwordFields.current}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              name="new"
              value={passwordFields.new}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirm"
              value={passwordFields.confirm}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-600 transition" type="submit">
              Enregistrer les modifications
            </button>
            <button
              type="button"
              className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
              onClick={() => {
                setShowPasswordForm(false);
                navigate(-1);
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="text-gray-500">Aucun paramètre disponible ici.</div>
      )}
      <hr className="my-8" />
    </div>
  );
};

export default DoctorParametres;