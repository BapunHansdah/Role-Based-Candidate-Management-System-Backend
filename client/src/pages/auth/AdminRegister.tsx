import { useNavigate } from "react-router-dom";
import { Credentials } from "../../@types/auth";
import { useAuth } from "../../hooks/useAuth";
import AdminRegistration from "../../features/auth/RegisterForm/AdminRegistration";

export const AdminRegister = () => {
  const navigate = useNavigate();
  const { registerAdmin, error } = useAuth();

  const handleLogin = async (credentials: Credentials) => {
    try {
      await registerAdmin(credentials);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      <AdminRegistration  onSubmit={handleLogin} />
    </>
  );
};
