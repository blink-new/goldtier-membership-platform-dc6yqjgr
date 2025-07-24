import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Crown, Shield, Zap, Users, MessageSquare, BarChart3 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gold-text">GoldTier</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/plans">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Pricing
                </Button>
              </Link>
              <Link to="/member/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Member Login
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Admin
                </Button>
              </Link>
              <Link to="/member/signup">
                <Button className="gold-gradient text-black font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gold-text">Premium</span> Membership
              <br />
              <span className="text-foreground">Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access exclusive software tools, send thousands of messages through contact forms, 
              and unlock premium features with our tiered membership system.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/member/signup">
              <Button size="lg" className="gold-gradient text-black font-medium text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/plans">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black text-lg px-8 py-4">
                View Plans
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl font-bold gold-text mb-2">10K+</div>
              <div className="text-muted-foreground">Messages Sent Daily</div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl font-bold gold-text mb-2">500+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl font-bold gold-text mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gold-text">Powerful</span> Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to scale your outreach and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Bulk Messaging</CardTitle>
                <CardDescription>
                  Send thousands of messages through website contact forms with our automated tool
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Tiered Access</CardTitle>
                <CardDescription>
                  Free, Premium, and VIP tiers with different feature sets and message limits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
                <CardDescription>
                  High-performance platform built for speed and reliability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Admin Panel</CardTitle>
                <CardDescription>
                  Complete member management system with analytics and controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Analytics</CardTitle>
                <CardDescription>
                  Track your campaigns, monitor success rates, and optimize performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <Crown className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Premium Support</CardTitle>
                <CardDescription>
                  24/7 support for VIP members with priority response times
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="gold-text">Scale</span> Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses using our platform to reach more customers 
              and grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/member/signup">
                <Button size="lg" className="gold-gradient text-black font-medium text-lg px-8 py-4">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/plans">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black text-lg px-8 py-4">
                  Compare Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Crown className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gold-text">GoldTier</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 GoldTier Membership Platform. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}