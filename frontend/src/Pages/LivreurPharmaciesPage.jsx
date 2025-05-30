import React, { useEffect, useState } from "react";
import LivreurHeader from "../components/livreur/LivreurHeader";
import LivreurPharmacies from "../components/livreur/LivreurPharmacies";
import axios from "axios";

const LivreurPharmaciesPage = () => {
  const [pharmaciesList, setPharmaciesList] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get("/api/livreur/profile/")
      .then(res => setProfile(res.data));
    axios.get("/api/livreur/pharmacies/")
      .then(res => setPharmaciesList(Array.isArray(res.data) ? res.data : []));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <LivreurHeader profile={profile} />
      <main className="flex-1 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
        <LivreurPharmacies pharmaciesList={pharmaciesList} />
      </main>
    </div>
  );
};

export default LivreurPharmaciesPage;