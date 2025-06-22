import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Apartment } from '../../types';
import { apartmentService } from '../../services/apartmentService';
import { useFavorites } from '../../hooks/useFavorites';
import ApartmentCard from '../../components/Apartments/ApartmentCard';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const [favoriteApartments, setFavoriteApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteApartments = async () => {
      try {
        if (favorites.length === 0) {
          setFavoriteApartments([]);
          setLoading(false);
          return;
        }

        const allApartments = await apartmentService.getApartments();
        const favoriteApts = allApartments.filter(apt => favorites.includes(apt.id));
        setFavoriteApartments(favoriteApts);
      } catch (error) {
        console.error('Error loading favorite apartments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteApartments();
  }, [favorites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Mes favoris
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Retrouvez tous les appartements que vous avez ajoutés à vos favoris
          </p>
        </div>

        {favoriteApartments.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun favori pour le moment
              </h3>
              <p className="text-gray-600 mb-6">
                Parcourez nos appartements et cliquez sur le cœur pour les ajouter à vos favoris.
              </p>
              <a
                href="/apartments"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Découvrir les appartements</span>
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {favoriteApartments.length} appartement{favoriteApartments.length > 1 ? 's' : ''} en favori{favoriteApartments.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteApartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;