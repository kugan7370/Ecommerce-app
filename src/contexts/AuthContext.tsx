import React, { createContext, useState, useContext, useEffect } from 'react';
import { IAuthContextType, IUser } from '../types/user';





const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState<IUser | null>(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    return storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (email: string, password: string) => {

    // check user available or  not
    const foundUser = users.find(
      (user) => user.email === email
    );

    const verifyUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!foundUser) {
      throw new Error('User not found');
    }

    if (!verifyUser) {
      throw new Error('Invalid password');
    }
    setCurrentUser(foundUser);
  };

  const register = async (name: string, email: string, password: string) => {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: IUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    localStorage.setItem(`cart_${newUser.id}`, JSON.stringify([]));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const contextValue: IAuthContextType = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    users,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
