import React from 'react';

const DoctorProfile = ({ profile, setShowEditCard }) => (
  <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
    <h2 className="text-xl font-bold text-khder mb-6"> Profil</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <label className="block text-khder font-semibold mb-1">Nom</label>
        <input type="text" value={profile.nom} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Prénom</label>
        <input type="text" value={profile.prenom} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Email</label>
        <input type="email" value={profile.email} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Date de naissance</label>
        <input type="text" value={profile.date_naissance} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Sexe</label>
        <input type="text" value={profile.sexe} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Spécialité</label>
        <input type="text" value={profile.specialite} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Wilaya</label>
        <input type="text" value={profile.wilaya} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Commune</label>
        <input type="text" value={profile.commune} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Téléphone</label>
        <input type="tel" value={profile.telephone} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-khder font-semibold mb-1">Adresse</label>
        <textarea value={profile.adresse} disabled rows={2} className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] resize-none" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Cachet</label>
        <img src={profile.cachet} alt="Cachet" className="h-20 rounded bg-[#fafafa] border border-lsecondary p-2 w-full object-contain" />
      </div>
      <div>
        <label className="block text-khder font-semibold mb-1">Signature</label>
        <img src={profile.signature} alt="Signature" className="h-20 rounded bg-[#fafafa] border border-lsecondary p-2 w-full object-contain" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-khder font-semibold mb-1">Agrément</label>
        {profile.agrement.endsWith('.pdf') ? (
          <a href={profile.agrement} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-smth border border-lsecondary rounded text-khder font-semibold">
            Voir l'agrément (PDF)
          </a>
        ) : (
          <img src={profile.agrement} alt="Agrément" className="h-20 rounded bg-[#fafafa] border border-lsecondary p-2 w-full object-contain" />
        )}
      </div>
      <div className="md:col-span-2">
        <button
          className="bg-yellow-500 text-[#222] font-bold rounded-lg py-3 px-8 mt-2 shadow hover:bg-yellow-600 transition w-full md:w-auto text-center md:text-left"
          type="button"
          onClick={() => setShowEditCard(true)}
          style={{ justifyContent: 'flex-start' }}
        >
          Modifier informations
        </button>
      </div>
    </form>
  </div>
);

export default DoctorProfile;