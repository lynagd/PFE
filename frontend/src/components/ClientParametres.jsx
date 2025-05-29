import React from "react";

const ClientParametres = ({
  showPasswordForm,
  passwordFields,
  handlePasswordChange,
  handlePasswordSubmit,
  onOpenPasswordForm,
  onClosePasswordForm
}) => (
  <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
    <h2 className="text-xl font-bold text-khder mb-6">Paramètres</h2>
    {!showPasswordForm ? (
      <div className="flex flex-col gap-4">
        <button
          className="bg-khder text-white font-semibold rounded-lg py-3 px-8 shadow hover:bg-[#2d3d2a] transition w-auto self-start"
          type="button"
          onClick={onOpenPasswordForm}
        >
          Changer le mot de passe
        </button>
        <button
          className="bg-red-100 text-red-600 font-semibold rounded-lg py-3 px-8 shadow hover:bg-red-200 transition w-auto self-start"
          type="button"
        >
          Supprimer mon compte
        </button>
      </div>
    ) : (
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
            onClick={onClosePasswordForm}
          >
            Annuler
          </button>
        </div>
      </form>
    )}
    <hr className="my-8" />
  </div>
);

export default ClientParametres;