import React, { useState } from "react";
import "../styles/Register.css";
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
};

const Register = () => {
  const [role, setRole] = useState("client");
  const [form, setForm] = useState(initialForm);
  const [showParentEmail, setShowParentEmail] = useState(false);
  const [birth, setBirth] = useState({ day: "", month: "", year: "" });
  const [fileLabel, setFileLabel] = useState({
    registre: "Aucun fichier choisi",
    agrement: "Aucun fichier choisi",
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
    // Only update form.date_naissance if all are filled
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
    <div className="register-container">
      <h2>Inscription</h2>
      <div className="role-group">
        <label>Je suis :</label>
        <div className="role-btns">
          <button
            type="button"
            className={role === "client" ? "role-btn active" : "role-btn"}
            onClick={() => handleRoleChange("client")}
          >
            Client
          </button>
          <button
            type="button"
            className={role === "pharmacie" ? "role-btn active" : "role-btn"}
            onClick={() => handleRoleChange("pharmacie")}
          >
            Pharmacie
          </button>
          <button
            type="button"
            className={role === "medecin" ? "role-btn active" : "role-btn"}
            onClick={() => handleRoleChange("medecin")}
          >
            Médecin
          </button>
        </div>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom complet</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            placeholder="Votre nom complet"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Votre email"
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Mot de passe"
          />
        </div>
        <div className="form-group">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirmez le mot de passe"
          />
        </div>
        <div className="form-group">
          <label>Date de naissance</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <select
              name="day"
              value={birth.day}
              onChange={handleBirthChange}
              required
              style={{ flex: 1 }}
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
              style={{ flex: 1 }}
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
              style={{ flex: 1 }}
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
        <div className="form-group">
          <label>Sexe</label>
          <select
            name="sexe"
            value={form.sexe}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner</option>
            <option value="H">Homme</option>
            <option value="F">Femme</option>
          </select>
        </div>
        <div className="form-group">
          <label>Wilaya</label>
          <input
            type="text"
            name="wilaya"
            value={form.wilaya}
            onChange={handleChange}
            required
            placeholder="Votre wilaya"
          />
        </div>
        <div className="form-group">
          <label>Commune</label>
          <input
            type="text"
            name="commune"
            value={form.commune}
            onChange={handleChange}
            required
            placeholder="Votre commune"
          />
        </div>
        <div className="form-group">
          <label>Adresse</label>
          <input
            type="text"
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            required
            placeholder="Votre adresse"
          />
        </div>

        {/* Parent email if under 18 */}
        {showParentEmail && (
          <div className="form-group">
            <label>Email du parent</label>
            <input
              type="email"
              name="parent_email"
              value={form.parent_email}
              onChange={handleChange}
              required
              placeholder="Email du parent"
            />
          </div>
        )}

        {/* Pharmacie-specific */}
        {role === "pharmacie" && (
          <div className="form-group">
            <label>Registre de commerce (PDF/Image)</label>
            <div className="custom-file-input-wrapper">
              <span className="custom-file-label">{fileLabel.registre}</span>
              <label className="custom-file-btn" htmlFor="registre_commerce">
                Choisir un fichier
              </label>
              <input
                type="file"
                id="registre_commerce"
                name="registre_commerce"
                accept=".pdf,image/*"
                onChange={(e) => handleCustomFile(e, "registre_commerce")}
                required
              />
            </div>
          </div>
        )}

        {/* Médecin-specific */}
        {role === "medecin" && (
          <div className="form-group">
            <label>Agrément (PDF/Image)</label>
            <div className="custom-file-input-wrapper">
              <span className="custom-file-label">{fileLabel.agrement}</span>
              <label className="custom-file-btn" htmlFor="agrement">
                Choisir un fichier
              </label>
              <input
                type="file"
                id="agrement"
                name="agrement"
                accept=".pdf,image/*"
                onChange={(e) => handleCustomFile(e, "agrement")}
                required
              />
            </div>
          </div>
        )}

        <button type="submit" className="register-btn">
          S'inscrire
        </button>
      </form>
      <p className="login-link">
        Déjà un compte ? <a href="/login">Connectez-vous</a>
      </p>
    </div>
  );
};

export default Register;