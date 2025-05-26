import React, { useState } from "react";

const initialMeds = [
  // En stock
  {
    id: "D06ID232435454",
    nom: "Solpadeine Plus",
    nomCommercial: "Solpadeine",
    categorie: "Antalgique",
    quantite: 100,
    quantiteMinimale: 20,
    datePeremption: "2025-12-31",
    prixUnitaire: 300,
    date_ajout: "2024-05-01",
    date_modification: "2025-01-01",
    est_perime: false,
  },
  // Stock faible
  {
    id: "D06ID232435455",
    nom: "Paracetamol",
    nomCommercial: "Doliprane",
    categorie: "Antalgique",
    quantite: 8,
    quantiteMinimale: 10,
    datePeremption: "2026-05-10",
    prixUnitaire: 140,
    date_ajout: "2024-05-02",
    date_modification: "2025-01-02",
    est_perime: false,
  },
  // En rupture
  {
    id: "D06ID232435456",
    nom: "Ibuprofène",
    nomCommercial: "Advil",
    categorie: "Anti-inflammatoire",
    quantite: 0,
    quantiteMinimale: 5,
    datePeremption: "2025-10-10",
    prixUnitaire: 200,
    date_ajout: "2024-05-03",
    date_modification: "2025-01-03",
    est_perime: false,
  },
  // Périmé
  {
    id: "D06ID232435457",
    nom: "Amoxicilline",
    nomCommercial: "Clamoxyl",
    categorie: "Antibiotique",
    quantite: 15,
    quantiteMinimale: 10,
    datePeremption: "2023-12-01",
    prixUnitaire: 250,
    date_ajout: "2024-05-04",
    date_modification: "2025-01-04",
    est_perime: true,
  },
  // En stock
  {
    id: "D06ID232435458",
    nom: "Vitamine C",
    nomCommercial: "Redoxon",
    categorie: "Complément",
    quantite: 50,
    quantiteMinimale: 10,
    datePeremption: "2026-09-15",
    prixUnitaire: 90,
    date_ajout: "2024-05-05",
    date_modification: "2025-01-05",
    est_perime: false,
  },
];

// Utility to check if a date is expired
function isExpired(datePeremption) {
  if (!datePeremption) return false;
  const today = new Date();
  const peremption = new Date(datePeremption);
  // Set time to 00:00:00 for both dates to compare only the date part
  today.setHours(0,0,0,0);
  peremption.setHours(0,0,0,0);
  return peremption <= today;
}

