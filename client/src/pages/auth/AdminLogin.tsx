import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../features/auth/LoginForm/LoginForm";
import { Credentials } from "../../@types/auth";
import { useAuth } from "../../hooks/useAuth";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin, error } = useAuth();

  const handleLogin = async (credentials: Credentials) => {
    try {
      await loginAdmin(credentials);
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
      <LoginForm isAdmin onSubmit={handleLogin} />
    </>
  );
};
