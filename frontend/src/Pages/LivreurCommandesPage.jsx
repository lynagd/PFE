import React, { useEffect, useState } from "react";
import LivreurHeader from "../components/livreur/LivreurHeader";
import LivreurCommandes from "../components/livreur/LivreurCommandes";
import axios from "axios";

const LivreurCommandesPage = () => {
  const [profile, setProfile] = useState({});
  const [commandes, setCommandes] = useState([]);
  const [disponible, setDisponible] = useState(true); // <-- Add this line

  useEffect(() => {
    axios.get("/api/livreur/profile/")
      .then(res => setProfile(res.data));
    axios.get("/api/livreur/commandes/")
      .then(res => setCommandes(Array.isArray(res.data) ? res.data : []));
  }, []);

  // Filter commandes for this livreur
  const myCommandes = (Array.isArray(commandes) ? commandes : [])
    .map((pharmacy) => ({
      ...pharmacy,
      commandes: Array.isArray(pharmacy.commandes)
        ? pharmacy.commandes.filter((cmd) => cmd.livreurId === profile.id)
        : [],
    }))
    .filter((pharmacy) => pharmacy.commandes.length > 0);

  const handleStatusClick = (pharmacyIdx, cmdIdx, newStatus) => {
    setCommandes((prev) =>
      prev.map((ph, pIdx) =>
        pIdx !== pharmacyIdx
          ? ph
          : {
              ...ph,
              commandes: ph.commandes.map((cmd, cIdx) =>
                cIdx !== cmdIdx
                  ? cmd
                  : { ...cmd, status: newStatus }
              ),
            }
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <LivreurHeader profile={profile} />
      <main className="flex-1 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
        <LivreurCommandes
          myCommandes={myCommandes}
          handleStatusClick={handleStatusClick}
          disponible={disponible}           // <-- Pass as prop
          setDisponible={setDisponible}     // <-- Pass as prop
        />
      </main>
    </div>
  );
};

export default LivreurCommandesPage;