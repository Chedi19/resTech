import React, { useState, useEffect } from 'react';
import { 
  Home, Users, Calendar, TrendingUp, 
  Plus, Settings, BarChart3 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Apartment, Reservation } from '../../types';
import { apartmentService } from '../../services/apartmentService';
import { reservationService } from '../../services/reservationService';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [apartmentsData, reservationsData] = await Promise.all([
          apartmentService.getApartments(),
          reservationService.getAllReservations(),
        ]);
        
        setApartments(apartmentsData);
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      loadData();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600">Vous devez être administrateur pour accéder à cette page.</p>
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

  const stats = [
    {
      title: 'Total Appartements',
      value: apartments.length,
      icon: Home,
      color: 'bg-blue-500',
    },
    {
      title: 'Appartements Disponibles',
      value: apartments.filter(apt => apt.available).length,
      icon: Home,
      color: 'bg-green-500',
    },
    {
      title: 'Réservations',
      value: reservations.length,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Revenus Mensuels',
      value: `${reservations.reduce((sum, res) => sum + res.totalPrice, 0)}€`,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Dashboard Admin
              </h1>
              <p className="text-lg text-gray-600">
                Bienvenue {user.firstName}, gérez votre plateforme Korbes Rent
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Ajouter un appartement</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Apartments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Appartements Récents
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir tout
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {apartments.slice(0, 5).map((apartment) => (
                  <div key={apartment.id} className="flex items-center space-x-4">
                    <img
                      src={apartment.images[0]}
                      alt={apartment.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {apartment.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {apartment.location} • {apartment.price}€/mois
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apartment.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {apartment.available ? 'Disponible' : 'Occupé'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reservations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Réservations Récentes
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir tout
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {reservations.slice(0, 5).map((reservation) => {
                  const apartment = apartments.find(apt => apt.id === reservation.apartmentId);
                  return (
                    <div key={reservation.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {apartment?.title || 'Appartement inconnu'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(reservation.startDate).toLocaleDateString('fr-FR')} - {new Date(reservation.endDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {reservation.totalPrice}€
                        </p>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {reservation.status === 'confirmed' ? 'Confirmée' :
                           reservation.status === 'pending' ? 'En attente' : ''}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ajouter un appartement</h3>
                  <p className="text-sm text-gray-500">Créer une nouvelle annonce</p>
                </div>
              </div>
            </button>

            <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Voir les statistiques</h3>
                  <p className="text-sm text-gray-500">Analyser les performances</p>
                </div>
              </div>
            </button>

            <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Paramètres</h3>
                  <p className="text-sm text-gray-500">Configurer la plateforme</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;