import { User, RegisterData } from '../types';

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@korbesrent.com',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+33123456789',
    role: 'admin',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+33987654321',
    role: 'user',
    createdAt: '2024-01-02',
  },
];

class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // In a real app, verify password here
    this.currentUser = user;
    localStorage.setItem('auth_token', 'mock_token_' + user.id);
    localStorage.setItem('current_user', JSON.stringify(user));
    
    return user;
  }

  async register(userData: RegisterData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('auth_token', 'mock_token_' + newUser.id);
    localStorage.setItem('current_user', JSON.stringify(newUser));

    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('current_user');
    
    if (token && userData) {
      try {
        this.currentUser = JSON.parse(userData);
        return this.currentUser;
      } catch (error) {
        this.logout();
        return null;
      }
    }
    
    return null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();