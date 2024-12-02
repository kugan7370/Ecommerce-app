import React, { createContext, useState, useContext, useEffect } from 'react';


interface User {
  id: string;
  name: string;
  email: string;
  password: string; 
}


interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  users: User[]; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);


  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedCurrentUser = localStorage.getItem('currentUser');

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedCurrentUser) setCurrentUser(JSON.parse(storedCurrentUser));
  }, []);


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
    try {
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      setCurrentUser(foundUser);

    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };


  const register = async (name: string, email: string, password: string) => {
    try {
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      const newUser: User = {
        id: crypto.randomUUID(), 
        name,
        email,
        password,
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
    
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const contextValue: AuthContextType = {
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
