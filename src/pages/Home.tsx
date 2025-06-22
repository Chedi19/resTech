import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Shield, Clock, ArrowRight } from 'lucide-react';
import { Apartment } from '../types';
import { apartmentService } from '../services/apartmentService';
import ApartmentCard from '../components/Apartments/ApartmentCard';

const Home: React.FC = () => {
  const [featuredApartments, setFeaturedApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedApartments = async () => {
      try {
        const apartments = await apartmentService.getApartments();
        setFeaturedApartments(apartments.slice(0, 3));
      } catch (error) {
        console.error('Error loading apartments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedApartments();
  }, []);

  const features = [
    {
      icon: Search,
      title: 'Recherche facile',
      description: 'Trouvez rapidement l\'appartement parfait grâce à nos filtres avancés.',
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Tous nos logements sont vérifiés et nos transactions sont sécurisées.',
    },
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description: 'Notre service client est disponible à tout moment pour vous aider.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Trouvez votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                appartement idéal
              </span>
              à Korbes
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Découvrez une sélection exclusive d'appartements de qualité dans les meilleurs quartiers de Korbes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                to="/apartments"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2 group"
              >
                <Search className="h-5 w-5" />
                <span>Rechercher</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-xl"></div>
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Korbes Rent ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous simplifions votre recherche d'appartement avec des services de qualité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Appartements à la une
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez nos logements les plus populaires
              </p>
            </div>
            <Link
              to="/apartments"
              className="hidden sm:flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group"
            >
              <span>Voir tous</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/apartments"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group"
            >
              <span>Voir tous les appartements</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à trouver votre nouveau chez-vous ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de locataires satisfaits qui ont trouvé leur appartement idéal avec nous
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              S'inscrire gratuitement
            </Link>
            <Link
              to="/apartments"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Parcourir les logements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;