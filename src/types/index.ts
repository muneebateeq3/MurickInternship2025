export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor';
  avatar?: string;
  bio?: string;
  joinedDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  rating: number;
  students: number;
  image: string;
  tags: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}