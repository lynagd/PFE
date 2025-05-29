import React from "react";

const LivreurPharmacies = ({ pharmaciesList }) => (
  <div className="bg-lfond rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
    <h2 className="text-xl font-bold text-khder mb-6">Pharmacies</h2>
    <div className="flex flex-col gap-4">
      {pharmaciesList.map((ph, idx) => (
        <div
          key={idx}
          className="bg-smth rounded-lg shadow p-5 w-full flex flex-col mb-2"
        >
          <div>
            <b>{ph.nom}</b>
            <div className="text-[0.98rem]">📍 {ph.adresse}</div>
            <div className="text-[0.98rem]">
              📞 {ph.telephone} | ✉️ {ph.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LivreurPharmacies;