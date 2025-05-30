import React, { useState } from "react";

const AddPrescriptionForm = ({
  selectedPatient,
  onAddPrescription,
  setShowAddPrescription,
  setSelectedPatient,
  doctorProfile
}) => {
  const today = new Date().toISOString().slice(0, 10);

  const [medicaments, setMedicaments] = useState([
    { nom: "", dosage: "", forme: "", quantite: "", instruction: "" }
  ]);
  const [instructions, setInstructions] = useState("");

  const handleAddMedicament = () => {
    setMedicaments([...medicaments, { nom: "", dosage: "", forme: "", quantite: "", instruction: "" }]);
  };

  const handleRemoveMedicament = (idx) => {
    setMedicaments(medicaments.filter((_, i) => i !== idx));
  };

  const handleMedicamentChange = (idx, field, value) => {
    const updated = medicaments.map((med, i) =>
      i === idx ? { ...med, [field]: value } : med
    );
    setMedicaments(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedPatient.id) {
      alert("Aucun patient sélectionné !");
      return;
    }
    const newPrescription = {
      doctor: {
        nom: doctorProfile.nom,
        specialite: doctorProfile.specialite,
        wilaya: doctorProfile.wilaya,
        telephone: doctorProfile.telephone
      },
      patient: {
        nom: selectedPatient.nom,
        prenom: selectedPatient.prenom,
        age: selectedPatient.age
      },
      date_prescription: today,
      produits_prescrits: medicaments.filter(med => med.nom.trim() !== ""),
      instruction_supplementaire: instructions,
      signatureUrl: doctorProfile.signature || "/assets/doctor-signature.png",
      cachetUrl: doctorProfile.cachet || "/assets/doctor-cachet.png"
    };

    // Call the parent handler to POST to backend
    onAddPrescription(selectedPatient.id, newPrescription);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-[#faf8f3] rounded-2xl shadow-xl px-8 py-8 w-full max-w-3xl flex flex-col items-stretch mx-auto">
        <h2 className="text-2xl font-bold text-khder mb-8">Ajouter une ordonnance</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-semibold text-[#3d5a40] mb-2">Date</label>
            <div className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]">
              {today}
            </div>
          </div>
          <div className="mb-6">
            <label className="block font-semibold text-[#3d5a40] mb-2">Médicaments</label>
            {medicaments.map((med, idx) => (
              <div className="flex flex-wrap gap-2 mb-2 min-w-0 items-center" key={idx}>
                <input className="flex-1 min-w-[120px] px-3 py-2 rounded border" placeholder="Nom"
                  value={med.nom} onChange={e => handleMedicamentChange(idx, "nom", e.target.value)} />
                <input className="flex-1 min-w-[100px] px-3 py-2 rounded border" placeholder="Dosage"
                  value={med.dosage} onChange={e => handleMedicamentChange(idx, "dosage", e.target.value)} />
                <select
                  className="flex-1 min-w-[100px] px-3 py-2 rounded border"
                  value={med.forme}
                  onChange={e => handleMedicamentChange(idx, "forme", e.target.value)}
                >
                  <option value="">Forme</option>
                  <option value="Comprimé">Comprimé</option>
                  <option value="Gélule">Gélule</option>
                  <option value="Sirop">Sirop</option>
                  <option value="Pommade">Pommade</option>
                  <option value="Crème">Crème</option>
                  <option value="Solution">Solution</option>
                  <option value="Injectable">Injectable</option>
                  <option value="Suppositoire">Suppositoire</option>
                  <option value="Spray">Spray</option>
                  <option value="Autre">Autre</option>
                </select>
                <input
                  type="number"
                  min="1"
                  className="flex-1 min-w-[100px] px-3 py-2 rounded border"
                  placeholder="Quantité"
                  value={med.quantite}
                  onChange={e => handleMedicamentChange(idx, "quantite", e.target.value)}
                />
                <input className="flex-1 min-w-[120px] px-3 py-2 rounded border" placeholder="Instruction"
                  value={med.instruction} onChange={e => handleMedicamentChange(idx, "instruction", e.target.value)} />
                {medicaments.length > 1 && (
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded px-3 py-2 ml-2 hover:bg-red-600"
                    onClick={() => handleRemoveMedicament(idx)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-600 transition mt-2"
              onClick={handleAddMedicament}
            >
              Ajouter un médicament
            </button>
          </div>
          <div className="mb-6">
            <label className="block font-semibold text-[#3d5a40] mb-2">Instructions supplémentaires</label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-[#fcfefd] text-[#222]"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mt-8 w-full">
            <button
              type="submit"
              className="flex-1 bg-[#3d5a40] text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d4631] transition"
            >
              Enregistrer
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
              onClick={() => setShowAddPrescription(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrescriptionForm;