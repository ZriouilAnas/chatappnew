import React from "react";
import AlloChat from "../../assets/photos/AlloChat.png";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-200 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={AlloChat} alt="AlloChat Logo" className="w-50 h-50" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Créer un compte AlloChat
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              placeholder="Choisissez un mot de passe"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

