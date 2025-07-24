import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Shield, Users, MessageSquare, BarChart3, LogOut, Search, Mail, Crown, Plus, Edit, Trash2 } from 'lucide-react'
import blink from '../blink/client'

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    role?: string
  }
}

interface Member {
  id: string
  email: string
  fullName: string
  membershipType: string
  status: string
  messagesUsed: number
  joinDate: string
}

interface MembershipType {
  id: string
  name: string
  price: number
  features: string
  maxMessages: number
}

export default function AdminDashboard() {
  const [adminInfo, setAdminInfo] = useState<any>(null)

  // Check admin authentication on component mount
  useEffect(() => {
    const adminData = localStorage.getItem('goldtier_admin')
    if (!adminData) {
      window.location.href = '/admin/login'
      return
    }
    
    try {
      const admin = JSON.parse(adminData)
      setAdminInfo(admin)
    } catch (err) {
      console.error('Invalid admin session:', err)
      localStorage.removeItem('goldtier_admin')
      window.location.href = '/admin/login'
    }
  }, [])
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      email: 'john@example.com',
      fullName: 'John Smith',
      membershipType: 'Premium',
      status: 'Active',
      messagesUsed: 245,
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      email: 'sarah@example.com',
      fullName: 'Sarah Johnson',
      membershipType: 'VIP',
      status: 'Active',
      messagesUsed: 1250,
      joinDate: '2024-01-10'
    },
    {
      id: '3',
      email: 'mike@example.com',
      fullName: 'Mike Davis',
      membershipType: 'Free',
      status: 'Active',
      messagesUsed: 8,
      joinDate: '2024-01-20'
    },
    {
      id: '4',
      email: 'emma@example.com',
      fullName: 'Emma Wilson',
      membershipType: 'Premium',
      status: 'Active',
      messagesUsed: 567,
      joinDate: '2024-01-12'
    },
    {
      id: '5',
      email: 'alex@example.com',
      fullName: 'Alex Rodriguez',
      membershipType: 'VIP',
      status: 'Active',
      messagesUsed: 2100,
      joinDate: '2024-01-08'
    },
    {
      id: '6',
      email: 'lisa@example.com',
      fullName: 'Lisa Chen',
      membershipType: 'Free',
      status: 'Inactive',
      messagesUsed: 3,
      joinDate: '2024-01-22'
    },
    {
      id: '7',
      email: 'david@example.com',
      fullName: 'David Brown',
      membershipType: 'Premium',
      status: 'Active',
      messagesUsed: 789,
      joinDate: '2024-01-18'
    },
    {
      id: '8',
      email: 'maria@example.com',
      fullName: 'Maria Garcia',
      membershipType: 'VIP',
      status: 'Active',
      messagesUsed: 3450,
      joinDate: '2024-01-05'
    }
  ])

  const [membershipTypes, setMembershipTypes] = useState<MembershipType[]>([
    { id: 'free', name: 'Free', price: 0, features: 'Basic access, 10 messages/month', maxMessages: 10 },
    { id: 'premium', name: 'Premium', price: 29.99, features: 'Advanced tools, 1000 messages/month', maxMessages: 1000 },
    { id: 'vip', name: 'VIP', price: 99.99, features: 'All features, Unlimited messages', maxMessages: -1 }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [bulkMessage, setBulkMessage] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const handleLogout = () => {
    localStorage.removeItem('goldtier_admin')
    window.location.href = '/'
  }

  const filteredMembers = members.filter(member =>
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalMembers = members.length
  const activeMembers = members.filter(m => m.status === 'Active').length
  const totalMessages = members.reduce((sum, m) => sum + m.messagesUsed, 0)
  const premiumMembers = members.filter(m => m.membershipType !== 'Free').length

  const handleSendBulkMessage = async () => {
    if (!bulkMessage.trim() || selectedMembers.length === 0) return

    // Simulate sending bulk message
    console.log('Sending bulk message to:', selectedMembers)
    console.log('Message:', bulkMessage)
    
    setBulkMessage('')
    setSelectedMembers([])
    alert(`Message sent to ${selectedMembers.length} members!`)
  }

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const selectAllMembers = () => {
    setSelectedMembers(filteredMembers.map(m => m.id))
  }

  const clearSelection = () => {
    setSelectedMembers([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gold-text">Admin Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              {adminInfo && (
                <div className="text-sm text-muted-foreground">
                  Welcome, {adminInfo.name}
                </div>
              )}
              <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                {adminInfo?.role === 'super_admin' ? 'Super Admin' : 'Administrator'}
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
            Admin <span className="gold-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage members, membership types, and platform analytics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                {activeMembers} active members
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Members</CardTitle>
              <Crown className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{premiumMembers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((premiumMembers / totalMembers) * 100)}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,847</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Member Management */}
        <Card className="glass-card border-border/40 mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Member Management
                </CardTitle>
                <CardDescription>
                  View and manage all platform members
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-background/50 border-border/40"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Bulk Actions */}
            {selectedMembers.length > 0 && (
              <div className="mb-4 p-4 glass-card rounded-lg border-border/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">
                    {selectedMembers.length} member(s) selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={clearSelection}>
                      Clear
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gold-gradient text-black">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card border-border/40">
                        <DialogHeader>
                          <DialogTitle>Send Bulk Message</DialogTitle>
                          <DialogDescription>
                            Send a message to {selectedMembers.length} selected member(s)
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Enter your message..."
                            value={bulkMessage}
                            onChange={(e) => setBulkMessage(e.target.value)}
                            className="bg-background/50 border-border/40"
                            rows={4}
                          />
                          <Button
                            onClick={handleSendBulkMessage}
                            className="w-full gold-gradient text-black"
                            disabled={!bulkMessage.trim()}
                          >
                            Send Message
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )}

            {/* Members Table */}
            <div className="rounded-lg border border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                        onChange={() => selectedMembers.length === filteredMembers.length ? clearSelection() : selectAllMembers()}
                        className="rounded"
                      />
                    </TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Messages Used</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="border-border/40">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMemberSelection(member.id)}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{member.fullName}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            member.membershipType === 'VIP'
                              ? 'bg-primary/20 text-primary border-primary/30'
                              : member.membershipType === 'Premium'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }
                        >
                          {member.membershipType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            member.status === 'Active'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.messagesUsed.toLocaleString()}</TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Membership Types Management */}
        <Card className="glass-card border-border/40">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-primary" />
                  Membership Types
                </CardTitle>
                <CardDescription>
                  Manage membership plans and pricing
                </CardDescription>
              </div>
              <Button className="gold-gradient text-black">
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTypes.map((type) => (
                <Card key={type.id} className="glass-card border-border/40">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{type.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">
                          ${type.price}/month
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{type.features}</p>
                    <p className="text-xs text-muted-foreground">
                      Max messages: {type.maxMessages === -1 ? 'Unlimited' : type.maxMessages.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}