import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProduitInfo from "./pages/ProduitInfo";
import Panier from "./pages/Panier";
import MedicList from "./components/MedicList";
import MedicDetail from "./components/MedicDetail";
import MedicInfo from "./pages/MedicInfo";
import ProduitDetail from './components/ProduitDetail';
import ProduitList from './components/ProduitList';
import Carte from './pages/Carte';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ProduitInfo" element={<ProduitInfo />} />
        <Route path="/Panier" element={<Panier />} />
        <Route path="/MedicInfo" element={<MedicInfo />} />
        <Route path="/MedicInfo/:id" element={<MedicDetail />} />
        <Route path="/ProduitInfo/:id" element={<ProduitDetail />} />
        <Route path="/carte" element={<Carte />} /> 
      </Routes>
    </BrowserRouter>
  );
}


