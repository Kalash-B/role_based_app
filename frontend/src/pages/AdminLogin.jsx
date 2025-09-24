// AdminLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(username, password, true);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CAE4DB]">
      <div className="max-w-md w-full bg-[#F5F4F4] p-10 rounded-3xl shadow-2xl border-2 border-[#CDAC81]">

        <h2 className="text-3xl font-bold text-center mb-8 text-[#00303F]">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

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
              required
            />
          </div>

          {error && (
            <div className="text-[#CDAC81] text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-[#00303F] text-[#F5F4F4] py-3 rounded-xl hover:bg-[#CDAC81] hover:text-[#00303F] transition-colors duration-300 font-semibold"
          >
            Login as Admin
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-[#00303F] hover:text-[#CDAC81] text-sm font-medium transition-colors duration-300"
          >
            User Login
          </button>
        </div>

      </div>
    </div>

  );
};

export default AdminLogin;
