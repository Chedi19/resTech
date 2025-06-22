import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters } from '../../types';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  loading?: boolean;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({ onFiltersChange, loading = false }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 2000],
    bedrooms: null,
    bathrooms: null,
    location: '',
    amenities: [],
  });

  const amenitiesList = [
    'WiFi',
    'Cuisine équipée',
    'Balcon',
    'Terrasse',
    'Parking',
    'Cave',
    'Jardin partagé',
    'Hauts plafonds',
    'Cuisine ouverte',
  ];

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetFilters: SearchFilters = {
      priceRange: [0, 2000],
      bedrooms: null,
      bathrooms: null,
      location: '',
      amenities: [],
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    handleFilterChange({ amenities: newAmenities });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Search Bar */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par lieu ou adresse..."
              value={filters.location}
              onChange={(e) => handleFilterChange({ location: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Filtres avancés</h3>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Réinitialiser
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (€/mois)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange({ 
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                  })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.priceRange[0]}€</span>
                  <span>{filters.priceRange[1]}€</span>
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chambres
              </label>
              <select
                value={filters.bedrooms || ''}
                onChange={(e) => handleFilterChange({ 
                  bedrooms: e.target.value ? parseInt(e.target.value) : null 
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salles de bain
              </label>
              <select
                value={filters.bathrooms || ''}
                onChange={(e) => handleFilterChange({ 
                  bathrooms: e.target.value ? parseInt(e.target.value) : null 
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Équipements
            </label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.amenities.includes(amenity)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFiltersComponent;