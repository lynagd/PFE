import React, { useState, useRef, useEffect } from "react";
import DoctorHeader from "../components/doctor/DoctorHeader";
import DoctorPatients from "../components/doctor/DoctorPatients";
import PrescriptionDetails from "../components/doctor/PrescriptionDetails";
import AddPrescriptionForm from "../components/doctor/AddPrescriptionForm";

// Sample patients (same as before)
const samplePatients = [
  {
    id: 1,
    nom: "Ahmed",
    prenom: "Benali",
    age: 34,
    date_naissance: "1990-02-15",
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
        date_prescription: '2025-05-25',
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
    nom: "Sara",
    prenom: "Boukhalfa",
    age: 28,
    date_naissance: "1996-07-03",
    prescriptions: []
  }
];

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
  // Load from localStorage or use default
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem("patients");
    return saved ? JSON.parse(saved) : samplePatients;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Save to localStorage whenever patients change
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  // Render ordonnance details
  const renderPrescriptionDetails = (presc) => {
    const barcodeRef = useRef(null);

    useEffect(() => {
      if (window.JsBarcode && barcodeRef.current) {
        window.JsBarcode(barcodeRef.current, presc.codebarre || presc.id || '0000-000', {
          format: "CODE128",
          width: 2,
          height: 50,
          displayValue: true,
        });
      }
    }, [presc]);

    return (
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
              <span className="text-left mb-2"><b>Fait le :</b> {presc.date_prescription}</span>
              <h2 className="text-center font-bold text-lg my-3">Ordonnance</h2>
              {/* Patient info aligned right */}
              <div className="flex justify-end">
                <div className="bg-[#fafafa] border border-gray-300 rounded-lg px-6 py-3 min-w-[180px] mb-4 w-fit text-right">
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
              {/* Barcode */}
              <div className="flex flex-row items-center justify-between mt-6 gap-6">
                <div className="flex flex-col items-center">
                  <svg ref={barcodeRef}></svg>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="text-center">
                    Signature:<br />
                    <img
                      src={presc.signatureUrl || "/assets/doctor-signature.png"}
                      alt="Signature"
                      className="h-12 mt-1 bg-transparent inline-block"
                    />
                  </div>
                  <div className="text-center">
                    Cachet:<br />
                    <img
                      src={presc.cachetUrl || "/assets/doctor-cachet.png"}
                      alt="Cachet"
                      className="h-12 mt-1 bg-transparent inline-block"
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
            onClick={() => setSelectedPrescription(null)}
          >
            Retourner
          </button>
        </div>
      </div>
    );
  };

  // Render ordonnance list for selected patient
  const renderPatientPrescriptions = (patient) => (
    <div className="bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
      <h2 className="text-xl font-bold text-khder mb-6">
        Ordonnances de {patient.nom} {patient.prenom}
      </h2>
      {patient.prescriptions.length === 0 ? (
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
        {selectedPrescription
          ? <PrescriptionDetails presc={selectedPrescription} onBack={() => setSelectedPrescription(null)} />
          : showAddPrescription
            ? <AddPrescriptionForm
                selectedPatient={selectedPatient}
                setPatients={setPatients}
                setShowAddPrescription={setShowAddPrescription}
                setSelectedPatient={setSelectedPatient}
                doctorProfile={doctorProfile}
              />
            : selectedPatient
              ? renderPatientPrescriptions(selectedPatient)
              : (
                <DoctorPatients
                  patients={patients}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setSelectedPatient={setSelectedPatient}
                  setShowAddPrescription={setShowAddPrescription}
                  setShowAddPatient={() => {}} // implement as needed
                />
              )
        }
      </main>
    </div>
  );
};

export default DoctorPatientsPage;