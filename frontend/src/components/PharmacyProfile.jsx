import React, { useState } from "react";

const initialProfile = {
  nomPharmacie: "Pharmacie El Amine",
  nom: "Amine",
  prenom: "Bensalah",
  email: "pharmacie.elamine@email.com",
  wilaya: "Alger",
  commune: "El Madania",
  telephone: "+213 555 987 654",
  adresse: "12, Rue des Lilas, Alger",
  registre: "Voir le registre de commerce (PDF)",
  gpsLink: "https://maps.google.com/?q=12,Rue+des+Lilas,Alger",
  ouverture: "08:00",
  fermeture: "20:00",
  livraison: true,
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
    const { name, value, type, checked } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: type === "checkbox" ? checked : value,
    });
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
      <div className="bg-[#FAFAF6] rounded-3xl p-10 w-full max-w-2xl">
        {!editMode ? (
          <>
            <h2 className="text-2xl font-semibold text-left text-khder mb-8">
              Profil
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-khder mb-1">
                  Nom de la pharmacie
                </label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.nomPharmacie}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Email</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.email}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Nom</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.nom}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Prénom</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.prenom}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Wilaya</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.wilaya}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Commune</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.commune}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Téléphone</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.telephone}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Heure d'ouverture</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.ouverture}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Heure de fermeture</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2"
                  value={profile.fermeture}
                  disabled
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Livraison</label>
                <input
                  type="checkbox"
                  checked={profile.livraison}
                  disabled
                  className="mr-2"
                />
                <span>{profile.livraison ? "Oui" : "Non"}</span>
              </div>
              <div className="col-span-2">
                <label className="block text-khder mb-1">Adresse (GPS)</label>
                {profile.gpsLink ? (
                  <a
                    href={profile.gpsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 text-khder hover:underline"
                  >
                    Voir sur la carte
                  </a>
                ) : (
                  <span className="w-full inline-block bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 text-[#466C5A]">
                    {profile.adresse}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-khder mb-1">
                  Registre de commerce
                </label>
                <button className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 text-left text-[#466C5A] hover:underline">
                  {profile.registre}
                </button>
              </div>
            </div>
            <div className="flex justify-start mt-8">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded-md"
                onClick={handleEditClick}
              >
                Modifier informations
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-left text-khder mb-8">
              Modifier informations
            </h2>
            <form
              className="grid grid-cols-2 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div>
                <label className="block text-khder mb-1">Nom de la pharmacie</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="nomPharmacie"
                  value={editProfile.nomPharmacie}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Email</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="email"
                  value={editProfile.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Wilaya</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="wilaya"
                  value={editProfile.wilaya}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Commune</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="commune"
                  value={editProfile.commune}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Téléphone</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="telephone"
                  value={editProfile.telephone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Heure d'ouverture</label>
                <input
                  type="time"
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="ouverture"
                  value={editProfile.ouverture}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Heure de fermeture</label>
                <input
                  type="time"
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="fermeture"
                  value={editProfile.fermeture}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-khder mb-1">Livraison</label>
                <input
                  type="checkbox"
                  name="livraison"
                  checked={editProfile.livraison}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>{editProfile.livraison ? "Oui" : "Non"}</span>
              </div>
              <div>
                <label className="block text-khder mb-1">Lien GPS</label>
                <input
                  className="w-full bg-[#F6FAF7] border border-[#D6E5DB] rounded-md px-3 py-2 mb-2 focus:outline-[#466C5A]"
                  name="gpsLink"
                  value={editProfile.gpsLink || ""}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  type="url"
                />
              </div>
              <div className="col-span-2 flex justify-start gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-[#FFD600] text-black font-bold px-8 py-2 rounded-md"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-8 py-2 rounded-md"
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