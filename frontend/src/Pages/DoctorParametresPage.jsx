import React, { useState } from "react";
import DoctorHeader from "../components/doctor/DoctorHeader";
import DoctorParametres from "../components/doctor/DoctorParametres";

const DoctorParametresPage = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handlePasswordChange = (e) => {
    setPasswordFields({ ...passwordFields, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    setPasswordFields({ current: "", new: "", confirm: "" });
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