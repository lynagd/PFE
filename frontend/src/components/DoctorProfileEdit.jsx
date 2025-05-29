import React from 'react';
import { Pencil } from 'lucide-react';

const DoctorProfileEdit = ({
  editProfile,
  handleProfileEdit,
  handleSaveChanges,
  setShowEditCard
}) => (
  <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
    <h2 className="text-xl font-bold text-khder mb-6">Modifier informations</h2>
    <form className="flex flex-col gap-6" onSubmit={handleSaveChanges}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-khder font-semibold mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={editProfile.email}
              onChange={handleProfileEdit}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-khder pointer-events-none">
              <Pencil size={18} />
            </span>
          </div>
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Wilaya</label>
          <div className="relative">
            <input
              type="text"
              name="wilaya"
              value={editProfile.wilaya}
              onChange={handleProfileEdit}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-khder pointer-events-none">
              <Pencil size={18} />
            </span>
          </div>
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Commune</label>
          <div className="relative">
            <input
              type="text"
              name="commune"
              value={editProfile.commune}
              onChange={handleProfileEdit}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-khder pointer-events-none">
              <Pencil size={18} />
            </span>
          </div>
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Téléphone</label>
          <div className="relative">
            <input
              type="tel"
              name="telephone"
              value={editProfile.telephone}
              onChange={handleProfileEdit}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-khder pointer-events-none">
              <Pencil size={18} />
            </span>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-khder font-semibold mb-1">Adresse</label>
          <div className="relative">
            <textarea
              name="adresse"
              rows={2}
              value={editProfile.adresse}
              onChange={handleProfileEdit}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] resize-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-khder pointer-events-none">
              <Pencil size={18} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-600 transition" type="submit">
          Enregistrer
        </button>
        <button
          className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
          type="button"
          onClick={() => setShowEditCard(false)}
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
);

export default DoctorProfileEdit;