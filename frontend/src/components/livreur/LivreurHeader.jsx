import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Settings, Truck, Home, Bike } from "lucide-react";

const LivreurHeader = ({ profile }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showParamMenu, setShowParamMenu] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const profileMenuRef = useRef(null);
  const paramMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (paramMenuRef.current && !paramMenuRef.current.contains(event.target)) {
        setShowParamMenu(false);
        setShowPasswordPopup(false);
        setShowDeletePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide dropdowns when navigating
  useEffect(() => {
    setShowProfileMenu(false);
    setShowParamMenu(false);
    setShowPasswordPopup(false);
    setShowDeletePopup(false);
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/livreur/profile");
  };

  return (
    <header className="w-full bg-[#3d5a40] text-white flex items-center px-8 py-5 shadow z-50 min-h-[80px]">
      <span className="text-xl font-bold tracking-wide mr-10">Pharmaconnect</span>
      <nav className="flex items-center gap-2 ml-auto">
        {/* Commandes (Livraisons) */}
        <button
          className="flex items-center px-5 py-2 rounded-lg font-medium transition ml-2 bg-[#355c3a] hover:bg-[#2d3d2a]"
          onClick={() => navigate("/livreur/commandes")}
        >
          <Truck className="inline mr-1" />
          Livraisons
        </button>
        {/* Pharmacies */}
        <button
          className="flex items-center px-5 py-2 rounded-lg font-medium transition ml-2 bg-[#355c3a] hover:bg-[#2d3d2a]"
          onClick={() => navigate("/livreur/pharmacies")}
        >
          <Home className="inline mr-1" />
          Pharmacies
        </button>
        {/* Profile Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center px-5 py-2 rounded-lg font-medium transition bg-[#355c3a] hover:bg-[#2d3d2a]"
            onClick={() => setShowProfileMenu((v) => !v)}
          >
            <User className="inline mr-1" />
            Profil
          </button>
          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-xl shadow-lg z-50 p-4"
              style={{ background: "#faf8f3" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#cbe3d6] text-[#3d5a40] font-bold rounded-full w-14 h-14 flex items-center justify-center text-3xl uppercase">
                  {profile?.nom?.[0] || "U"}
                </div>
                <div>
                  <div className="font-semibold text-lg text-[#3d5a40]">{profile?.nom} {profile?.prenom}</div>
                  <div className="text-sm text-gray-500">{profile?.email}</div>
                </div>
              </div>
              <button
                className="w-full mt-2 bg-khder text-white font-semibold rounded-lg py-2 hover:bg-[#2d3d2a] transition"
                onClick={handleProfileClick}
              >
                Voir le profil
              </button>
              <button
                className="w-full mt-2 bg-red-500 text-white font-semibold rounded-lg py-2 hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Se déconnecter
              </button>
            </div>
          )}
        </div>
        {/* Paramètres Dropdown */}
        <div className="relative" ref={paramMenuRef}>
          <button
            className="flex items-center px-5 py-2 rounded-lg font-medium transition ml-2 bg-[#355c3a] hover:bg-[#2d3d2a]"
            onClick={() => setShowParamMenu((v) => !v)}
          >
            <Settings className="inline mr-1" />
            Paramètres
          </button>
          {showParamMenu && (
            <div
              className="absolute right-0 mt-2 w-72 rounded-xl shadow-lg z-50 p-4"
              style={{ background: "#faf8f3" }}
            >
              <button
                className="w-full bg-khder text-white font-semibold rounded-lg py-2 hover:bg-[#2d3d2a] transition mb-2"
                onClick={() => {
                  setShowParamMenu(false);
                  // You can use state or navigate to show password form
                  navigate("/livreur/parametres", { state: { openPassword: true } });
                }}
              >
                Changer mot de passe
              </button>
              <button
                className="w-full bg-red-500 text-white font-semibold rounded-lg py-2 hover:bg-red-600 transition"
                onClick={() => setShowDeletePopup(true)}
              >
                Supprimer compte
              </button>
              {showDeletePopup && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf8f3] border border-gray-300 rounded-xl shadow-lg p-6 z-50 w-72">
                  <div className="font-semibold mb-4 text-red-600">Supprimer le compte</div>
                  <div className="text-sm text-gray-700 mb-4">Êtes-vous sûr de vouloir supprimer votre compte ?</div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-red-500 text-white font-semibold rounded-lg py-2 hover:bg-red-600 transition"
                      onClick={() => {
                        setShowDeletePopup(false);
                        // TODO: call delete account logic here
                      }}
                    >
                      Confirmer
                    </button>
                    <button
                      className="flex-1 bg-gray-400 text-white font-semibold rounded-lg py-2 hover:bg-gray-500 transition"
                      onClick={() => setShowDeletePopup(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LivreurHeader;