export default function PharmacyDashboard() {
  const [meds, setMeds] = useState(initialMeds);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [form, setForm] = useState({
    id: "",
    nom: "",
    nomCommercial: "",
    categorie: "",
    quantite: "",
    quantiteMinimale: "",
    datePeremption: "",
    prixUnitaire: "",
    dateAjout: "",
    dateModification: "",
  });
  const [activeTab, setActiveTab] = useState("tout");
  const [search, setSearch] = useState("");

  // Filtering logic for tabs and search
  const filteredMeds = meds.filter((med) => {
    const matchesTab =
      activeTab === "tout"
        ? true
        : activeTab === "enstock"
        ? !isExpired(med.datePeremption) && med.quantite > med.quantiteMinimale && med.quantite > 0
        : activeTab === "stockfaible"
        ? !isExpired(med.datePeremption) && med.quantite > 0 && med.quantite <= med.quantiteMinimale
        : activeTab === "rupture"
        ? !isExpired(med.datePeremption) && med.quantite === 0
        : activeTab === "perime"
        ? isExpired(med.datePeremption)
        : true;
    const matchesSearch =
      med.nom.toLowerCase().includes(search.toLowerCase()) ||
      med.nomCommercial.toLowerCase().includes(search.toLowerCase()) ||
      med.categorie.toLowerCase().includes(search.toLowerCase()) ||
      med.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const est_perime = isExpired(form.datePeremption);
    setMeds([
      ...meds,
      {
        ...form,
        quantite: Number(form.quantite),
        quantiteMinimale: Number(form.quantiteMinimale),
        prixUnitaire: Number(form.prixUnitaire),
        dateAjout: form.dateAjout || today,
        dateModification: today,
        est_perime,
      },
    ]);
    setForm({
      id: "",
      nom: "",
      nomCommercial: "",
      categorie: "",
      quantite: "",
      quantiteMinimale: "",
      datePeremption: "",
      prixUnitaire: "",
      dateAjout: "",
      dateModification: "",
    });
    setShowAdd(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const updated = [...meds];
    const med = { ...updated[showEdit], ...form };
    med.quantite = Number(form.quantite);
    med.quantiteMinimale = Number(form.quantiteMinimale);
    med.dateModification = today;
    med.est_perime = isExpired(med.datePeremption);
    updated[showEdit] = med;
    setMeds(updated);
    setShowEdit(null);
  };

  const handleDelete = (idx) => {
    setMeds(meds.filter((_, i) => i !== idx));
  };

  const openEdit = (idx) => {
    setShowEdit(idx);
    const med = meds[idx];
    setForm({
      id: med.id,
      nom: med.nom,
      nomCommercial: med.nomCommercial,
      categorie: med.categorie,
      quantite: med.quantite,
      quantiteMinimale: med.quantiteMinimale,
      datePeremption: med.datePeremption,
      prixUnitaire: med.prixUnitaire,
      dateAjout: med.dateAjout,
      dateModification: med.dateModification,
    });
  };

  return (
    <div className="flex-1 p-8 bg-[#fcf9f4] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222] text-left">Stock</h1>
      </div>
      {/* Tabs */}
      <div className="flex gap-8 mb-4 border-b border-[#e8f0ea]">
        <button
          className={`pb-2 font-semibold transition ${
            activeTab === "tout"
              ? "border-b-2 border-[#222] text-[#222]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("tout")}
        >
          Tout
        </button>
        <button
          className={`pb-2 font-semibold transition ${
            activeTab === "stockfaible"
              ? "border-b-2 border-[#60a5fa] text-[#60a5fa]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("stockfaible")}
        >
          Stock faible
        </button>
        <button
          className={`pb-2 font-semibold transition ${
            activeTab === "enstock"
              ? "border-b-2 border-[#3d5a40] text-[#3d5a40]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("enstock")}
        >
          En stock
        </button>
        <button
          className={`pb-2 font-semibold transition ${
            activeTab === "rupture"
              ? "border-b-2 border-[#ef4444] text-[#ef4444]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("rupture")}
        >
          En rupture
        </button>
        <button
          className={`pb-2 font-semibold transition ${
            activeTab === "perime"
              ? "border-b-2 border-[#16a34a] text-[#16a34a]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("perime")}
        >
          Périmé
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-6 flex justify-center">
        <div className="bg-[#e8f0ea] rounded-lg flex items-center px-4 py-3 w-full max-w-full" style={{ maxWidth: "100%" }}>
          <input
            type="text"
            placeholder="Rechercher des medicaments ici"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 text-gray-700"
          />
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-[#e8f0ea] text-[#3d5a40]">
            <tr>
              <th className="py-3 px-4 text-left">ID (Code barre)</th>
              <th className="py-3 px-4 text-left">Nom</th>
              <th className="py-3 px-4 text-left">Nom commercial</th>
              <th className="py-3 px-4 text-left">Catégorie</th>
              <th className="py-3 px-4 text-left">Quantité</th>
              <th className="py-3 px-4 text-left">Quantité minimale</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeds.map((med, idx) => {
              const isLow = med.quantite < med.quantiteMinimale;
              const isExp = isExpired(med.datePeremption);
              let rowClass = "";
              if (isExp) rowClass = "bg-[#ffeaea]"; // expired: reddish
              else if (isLow) rowClass = "bg-[#fffbe6]"; // low: yellowish
              return (
                <tr key={med.id} className={`border-b last:border-b-0 ${rowClass}`}>
                  <td className="py-2 px-4">{med.id}</td>
                  <td className="py-2 px-4">{med.nom}</td>
                  <td className="py-2 px-4">{med.nomCommercial}</td>
                  <td className="py-2 px-4">{med.categorie}</td>
                  <td className="py-2 px-4">{med.quantite}</td>
                  <td className="py-2 px-4">{med.quantiteMinimale}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setShowDetails(idx)}
                    >
                      Détails
                    </button>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => openEdit(idx)}
                    >
                      Modifier quantité
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(idx)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredMeds.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  Aucun médicament dans cette catégorie.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Button at bottom right */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          className="bg-yellow-500 text-[#222] font-medium px-6 py-3 rounded-lg shadow hover:bg-yellow-400 transition"
          onClick={() => setShowAdd(true)}
        >
          Ajouter stock
        </button>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-y-auto max-h-screen">
          <form
            className="bg-white p-8 rounded shadow-lg w-full max-w-md"
            onSubmit={handleAdd}
          >
            <h2 className="text-lg font-bold mb-4 text-[#3d5a40]">Ajouter un produit</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm mb-1">ID (code barre)</label>
                <input name="id" value={form.id} onChange={handleChange} required placeholder="ID (code barre)" className="border p-2 rounded w-full" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-1">Nom</label>
                <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Nom" className="border p-2 rounded w-full" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-1">Nom commercial</label>
                <input name="nomCommercial" value={form.nomCommercial} onChange={handleChange} required placeholder="Nom commercial" className="border p-2 rounded w-full" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-1">Catégorie</label>
                <input name="categorie" value={form.categorie} onChange={handleChange} required placeholder="Catégorie" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm mb-1">Quantité</label>
                <input name="quantite" value={form.quantite} onChange={handleChange} required type="number" min="0" placeholder="Quantité" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm mb-1">Quantité minimale</label>
                <input name="quantiteMinimale" value={form.quantiteMinimale} onChange={handleChange} required type="number" min="0" placeholder="Quantité minimale" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm mb-1">Prix unitaire (DA)</label>
                <input name="prixUnitaire" value={form.prixUnitaire} onChange={handleChange} required type="number" min="0" placeholder="Prix unitaire (DA)" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm mb-1">Date de péremption</label>
                <input name="datePeremption" value={form.datePeremption} onChange={handleChange} required type="date" className="border p-2 rounded w-full" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowAdd(false)}>
                Annuler
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-[#3d5a40] text-white">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            className="bg-white p-8 rounded shadow-lg w-full max-w-sm"
            onSubmit={handleEdit}
          >
            <h2 className="text-lg font-bold mb-4 text-[#3d5a40]">Modifier la quantité</h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Quantité</label>
              <input
                name="quantite"
                value={form.quantite}
                onChange={handleChange}
                required
                type="number"
                min="0"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Quantité minimale</label>
              <input
                name="quantiteMinimale"
                value={form.quantiteMinimale}
                onChange={handleChange}
                required
                type="number"
                min="0"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Date de péremption</label>
              <input
                name="datePeremption"
                value={form.datePeremption}
                onChange={handleChange}
                required
                type="date"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowEdit(null)}>
                Annuler
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-[#3d5a40] text-white">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Details Modal */}
      {showDetails !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-[#3d5a40]">Détails du médicament</h2>
            <div className="space-y-2">
              <div><span className="font-semibold">Nom:</span> {meds[showDetails].nom}</div>
              <div><span className="font-semibold">ID:</span> {meds[showDetails].id}</div>
              <div><span className="font-semibold">Nom commercial:</span> {meds[showDetails].nomCommercial}</div>
              <div><span className="font-semibold">Catégorie:</span> {meds[showDetails].categorie}</div>
              <div><span className="font-semibold">Quantité:</span> {meds[showDetails].quantite}</div>
              <div><span className="font-semibold">Quantité minimale:</span> {meds[showDetails].quantiteMinimale}</div>
              <div><span className="font-semibold">Date de péremption:</span> {meds[showDetails].datePeremption}</div>
              <div><span className="font-semibold">Prix unitaire:</span> {meds[showDetails].prixUnitaire} DA</div>
              <div><span className="font-semibold">Date d'ajout:</span> {meds[showDetails].dateAjout}</div>
              <div><span className="font-semibold">Date de modification:</span> {meds[showDetails].dateModification}</div>
              <div>
                <span className="font-semibold">Est périmé:</span>{" "}
                {meds[showDetails].est_perime ? (
                  <span className="text-red-600 font-bold">Oui</span>
                ) : (
                  <span className="text-green-600 font-bold">Non</span>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowDetails(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}