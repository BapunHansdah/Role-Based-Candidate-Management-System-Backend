import { User } from "../@types/user";
import api from "./api.service";

class UserService {
  async getProfile() {
    const response = await api.get("/candidate/profile");
    return response.data.user;
  }

  async updateProfile(user: User) {
    const response = await api.put("/candidate/profile/update", user);
    return response.data;
  }

  async updatePassword(oldPassword: string, password: string, confirmPassword: string) {
    const response = await api.put("/candidate/password/update", { oldPassword, password, confirmPassword });
    return response.data;
  }

  async updateProfileImage(file: FormData) {
    const response = await api.put("/candidate/profile-image", file);
    return response.data;
  }

  async updateResume(file: FormData) {
    const response = await api.put("/candidate/resume", file);
    return response.data;
  }

}

export const userService = new UserService();
