import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorHeader from "../components/doctor/DoctorHeader";
import DoctorPatients from "../components/doctor/DoctorPatients";
import PrescriptionDetails from "../components/doctor/PrescriptionDetails";
import AddPrescriptionForm from "../components/doctor/AddPrescriptionForm";
import AddPatientForm from "../components/doctor/AddPatientForm";

const doctorProfile = {
  nom: "Yacine",
  prenom: "B.",
  specialite: "Médecin Généraliste",
  wilaya: "Alger",
  telephone: "+213 555 987 654",
  signature: "/assets/doctor-signature.png",
  cachet: "/assets/doctor-cachet.png"
};

const DoctorPatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patients from backend
  useEffect(() => {
    setLoading(true);
    axios.get("/api/patients/")
      .then(res => {
        // Defensive: always set an array
        const data = res.data.results || res.data.data || res.data;
        setPatients(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError("Erreur lors du chargement des patients");
        setLoading(false);
      });
  }, []);

  // Fetch prescriptions for selected patient
  const fetchPatientPrescriptions = (patientId) => {
    axios.get(`/api/patients/${patientId}/prescriptions/`)
      .then(res => {
        setSelectedPatient(prev => prev ? { ...prev, prescriptions: res.data } : prev);
      })
      .catch(err => setError("Erreur lors du chargement des ordonnances"));
  };

  // When a patient is selected, fetch their prescriptions
  useEffect(() => {
    if (selectedPatient && selectedPatient.id) {
      fetchPatientPrescriptions(selectedPatient.id);
    }
  }, [selectedPatient?.id]);

  // Add prescription via API
  const handleAddPrescription = (patientId, prescriptionData) => {
    axios.post(`/api/patients/${patientId}/prescriptions/`, prescriptionData)
      .then(res => {
        // Refetch prescriptions for this patient
        fetchPatientPrescriptions(patientId);
        setShowAddPrescription(false);
      })
      .catch(err => alert("Erreur lors de l'ajout de l'ordonnance"));
  };

  // Add patient via API
  const handleAddPatient = (patientData) => {
    axios.post("/api/patients/", patientData)
      .then(res => {
        setPatients(prev => [...prev, res.data]);
        setShowAddPatient(false);
      })
      .catch(() => alert("Erreur lors de l'ajout du patient"));
  };

  // Render ordonnance list for selected patient
  const renderPatientPrescriptions = (patient) => (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">
        Ordonnances de {patient.nom} {patient.prenom}
      </h2>
      {(!patient.prescriptions || patient.prescriptions.length === 0) ? (
        <div className="text-center text-gray-400 py-10">
          <p>Aucune ordonnance trouvée</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {patient.prescriptions.map((presc) => (
            <div
              key={presc.id}
              className="flex flex-col md:flex-row justify-between items-center bg-[#fcfefd] rounded-lg mb-2 shadow p-5 w-full"
            >
              <div>
                <div>
                  <b>Date:</b> {presc.date_prescription || presc.date || "-"}
                </div>
              </div>
              <button
                className="bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-600 transition"
                onClick={() => setSelectedPrescription(presc)}
              >
                Détails
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-8 w-full">
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg px-7 py-2 shadow hover:bg-gray-500 transition w-full md:w-auto"
          onClick={() => setSelectedPatient(null)}
        >
          Retourner
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <DoctorHeader profile={doctorProfile} />
      <main className="flex-1 p-8">
        {loading && <div>Chargement des patients...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          selectedPrescription
            ? <PrescriptionDetails presc={selectedPrescription} onBack={() => setSelectedPrescription(null)} />
            : showAddPrescription
              ? <AddPrescriptionForm
                  selectedPatient={selectedPatient}
                  onAddPrescription={handleAddPrescription}
                  setShowAddPrescription={setShowAddPrescription}
                  setSelectedPatient={setSelectedPatient}
                  doctorProfile={doctorProfile}
                />
              : showAddPatient
                ? <AddPatientForm
                    onSave={handleAddPatient}
                    onCancel={() => setShowAddPatient(false)}
                  />
                : selectedPatient
                  ? renderPatientPrescriptions(selectedPatient)
                  : (
                    <DoctorPatients
                      patients={Array.isArray(patients) ? patients : []}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      setSelectedPatient={setSelectedPatient}
                      setShowAddPrescription={setShowAddPrescription}
                      setShowAddPatient={setShowAddPatient}
                    />
                  )
        )}
      </main>
    </div>
  );
};

export default DoctorPatientsPage;