import { Reservation } from '../types';

// Mock reservation data
const mockReservations: Reservation[] = [
  {
    id: '1',
    apartmentId: '1',
    userId: '2',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    totalPrice: 850,
    status: 'confirmed',
    createdAt: '2024-01-15',
  },
];

class ReservationService {
  async createReservation(apartmentId: string, userId: string, startDate: string, endDate: string, totalPrice: number): Promise<Reservation> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newReservation: Reservation = {
      id: Date.now().toString(),
      apartmentId,
      userId,
      startDate,
      endDate,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    mockReservations.push(newReservation);
    return newReservation;
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockReservations.filter(res => res.userId === userId);
  }

  async getAllReservations(): Promise<Reservation[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockReservations];
  }

  async updateReservationStatus(id: string, status: Reservation['status']): Promise<Reservation> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reservation = mockReservations.find(res => res.id === id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    reservation.status = status;
    return reservation;
  }
}

export const reservationService = new ReservationService();