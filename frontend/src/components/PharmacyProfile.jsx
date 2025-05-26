import React, { useState } from "react";

const initialProfile = {
  nom: "Pharmacie El Amine",
  email: "pharmacie.elamine@email.com",
  dateCreation: "2010-06-20",
  wilaya: "Alger",
  commune: "El Madania",
  telephone: "+213 555 987 654",
  adresse: "12, Rue des Lilas, Alger",
  registre: "Voir le registre de commerce (PDF)",
};

export default function PharmacyProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const handleEditClick = () => {
    setEditProfile(profile);
    setEditMode(true);
  };

  const handleChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(editProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF6]">
      <div className="bg-white rounded-3xl shadow-md p-10 w-full max-w-2xl">
        {!editMode ? (
          <>
            <h2 className="text-2xl font-semibold text-left text-[#466C5A] mb-8">Profil</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[#466C5A] mb-1">Nom de la pharmacie</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.nom}
                  disabled
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Email</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.email}
                  disabled
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Date de création</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.dateCreation}
                  disabled
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Wilaya</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.wilaya}
                  disabled
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Commune</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.commune}
                  disabled
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Téléphone</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.telephone}
                  disabled
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[#466C5A] mb-1">Adresse</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.adresse}
                  disabled
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[#466C5A] mb-1">Registre de commerce</label>
                <button className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 text-left text-[#466C5A] hover:underline">
                  {profile.registre}
                </button>
              </div>
            </div>
            <div className="flex justify-start mt-8">
              <button
                className="bg-[#FFD600] text-[#23352B] font-bold px-6 py-2 rounded-md"
                onClick={handleEditClick}
              >
                Modifier informations
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-left text-[#466C5A] mb-8">Modifier informations</h2>
            <form
              className="grid grid-cols-2 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="col-span-2">
                <label className="block text-[#466C5A] mb-1">Email</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="email"
                  value={editProfile.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Wilaya</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="wilaya"
                  value={editProfile.wilaya}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Commune</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="commune"
                  value={editProfile.commune}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Téléphone</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="telephone"
                  value={editProfile.telephone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-[#466C5A] mb-1">Adresse</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="adresse"
                  value={editProfile.adresse}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 flex justify-start gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-[#FFD600] text-[#23352B] font-bold px-8 py-2 rounded-md"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-[#466C5A] font-semibold px-8 py-2 rounded-md"
                  onClick={handleCancel}
                >
                  Annuler
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}