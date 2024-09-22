import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './assets/pages/ProtectedRoute'
import LandingPage from './assets/pages/LandingPage'
import Login from './assets/pages/Login'
import Admin_Dashboard from './assets/pages/Admin/Admin_Dashboard'
import Admin_Students from './assets/pages/Admin/Admin_Students'
import Admin_Enroll_Students from './assets/pages/Admin/Admin_Enroll_Students'
import Admin_FacultyMembers from './assets/pages/Admin/Admin_FacultyMembers'
import Admin_ManageSchedule from './assets/pages/Admin/Admin_ManageSchedule'
import Admin_Archive from './assets/pages/Admin/Admin_Archive'
import Finance_Dashboard from './assets/pages/Finance/Finance_Dashboard'
import Finance_ConfirmEnrollment from './assets/pages/Finance/Finance_ConfirmEnrollment'
import Finance_TagLiabilities from './assets/pages/Finance/Finance_TagLiabilities'
import Finance_StudentRecords from './assets/pages/Finance/Finance_StudentRecords'
import Students_Dashboard from './assets/pages/Students/Students_Dashboard'
import Faculty_Dashboard from './assets/pages/Faculty/Faculty_Dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Admin_Dashboard /></ProtectedRoute>} />
        <Route path="/admin/student-list" element={<Admin_Students />} />
        <Route path="/admin/enroll-students" element={<Admin_Enroll_Students />} />
        <Route path="/admin/faculty-members" element={<Admin_FacultyMembers />} />
        <Route path="/admin/manage-schedule" element={<Admin_ManageSchedule />} />
        <Route path="/admin/archive" element={<Admin_Archive />} />
        <Route path="/finance/dashboard" element={<Finance_Dashboard />} />
        <Route path="finance/confirm-enrollment" element={<Finance_ConfirmEnrollment />} />
        <Route path="/finance/tag-liabilities" element={<Finance_TagLiabilities />} />
        <Route path="/finance/student-records" element={<Finance_StudentRecords />} />
        <Route path="/student/dashboard" element={<ProtectedRoute><Students_Dashboard /></ProtectedRoute>} />
        <Route path="/faculty/dashboard" element={<Faculty_Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App