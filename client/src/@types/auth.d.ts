export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  // token: string;
  user: Record<string, string>; // Replace `Record<string, any>` with a more specific type if available
}

export interface AuthContextType {
  user: Record<string, string> | null;
  // token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginUser: (credentials: Credentials) => Promise<AuthResponse["user"]>;
  loginAdmin: (credentials: Credentials) => Promise<AuthResponse["user"]>;
  registerAdmin: (credentials: Credentials) => Promise<AuthResponse["user"]>;
  logout: () => Promise<void>;
  updateProfile: (userData: Record<string, string>) => Promise<void>;
  isAdmin: boolean;
}
