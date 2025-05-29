import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const ClientCommandes = ({
  orders,
  selectedOrder,
  setSelectedOrder,
  navigate
}) => {
  const cardClass = "bg-[#faf8f3] rounded-2xl shadow-none px-12 py-10 w-full max-w-4xl flex flex-col items-stretch ml-0";

  const renderOrderDetails = (order) => (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-[#3d5a40] mb-6">Détails de la commande</h2>
      <div className="mb-4">
        <div><b>Commande:</b> #{order.id}</div>
        <div>
          <b>Pharmacie:</b>{" "}
          <span
            className="inline-flex items-center font-semibold text-green-700 cursor-pointer hover:underline"
            onClick={() => navigate(`/pharmacy-profile/${encodeURIComponent(order.pharmacy)}`)}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/pharmacy-profile/${encodeURIComponent(order.pharmacy)}`);
              }
            }}
          >
            <MapPin size={18} className="mr-1" />
            {order.pharmacy}
          </span>
        </div>
        <div><b>Date:</b> {order.date}</div>
        <div><b>Total:</b> {order.total} DA</div>
        <div>
          <b>Statut:</b>{" "}
          <span
            className={
              "inline-block rounded px-3 py-1 ml-2 text-xs font-semibold " +
              (order.status === "Livrée"
                ? "bg-[#d7f5df] text-[#3d5a40]"
                : order.status === "Acceptée"
                ? "bg-[#fff7d6] text-[#8d7b2a]"
                : order.status === "Non livrée"
                ? "bg-[#f4f4f4] text-[#444]"
                : "bg-[#f4f4f4] text-[#444]")
            }
          >
            {order.status}
          </span>
        </div>
      </div>
      <h3 className="mt-6 mb-3 font-semibold">Médicaments commandés</h3>
      <div>
        {(order.items || []).length === 0 ? (
          <div>Aucun médicament dans cette commande.</div>
        ) : (
          <table className="w-full bg-white rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left">Nom</th>
                <th className="py-2 px-3 text-left">Quantité</th>
                <th className="py-2 px-3 text-left">Prix unitaire</th>
                <th className="py-2 px-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((med, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-3">{med.nom}</td>
                  <td className="py-2 px-3">{med.quantite}</td>
                  <td className="py-2 px-3">{med.prix} DA</td>
                  <td className="py-2 px-3">{med.prix * med.quantite} DA</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {(order.items || []).length > 0 && (
        <div className="flex justify-end mt-4">
          <span className="text-lg font-bold text-[#3d5a40]">
            Total: {order.items.reduce((sum, med) => sum + med.prix * med.quantite, 0)} DA
          </span>
        </div>
      )}
      <div className="mt-6 flex justify-end">
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-gray-500 transition"
          type="button"
          onClick={() => setSelectedOrder(null)}
        >
          Retourner à la liste
        </button>
      </div>
    </div>
  );

  return selectedOrder ? (
    renderOrderDetails(selectedOrder)
  ) : (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-[#3d5a40] mb-6">Commandes</h2>
      <div>
        {orders.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            <Clock size={64} className="mx-auto mb-2" />
            <p>Aucune commande trouvée</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="flex flex-col md:flex-row justify-between items-center bg-[#f9f8f4] rounded-lg mb-4 shadow p-5 w-full">
              <div className="flex-1 min-w-0">
                <div><b>Commande:</b> #{order.id}</div>
                <div><b>Pharmacie:</b> {order.pharmacy}</div>
                <div><b>Date:</b> {order.date}</div>
                <div><b>Total:</b> {order.total} DA</div>
                <div>
                  <b>Statut:</b>
                  <span
                    className={
                      "inline-block rounded px-3 py-1 ml-2 text-xs font-semibold " +
                      (order.status === "Livrée"
                        ? "bg-[#d7f5df] text-[#3d5a40]"
                        : order.status === "Acceptée"
                        ? "bg-[#fff7d6] text-[#8d7b2a]"
                        : order.status === "Non livrée"
                        ? "bg-[#f4f4f4] text-[#444]"
                        : "bg-[#f4f4f4] text-[#444]")
                    }
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <button
                className="mt-4 md:mt-0 md:ml-4 bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-600 transition"
                onClick={() => setSelectedOrder(order)}
              >
                Détails
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientCommandes;