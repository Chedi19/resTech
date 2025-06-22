import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Reservation, Apartment } from '../../types';
import { reservationService } from '../../services/reservationService';
import { apartmentService } from '../../services/apartmentService';
import { useAuth } from '../../context/AuthContext';

interface ReservationWithApartment extends Reservation {
  apartment?: Apartment;
}

const Reservations: React.FC = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<ReservationWithApartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReservations = async () => {
      if (!user) return;

      try {
        const userReservations = await reservationService.getUserReservations(user.id);
        const allApartments = await apartmentService.getApartments();
        
        const reservationsWithApartments = userReservations.map(reservation => ({
          ...reservation,
          apartment: allApartments.find(apt => apt.id === reservation.apartmentId)
        }));

        setReservations(reservationsWithApartments);
      } catch (error) {
        console.error('Error loading reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [user]);

  const getStatusIcon = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      case 'completed':
        return 'Terminée';
      default:
        return 'Inconnue';
    }
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Non connecté</h2>
          <p className="text-gray-600">Veuillez vous connecter pour voir vos réservations.</p>
        </div>
      </div>
    );
  }

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
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Mes réservations
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Gérez vos réservations d'appartements
          </p>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune réservation
              </h3>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore effectué de réservation. Découvrez nos appartements disponibles.
              </p>
              <a
                href="/apartments"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Voir les appartements</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        {getStatusIcon(reservation.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}
                        >
                          {getStatusText(reservation.status)}
                        </span>
                      </div>

                      {reservation.apartment && (
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {reservation.apartment.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{reservation.apartment.address}</span>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <label className="block text-gray-500 mb-1">Date de début</label>
                          <div className="text-gray-900 font-medium">
                            {new Date(reservation.startDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-500 mb-1">Date de fin</label>
                          <div className="text-gray-900 font-medium">
                            {new Date(reservation.endDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-500 mb-1">Prix total</label>
                          <div className="text-gray-900 font-medium">
                            {reservation.totalPrice}€
                          </div>
                        </div>
                      </div>
                    </div>

                    {reservation.apartment && (
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <img
                          src={reservation.apartment.images[0]}
                          alt={reservation.apartment.title}
                          className="w-full lg:w-32 h-24 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        Réservation créée le {new Date(reservation.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <span>Réservation #{reservation.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;