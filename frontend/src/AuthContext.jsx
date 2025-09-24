import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Hardcoded users and admins
const USERS = [
  { id: '1', username: 'Engineer', role: 'user', name: 'John Doe' },
  { id: '2', username: 'Manager', role: 'user', name: 'Jane Smith' },
  { id: '3', username: 'Depot_Manager', role: 'user', name: 'Bob Johnson' },
];

const ADMINS = [
  { id: 'admin1', username: 'admin', role: 'admin', name: 'Admin User' },
  { id: 'admin2', username: 'superadmin', role: 'admin', name: 'Super Admin' },
];

const PASSWORDS = {
  Engineer: 'password1',
  Manager: 'password2',
  Depot_Manager: 'password3',
  admin: 'admin123',
  superadmin: 'super123',
};

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (username, password, isAdmin) => {
    const userList = isAdmin ? ADMINS : USERS;
    const foundUser = userList.find((u) => u.username === username);

    if (foundUser && PASSWORDS[username] === password) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
