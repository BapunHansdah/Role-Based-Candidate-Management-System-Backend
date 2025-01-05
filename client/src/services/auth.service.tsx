import api from "./api.service";

interface AuthResponseData {
  token: string;
  user: Record<string, string>;
}

interface AuthResponse {
  data: AuthResponseData;
}

class AuthService {
  
  async registerAdmin(credentials = {}) {
    const response = await api.post("/auth/admin/register", credentials);
    return this.handleAuthResponse(response);
  }

  async loginUser(credentials = {}) {
    const response = await api.post("/auth/login", credentials);
    return this.handleAuthResponse(response);
  }

  async loginAdmin(credentials = {}) {
    const response = await api.post("/auth/admin/login", credentials);
    return this.handleAuthResponse(response);
  }

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data;
  }

  async logout() {
     document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  async updateProfile(userData: Record<string, string>) {
    const response = await api.put("/auth/profile", userData);
    return response.data;
  }

  async refreshToken() {
    const response = await api.post("/auth/refresh-token");
    return response.data;
  }

  private handleAuthResponse(response: AuthResponse) {
    const { user } = response.data;
    return { user };
  }
}

export const authService = new AuthService();
