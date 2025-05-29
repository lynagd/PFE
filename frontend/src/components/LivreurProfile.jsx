import React from "react";

const LivreurProfile = ({ livreurProfile }) => (
  <div className="bg-lfond rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
    <h2 className="text-xl font-bold text-khder mb-6">Profil</h2>
    <form className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-khder font-semibold mb-1">Nom</label>
          <input
            type="text"
            value={livreurProfile.nom || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Prénom</label>
          <input
            type="text"
            value={livreurProfile.prenom || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Sexe</label>
          <input
            type="text"
            value={livreurProfile.sexe || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Date de naissance</label>
          <input
            type="text"
            value={livreurProfile.dateNaissance || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Wilaya</label>
          <input
            type="text"
            value={livreurProfile.wilaya || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Commune</label>
          <input
            type="text"
            value={livreurProfile.commune || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-khder font-semibold mb-1">Email</label>
          <input
            type="email"
            value={livreurProfile.email}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Téléphone</label>
          <input
            type="text"
            value={livreurProfile.telephone}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-khder font-semibold mb-1">Adresse</label>
          <input
            type="text"
            value={livreurProfile.adresse}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
      </div>
    </form>
  </div>
);

export default LivreurProfile;