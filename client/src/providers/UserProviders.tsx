import { User } from "../@types/user";
import { userService } from "../services/user.service";
import UserContext from "../context/UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const getProfile = async () => {
    try {
      const response = await userService.getProfile();
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };
  const updateProfile = async (user: User) => {
    try {
      const response = await userService.updateProfile(user);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };

  const updateProfileImage = async (file: FormData) => {
    try {
      const response = await userService.updateProfileImage(file);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };

  const updateResume = async (file: FormData) => {
    try {
      const response = await userService.updateResume(file);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };

  const updatePassword = async (oldPassword: string,password: string,confirmPassword: string) => {
    try {
      const response = await userService.updatePassword(oldPassword,password,confirmPassword);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }

  const value = {
    getProfile,
    updateProfile,
    updateProfileImage: updateProfileImage,
    updateResume: updateResume,
    updatePassword:updatePassword,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
