import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import blink from './blink/client'

// Pages
import LandingPage from './pages/LandingPage'
import MemberLogin from './pages/MemberLogin'
import MemberSignup from './pages/MemberSignup'
import MemberDashboard from './pages/MemberDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import MembershipPlans from './pages/MembershipPlans'
import ContactFormTool from './pages/ContactFormTool'

// Types
interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    role?: string
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated
      })
    })

    return unsubscribe
  }, [])

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8 rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-center mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/plans" element={<MembershipPlans />} />
          
          {/* Member Auth Routes */}
          <Route 
            path="/member/login" 
            element={
              authState.isAuthenticated ? 
              <Navigate to="/member/dashboard" replace /> : 
              <MemberLogin />
            } 
          />
          <Route 
            path="/member/signup" 
            element={
              authState.isAuthenticated ? 
              <Navigate to="/member/dashboard" replace /> : 
              <MemberSignup />
            } 
          />
          
          {/* Admin Auth Routes */}
          <Route 
            path="/admin/login" 
            element={
              authState.isAuthenticated && authState.user?.user_metadata?.role === 'admin' ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <AdminLogin />
            } 
          />
          
          {/* Protected Member Routes */}
          <Route 
            path="/member/dashboard" 
            element={
              authState.isAuthenticated && authState.user?.user_metadata?.role !== 'admin' ? 
              <MemberDashboard user={authState.user} /> : 
              <Navigate to="/member/login" replace />
            } 
          />
          <Route 
            path="/member/contact-tool" 
            element={
              authState.isAuthenticated && authState.user?.user_metadata?.role !== 'admin' ? 
              <ContactFormTool user={authState.user} /> : 
              <Navigate to="/member/login" replace />
            } 
          />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              authState.isAuthenticated && authState.user?.user_metadata?.role === 'admin' ? 
              <AdminDashboard user={authState.user} /> : 
              <Navigate to="/admin/login" replace />
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App