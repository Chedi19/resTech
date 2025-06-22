import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Users, Bath, Square, Heart, Calendar, 
  ChevronLeft, ChevronRight, Check, ArrowLeft 
} from 'lucide-react';
import { Apartment } from '../types';
import { apartmentService } from '../services/apartmentService';
import { reservationService } from '../services/reservationService';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';

const ApartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const loadApartment = async () => {
      if (!id) return;
      
      try {
        const apt = await apartmentService.getApartmentById(id);
        setApartment(apt);
      } catch (error) {
        console.error('Error loading apartment:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApartment();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appartement non trouvé</h2>
          <button
            onClick={() => navigate('/apartments')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Retour aux appartements
          </button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(apartment.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(apartment.id);
    } else {
      addToFavorites(apartment.id);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === apartment.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? apartment.images.length - 1 : prev - 1
    );
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bookingData.startDate || !bookingData.endDate) {
      alert('Veuillez sélectionner les dates de début et de fin');
      return;
    }

    try {
      setBookingLoading(true);
      
      // Calculate total price (simplified - just monthly price)
      const totalPrice = apartment.price;
      
      await reservationService.createReservation(
        apartment.id,
        user.id,
        bookingData.startDate,
        bookingData.endDate,
        totalPrice
      );

      alert('Réservation créée avec succès !');
      setShowBookingModal(false);
      navigate('/reservations');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Erreur lors de la réservation');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/apartments')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour aux appartements</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96 md:h-[500px]">
            <img
              src={apartment.images[currentImageIndex]}
              alt={apartment.title}
              className="w-full h-full object-cover"
            />
            
            {apartment.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {apartment.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                favorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {apartment.title}
                  </h1>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{apartment.address}</span>
                  </div>

                  <div className="flex items-center space-x-6 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{apartment.bedrooms} chambre{apartment.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2" />
                      <span>{apartment.bathrooms} salle{apartment.bathrooms > 1 ? 's' : ''} de bain</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-2" />
                      <span>{apartment.area}m²</span>
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-blue-600 mb-6">
                    {apartment.price}€ <span className="text-lg font-normal text-gray-500">/mois</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {apartment.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Équipements</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {apartment.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-xl sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {apartment.price}€
                    </div>
                    <div className="text-gray-500">par mois</div>
                  </div>

                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Réserver maintenant</span>
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    Réservation sans engagement
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Réserver cet appartement
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={bookingData.endDate}
                  onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {bookingLoading ? 'Réservation...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetail;