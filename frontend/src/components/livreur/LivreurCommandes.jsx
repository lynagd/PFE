import React from "react";

const statusColor = (status) => {
  if (status === "En cours" || status === "Acceptée")
    return "bg-[#fff7d6] text-[#8d7b2a] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
  if (status === "Livrée")
    return "bg-[#dbeaf3] text-[#3d8abf] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
  if (status === "Non livrée" || status === "En attente")
    return "bg-[#f4f4f4] text-[#444] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
  return "bg-gray-300 text-[#222] font-bold rounded-xl px-6 py-3 text-base shadow-none border-none flex items-center justify-center";
};

const LivreurCommandes = ({
  myCommandes,
  handleStatusClick,
  disponible,
  setDisponible,
}) => (
  <div className="w-full flex flex-col gap-8 mt-10 items-start">
    {/* Title and Disponibilité Toggle on the same line */}
    <div className="w-full flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-khder">Livraisons</h2>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition ${
          disponible
            ? "bg-emerald-100 text-emerald-700 border-emerald-400 hover:bg-emerald-200"
            : "bg-red-100 text-red-700 border-red-400 hover:bg-red-200"
        }`}
        onClick={() => setDisponible((d) => !d)}
        title="Changer la disponibilité"
      >
        {disponible ? (
          <>
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Disponible
          </>
        ) : (
          <>
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
            Non disponible
          </>
        )}
      </button>
    </div>
    {myCommandes.length === 0 ? (
      <div className="bg-lfond rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0">
        <table className="min-w-full border-separate border-spacing-0 font-sans mt-4">
          <thead>
            <tr>
              <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                Commande
              </th>
              <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                Client
              </th>
              <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                Téléphone
              </th>
              <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                Adresse
              </th>
              <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                Date
              </th>
              <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                Total
              </th>
              <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7}>
                <div className="text-gray-400 italic py-6 text-lg text-center">
                  Aucune livraison assignée.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      myCommandes.map((pharmacy, idx) => (
        <div
          key={idx}
          className="bg-lfond rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0"
        >
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-khder text-left mb-2 font-sans">
              {pharmacy.pharmacyName}
            </h2>
            <div className="text-khder text-lg text-left mb-4 font-sans">
              {pharmacy.pharmacyAddress}
            </div>
          </div>
          <div>
            {pharmacy.commandes.length === 0 ? (
              <table className="min-w-full border-separate border-spacing-0 font-sans">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                      Commande
                    </th>
                    <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                      Client
                    </th>
                    <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                      Téléphone
                    </th>
                    <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                      Adresse
                    </th>
                    <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                      Date
                    </th>
                    <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                      Total
                    </th>
                    <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7}>
                      <div className="text-gray-400 italic py-6 text-lg text-center">
                        Aucune commande assignée.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div>
                <table className="min-w-full border-separate border-spacing-0 font-sans">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Commande
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Client
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Téléphone
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Adresse
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Date
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Total
                      </th>
                      <th className="py-3 px-4 text-khder font-bold text-lg border-b-2 border-gray-200 bg-lfond text-left font-sans">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pharmacy.commandes.map((cmd, i) => (
                      <tr
                        key={cmd.id}
                        className={i % 2 === 1 ? "bg-smth" : ""}
                      >
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.id}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top whitespace-pre-line font-sans">
                          {cmd.client}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.telephone}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top whitespace-pre-line font-sans">
                          {cmd.adresse}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.date}
                        </td>
                        <td className="py-6 px-4 text-[#222] align-top font-sans">
                          {cmd.total}
                        </td>
                        <td className="py-4 px-4 align-top font-sans">
                          {cmd.status === "En cours" || cmd.status === "Acceptée" ? (
                            <span
                              className={statusColor("Acceptée")}
                              style={{
                                minWidth: "110px",
                                minHeight: "56px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                border: "none",
                                cursor: "pointer",
                              }}
                              title="Cliquer pour marquer comme Livrée"
                              onClick={() => handleStatusClick(idx, i)}
                            >
                              Acceptée
                            </span>
                          ) : (
                            <span
                              className={statusColor(cmd.status)}
                              style={{
                                minWidth: "110px",
                                minHeight: "56px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                border: "none",
                              }}
                            >
                              {cmd.status === "Livrée" ? "Livrée" : cmd.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ))
    )}
  </div>
);

export default LivreurCommandes;