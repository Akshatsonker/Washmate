'use client';

import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { mockUsers } from '../utils/mockData';

// Global auth state
let authState = {
  isAuthenticated: false,
  user: null,
};

let listeners = [];

// Notify all components
const notifyListeners = () => {
  listeners.forEach(callback => callback());
};

// 🔐 LOGIN
const login = async (email, password) => {
  if (!email || !password) return false;

  const storedUsers = storage.getUsers() || [];

  let user = storedUsers.find(u => u.email === email);

  if (!user) {
    user = mockUsers.find(u => u.email === email);
  }

  if (!user) {
    user = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'student',
      createdAt: new Date(),
    };

    storage.setUsers([...storedUsers, user]);
  }

  storage.setAuth({ user, token: `token_${user.id}` });

  authState = {
    isAuthenticated: true,
    user,
  };

  notifyListeners();
  return true;
};

// 🚪 LOGOUT
const logout = () => {
  storage.clearAuth();

  authState = {
    isAuthenticated: false,
    user: null,
  };

  notifyListeners();
};

// 📝 REGISTER
const register = async (email, password, name) => {
  if (!email || !password || !name) return false;

  const newUser = {
    id: `user_${Date.now()}`,
    email,
    name,
    role: 'student',
    createdAt: new Date(),
  };

  storage.setAuth({ user: newUser, token: `token_${newUser.id}` });

  const users = storage.getUsers();
  storage.setUsers([...users, newUser]);

  authState = {
    isAuthenticated: true,
    user: newUser,
  };

  notifyListeners();
  return true;
};

// 🔄 ROLE CHANGE
const selectRole = (role) => {
  if (!authState.user) return;

  const updatedUser = { ...authState.user, role };

  storage.setAuth({ user: updatedUser, token: `token_${updatedUser.id}` });

  authState = {
    ...authState,
    user: updatedUser,
  };

  notifyListeners();
};

// 🧠 HOOK
export function useAuth() {
  const [state, setState] = useState({
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
  });

  useEffect(() => {
  // 🔥 Restore user from localStorage
  const savedAuth = storage.getAuth();

  if (savedAuth?.user) {
    authState = {
      isAuthenticated: true,
      user: savedAuth.user,
    };
  }

  const listener = () => {
    setState({
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
    });
  };

  listeners.push(listener);

  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}, []);

  return {
    ...state,
    login,
    logout,
    register,
    selectRole,
  };
}