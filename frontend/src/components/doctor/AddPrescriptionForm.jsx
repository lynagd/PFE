import React, { useState } from "react";

const AddPrescriptionForm = ({ selectedPatient, setPatients, setShowAddPrescription }) => {
  const today = new Date().toISOString().slice(0, 10);

  const [medicaments, setMedicaments] = useState([
    { nom: "", dosage: "", forme: "", quantite: "", instruction: "" }
  ]);
  const [instructions, setInstructions] = useState("");

  const handleAddMedicament = () => {
    setMedicaments([...medicaments, { nom: "", dosage: "", forme: "", quantite: "", instruction: "" }]);
  };

  const handleMedicamentChange = (idx, field, value) => {
    const updated = medicaments.map((med, i) =>
      i === idx ? { ...med, [field]: value } : med
    );
    setMedicaments(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPrescription = {
      id: "ORD" + Math.floor(Math.random() * 100000),
      doctor: {
        nom: "Dr. Yacine B.",
        specialite: "Médecin Généraliste",
        wilaya: "Alger",
        telephone: "+213 555 987 654"
      },
      patient: {
        nom: selectedPatient.nom,
        prenom: selectedPatient.prenom,
        age: selectedPatient.age
      },
      date_prescription: today,
      codebarre: Math.floor(100000 + Math.random() * 900000).toString(),
      produits_prescrits: medicaments.filter(med => med.nom.trim() !== ""),
      instruction_supplementaire: instructions,
      signatureUrl: "/assets/doctor-signature.png",
      cachetUrl: "/assets/doctor-cachet.png"
    };

    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? { ...p, prescriptions: [...p.prescriptions, newPrescription] }
          : p
      )
    );
    setShowAddPrescription(false);
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
              <div className="flex flex-wrap gap-2 mb-2 min-w-0" key={idx}>
                <input className="flex-1 min-w-[120px] px-3 py-2 rounded border" placeholder="Nom"
                  value={med.nom} onChange={e => handleMedicamentChange(idx, "nom", e.target.value)} />
                <input className="flex-1 min-w-[100px] px-3 py-2 rounded border" placeholder="Dosage"
                  value={med.dosage} onChange={e => handleMedicamentChange(idx, "dosage", e.target.value)} />
                <input className="flex-1 min-w-[100px] px-3 py-2 rounded border" placeholder="Forme"
                  value={med.forme} onChange={e => handleMedicamentChange(idx, "forme", e.target.value)} />
                <input className="flex-1 min-w-[100px] px-3 py-2 rounded border" placeholder="Quantité"
                  value={med.quantite} onChange={e => handleMedicamentChange(idx, "quantite", e.target.value)} />
                <input className="flex-1 min-w-[120px] px-3 py-2 rounded border" placeholder="Instruction"
                  value={med.instruction} onChange={e => handleMedicamentChange(idx, "instruction", e.target.value)} />
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