import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DoctorHeader from "../components/doctor/DoctorHeader";
import DoctorParametres from "../components/doctor/DoctorParametres";

const DoctorParametresPage = () => {
  const location = useLocation();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    if (location.state && location.state.openPassword) {
      setShowPasswordForm(true);
    }
  }, [location.state]);

  const handlePasswordChange = (e) => {
    setPasswordFields({ ...passwordFields, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordFields.new !== passwordFields.confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    axios.post("/api/doctor/change-password/", {
      current_password: passwordFields.current,
      new_password: passwordFields.new
    })
      .then(() => {
        alert("Mot de passe changé avec succès !");
        setShowPasswordForm(false);
        setPasswordFields({ current: "", new: "", confirm: "" });
      })
      .catch(() => alert("Erreur lors du changement de mot de passe."));
  };

  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <DoctorHeader profile={{ nom: "Yacine", prenom: "B.", specialite: "Médecin Généraliste" }} />
      <main className="flex-1 p-8">
        <DoctorParametres
          showPasswordForm={showPasswordForm}
          setShowPasswordForm={setShowPasswordForm}
          passwordFields={passwordFields}
          handlePasswordChange={handlePasswordChange}
          handlePasswordSubmit={handlePasswordSubmit}
        />
      </main>
    </div>
  );
};

export default DoctorParametresPage;