import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  // User is logged in — always show, regardless of loading state
  if (user) return children;

  // No user yet, still initialising — show spinner
  if (loading) return <h1>Loading...</h1>;

  // No user, not loading — redirect to login
  return <Navigate to="/login" />;
}




export default Protected;