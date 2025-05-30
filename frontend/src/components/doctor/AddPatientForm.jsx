import React, { useState } from "react";
import axios from "axios";

const AddPatientForm = ({ onPatientAdded, onCancel }) => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date_naissance: ""
  });
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 1. Search for client
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchResult(null);
    setLoading(true);
    try {
      // Adjust the endpoint as per your backend
      const res = await axios.get("/api/clients/search/", {
        params: form
      });
      if (res.data && res.data.length > 0) {
        setSearchResult(res.data[0]); // Assume first match
      } else {
        setSearchError("Ce client n'existe pas sur la plateforme.");
      }
    } catch (err) {
      setSearchError("Erreur lors de la recherche du client.");
    }
    setLoading(false);
  };

  // 2. Add client as patient
  const handleAddPatient = async () => {
    setAdding(true);
    try {
      await axios.post(`/api/patients/ajouter/${searchResult.id}/`);
      setAdding(false);
      if (onPatientAdded) onPatientAdded();
    } catch (err) {
      setAdding(false);
      setSearchError(
        err.response?.data?.error ||
        "Erreur lors de l'ajout du patient."
      );
    }
  };

  return (
    <div className="bg-[#faf8f3] rounded-2xl shadow-xl px-8 py-8 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-khder mb-6">Ajouter un patient</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-khder font-semibold">Nom</label>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] w-full"
            required
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
            required
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
            required
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-khder text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition"
            disabled={loading}
          >
            {loading ? "Recherche..." : "Rechercher"}
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
      {searchError && <div className="text-red-500 mt-4">{searchError}</div>}
      {searchResult && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <div>
            <b>Nom:</b> {searchResult.nom}
          </div>
          <div>
            <b>Prénom:</b> {searchResult.prenom}
          </div>
          <div>
            <b>Date de naissance:</b> {searchResult.date_naissance}
          </div>
          <button
            className="mt-4 bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-600 transition"
            onClick={handleAddPatient}
            disabled={adding}
          >
            {adding ? "Ajout..." : "Ajouter à mes patients"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPatientForm;