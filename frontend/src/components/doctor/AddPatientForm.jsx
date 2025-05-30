import React, { useState } from "react";

const AddPatientForm = ({ onSave, onCancel }) => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date_naissance: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom || !form.prenom || !form.date_naissance) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    // Debug: log what will be sent
    console.log("Sending patient data:", form);
    onSave(form);
  };

  return (
    <div className="bg-[#faf8f3] rounded-2xl shadow-xl px-8 py-8 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-khder mb-6">Ajouter un patient</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-khder font-semibold">Nom</label>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-khder font-semibold">Prénom</label>
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={form.prenom}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-khder font-semibold">Date de naissance</label>
          <input
            type="date"
            name="date_naissance"
            placeholder="Date de naissance"
            value={form.date_naissance}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] w-full"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-khder text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition"
          >
            Enregistrer
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;