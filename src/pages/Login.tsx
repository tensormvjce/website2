import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      // If login is successful and user is an admin, navigate to admin dashboard
      navigate('/admin-dashboard');
    } catch (err: any) {
      // Handle specific error types
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/user-not-found') {
        setError('User not found');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
      setError('Logout failed. Please try again.');
    }
  };

  // If user is already logged in as an admin
  if (currentUser && isAdmin) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Admin Session Active</h2>
          <div className="text-center mb-6">
            <p>Logged in as: {currentUser.email}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Go to Admin Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login form for non-logged in or non-admin users
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-2 rounded transition duration-300
              ${isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700'
              }
              text-white font-bold
            `}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
