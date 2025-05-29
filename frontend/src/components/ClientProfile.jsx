import React from 'react';
import { Pencil } from 'lucide-react';

const ClientProfile = ({
  profile,
  onEditProfile
}) => {
  return (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">Profil</h2>
      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Nom</label>
            <input type="text" value={profile.nom} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Prénom</label>
            <input type="text" value={profile.prenom} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Email</label>
            <input type="email" value={profile.email} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Date de naissance</label>
            <input type="text" value={profile.date_naissance} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Sexe</label>
            <input type="text" value={profile.sexe} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Wilaya</label>
            <input type="text" value={profile.wilaya} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Commune</label>
            <input type="text" value={profile.commune} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Téléphone</label>
            <input type="tel" value={profile.telephone} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Adresse</label>
          <textarea
            value={profile.adresse}
            disabled
            rows={1}
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] resize-none h-[52px] min-h-[52px] max-h-[52px] overflow-hidden"
          />
        </div>
        <button
          className="bg-yellow-500 text-[#222] font-bold rounded-lg py-3 px-8 mt-2 shadow hover:bg-yellow-600 transition w-auto text-center self-start"
          type="button"
          onClick={onEditProfile}
        >
          <span className="flex items-center gap-2">
            <Pencil size={18} /> Modifier informations
          </span>
        </button>
      </form>
    </div>
  );
};

export default ClientProfile;