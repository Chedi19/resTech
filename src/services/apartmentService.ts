import { Apartment } from '../types';

// Mock apartment data
const mockApartments: Apartment[] = [
  {
    id: '1',
    title: 'Appartement moderne centre-ville',
    description: 'Magnifique appartement récemment rénové au cœur de Korbes, proche de tous les commodités.',
    price: 850,
    location: 'Centre-ville',
    address: '15 Rue de la République, Korbes',
    area: 65,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Balcon', 'Parking'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Studio lumineux quartier résidentiel',
    description: 'Charmant studio dans un quartier calme, parfait pour un étudiant ou jeune professionnel.',
    price: 520,
    location: 'Quartier résidentiel',
    address: '42 Avenue des Tilleuls, Korbes',
    area: 30,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Jardin partagé'],
    coordinates: { lat: 48.8606, lng: 2.3376 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    title: 'Appartement familial avec terrasse',
    description: 'Spacieux appartement de 3 chambres avec grande terrasse, idéal pour une famille.',
    price: 1200,
    location: 'Quartier familial',
    address: '8 Impasse des Roses, Korbes',
    area: 90,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg',
      'https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg',
      'https://images.pexels.com/photos/1571477/pexels-photo-1571477.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Terrasse', 'Parking', 'Cave'],
    coordinates: { lat: 48.8496, lng: 2.3469 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-03',
  },
  {
    id: '4',
    title: 'Loft industriel rénové',
    description: 'Unique loft dans un ancien bâtiment industriel, avec de hauts plafonds et beaucoup de caractère.',
    price: 950,
    location: 'Zone industrielle rénovée',
    address: '23 Rue des Artisans, Korbes',
    area: 75,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571479/pexels-photo-1571479.jpeg',
      'https://images.pexels.com/photos/1571481/pexels-photo-1571481.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine ouverte', 'Hauts plafonds', 'Parking'],
    coordinates: { lat: 48.8626, lng: 2.3584 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-04',
  },
];

class ApartmentService {
  async getApartments(): Promise<Apartment[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockApartments];
  }

  async getApartmentById(id: string): Promise<Apartment | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockApartments.find(apt => apt.id === id) || null;
  }

  async searchApartments(filters: {
    priceRange?: [number, number];
    bedrooms?: number;
    location?: string;
    amenities?: string[];
  }): Promise<Apartment[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filtered = [...mockApartments];

    if (filters.priceRange) {
      filtered = filtered.filter(apt => 
        apt.price >= filters.priceRange![0] && apt.price <= filters.priceRange![1]
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(apt => apt.bedrooms >= filters.bedrooms!);
    }

    if (filters.location) {
      filtered = filtered.filter(apt => 
        apt.location.toLowerCase().includes(filters.location!.toLowerCase()) ||
        apt.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(apt =>
        filters.amenities!.every(amenity => apt.amenities.includes(amenity))
      );
    }

    return filtered;
  }
}

export const apartmentService = new ApartmentService();