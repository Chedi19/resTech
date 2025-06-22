import { Apartment } from '../types';

// Enhanced mock apartment data with more realistic content
const mockApartments: Apartment[] = [
  {
    id: '1',
    title: 'Appartement moderne centre-ville avec vue panoramique',
    description: 'Magnifique appartement récemment rénové au cœur de Korbes, offrant une vue imprenable sur la ville. Situé dans un immeuble de standing avec ascenseur, cet appartement lumineux dispose d\'une cuisine équipée haut de gamme, d\'un salon spacieux avec baies vitrées et d\'une chambre avec dressing intégré. Proche de tous les commerces, transports et services.',
    price: 850,
    location: 'Centre-ville',
    address: '15 Rue de la République, 75001 Korbes',
    area: 65,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Balcon', 'Parking', 'Ascenseur', 'Vue panoramique'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Studio lumineux quartier résidentiel calme',
    description: 'Charmant studio dans un quartier résidentiel paisible, parfait pour un étudiant ou jeune professionnel. Entièrement meublé avec goût, il dispose d\'un coin nuit séparé, d\'une kitchenette équipée et d\'une salle d\'eau moderne. Accès à un jardin partagé fleuri et parking privé inclus.',
    price: 520,
    location: 'Quartier résidentiel',
    address: '42 Avenue des Tilleuls, 75002 Korbes',
    area: 30,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg',
      'https://images.pexels.com/photos/2029541/pexels-photo-2029541.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Jardin partagé', 'Parking', 'Meublé'],
    coordinates: { lat: 48.8606, lng: 2.3376 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    title: 'Appartement familial avec grande terrasse',
    description: 'Spacieux appartement de 3 chambres avec une magnifique terrasse de 25m², idéal pour une famille. Situé dans un quartier familial sécurisé avec écoles et parcs à proximité. L\'appartement dispose d\'un double séjour, d\'une cuisine américaine équipée, de 3 chambres avec placards et de 2 salles de bain. Cave et parking inclus.',
    price: 1200,
    location: 'Quartier familial',
    address: '8 Impasse des Roses, 75003 Korbes',
    area: 90,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg',
      'https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg',
      'https://images.pexels.com/photos/1571477/pexels-photo-1571477.jpeg',
      'https://images.pexels.com/photos/2029694/pexels-photo-2029694.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine équipée', 'Terrasse', 'Parking', 'Cave', 'Sécurisé'],
    coordinates: { lat: 48.8496, lng: 2.3469 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-03',
  },
  {
    id: '4',
    title: 'Loft industriel rénové avec caractère',
    description: 'Unique loft dans un ancien bâtiment industriel entièrement rénové, alliant charme de l\'ancien et confort moderne. Hauts plafonds de 4 mètres, poutres apparentes, cuisine ouverte design et mezzanine. Espace de vie exceptionnel dans un quartier en pleine renaissance artistique.',
    price: 950,
    location: 'Zone industrielle rénovée',
    address: '23 Rue des Artisans, 75004 Korbes',
    area: 75,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571479/pexels-photo-1571479.jpeg',
      'https://images.pexels.com/photos/1571481/pexels-photo-1571481.jpeg',
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg',
    ],
    amenities: ['WiFi', 'Cuisine ouverte', 'Hauts plafonds', 'Parking', 'Mezzanine', 'Design'],
    coordinates: { lat: 48.8626, lng: 2.3584 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-04',
  },
  {
    id: '5',
    title: 'Penthouse avec rooftop privé',
    description: 'Exceptionnel penthouse au dernier étage avec rooftop privé de 40m² offrant une vue à 360° sur Korbes. Appartement de standing avec finitions haut de gamme, domotique intégrée, suite parentale avec dressing et salle de bain spa. Garage double et conciergerie.',
    price: 1800,
    location: 'Centre-ville premium',
    address: '1 Place de l\'Étoile, 75001 Korbes',
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/2029694/pexels-photo-2029694.jpeg',
    ],
    amenities: ['WiFi', 'Rooftop', 'Domotique', 'Conciergerie', 'Garage', 'Vue panoramique', 'Spa'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    title: 'Duplex moderne avec jardin privatif',
    description: 'Superbe duplex de 100m² avec jardin privatif de 50m², rare en centre-ville. Niveau principal avec salon-salle à manger, cuisine ouverte et WC invités. À l\'étage : 2 chambres, bureau et salle de bain avec baignoire. Jardin paysager avec terrasse en bois et barbecue.',
    price: 1350,
    location: 'Centre-ville',
    address: '12 Villa des Jardins, 75001 Korbes',
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg',
      'https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg',
      'https://images.pexels.com/photos/2029541/pexels-photo-2029541.jpeg',
    ],
    amenities: ['WiFi', 'Jardin privatif', 'Duplex', 'Barbecue', 'Bureau', 'Terrasse bois'],
    coordinates: { lat: 48.8576, lng: 2.3532 },
    available: true,
    ownerId: '1',
    createdAt: '2024-01-06',
  },
];

class ApartmentService {
  async getApartments(): Promise<Apartment[]> {
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...mockApartments];
  }

  async getApartmentById(id: string): Promise<Apartment | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockApartments.find(apt => apt.id === id) || null;
  }

  async searchApartments(filters: {
    priceRange?: [number, number];
    bedrooms?: number;
    bathrooms?: number;
    location?: string;
    amenities?: string[];
  }): Promise<Apartment[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filtered = [...mockApartments];

    if (filters.priceRange) {
      filtered = filtered.filter(apt => 
        apt.price >= filters.priceRange![0] && apt.price <= filters.priceRange![1]
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(apt => apt.bedrooms >= filters.bedrooms!);
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(apt => apt.bathrooms >= filters.bathrooms!);
    }

    if (filters.location && filters.location.trim()) {
      const searchTerm = filters.location.toLowerCase().trim();
      filtered = filtered.filter(apt => 
        apt.location.toLowerCase().includes(searchTerm) ||
        apt.address.toLowerCase().includes(searchTerm) ||
        apt.title.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(apt =>
        filters.amenities!.every(amenity => 
          apt.amenities.some(aptAmenity => 
            aptAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    return filtered;
  }

  async getFeaturedApartments(): Promise<Apartment[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    // Return apartments with highest prices as "featured"
    return [...mockApartments]
      .sort((a, b) => b.price - a.price)
      .slice(0, 3);
  }

  async getApartmentsByLocation(location: string): Promise<Apartment[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockApartments.filter(apt => 
      apt.location.toLowerCase().includes(location.toLowerCase())
    );
  }
}

export const apartmentService = new ApartmentService();