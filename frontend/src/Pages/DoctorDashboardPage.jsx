import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Settings, LogOut, Users, Stethoscope, FileText, Pencil } from 'lucide-react';
import Barcode from 'react-barcode';

const samplePatients = [
  {
    id: 1,
    nom: 'Ahmed',
    prenom: 'Benali',
    age: 34,
    date_naissance: '1990-02-15',
    prescriptions: [
      {
        id: 'ORD001',
        doctor: {
          nom: 'Dr. Yacine B.',
          specialite: 'Médecin Généraliste',
          wilaya: 'Alger',
          telephone: '+213 555 987 654'
        },
        patient: {
          nom: 'Ahmed',
          prenom: 'Benali',
          age: 34
        },
        date_prescription: '2024-05-18',
        codebarre: '0291-672',
        produits_prescrits: [
          {
            nom: 'Amoxicilline 500mg',
            dosage: '500mg',
            forme: 'Comprimé',
            quantite: 2,
            instruction: '3x/jour pendant 7 jours'
          },
          {
            nom: 'Doliprane 1000mg',
            dosage: '1000mg',
            forme: 'Comprimé',
            quantite: 1,
            instruction: '2x/jour après repas'
          }
        ],
        instruction_supplementaire: '',
        signatureUrl: '/assets/doctor-signature.png',
        cachetUrl: '/assets/doctor-cachet.png'
      },
      {
        id: 'ORD002',
        doctor: {
          nom: 'Dr. Yacine B.',
          specialite: 'Médecin Généraliste',
          wilaya: 'Alger',
          telephone: '+213 555 987 654'
        },
        patient: {
          nom: 'Ahmed',
          prenom: 'Benali',
          age: 34
        },
        date_prescription: '2024-05-22',
        codebarre: '123456',
        produits_prescrits: [
          {
            nom: 'Ibuprofène 400mg',
            dosage: '400mg',
            forme: 'Comprimé',
            quantite: 2,
            instruction: '1x/jour'
          },
          {
            nom: 'Vitamine C 500mg',
            dosage: '500mg',
            forme: 'Comprimé',
            quantite: 1,
            instruction: '1x/jour'
          }
        ],
        instruction_supplementaire: '',
        signatureUrl: '/assets/doctor-signature.png',
        cachetUrl: '/assets/doctor-cachet.png'
      }
    ]
  },
  {
    id: 2,
    nom: 'Sara',
    prenom: 'Boukhalfa',
    age: 28,
    date_naissance: '1996-07-03',
    prescriptions: []
  }
];

const DoctorDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse params from URL
  const params = new URLSearchParams(location.search);
  const section = params.get('section') || 'profile';
  const patientId = params.get('patient');
  const prescriptionId = params.get('prescription');
  const addPrescriptionOpen = params.get('addPrescription') === '1';
  const addPatientOpen = params.get('addPatient') === '1';
  const editProfileOpen = params.get('edit') === '1';
  const passwordFormOpen = params.get('password') === '1';

  // State
  const [patients, setPatients] = useState(samplePatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState({
    nom: 'Yacine',
    prenom: 'B.',
    email: 'yacine.b@email.com',
    date_naissance: '1980-04-15',
    sexe: 'Masculin',
    specialite: 'Médecin Généraliste',
    wilaya: 'Alger',
    commune: 'El Madania',
    adresse: '12, Rue des Lilas, Alger',
    telephone: '+213 555 987 654',
    cachet: '/assets/doctor-cachet.png',
    signature: '/assets/doctor-signature.png',
    agrement: '/assets/doctor-agrement.pdf'
  });
  const [editProfile, setEditProfile] = useState({
    nom: profile.nom,
    prenom: profile.prenom,
    email: profile.email,
    wilaya: profile.wilaya,
    commune: profile.commune,
    adresse: profile.adresse,
    telephone: profile.telephone,
    sexe: profile.sexe,
  });
  const [newPrescription, setNewPrescription] = useState({
    date_prescription: '',
    produits_prescrits: [{ nom: '', dosage: '', forme: '', quantite: '', instruction: '' }],
    instruction_supplementaire: ''
  });
  const [newPatient, setNewPatient] = useState({
    nom: '',
    prenom: '',
    date_naissance: ''
  });
  const [passwordFields, setPasswordFields] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Find selected patient and prescription
  const selectedPatient = patients.find(p => String(p.id) === patientId);
  const selectedPrescription = selectedPatient
    ? selectedPatient.prescriptions.find(p => p.id === prescriptionId)
    : null;

  // Handlers
  const handleProfileEdit = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProfile({ ...profile, ...editProfile });
    navigate('?section=profile');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields({ ...passwordFields, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordFields({ current: '', new: '', confirm: '' });
    navigate('?section=settings');
  };

  const handlePrescriptionChange = (idx, field, value) => {
    setNewPrescription((prev) => ({
      ...prev,
      produits_prescrits: prev.produits_prescrits.map((med, i) =>
        i === idx ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleAddMed = () => {
    setNewPrescription((prev) => ({
      ...prev,
      produits_prescrits: [...prev.produits_prescrits, { nom: '', dosage: '', forme: '', quantite: '', instruction: '' }]
    }));
  };

  const handleRemoveMed = (idx) => {
    setNewPrescription((prev) => ({
      ...prev,
      produits_prescrits: prev.produits_prescrits.filter((_, i) => i !== idx)
    }));
  };

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const date_prescription = `${yyyy}-${mm}-${dd}`;

    const newOrd = {
      id: `ORD${Math.floor(Math.random() * 100000)}`,
      doctor: {
        nom: `${profile.nom} ${profile.prenom}`,
        specialite: profile.specialite,
        wilaya: profile.wilaya,
        telephone: profile.telephone
      },
      patient: {
        nom: selectedPatient.nom,
        prenom: selectedPatient.prenom,
        age: selectedPatient.age
      },
      date_prescription,
      codebarre: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
      produits_prescrits: newPrescription.produits_prescrits,
      instruction_supplementaire: newPrescription.instruction_supplementaire,
      signatureUrl: '/assets/doctor-signature.png',
      cachetUrl: '/assets/doctor-cachet.png'
    };
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? { ...p, prescriptions: [...p.prescriptions, newOrd] }
          : p
      )
    );
    setNewPrescription({
      produits_prescrits: [{ nom: '', dosage: '', forme: '', quantite: '', instruction: '' }],
      instruction_supplementaire: ''
    });
    navigate(`?section=patients&patient=${selectedPatient.id}`);
  };

  // Sidebar navigation
  const sidebarItems = [
    { id: 'profile', icon: User, label: ' Profil' },
    { id: 'patients', icon: Users, label: ' Patients' },
    { id: 'settings', icon: Settings, label: ' Paramètres' },
    { id: 'logout', icon: LogOut, label: ' Déconnexion' }
  ];

  const handleSidebarClick = (id) => {
    if (id === 'logout') {
      window.location.href = '/login';
    } else {
      navigate(`?section=${id}`);
    }
  };

  // Patients list
  const renderPatients = () => (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">Mes patients</h2>
      <input
        type="text"
        placeholder="Rechercher un patient par nom ou prénom..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] w-full max-w-md"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#faf8f3] rounded-xl shadow font-sans">
          <thead>
            <tr>
              <th className="py-3 px-4 text-khder font-bold text-base border-b-2 border-lsecondary text-left">Nom</th>
              <th className="py-3 px-4 text-khder font-bold text-base border-b-2 border-lsecondary text-left">Prénom</th>
              <th className="py-3 px-4 text-khder font-bold text-base border-b-2 border-lsecondary text-left">Date de naissance</th>
              <th className="py-3 px-4 text-khder font-bold text-base border-b-2 border-lsecondary text-left">Prescriptions</th>
              <th className="py-3 px-4 text-khder font-bold text-base border-b-2 border-lsecondary text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients
              .filter(
                (patient) =>
                  patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  patient.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (patient.date_naissance && patient.date_naissance.includes(searchQuery))
              )
              .map((patient, idx) => (
                <tr key={patient.id} className={idx % 2 === 1 ? "bg-smth" : ""}>
                  <td className="py-4 px-4 text-[#222]">{patient.nom}</td>
                  <td className="py-4 px-4 text-[#222]">{patient.prenom}</td>
                  <td className="py-4 px-4 text-[#222]">{patient.date_naissance || "-"}</td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-khder text-white font-semibold rounded-lg px-4 py-2 shadow hover:bg-[#2d3d2a] transition text-sm"
                      onClick={() => navigate(`?section=patients&patient=${patient.id}`)}
                    >
                      Voir les prescriptions
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-yellow-500 text-[#222] font-semibold rounded-lg px-4 py-2 shadow hover:bg-yellow-600 transition text-sm"
                      onClick={() => navigate(`?section=patients&patient=${patient.id}&addPrescription=1`)}
                    >
                      Ajouter une ordonnance
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {patients.filter(
          (patient) =>
            patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.prenom.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
          <div className="text-center text-gray-400 py-10">
            <Users size={64} className="mx-auto mb-2" />
            <p>Aucun patient trouvé</p>
            <button
              className="mt-4 bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-600 transition"
              onClick={() => navigate(`?section=patients&addPatient=1`)}
            >
              Ajouter un patient
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Patient's prescriptions
  const renderPatientPrescriptions = (patient) => (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
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
            <div
              key={presc.id}
              className="flex flex-col md:flex-row justify-between items-center bg-smth rounded-lg mb-2 shadow p-5 w-full"
            >
              <div>
                <div>
                  <b>Date:</b> {presc.date_prescription || presc.date || "-"}
                </div>
              </div>
              <button
                className="bg-yellow-500 text-[#222] font-semibold rounded-lg px-4 py-2 shadow hover:bg-yellow-600 transition mt-4 md:mt-0"
                onClick={() => navigate(`?section=patients&patient=${patient.id}&prescription=${presc.id}`)}
              >
                Détails
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end gap-4 mt-8 w-full">
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg px-7 py-2 shadow hover:bg-gray-500 transition w-full md:w-auto"
          onClick={() => navigate(`?section=patients`)}
        >
          Retourner
        </button>
      </div>
    </div>
  );

  // Ordonnance details
  const renderPrescriptionDetails = (presc) => (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-[600px] max-w-2xl flex flex-col items-stretch mx-auto">
        <div>
          <div className="flex flex-col gap-4">
            {/* Doctor info */}
            <div>
              <strong>{presc.doctor?.nom}</strong><br />
              {presc.doctor?.specialite}<br />
              {presc.doctor?.wilaya}<br />
              Tel : {presc.doctor?.telephone}<br />
            </div>
            <h2 className="text-center font-bold text-lg my-3">Ordonnance</h2>
            {/* Date and patient info row */}
            <div className="flex flex-row justify-between items-start mb-4">
              <span className="text-left"><b>Fait le :</b> {presc.date_prescription}</span>
              <div className="bg-[#fafafa] border border-gray-300 rounded-lg px-6 py-3 min-w-[180px]">
                <div><b>Patient(e)&nbsp;:</b> {presc.patient?.nom} {presc.patient?.prenom}</div>
                <div><b>Age&nbsp;:</b> {presc.patient?.age} ans</div>
              </div>
            </div>
            <div className="mb-4">
              {presc.produits_prescrits?.map((med, idx) => {
                const showDosage = med.dosage && !med.nom.includes(med.dosage);
                return (
                  <div key={idx} className="mb-2">
                    <b className="text-base">
                      {med.nom}
                      {showDosage ? ` ${med.dosage}` : ""}
                      {med.forme ? ` (${med.forme})` : ""}
                    </b>
                    {med.instruction && <div className="ml-2">{med.instruction}</div>}
                    <div>
                      {med.quantite !== undefined && <>Qte: {med.quantite}</>}
                    </div>
                  </div>
                );
              })}
              {presc.instruction_supplementaire && (
                <div className="mt-2 italic text-gray-700">
                  {presc.instruction_supplementaire}
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-end justify-between mt-6 gap-6">
              <div className="flex flex-col items-center">
                <Barcode value={presc.codebarre || presc.id || '0000-000'} height={60} width={2} fontSize={18} />
              </div>
              <div className="flex gap-8 items-center">
                <div className="text-center">
                  Signature:<br />
                  <img
                    src={presc.signatureUrl || "/assets/doctor-signature.png"}
                    alt="Signature"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
                <div className="text-center">
                  Cachet:<br />
                  <img
                    src={presc.cachetUrl || "/assets/doctor-cachet.png"}
                    alt="Cachet"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8 w-full max-w-2xl">
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg px-9 py-2 shadow hover:bg-gray-500 transition w-auto self-end"
          onClick={() => navigate(`?section=patients&patient=${selectedPatient.id}`)}
        >
          Retourner
        </button>
      </div>
    </div>
  );

  // Add prescription form
  const renderAddPrescription = () => (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">Ajouter une ordonnance</h2>
      <form className="flex flex-col gap-6" onSubmit={handlePrescriptionSubmit}>
        {/* Date input removed */}
        <div>
          <label className="block text-khder font-semibold mb-1">Médicaments</label>
          {newPrescription.produits_prescrits.map((med, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 mb-2 w-full">
              <input
                type="text"
                placeholder="Nom"
                value={med.nom}
                onChange={(e) => handlePrescriptionChange(idx, 'nom', e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              <input
                type="text"
                placeholder="Dosage"
                value={med.dosage}
                onChange={(e) => handlePrescriptionChange(idx, 'dosage', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              <input
                type="text"
                placeholder="Forme"
                value={med.forme}
                onChange={(e) => handlePrescriptionChange(idx, 'forme', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              <input
                type="number"
                placeholder="Quantité"
                value={med.quantite}
                onChange={(e) => handlePrescriptionChange(idx, 'quantite', e.target.value)}
                required
                min={1}
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              <input
                type="text"
                placeholder="Instruction"
                value={med.instruction}
                onChange={(e) => handlePrescriptionChange(idx, 'instruction', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-lsecondary bg-smth text-[#222] min-w-0"
              />
              {newPrescription.produits_prescrits.length > 1 && (
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
            className="bg-yellow-500 text-[#222] font-semibold rounded-lg px-4 py-2 shadow hover:bg-yellow-600 transition mt-2"
            onClick={handleAddMed}
          >
            Ajouter un médicament
          </button>
        </div>
        <div>
          <label className="block text-khder font-semibold mb-1">Instructions supplémentaires</label>
          <input
            type="text"
            value={newPrescription.instruction_supplementaire}
            onChange={(e) => setNewPrescription({ ...newPrescription, instruction_supplementaire: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button
            className="w-full bg-khder text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition"
            type="submit"
          >
            Enregistrer
          </button>
          <button
            className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
            type="button"
            onClick={() => navigate(`?section=patients&patient=${selectedPatient.id}`)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );

  // Add patient form
  const renderAddPatientForm = () => (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-2xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">Ajouter un patient</h2>
      <form className="flex flex-col gap-6" onSubmit={handleAddPatientSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Nom</label>
            <input
              type="text"
              name="nom"
              value={newPatient.nom}
              onChange={handleAddPatientChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={newPatient.prenom}
              onChange={handleAddPatientChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Date de naissance</label>
            <input
              type="date"
              name="date_naissance"
              value={newPatient.date_naissance}
              onChange={handleAddPatientChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button
            className="w-full bg-khder text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition"
            type="submit"
          >
            Ajouter
          </button>
          <button
            className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
            type="button"
            onClick={() => navigate(`?section=patients`)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );

  // Settings
  const renderSettings = () => (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">Paramètres</h2>
      {!passwordFormOpen ? (
        <div className="flex flex-col gap-4">
          <button
            className="bg-khder text-white font-semibold rounded-lg py-3 px-8 shadow hover:bg-[#2d3d2a] transition w-auto self-start"
            type="button"
            onClick={() => navigate('?section=settings&password=1')}
          >
            Changer le mot de passe
          </button>
          <button
            className="bg-red-100 text-red-600 font-semibold rounded-lg py-3 px-8 shadow hover:bg-red-200 transition w-auto self-start"
            type="button"
          >
            Supprimer mon compte
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Mot de passe actuel</label>
            <input
              type="password"
              name="current"
              value={passwordFields.current}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              name="new"
              value={passwordFields.new}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirm"
              value={passwordFields.confirm}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-600 transition" type="submit">
              Enregistrer les modifications
            </button>
            <button
              type="button"
              className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
              onClick={() => navigate(-1)}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
      <hr className="my-8" />
    </div>
  );

  // Main content
  let content;
  if (section === 'profile') {
    content = editProfileOpen ? (
      // Edit profile card
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
            <button
              className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-600 transition"
              type="submit"
            >
              Enregistrer
            </button>
            <button
              className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
              type="button"
              onClick={() => navigate('?section=profile')}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    ) : (
      // Main profile card (read-only)
      <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
        <h2 className="text-xl font-bold text-khder mb-6"> Profil</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Nom</label>
            <input
              type="text"
              value={profile.nom}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Prénom</label>
            <input
              type="text"
              value={profile.prenom}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Date de naissance</label>
            <input
              type="text"
              value={profile.date_naissance}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Sexe</label>
            <input
              type="text"
              value={profile.sexe}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Spécialité</label>
            <input
              type="text"
              value={profile.specialite}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Wilaya</label>
            <input
              type="text"
              value={profile.wilaya}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Commune</label>
            <input
              type="text"
              value={profile.commune}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Téléphone</label>
            <input
              type="tel"
              value={profile.telephone}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-khder font-semibold mb-1">Adresse</label>
            <textarea
              value={profile.adresse}
              disabled
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] resize-none"
            />
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
            {profile.agrement.endsWith('.pdf') ? (
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
          <div className="md:col-span-2">
            <button
              className="bg-yellow-500 text-[#222] font-bold rounded-lg py-3 px-8 mt-2 shadow hover:bg-yellow-600 transition w-full md:w-auto text-center md:text-left"
              type="button"
              onClick={() => navigate('?section=profile&edit=1')}
              style={{ justifyContent: 'flex-start' }}
            >
              Modifier informations
            </button>
          </div>
        </form>
      </div>
    );
  } else if (section === 'patients') {
    if (addPrescriptionOpen && selectedPatient) content = renderAddPrescription();
    else if (prescriptionId && selectedPatient) content = renderPrescriptionDetails(selectedPrescription);
    else if (patientId) content = renderPatientPrescriptions(selectedPatient);
    else if (addPatientOpen) content = renderAddPatientForm();
    else content = renderPatients();
  } else if (section === 'settings') content = renderSettings();

  return (
    <div className="flex min-h-screen bg-lfond">
      <aside className="fixed top-0 left-0 h-full w-60 bg-[#3d5a40] text-white flex flex-col items-center z-50 shadow-lg">
        <div className="flex items-center gap-3 mt-8 mb-10 tracking-wide text-lg font-bold">
          <span className="flex items-center justify-center bg-[#355c3a] rounded-full w-12 h-12 shadow">
            <Stethoscope size={28} className="text-white" />
          </span>
          <div className="flex flex-col">
            <span className="leading-tight">{profile.nom} {profile.prenom}</span>
            <span className="text-sm font-normal text-white">{profile.specialite}</span>
          </div>
        </div>
        <nav className="flex flex-col w-full gap-0 mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`flex items-center gap-3 px-6 py-3 w-full text-base font-medium transition border-l-4 ${
                  section === item.id
                    ? 'bg-[#355c3a] text-white border-l-tchini'
                    : 'text-[#e6f2e9] border-l-transparent hover:bg-[#355c3a]'
                }`}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 ml-60 flex flex-col items-start py-10 px-12 bg-[#faf8f3] min-h-screen w-full">
        {content}
      </main>
    </div>
  );
};

export default DoctorDashboardPage;