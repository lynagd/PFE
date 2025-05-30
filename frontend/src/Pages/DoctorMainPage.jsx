import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DoctorProfilePage from "./DoctorProfilePage";
import DoctorPatientsPage from "./DoctorPatientsPage";
import DoctorParametresPage from "./DoctorParametresPage";

const DoctorMainPage = () => (
  <Routes>
    <Route path="/profile" element={<DoctorProfilePage />} />
    <Route path="/patients" element={<DoctorPatientsPage />} />
    <Route path="/parametres" element={<DoctorParametresPage />} />
    {/* Redirect to patients page by default */}
    <Route path="*" element={<Navigate to="/doctor/patients" />} />
  </Routes>
);

export default DoctorMainPage;