import { adminService } from "../services/admin.service";
import AdminContext from "../context/AdminContext";
import { User } from "../@types/admin";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const registerUser = async (user: User) => {
    try {
      const response = await adminService.registerUser(user);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await adminService.fetchUsers();
      return response;
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        return err.message;
      }
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await adminService.deleteUser(userId);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };

  const value = {
    registerUser,
    fetchUsers,
    deleteUser,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
