import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password, userType === 'admin');
      
      if (success) {
        // Navigate based on user type
        if (userType === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(`Invalid ${userType} credentials`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CAE4DB]">
      <div className="max-w-md w-full bg-[#F5F4F4] p-10 rounded-3xl shadow-2xl border-2 border-[#CDAC81]">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/MetroDocs.png"
            alt="MetroDocs Logo"
            className="w-32 h-auto"
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-[#00303F]">
          Welcome to MetroDocs
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-[#00303F] mb-3">
              Login As
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === 'user'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2 text-[#00303F] focus:ring-[#00303F]"
                />
                <span className="text-[#00303F] font-medium">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === 'admin'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2 text-[#00303F] focus:ring-[#00303F]"
                />
                <span className="text-[#00303F] font-medium">Admin</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#00303F] mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#CDAC81] focus:outline-none focus:ring-2 focus:ring-[#00303F] bg-[#CAE4DB] text-[#00303F]"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#00303F] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#CDAC81] focus:outline-none focus:ring-2 focus:ring-[#00303F] bg-[#CAE4DB] text-[#00303F]"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00303F] text-[#F5F4F4] py-3 rounded-xl hover:bg-[#CDAC81] hover:text-[#00303F] transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : `Login as ${userType === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>

        {/* Demo Credentials */}
        {/* <div className="mt-8 p-4 bg-[#CAE4DB] rounded-lg border border-[#CDAC81]">
          <h3 className="text-sm font-semibold text-[#00303F] mb-2">Demo Credentials:</h3>
          <div className="text-xs text-[#00303F] space-y-1">
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>User:</strong> Engineer / password1</div>
            <div><strong>User:</strong> Manager / password2</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
