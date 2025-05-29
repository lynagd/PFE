import React from 'react';
import { Users, FileText } from 'lucide-react';

const DoctorPatients = ({
  patients,
  searchQuery,
  setSearchQuery,
  setSelectedPatient,
  setShowAddPrescription,
  setShowAddPatient
}) => (
  <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
    <h2 className="text-xl font-bold text-khder mb-6">Patients</h2>
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
                    onClick={() => setSelectedPatient(patient)}
                  >
                    Voir les prescriptions
                  </button>
                </td>
                <td className="py-4 px-4">
                  <button
                    className="bg-yellow-500 text-[#222] font-semibold rounded-lg px-4 py-2 shadow hover:bg-yellow-600 transition text-sm"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setShowAddPrescription(true);
                    }}
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
            onClick={() => setShowAddPatient(true)}
          >
            Ajouter un patient
          </button>
        </div>
      )}
    </div>
  </div>
);

export default DoctorPatients;