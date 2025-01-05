import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/auth.service";
import { AuthResponse, Credentials } from "../@types/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        // }
      } catch (err) {
        console.error(err);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);


 

  const registerAdmin = async (credentials: Credentials) => {
    try {
      setError(null);
      const response = await authService.registerAdmin(credentials);
      setUser(response.user);
      return response.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      throw err;
    }
  };

  const loginUser = async (
    credentials: Credentials
  ): Promise<AuthResponse["user"]> => {
    try {
      setError(null);

      const response: AuthResponse = await authService.loginUser(credentials);
      // localStorage.setItem("token", response.token);
      // setToken(response.token);
      setUser(response.user);

      return response.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      throw err; 
    }
  };

  const loginAdmin = async (credentials: Credentials) => {
    try {
      setError(null);
      const response = await authService.loginAdmin(credentials);

      if (response.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }

      setUser(response.user);
      return response.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // localStorage.removeItem("token");
      // setToken(null);
      setUser(null);
      setError(null);
    }
  };

  const updateProfile = async (userData: Record<string, string>) => {
    try {
      setError(null);
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: Boolean(user),
    loginUser,
    loginAdmin,
    registerAdmin,
    logout,
    updateProfile,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
