import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Crown, MessageSquare, BarChart3, Settings, LogOut, Zap, Users, TrendingUp } from 'lucide-react'
import blink from '../blink/client'

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    role?: string
  }
}

interface MemberDashboardProps {
  user: User
}

export default function MemberDashboard({ user }: MemberDashboardProps) {
  const [memberData, setMemberData] = useState({
    membershipType: 'Premium',
    messagesUsed: 245,
    messagesLimit: 1000,
    totalCampaigns: 12,
    successRate: 87,
    joinDate: '2024-01-15'
  })

  const handleLogout = () => {
    blink.auth.logout('/')
  }

  const progressPercentage = (memberData.messagesUsed / memberData.messagesLimit) * 100

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
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                {memberData.membershipType} Member
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gold-text">{user.user_metadata?.full_name || 'Member'}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your campaigns and access premium tools from your dashboard
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Used</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memberData.messagesUsed.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                of {memberData.messagesLimit.toLocaleString()} this month
              </p>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memberData.totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memberData.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 2024</div>
              <p className="text-xs text-muted-foreground">
                Premium member
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="glass-card border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Contact Form Tool
              </CardTitle>
              <CardDescription>
                Send bulk messages through website contact forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access our powerful contact form submission tool to reach thousands of potential customers.
              </p>
              <Link to="/member/contact-tool">
                <Button className="gold-gradient text-black font-medium">
                  <Zap className="h-4 w-4 mr-2" />
                  Launch Tool
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Campaign Analytics
              </CardTitle>
              <CardDescription>
                Track your campaign performance and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View detailed analytics for all your messaging campaigns and optimize performance.
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card border-border/40">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest campaigns and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Campaign: Tech Startups Outreach</p>
                    <p className="text-sm text-muted-foreground">Sent 150 messages • 2 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  Completed
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Campaign: E-commerce Leads</p>
                    <p className="text-sm text-muted-foreground">Sent 95 messages • 1 day ago</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  Completed
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Campaign: SaaS Companies</p>
                    <p className="text-sm text-muted-foreground">In progress • 3 days ago</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                  In Progress
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Notice */}
        {memberData.membershipType !== 'VIP' && (
          <Card className="glass-card border-border/40 mt-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Upgrade to <span className="gold-text">VIP</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Get unlimited messages, priority support, and exclusive features
                  </p>
                </div>
                <Link to="/plans">
                  <Button className="gold-gradient text-black font-medium">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}