import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LandingPage from './assets/pages/LandingPage'
import Login from './assets/pages/Login'
import Explore from './assets/pages/Explore'
import Admin_Dashboard from './assets/pages/Admin/Admin_Dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/admin/dashboard" element={<Admin_Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
