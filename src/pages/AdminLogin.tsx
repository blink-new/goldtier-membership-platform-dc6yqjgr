import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Shield, Mail, Lock, ArrowLeft } from 'lucide-react'
import blink from '../blink/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Verify admin credentials against database
      const adminAccounts = await blink.db.adminAccounts.list({
        where: { 
          email: email
        }
      })

      if (adminAccounts.length === 0) {
        setError('Invalid admin credentials. Please check your email and password.')
        setIsLoading(false)
        return
      }

      const admin = adminAccounts[0]
      
      // Check if admin is active and password matches
      if (Number(admin.isActive) === 0 || admin.passwordHash !== password) {
        setError('Invalid admin credentials. Please check your email and password.')
        setIsLoading(false)
        return
      }

      // Update last login
      await blink.db.adminAccounts.update(admin.id, {
        lastLogin: new Date().toISOString()
      })

      // Store admin session and redirect
      localStorage.setItem('goldtier_admin', JSON.stringify({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        loginTime: new Date().toISOString()
      }))

      // Redirect to admin dashboard
      window.location.href = '/admin/dashboard'
    } catch (err) {
      console.error('Admin login error:', err)
      setError('Admin login failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="glass-card border-border/40">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Admin <span className="gold-text">Portal</span>
            </CardTitle>
            <CardDescription>
              Secure access to the administration panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 border-border/40"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background/50 border-border/40"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-destructive text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full gold-gradient text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Not an admin?{' '}
                <Link to="/member/login" className="text-primary hover:underline font-medium">
                  Member login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 glass-card rounded-lg border-border/40">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Secure Admin Access</p>
              <p className="text-xs text-muted-foreground">
                This portal is protected with enterprise-grade security. All admin actions are logged and monitored.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Credentials */}
        <div className="mt-4 p-4 glass-card rounded-lg border-border/40">
          <p className="text-sm font-medium text-foreground mb-2 text-center">Admin Login Credentials:</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Super Admin:</span>
              <span className="text-primary">admin@goldtier.com</span>
            </div>
            <div className="flex justify-between">
              <span>Password:</span>
              <span className="text-primary">admin123</span>
            </div>
            <hr className="border-border/40 my-2" />
            <div className="flex justify-between">
              <span>Manager:</span>
              <span className="text-primary">manager@goldtier.com</span>
            </div>
            <div className="flex justify-between">
              <span>Password:</span>
              <span className="text-primary">manager123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}