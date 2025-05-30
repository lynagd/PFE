import React, { useEffect, useState } from "react";
import LivreurHeader from "../components/livreur/LivreurHeader";
import LivreurProfile from "../components/livreur/LivreurProfile";
import axios from "axios";

const LivreurProfilePage = () => {
  const [livreurProfile, setLivreurProfile] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    axios
      .get("/api/livreur/profile/")
      .then((res) => setLivreurProfile(res.data))
      .catch(() => setLivreurProfile(null));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <LivreurHeader profile={livreurProfile || {}} />
      <main className="flex-1 flex flex-col items-center py-10 px-6 bg-lfond min-h-screen">
        {livreurProfile && <LivreurProfile livreurProfile={livreurProfile} />}
      </main>
    </div>
  );
};

export default LivreurProfilePage;