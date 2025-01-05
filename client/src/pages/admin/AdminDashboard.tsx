import { User } from "../../@types/admin";
import AdminDashboardComp from "../../features/admin/Dashboard/index";
import { useAdmin } from "../../hooks/useAdmin";

function AdminDashboard() {

  const { registerUser, fetchUsers, deleteUser} = useAdmin();

  const handleRegisterUser = async (user: User) => {
    try {
      await registerUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <AdminDashboardComp
      registerUser={handleRegisterUser}
      deleteUser={handleDeleteUser}
      fetchUsers={fetchUsers}
    />
  );
}

export default AdminDashboard;
