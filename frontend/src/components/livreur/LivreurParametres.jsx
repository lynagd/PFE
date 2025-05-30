import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const LivreurParametres = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [fields, setFields] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Show password form if navigated with state
  useEffect(() => {
    if (location.state && location.state.openPassword) {
      setShowPasswordForm(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fields.new !== fields.confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await axios.post("/api/livreur/change-password/", {
        current_password: fields.current,
        new_password: fields.new,
      });
      alert("Mot de passe changé avec succès !");
      setShowPasswordForm(false);
      setFields({ current: "", new: "", confirm: "" });
      navigate(-1);
    } catch {
      alert("Erreur lors du changement de mot de passe.");
    }
  };

  return (
    <div className="bg-lfond rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-2xl font-bold text-khder mb-8">Paramètres</h2>
      {showPasswordForm ? (
        <form className="flex flex-col gap-6 max-w-xl w-full mb-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-khder font-semibold mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              name="current"
              value={fields.current}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]"
              placeholder="Mot de passe actuel"
              required
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="new"
              value={fields.new}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]"
              placeholder="Nouveau mot de passe"
              required
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              name="confirm"
              value={fields.confirm}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]"
              placeholder="Confirmer le nouveau mot de passe"
              required
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
              onClick={() => navigate(-1)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="text-gray-500">Aucun paramètre disponible ici.</div>
      )}
    </div>
  );
};

export default LivreurParametres;