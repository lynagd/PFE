import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Adapt URL to your backend
      await axios.post("http://localhost:8000/login/", { email, password });
      alert("Connexion réussie !");
    } catch (error) {
      alert("Échec de la connexion. Veuillez réessayer.");
    }
  };



  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Votre email"
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mot de passe"
          />
        </div>
        <button type="submit" className="login-btn">
          Se connecter
        </button>
      </form>
      <p className="login-link">
        Pas de compte ? <a href="/register">Inscrivez-vous</a>
      </p>
    </div>
  );
};

export default Login;
