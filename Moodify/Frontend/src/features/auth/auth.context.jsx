import { createContext, useState, useEffect } from "react";
import { login, register, getMe, logout } from './services/auth.api.js';

export const AuthContext = createContext();

// Module-level token store — survives re-renders, cleared on logout/refresh
let _authToken = null;
export const getAuthToken = () => _authToken;

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  // Runs ONCE on app mount — restores session from cookie
  useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        // Only restore session if no login happened concurrently
        setuser(current => current === null ? data.user : current);
      } catch {
        // ⚠️ DO NOT setuser(null) here.
        // If getMe() is slow (Render cold start) and the user logs in while it's
        // pending, calling setuser(null) would wipe out the freshly logged-in user
        // and redirect them back to /login.
        // User stays as whatever it is — null if not logged in, set if logged in.
      } finally {
        setloading(false);
      }
    })();
  }, []);

  async function handleLogin({ email, password }) {
    setloading(true);
    try {
      const data = await login({ email, password });
      _authToken = data.token; // store for Bearer auth
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
      _authToken = data.token; // store for Bearer auth
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
      _authToken = null; // clear token on logout
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