import React from "react";
import { NavLink } from "react-router-dom";
import { User, Users, Settings, Stethoscope } from "lucide-react";

const navItems = [
  { to: "/doctor/profile", label: "Profil", icon: <User className="inline mr-1" /> },
  { to: "/doctor/patients", label: "Patients", icon: <Users className="inline mr-1" /> },
  { to: "/doctor/parametres", label: "Paramètres", icon: <Settings className="inline mr-1" /> },
];

const DoctorHeader = ({ profile }) => (
  <header className="w-full bg-[#3d5a40] text-white flex items-center px-8 py-3 shadow z-50">
    <div className="flex items-center gap-2 mr-10">
      <span className="flex items-center justify-center bg-[#355c3a] rounded-full w-10 h-10 shadow">
        <Stethoscope size={22} className="text-white" />
      </span>
      <span className="text-xl font-bold tracking-wide">Pharmaconnect</span>
    </div>
    <nav className="flex gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-5 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-[#355c3a] text-white"
                : "text-[#e6f2e9] hover:bg-[#355c3a]"
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
    <div className="ml-auto flex items-center gap-3">
      <span className="font-semibold">{profile?.nom} {profile?.prenom}</span>
      <span className="text-sm text-[#e6f2e9]">{profile?.specialite}</span>
    </div>
  </header>
);

export default DoctorHeader;