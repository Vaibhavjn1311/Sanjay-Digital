import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // checkAuth();
  }, []);

  const register = async (username, password) => {
    try {
      const response = await api.post('/auth/register', { username, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      setUser(response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      setUser(response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
    finally {
      localStorage.removeItem('authToken');
      setUser(null);
      navigate('/admin/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
