import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Users, Bath, Square, Star, Wifi, Car } from 'lucide-react';
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

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-3 w-3" />;
      case 'parking':
        return <Car className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent transform hover:-translate-y-2 ${className}`}>
      <Link to={`/apartments/${apartment.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={apartment.images[0]}
            alt={apartment.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              favorite
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white shadow-lg'
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
          </button>

          {/* Price Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg backdrop-blur-sm">
              {apartment.price}€
              <span className="text-sm font-normal opacity-90">/mois</span>
            </div>
          </div>

          {/* Available Badge */}
          {apartment.available && (
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Disponible
              </div>
            </div>
          )}

          {/* Image Counter */}
          {apartment.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
              1/{apartment.images.length}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
              {apartment.title}
            </h3>
            
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-2 text-blue-500" />
              <span className="line-clamp-1">{apartment.address}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{apartment.bedrooms}</span>
              <span className="text-xs">ch.</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{apartment.bathrooms}</span>
              <span className="text-xs">sdb</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{apartment.area}</span>
              <span className="text-xs">m²</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {apartment.amenities.slice(0, 3).map((amenity) => (
              <div
                key={amenity}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium border border-blue-100"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {apartment.amenities.length > 3 && (
              <div className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{apartment.amenities.length - 3} autres
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {apartment.description}
          </p>

          {/* Rating & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">4.8</span>
              <span className="text-xs text-gray-500">(24 avis)</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">À partir de</div>
              <div className="font-bold text-lg text-blue-600">
                {apartment.price}€
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </Link>
    </div>
  );
};

export default ApartmentCard;