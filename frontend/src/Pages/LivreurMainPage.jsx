import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LivreurProfilePage from "./LivreurProfilePage";
import LivreurPharmaciesPage from "./LivreurPharmaciesPage";
import LivreurCommandesPage from "./LivreurCommandesPage";
import LivreurParametresPage from "./LivreurParametresPage";

const LivreurMainPage = () => (
  <Routes>
    <Route path="profile" element={<LivreurProfilePage />} />
    <Route path="pharmacies" element={<LivreurPharmaciesPage />} />
    <Route path="commandes" element={<LivreurCommandesPage />} />
    <Route path="parametres" element={<LivreurParametresPage />} />
    <Route path="" element={<Navigate to="commandes" />} /> {/* Default redirect */}
  </Routes>
);

export default LivreurMainPage;