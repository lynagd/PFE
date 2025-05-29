import React from 'react';
import { FileText } from 'lucide-react';
import Barcode from 'react-barcode';

const ClientPrescriptions = ({
  prescriptions,
  selectedPrescription,
  setSelectedPrescription,
  handleDownloadPDF,
  handleFindPharmacy
}) => {
  const cardClass = "bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0";

  const renderPrescriptionDetails = (prescription) => (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-[600px] max-w-2xl flex flex-col items-stretch mx-auto">
        <div className="prescription-layout">
          <div className="flex flex-col gap-4">
            {/* Doctor info */}
            <div>
              <strong>{prescription.doctor?.nom || "Dr. Benali Ahmed"}</strong><br />
              {prescription.doctor?.specialite || "Médecin Généraliste"}<br />
              {prescription.doctor?.wilaya || "Alger"}<br />
              Tel : {prescription.doctor?.telephone || "06 12 34 56 78"}<br />
            </div>
            <h2 className="text-center font-bold text-lg my-3">Ordonnance</h2>
            {/* Date and patient info row */}
            <div className="flex flex-row justify-between items-start mb-4">
              <span className="text-left"><b>Fait le :</b> {prescription.date_prescription || prescription.date}</span>
              <div className="bg-[#fafafa] border border-gray-300 rounded-lg px-6 py-3 min-w-[180px]">
                <div><b>Patient(e)&nbsp;:</b> {prescription.patient?.nom || "Ahmed"} {prescription.patient?.prenom || "Benali"}</div>
                <div><b>Age&nbsp;:</b> {prescription.patient?.age || "34"} ans</div>
              </div>
            </div>
            <div className="mb-4">
              {prescription.produits_prescrits?.map((med, idx) => {
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
              {prescription.instruction_supplementaire && (
                <div className="mt-2 italic text-gray-700">
                  {prescription.instruction_supplementaire}
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-end justify-between mt-6 gap-6">
              <div className="flex flex-col items-center">
                <Barcode value={prescription.codebarre || prescription.id || '0000-000'} height={60} width={2} fontSize={18} />
              </div>
              <div className="flex gap-8 items-center">
                <div className="text-center">
                  Signature:<br />
                  <img
                    src={prescription.signatureUrl || "/signature-placeholder.png"}
                    alt="Signature"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
                <div className="text-center">
                  Cachet:<br />
                  <img
                    src={prescription.cachetUrl || "/cachet-placeholder.png"}
                    alt="Cachet"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full max-w-2xl">
        <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-600 transition" onClick={handleDownloadPDF}>
          Enregistrer
        </button>
        <button
          className="w-full bg-[#3d5a40] text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition"
          onClick={() => handleFindPharmacy(prescription)}
        >
          Chercher dans pharmacie
        </button>
        <button
          className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
          onClick={() => setSelectedPrescription(null)}
        >
          Retour à la liste
        </button>
      </div>
    </div>
  );

  return selectedPrescription ? (
    renderPrescriptionDetails(selectedPrescription)
  ) : (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-[#3d5a40] mb-6"> Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <FileText size={64} className="mx-auto mb-2" />
          <p>Aucune prescription trouvée</p>
        </div>
      ) : (
        <div>
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="flex flex-col md:flex-row justify-between items-center bg-[#f9f8f4] rounded-lg mb-4 shadow p-5 w-full">
              <div className="flex-1 min-w-0">
                <div><b>Médecin:</b> {prescription.doctor?.nom}</div>
                <div><b>Spécialité:</b> {prescription.doctor?.specialite}</div>
                <div><b>Date:</b> {prescription.date_prescription}</div>
              </div>
              <button
                className="mt-4 md:mt-0 md:ml-4 bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-600 transition"
                onClick={() => setSelectedPrescription(prescription)}
              >
                Détails
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientPrescriptions;