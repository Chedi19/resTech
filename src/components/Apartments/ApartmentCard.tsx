import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Users, Bath, Square } from 'lucide-react';
import { Apartment } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';

interface ApartmentCardProps {
  apartment: Apartment;
  className?: string;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, className = '' }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(apartment.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(apartment.id);
    } else {
      addToFavorites(apartment.id);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${className}`}>
      <Link to={`/apartments/${apartment.id}`} className="block">
        <div className="relative">
          <img
            src={apartment.images[0]}
            alt={apartment.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              favorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
              {apartment.price}€/mois
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {apartment.title}
          </h3>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{apartment.location}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{apartment.bedrooms} ch.</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{apartment.bathrooms} sdb</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{apartment.area}m²</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {apartment.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                {amenity}
              </span>
            ))}
            {apartment.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                +{apartment.amenities.length - 3}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {apartment.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ApartmentCard;