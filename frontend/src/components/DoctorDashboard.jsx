import React, { useState } from 'react';
import { User, FileText, Settings, LogOut, Users, Pencil } from 'lucide-react';
import Barcode from 'react-barcode';

const samplePatients = [
  {
    id: 1,
    nom: "Ahmed",
    prenom: "Benali",
    age: 34,
    prescriptions: [
      {
        id: 'ORD001',
        date: '2024-05-18',
        medications: [
          { nom: "Amoxicilline 500mg", posologie: "3x/jour", quantite: 10 },
          { nom: "Doliprane 1000mg", posologie: "2x/jour", quantite: 6 }
        ],
        doctor: "Dr. Yacine B.",
        specialite: "Médecin Généraliste"
      }
    ]
  },
  {
    id: 2,
    nom: "Sara",
    prenom: "Boukhalfa",
    age: 28,
    prescriptions: []
  }
];

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [patients, setPatients] = useState(samplePatients);

  // Doctor profile (static for demo)
  const [profile, setProfile] = useState({
    nom: "Dr. Yacine B.",
    email: "yacine.b@email.com",
    date_naissance: "1980-04-15",
    sexe: "Homme",
    specialite: "Médecin Généraliste",
    wilaya: "Alger",
    commune: "El Madania",
    adresse: "12, Rue des Lilas, Alger",
    telephone: "+213 555 987 654",
    cachet: "/assets/doctor-cachet.png",
    signature: "/assets/doctor-signature.png",
    agrement: "/assets/doctor-agrement.pdf",
  });
  const [editProfile, setEditProfile] = useState({
    email: profile.email,
    wilaya: profile.wilaya,
    commune: profile.commune,
    adresse: profile.adresse,
    telephone: profile.telephone
  });
  const [showEditCard, setShowEditCard] = useState(false);

  // Add prescription form state
  const [newPrescription, setNewPrescription] = useState({
    date: '',
    medications: [{ nom: '', posologie: '', quantite: '' }]
  });

  // Sidebar
  const sidebarItems = [
    { id: 'profile', icon: User, label: ' profil' },
    { id: 'patients', icon: Users, label: 'patients' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
    { id: 'logout', icon: LogOut, label: 'Déconnexion' }
  ];

  // Profile section
  const handleProfileEdit = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProfile({ ...profile, ...editProfile });
    setShowEditCard(false);
  };

  // Main profile card (read-only)
  const renderProfile = () => (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-stretch">
      <h2 className="text-xl font-bold text-khder mb-6"> profil</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-khder font-semibold mb-1">Nom complet</label>
          <input type="text" value={profile.nom} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
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
          <img
            src={profile.cachet}
            alt="Cachet"
            className="h-20 rounded bg-[#fafafa] border border-lsecondary p-2 w-full object-contain"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Signature</label>
          <img
            src={profile.signature}
            alt="Signature"
            className="h-20 rounded bg-[#fafafa] border border-lsecondary p-2 w-full object-contain"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-khder font-semibold mb-1">Agrément</label>
          {profile.agrement.endsWith(".pdf") ? (
            <a
              href={profile.agrement}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-smth border border-lsecondary rounded text-khder font-semibold"
            >
              Voir l'agrément (PDF)
            </a>
          ) : (
            <img
              src={profile.agrement}
              alt="Agrément"
              className="h-20 rounded bg-[#fafafa] border border-lsecondary p-2 w-full object-contain"
            />
          )}
        </div>
        <div className="md:col-span-2 text-right">
          <button
            className="bg-khder text-white font-semibold rounded-lg py-3 px-8 mt-2 shadow hover:bg-[#2d3d2a] transition"
            type="button"
            onClick={() => setShowEditCard(true)}
          >
            Modifier informations
          </button>
        </div>
      </form>
    </div>
  );

  // Edit card for modifiable fields
  const renderEditCard = () => (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-stretch">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
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
          <button className="w-full bg-khder text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition" type="submit">
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

  // Patients list
  const renderPatients = () => (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-stretch">
      <h2 className="text-xl font-bold text-khder mb-6"> patients</h2>
      {patients.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <Users size={64} className="mx-auto mb-2" />
          <p>Aucun patient trouvé</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {patients.map((patient) => (
            <div key={patient.id} className="flex flex-col md:flex-row justify-between items-center bg-smth rounded-lg mb-2 shadow p-5 w-full">
              <div>
                <div><b>Nom:</b> {patient.nom} {patient.prenom}</div>
                <div><b>Âge:</b> {patient.age}</div>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  className="bg-khder text-white font-semibold rounded-lg px-4 py-2 shadow hover:bg-[#2d3d2a] transition"
                  onClick={() => setSelectedPatient(patient)}
                >
                  Voir les prescriptions
                </button>
                <button
                  className="bg-tchini text-[#222] font-semibold rounded-lg px-4 py-2 shadow hover:bg-yellow-400 transition"
                  onClick={() => { setSelectedPatient(patient); setShowAddPrescription(true); }}
                >
                  Ajouter une ordonnance
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Patient's prescriptions
  const renderPatientPrescriptions = (patient) => (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-stretch">
      <h2 className="text-xl font-bold text-khder mb-6">
        Ordonnances de {patient.nom} {patient.prenom}
      </h2>
      {patient.prescriptions.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <FileText size={64} className="mx-auto mb-2" />
          <p>Aucune ordonnance trouvée</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {patient.prescriptions.map((presc) => (
            <div key={presc.id} className="flex flex-col md:flex-row justify-between items-center bg-smth rounded-lg mb-2 shadow p-5 w-full">
              <div>
                <div><b>Date:</b> {presc.date}</div>
              </div>
              <button
                className="bg-tchini text-[#222] font-semibold rounded-lg px-4 py-2 shadow hover:bg-yellow-400 transition mt-4 md:mt-0"
                onClick={() => setSelectedPrescription(presc)}
              >
                Détails
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-gray-500 transition"
          onClick={() => setSelectedPatient(null)}
        >
          Retourner
        </button>
      </div>
    </div>
  );

  // Ordonnance details (same style as client)
  const renderPrescriptionDetails = (presc) => (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-stretch">
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <strong>{presc.doctor}</strong><br />
                {presc.specialite}<br />
                12, Rue des Lilas 16000<br />
                Alger<br />
                Téléphone: 06 12 34 56 78
              </div>
              <div className="bg-[#fafafa] border border-gray-300 rounded-lg px-6 py-3 min-w-[180px] mt-4 md:mt-0">
                <div><b>Nom:</b> {selectedPatient.nom}</div>
                <div><b>Prénom:</b> {selectedPatient.prenom}</div>
                <div><b>Âge:</b> {selectedPatient.age}</div>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span><b>Fait le :</b> {presc.date}</span>
            </div>
            <h2 className="text-center font-bold text-lg my-3">Ordonnance</h2>
            <div className="mb-4">
              {presc.medications.map((med, idx) => (
                <div key={idx} className="mb-2">
                  <b className="text-base">{med.nom}</b> — {med.posologie} | Quantité: {med.quantite}
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-end justify-between mt-6 gap-6">
              <div className="flex flex-col items-center">
                <Barcode value={presc.id || "0000-000"} height={60} width={2} fontSize={18} />
              </div>
              <div className="flex gap-8 items-center">
                <div className="text-center">
                  Signature:<br />
                  <img
                    src={"/assets/signature of the same medecin.png"}
                    alt="Signature"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
                <div className="text-center">
                  Cachet:<br />
                  <img
                    src={"/assets/personalized cachet for medecin with text replaced with infos from the screenshot.png"}
                    alt="Cachet"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-gray-500 transition"
          onClick={() => setSelectedPrescription(null)}
        >
          Retourner
        </button>
      </div>
    </div>
  );

  // Add prescription form
  const handlePrescriptionChange = (idx, field, value) => {
    const meds = [...newPrescription.medications];
    meds[idx][field] = value;
    setNewPrescription({ ...newPrescription, medications: meds });
  };

  const handleAddMed = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [...newPrescription.medications, { nom: '', posologie: '', quantite: '' }]
    });
  };

  const handleRemoveMed = (idx) => {
    const meds = newPrescription.medications.filter((_, i) => i !== idx);
    setNewPrescription({ ...newPrescription, medications: meds });
  };

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    const updatedPatients = patients.map(p =>
      p.id === selectedPatient.id
        ? {
            ...p,
            prescriptions: [
              ...p.prescriptions,
              {
                id: `ORD${Math.floor(Math.random() * 10000)}`,
                date: newPrescription.date,
                medications: newPrescription.medications,
                doctor: profile.nom,
                specialite: profile.specialite
              }
            ]
          }
        : p
    );
    setPatients(updatedPatients);
    setShowAddPrescription(false);
    setNewPrescription({ date: '', medications: [{ nom: '', posologie: '', quantite: '' }] });
  };

  const renderAddPrescription = () => (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-stretch">
      <h2 className="text-xl font-bold text-khder mb-6">Ajouter une ordonnance</h2>
      <form className="flex flex-col gap-6" onSubmit={handlePrescriptionSubmit}>
        <div>
          <label className="block text-khder font-semibold mb-1">Date</label>
          <input
            type="date"
            value={newPrescription.date}
            onChange={e => setNewPrescription({ ...newPrescription, date: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Médicaments</label>
          {newPrescription.medications.map((med, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 mb-2 w-full">
              <input
                type="text"
                placeholder="Nom"
                value={med.nom}
                onChange={e => handlePrescriptionChange(idx, 'nom', e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              <input
                type="text"
                placeholder="Posologie"
                value={med.posologie}
                onChange={e => handlePrescriptionChange(idx, 'posologie', e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              <input
                type="number"
                placeholder="Quantité"
                value={med.quantite}
                onChange={e => handlePrescriptionChange(idx, 'quantite', e.target.value)}
                required
                min={1}
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              {newPrescription.medications.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMed(idx)}
                  className="text-red-600 font-semibold ml-0 md:ml-2 mt-2 md:mt-0 whitespace-nowrap"
                  style={{ flexShrink: 0 }}
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-tchini text-[#222] font-semibold rounded-lg px-4 py-2 shadow hover:bg-yellow-400 transition mt-2"
            onClick={handleAddMed}
          >
            Ajouter un médicament
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button className="w-full bg-khder text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition" type="submit">
            Enregistrer
          </button>
          <button
            className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
            type="button"
            onClick={() => setShowAddPrescription(false)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );

  // Settings (copy from client)
  const renderSettings = () => (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-stretch">
      <h2 className="text-xl font-bold text-khder mb-6">Paramètres</h2>
      <div className="flex flex-col gap-4 mt-4">
        <button className="bg-khder text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition" type="button">
          Changer le mot de passe
        </button>
        <button className="bg-red-100 text-red-600 font-semibold rounded-lg py-3 shadow hover:bg-red-200 transition" type="button">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );

  // Main content
  let content;
  if (activeSection === 'profile') content = showEditCard ? renderEditCard() : renderProfile();
  else if (activeSection === 'patients') {
    if (showAddPrescription) content = renderAddPrescription();
    else if (selectedPrescription) content = renderPrescriptionDetails(selectedPrescription);
    else if (selectedPatient) content = renderPatientPrescriptions(selectedPatient);
    else content = renderPatients();
  }
  else if (activeSection === 'settings') content = renderSettings();

  // Sidebar click
  const handleSidebarClick = (id) => {
    if (id === 'logout') {
      window.location.href = '/login';
    } else {
      setActiveSection(id);
      setSelectedPatient(null);
      setSelectedPrescription(null);
      setShowAddPrescription(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-lfond">
      <aside className="fixed top-0 left-0 h-full w-60 bg-khder text-white flex flex-col items-center z-50 shadow-lg">
        <div className="text-xl font-bold mt-8 mb-10 tracking-wide">MédecinConnect</div>
        <nav className="flex flex-col w-full gap-0 mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`flex items-center gap-3 px-6 py-3 w-full text-base font-medium transition border-l-4 ${
                  activeSection === item.id
                    ? "bg-[#355c3a] text-white border-l-tchini"
                    : "text-[#e6f2e9] border-l-transparent hover:bg-[#355c3a]"
                }`}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 ml-60 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
        {content}
      </main>
    </div>
  );
};

export default DoctorDashboard;