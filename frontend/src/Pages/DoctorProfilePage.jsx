import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorHeader from "../components/doctor/DoctorHeader";
import DoctorProfile from "../components/doctor/DoctorProfile";

const DoctorProfilePage = () => {
  const [profile, setProfile] = useState(null);

  // Fetch profile from backend
  useEffect(() => {
    axios.get("/api/doctor/profile/")
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  // Update profile in backend
  const handleProfileUpdate = (updatedProfile) => {
    axios.put("/api/doctor/profile/", updatedProfile)
      .then(res => setProfile(res.data))
      .catch(() => alert("Erreur lors de la mise à jour du profil"));
  };

  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="min-h-screen bg-lfond">
      <DoctorHeader profile={profile} />
      <main className="max-w-6xl mx-auto pt-10 px-4">
        <DoctorProfile profile={profile} setProfile={handleProfileUpdate} />
      </main>
    </div>
  );
};

export default DoctorProfilePage;