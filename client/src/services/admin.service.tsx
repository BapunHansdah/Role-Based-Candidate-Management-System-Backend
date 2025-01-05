import { User } from "../@types/admin";
import api from "./api.service";

class AdminService {
  async registerUser(user: User) {
    const response = await api.post("/admin/candidate/create", user);
    return response.data;
  }

  async fetchUsers() {
    const response = await api.get("/admin/candidates");
    return response.data.users;
  }

  async deleteUser(id: string) {
    const response = await api.delete(`/admin/candidate/delete/${id}`);
    return response.data;
  }
}

export const adminService = new AdminService();
