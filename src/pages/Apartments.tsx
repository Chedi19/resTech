import React, { useState, useEffect } from 'react';
import { Apartment, SearchFilters } from '../types';
import { apartmentService } from '../services/apartmentService';
import ApartmentCard from '../components/Apartments/ApartmentCard';
import SearchFiltersComponent from '../components/Apartments/SearchFilters';

const Apartments: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const loadApartments = async (filters?: SearchFilters) => {
    try {
      setSearchLoading(true);
      const results = filters 
        ? await apartmentService.searchApartments(filters)
        : await apartmentService.getApartments();
      setApartments(results);
    } catch (error) {
      console.error('Error loading apartments:', error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    loadApartments();
  }, []);

  const handleFiltersChange = (filters: SearchFilters) => {
    loadApartments(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Appartements disponibles
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez notre sélection d'appartements à Korbes
          </p>
        </div>

        {/* Search Filters */}
        <SearchFiltersComponent 
          onFiltersChange={handleFiltersChange}
          loading={searchLoading}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Chargement...' : `${apartments.length} appartement${apartments.length > 1 ? 's' : ''} trouvé${apartments.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Apartments Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white animate-pulse rounded-xl h-96">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun appartement trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche pour trouver plus de résultats.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <ApartmentCard 
                key={apartment.id} 
                apartment={apartment}
                className={searchLoading ? 'opacity-50' : ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apartments;