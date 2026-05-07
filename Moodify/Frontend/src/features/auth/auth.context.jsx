import { createContext, useState, useEffect } from "react";
import { login, register, getMe, logout } from './services/auth.api.js';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  // Runs ONCE on app mount — restores session from cookie
  useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        setuser(data.user);
      } catch {
        setuser(null);
      } finally {
        setloading(false);
      }
    })();
  }, []);

  async function handleLogin({ email, password }) {
    setloading(true);
    try {
      const data = await login({ email, password });
      setuser(data.user);
      return { success: true };
    } catch (err) {
      setuser(null);
      return { success: false, message: err?.response?.data?.message || 'Login failed' };
    } finally {
      setloading(false);
    }
  }

  async function handleRegister({ username, email, password }) {
    setloading(true);
    try {
      const data = await register({ username, email, password });
      setuser(data.user);
      return { success: true };
    } catch (err) {
      setuser(null);
      return { success: false, message: err?.response?.data?.message || 'Registration failed' };
    } finally {
      setloading(false);
    }
  }

  async function handlelogout() {
    setloading(true);
    try {
      await logout();
    } finally {
      setuser(null);
      setloading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setuser, loading, setloading, handleLogin, handleRegister, handlelogout }}>
      {children}
    </AuthContext.Provider>
  );
};