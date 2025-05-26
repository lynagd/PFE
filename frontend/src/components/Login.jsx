import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/login/", { email, password });
      alert("Connexion réussie !");
    } catch (error) {
      alert("Échec de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lfond">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-10 w-full max-w-sm flex flex-col items-center">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold text-[#222] mb-1">Connexion</h2>
          <p className="text-[#222] text-base mb-2">
            <span className="font-semibold">Connectez</span>-vous à votre compte
          </p>
        </div>
        <form onSubmit={handleLogin} className="w-full mt-2">
          <div className="mb-5">
            <label
              className="block text-khder font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Votre email"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-khder font-medium mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-lg border border-[#b7b7b7] bg-smth text-[#222] focus:border-khder focus:bg-white outline-none transition"
            />
          </div>
          <div className="flex items-center mb-5">
            <input
              id="remember"
              type="checkbox"
              className="mr-2 accent-khder w-3.5 h-3.5"
              style={{ minWidth: "14px", minHeight: "14px" }}
            />
            <label htmlFor="remember" className="text-sm text-[#222]">
              Se souvenir de moi
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-khder text-white font-semibold rounded-lg py-3 mt-2 shadow hover:bg-[#2d3d2a] transition"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-6 text-center text-[#222] text-sm">
          Pas encore inscrit ?{" "}
          <a
            href="/register"
            className="text-tchini underline font-medium hover:text-yellow-600 transition"
          >
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
