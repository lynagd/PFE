import React, { useState } from "react";
import axios from "axios";

const initialForm = {
  nom: "",
  email: "",
  password: "",
  confirmPassword: "",
  date_naissance: "",
  sexe: "",
  wilaya: "",
  commune: "",
  adresse: "",
  parent_email: "",
  registre_commerce: null,
  agrement: null,
  signature: null,
  cachet: null,
};

const Register = () => {
  const [role, setRole] = useState("client");
  const [form, setForm] = useState(initialForm);
  const [showParentEmail, setShowParentEmail] = useState(false);
  const [birth, setBirth] = useState({ day: "", month: "", year: "" });
  const [fileLabel, setFileLabel] = useState({
    registre_commerce: "Aucun fichier choisi",
    agrement: "Aucun fichier choisi",
    signature: "Aucun fichier choisi",
    cachet: "Aucun fichier choisi",
  });

  // Helper: check if under 18
  const checkUnder18 = (dateStr) => {
    if (!dateStr) return false;
    const birth = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age < 18;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
      if (name === "date_naissance" && role === "client") {
        setShowParentEmail(checkUnder18(value));
      }
    }
  };

  const handleBirthChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...birth, [name]: value };
    setBirth(updated);
    if (updated.day && updated.month && updated.year) {
      setForm({
        ...form,
        date_naissance: `${updated.year}-${updated.month.padStart(2, "0")}-${updated.day.padStart(2, "0")}`,
      });
      setShowParentEmail(
        checkUnder18(
          `${updated.year}-${updated.month.padStart(2, "0")}-${updated.day.padStart(2, "0")}`
        )
      );
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setForm(initialForm);
    setShowParentEmail(false);
    setBirth({ day: "", month: "", year: "" });
  };

  const handleCustomFile = (e, type) => {
    const file = e.target.files[0];
    setForm({ ...form, [type]: file });
    setFileLabel({
      ...fileLabel,
      [type]: file ? file.name : "Aucun fichier choisi",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("role", role);
    data.append("nom", form.nom);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("confirmPassword", form.confirmPassword);

    if (role === "client") {
      data.append("date_naissance", form.date_naissance);
      data.append("sexe", form.sexe);
      data.append("wilaya", form.wilaya);
      data.append("commune", form.commune);
      data.append("adresse", form.adresse);
      if (showParentEmail) data.append("parent_email", form.parent_email);
    }
    if (role === "pharmacie" && form.registre_commerce) {
      data.append("registre_commerce", form.registre_commerce);
    }
    if (role === "medecin" && form.agrement) {
      data.append("agrement", form.agrement);
      if (form.signature) data.append("signature", form.signature);
      if (form.cachet) data.append("cachet", form.cachet);
    }

    try {
      await axios.post("http://localhost:8000/register/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Inscription réussie !");
    } catch (error) {
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lfond">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold text-khder mb-6 flex items-center gap-2">
          Inscription
        </h2>
        <div className="w-full mb-5">
          <div className="flex gap-2 w-full justify-center mb-2">
            <button
              type="button"
              className={`px-5 py-2 rounded-lg font-medium border transition text-base ${
                role === "client"
                  ? "bg-khder text-white border-khder"
                  : "bg-smth text-khder border-[#b7b7b7] hover:bg-lsecondary"
              }`}
              onClick={() => handleRoleChange("client")}
            >
              Client
            </button>
            <button
              type="button"
              className={`px-5 py-2 rounded-lg font-medium border transition text-base ${
                role === "pharmacie"
                  ? "bg-khder text-white border-khder"
                  : "bg-smth text-khder border-[#b7b7b7] hover:bg-lsecondary"
              }`}
              onClick={() => handleRoleChange("pharmacie")}
            >
              Pharmacie
            </button>
            <button
              type="button"
              className={`px-5 py-2 rounded-lg font-medium border transition text-base ${
                role === "medecin"
                  ? "bg-khder text-white border-khder"
                  : "bg-smth text-khder border-[#b7b7b7] hover:bg-lsecondary"
              }`}
              onClick={() => handleRoleChange("medecin")}
            >
              Médecin
            </button>
          </div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Nom complet</label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom complet"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Votre email"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirmez le mot de passe"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Date de naissance</label>
            <div className="flex gap-2">
              <select
                name="day"
                value={birth.day}
                onChange={handleBirthChange}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
              >
                <option value="">Jour</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="month"
                value={birth.month}
                onChange={handleBirthChange}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
              >
                <option value="">Mois</option>
                {[
                  "01", "02", "03", "04", "05", "06",
                  "07", "08", "09", "10", "11", "12"
                ].map((m, i) => (
                  <option key={m} value={m}>
                    {[
                      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                    ][i]}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={birth.year}
                onChange={handleBirthChange}
                required
                className="flex-1 px-3 py-2 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
              >
                <option value="">Année</option>
                {Array.from({ length: 100 }, (_, i) =>
                  new Date().getFullYear() - i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Sexe</label>
            <select
              name="sexe"
              value={form.sexe}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            >
              <option value="">Sélectionner</option>
              <option value="H">Homme</option>
              <option value="F">Femme</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Wilaya</label>
            <input
              type="text"
              name="wilaya"
              value={form.wilaya}
              onChange={handleChange}
              required
              placeholder="Votre wilaya"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Commune</label>
            <input
              type="text"
              name="commune"
              value={form.commune}
              onChange={handleChange}
              required
              placeholder="Votre commune"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-khder font-medium mb-1">Adresse</label>
            <input
              type="text"
              name="adresse"
              value={form.adresse}
              onChange={handleChange}
              required
              placeholder="Votre adresse"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          {showParentEmail && (
            <div className="mb-4">
              <label className="block text-khder font-medium mb-1">Email du parent</label>
              <input
                type="email"
                name="parent_email"
                value={form.parent_email}
                onChange={handleChange}
                required
                placeholder="Email du parent"
                className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
              />
            </div>
          )}
          {/* Pharmacie-specific */}
          {role === "pharmacie" && (
            <div className="mb-4">
              <label className="block text-khder font-medium mb-1">Registre de commerce (PDF/Image)</label>
              <div className="flex items-stretch w-full">
                <span
                  className={`flex-1 px-4 rounded-l-lg border border-[#b7b7b7] bg-smth flex items-center text-[#222] text-base overflow-hidden whitespace-nowrap text-ellipsis ${
                    fileLabel.registre_commerce !== "Aucun fichier choisi"
                      ? "bg-[#e6f2ea] font-semibold border-[#537D5D]"
                      : "font-normal"
                  }`}
                  style={{ height: "44px" }}
                >
                  {fileLabel.registre_commerce}
                  {fileLabel.registre_commerce !== "Aucun fichier choisi" && (
                    <span className="ml-2 text-[#537D5D] text-lg">✓</span>
                  )}
                </span>
                <label
                  className="bg-smth text-khder border border-l-0 border-[#b7b7b7] rounded-r-lg px-4 flex items-center cursor-pointer font-medium hover:bg-khder hover:text-white transition"
                  style={{ height: "44px" }}
                  htmlFor="registre_commerce"
                >
                  Choisir un fichier
                </label>
                <input
                  type="file"
                  id="registre_commerce"
                  name="registre_commerce"
                  accept=".pdf,image/*"
                  onChange={(e) => handleCustomFile(e, "registre_commerce")}
                  required
                  className="hidden"
                />
              </div>
            </div>
          )}
          {/* Médecin-specific */}
          {role === "medecin" && (
            <>
              <div className="mb-4">
                <label className="block text-khder font-medium mb-1">Agrément (PDF/Image)</label>
                <div className="flex items-stretch w-full">
                  <span
                    className={`flex-1 px-4 rounded-l-lg border border-[#b7b7b7] bg-smth flex items-center text-[#222] text-base overflow-hidden whitespace-nowrap text-ellipsis ${
                      fileLabel.agrement !== "Aucun fichier choisi"
                        ? "bg-[#e6f2ea] font-semibold border-[#537D5D]"
                        : "font-normal"
                    }`}
                    style={{ height: "44px" }}
                  >
                    {fileLabel.agrement}
                  </span>
                  <label
                    className="bg-smth text-khder border border-l-0 border-[#b7b7b7] rounded-r-lg px-4 flex items-center cursor-pointer font-medium hover:bg-khder hover:text-white transition"
                    style={{ height: "44px" }}
                    htmlFor="agrement"
                  >
                    Choisir un fichier
                  </label>
                  <input
                    type="file"
                    id="agrement"
                    name="agrement"
                    accept=".pdf,image/*"
                    onChange={(e) => handleCustomFile(e, "agrement")}
                    required
                    className="hidden"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-khder font-medium mb-1">Signature (Image)</label>
                <div className="flex items-stretch w-full">
                  <span
                    className={`flex-1 px-4 rounded-l-lg border border-[#b7b7b7] bg-smth flex items-center text-[#222] text-base overflow-hidden whitespace-nowrap text-ellipsis ${
                      fileLabel.signature !== "Aucun fichier choisi"
                        ? "bg-[#e6f2ea] font-semibold border-[#537D5D]"
                        : "font-normal"
                    }`}
                    style={{ height: "44px" }}
                  >
                    {fileLabel.signature}
                  </span>
                  <label
                    className="bg-smth text-khder border border-l-0 border-[#b7b7b7] rounded-r-lg px-4 flex items-center cursor-pointer font-medium hover:bg-khder hover:text-white transition"
                    style={{ height: "44px" }}
                    htmlFor="signature"
                  >
                    Choisir un fichier
                  </label>
                  <input
                    type="file"
                    id="signature"
                    name="signature"
                    accept="image/png"
                    onChange={(e) => handleCustomFile(e, "signature")}
                    required
                    className="hidden"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-khder font-medium mb-1">Cachet (Image)</label>
                <div className="flex items-stretch w-full">
                  <span
                    className={`flex-1 px-4 rounded-l-lg border border-[#b7b7b7] bg-smth flex items-center text-[#222] text-base overflow-hidden whitespace-nowrap text-ellipsis ${
                      fileLabel.cachet !== "Aucun fichier choisi"
                        ? "bg-[#e6f2ea] font-semibold border-[#537D5D]"
                        : "font-normal"
                    }`}
                    style={{ height: "44px" }}
                  >
                    {fileLabel.cachet}
                  </span>
                  <label
                    className="bg-smth text-khder border border-l-0 border-[#b7b7b7] rounded-r-lg px-4 flex items-center cursor-pointer font-medium hover:bg-khder hover:text-white transition"
                    style={{ height: "44px" }}
                    htmlFor="cachet"
                  >
                    Choisir un fichier
                  </label>
                  <input
                    type="file"
                    id="cachet"
                    name="cachet"
                    accept="image/png"
                    onChange={(e) => handleCustomFile(e, "cachet")}
                    required
                    className="hidden"
                  />
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-khder text-white font-bold rounded-lg py-3 mt-2 shadow hover:bg-[#2d3d2a] transition"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-6 text-center text-[#222] text-sm">
          Déjà un compte ?{" "}
          <a
            href="/login"
            className="text-tchini underline font-semibold hover:text-yellow-600 transition"
          >
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;