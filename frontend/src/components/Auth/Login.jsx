import React from "react";
import AlloChat from "../../assets/photos/AlloChat.png";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-blue-200">
      <div className="w-1/4 bg-white p-10 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={AlloChat} alt="AlloChat Logo" className="w-50 h-50" />
        </div>

        {/* Titre */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Connexion à AlloChat
        </h2>

        {/* Formulaire */}
        <form className="space-y-6">
          <div>
            <label className="block text-gray-600 text-lg mb-2">Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-lg mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-3 text-lg font-semibold rounded-lg hover:bg-blue-600 transition">
            Se connecter
          </button>
        </form>

        {/* Lien d'inscription */}
        <p className="text-center text-gray-600 text-md mt-6">
          Pas encore inscrit ?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
