export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  available: boolean;
  ownerId: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  apartmentId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface SearchFilters {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  location: string;
  amenities: string[];
}