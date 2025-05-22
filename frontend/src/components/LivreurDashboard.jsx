import React, { useState } from "react";
import "../styles/LivreurDashboard.css";

const mockData = [
  {
    pharmacyName: "Pharmacie Central",
    pharmacyAddress: "12, Rue des Lilas, Alger",
    commandes: [
      {
        id: "CMD001",
        client: "Ahmed Benali",
        adresse: "123 Rue des Martyrs, Bab Ezzouar, Alger",
        date: "2024-05-22",
        status: "En cours",
        total: "850 DA",
      },
      {
        id: "CMD002",
        client: "Sara Bouzid",
        adresse: "45 Rue Didouche Mourad, Alger",
        date: "2024-05-21",
        status: "Livrée",
        total: "320 DA",
      },
    ],
  },
  {
    pharmacyName: "Pharmacie du Centre",
    pharmacyAddress: "5, Avenue Pasteur, Alger",
    commandes: [
      {
        id: "CMD003",
        client: "Yacine Amrani",
        adresse: "67 Rue Hassiba Ben Bouali, Alger",
        date: "2024-05-20",
        status: "En attente",
        total: "410 DA",
      },
    ],
  },
];

const LivreurDashboard = () => {
  const [pharmacies] = useState(mockData);

  return (
    <div className="livreur-bg">
      <div className="livreur-container">
        <h1 className="livreur-title">Tableau de bord Livreur</h1>
        {pharmacies.map((pharmacy, idx) => (
          <div key={idx} className="dashboard-card livreur-card">
            <div className="livreur-pharmacy-header">
              <h2>{pharmacy.pharmacyName}</h2>
              <div className="livreur-pharmacy-address">{pharmacy.pharmacyAddress}</div>
            </div>
            <div>
              {pharmacy.commandes.length === 0 ? (
                <div className="livreur-empty">Aucune commande assignée.</div>
              ) : (
                <table className="livreur-table">
                  <thead>
                    <tr>
                      <th>Commande</th>
                      <th>Client</th>
                      <th>Adresse</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pharmacy.commandes.map((cmd, i) => (
                      <tr key={cmd.id}>
                        <td>{cmd.id}</td>
                        <td>{cmd.client}</td>
                        <td>{cmd.adresse}</td>
                        <td>{cmd.date}</td>
                        <td>{cmd.total}</td>
                        <td>
                          <span className={`livreur-status livreur-status-${cmd.status.replace(/\s/g, '').toLowerCase()}`}>
                            {cmd.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivreurDashboard;