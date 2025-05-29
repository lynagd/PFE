import React, { useState } from "react";

const DoctorProfile = ({ profile, setProfile }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const handleProfileEdit = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProfile(editProfile);
    setShowEdit(false);
  };

  if (showEdit) {
    // Allow editing email, commune, wilaya, telephone, adresse
    return (
      <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
        <h2 className="text-xl font-bold text-khder mb-6">Modifier informations</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSaveChanges}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-khder font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editProfile.email}
                onChange={handleProfileEdit}
                className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
              />
            </div>
            <div>
              <label className="block text-khder font-semibold mb-1">Commune</label>
              <input
                type="text"
                name="commune"
                value={editProfile.commune}
                onChange={handleProfileEdit}
                className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
              />
            </div>
            <div>
              <label className="block text-khder font-semibold mb-1">Wilaya</label>
              <input
                type="text"
                name="wilaya"
                value={editProfile.wilaya}
                onChange={handleProfileEdit}
                className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
              />
            </div>
            <div>
              <label className="block text-khder font-semibold mb-1">Téléphone</label>
              <input
                type="text"
                name="telephone"
                value={editProfile.telephone}
                onChange={handleProfileEdit}
                className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-khder font-semibold mb-1">Adresse</label>
              <input
                type="text"
                name="adresse"
                value={editProfile.adresse}
                onChange={handleProfileEdit}
                className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-600 transition" type="submit">
              Enregistrer
            </button>
            <button
              className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
              type="button"
              onClick={() => setShowEdit(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  }

  // VIEW MODE
  return (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-6xl flex flex-col items-stretch ml-0">
      <h2 className="text-2xl font-bold text-khder mb-10 capitalize">profil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Nom complet</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{`Dr. ${profile.nom} ${profile.prenom}`}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Email</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.email}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Date de naissance</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.date_naissance}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Sexe</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.sexe}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Spécialité</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.specialite}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Wilaya</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.wilaya}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Commune</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.commune}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Téléphone</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.telephone}</div>
        </div>
        <div className="md:col-span-2">
          <label className="block font-bold text-[#3d5a40] mb-1">Adresse</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 text-lg">{profile.adresse}</div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Cachet</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 flex items-center min-h-[80px]">
            <img src={profile.cachet} alt="Cachet" className="h-12 mr-2" />
          </div>
        </div>
        <div>
          <label className="block font-bold text-[#3d5a40] mb-1">Signature</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3 flex items-center min-h-[80px]">
            <img src={profile.signature} alt="Signature" className="h-12 mr-2" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block font-bold text-[#3d5a40] mb-1">Agrément</label>
          <div className="bg-[#fcfefd] rounded-lg px-5 py-3">
            <a
              href={profile.agrement}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3d5a40] font-semibold underline"
            >
              Voir l'agrément (PDF)
            </a>
          </div>
        </div>
      </div>
      <button
        className="bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 px-8 shadow hover:bg-yellow-600 transition w-auto self-start"
        onClick={() => {
          setEditProfile(profile);
          setShowEdit(true);
        }}
      >
        Modifier informations
      </button>
    </div>
  );
};

export default DoctorProfile;