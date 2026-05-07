import { useContext } from 'react';
import { AuthContext } from '../auth.context.jsx';

/**
 * Simple hook — reads from AuthContext.
 * All logic (getMe on mount, handleLogin, etc.) lives in AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
};
