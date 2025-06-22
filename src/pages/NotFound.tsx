import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page non trouvée
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Home className="h-5 w-5" />
            <span>Retour à l'accueil</span>
          </Link>
          
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à la page précédente</span>
            </button>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Liens utiles
          </h2>
          <div className="space-y-2">
            <Link
              to="/apartments"
              className="block text-blue-600 hover:text-blue-700 transition-colors"
            >
              Voir tous les appartements
            </Link>
            <Link
              to="/about"
              className="block text-blue-600 hover:text-blue-700 transition-colors"
            >
              À propos de nous
            </Link>
            <Link
              to="/contact"
              className="block text-blue-600 hover:text-blue-700 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;