import React, { useRef, useEffect } from "react";

const PrescriptionDetails = ({ presc, onBack }) => {
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
          onClick={onBack}
        >
          Retourner
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;