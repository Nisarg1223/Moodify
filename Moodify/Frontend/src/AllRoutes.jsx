import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpression from './features/Expression/components/FaceExpression.jsx'
import Protected from './features/auth/components/Protected'
import AboutDev from './features/Expression/components/AboutDev.jsx'
import AboutPage from './features/Expression/components/AboutPage.jsx'
import History from './features/history/pages/History.jsx'
import UploadSong from './features/upload/page/UploadSong.jsx'
const AllRoutes = () => {
  return (
    <Routes>

      <Route
        path="/home"
        element={
          <Protected>
            <FaceExpression />
          </Protected>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/about-developer" element={<AboutDev/>}/> 
      <Route path="/about-website" element={<AboutPage/>}/>
      <Route path="/history" element={
        <Protected>
          <History />
        </Protected>
      } />
      <Route path="/uploadSongs" element={
        <Protected>
          <UploadSong/>
        </Protected>
      }/>
    </Routes>
  )
}

export default AllRoutes