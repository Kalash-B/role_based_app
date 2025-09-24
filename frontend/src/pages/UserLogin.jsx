// UserLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password, false)) {
      navigate('/dashboard');
    } else {
      setError('Invalid user credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CAE4DB]">
  <div className="max-w-md w-full bg-[#F5F4F4] p-10 rounded-3xl shadow-2xl border-2 border-[#CDAC81]">
    <h2 className="text-3xl font-extrabold text-center mb-8 text-[#00303F]">
      User Login
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-semibold text-[#00303F] mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-[#CDAC81] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00303F] transition-all duration-200"
          placeholder="Enter your username"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-[#00303F] mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-[#CDAC81] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00303F] transition-all duration-200"
          placeholder="Enter your password"
          required
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}

      <button
        type="submit"
        className="w-full bg-[#00303F] text-[#F5F4F4] py-3 rounded-xl font-semibold hover:bg-[#CDAC81] hover:text-[#00303F] transition-colors duration-300"
      >
        Login as User
      </button>
    </form>

    <div className="mt-6 text-center">
      <span className="text-[#00303F] text-sm mr-2">Or</span>
      <button
        onClick={() => navigate('/admin/login')}
        className="text-[#CDAC81] font-semibold hover:text-[#00303F] transition-colors duration-200 text-sm"
      >
        Admin Login
      </button>
    </div>
  </div>
</div>

  );
};

export default UserLogin;
