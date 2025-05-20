import React, { useState } from "react";
import "../styles/Register.css";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("client");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register/", {
        role,
        name: form.name,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
        // Add other fields as needed
      });
      alert("Inscription réussie !");
      // Optionally redirect to login: window.location.href = "/login";
    } catch (error) {
      console.error(error);
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
        <input type="hidden" name="role" value={role} />
        <div className="form-group">
          <label>Nom complet</label>
          <input
            type="text"
            name="name"
            value={form.name}
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
        {/* Add more fields as needed */}
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