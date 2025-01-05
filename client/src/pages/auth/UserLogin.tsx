import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../features/auth/LoginForm/LoginForm';


export const UserLogin = () => {
  const navigate = useNavigate();
  const { loginUser, error } = useAuth();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await loginUser(credentials);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the hook
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
      <LoginForm isAdmin={false} onSubmit={handleLogin} />
    </>
  );
};