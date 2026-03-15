import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpression from './features/Expression/components/FaceExpression.jsx'
import Protected from './features/auth/components/Protected'

const AllRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Protected>
            <FaceExpression />
          </Protected>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  )
}

export default AllRoutes