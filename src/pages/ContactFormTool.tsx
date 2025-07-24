import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Crown, ArrowLeft, Send, Globe, MessageSquare, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import blink from '../blink/client'

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    role?: string
  }
}

interface ContactFormToolProps {
  user: User
}

export default function ContactFormTool({ user }: ContactFormToolProps) {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    formSelector: '',
    message: '',
    recipientCount: 100
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submissionId, setSubmissionId] = useState('')

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus('idle')

    try {
      // Simulate API call to submit contact form campaign
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real implementation, you'd save this to the database
      const newSubmissionId = `sub_${Date.now()}`
      setSubmissionId(newSubmissionId)
      setSubmissionStatus('success')
      
      // Reset form
      setFormData({
        websiteUrl: '',
        formSelector: '',
        message: '',
        recipientCount: 100
      })
    } catch (error) {
      setSubmissionStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    blink.auth.logout('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/member/dashboard" className="flex items-center space-x-2">
                <Crown className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gold-text">GoldTier</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">Contact Form Tool</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Premium Member
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/member/dashboard" 
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gold-text">Contact Form</span> Submission Tool
          </h1>
          <p className="text-muted-foreground text-lg">
            Send bulk messages through website contact forms to reach potential customers
          </p>
        </div>

        {/* Status Messages */}
        {submissionStatus === 'success' && (
          <Card className="glass-card border-green-500/40 bg-green-500/10 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-medium text-green-400">Campaign Submitted Successfully!</p>
                  <p className="text-sm text-muted-foreground">
                    Submission ID: {submissionId} • Your campaign is now being processed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {submissionStatus === 'error' && (
          <Card className="glass-card border-red-500/40 bg-red-500/10 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-medium text-red-400">Submission Failed</p>
                  <p className="text-sm text-muted-foreground">
                    Please check your inputs and try again
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Campaign Setup
                </CardTitle>
                <CardDescription>
                  Configure your contact form submission campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Target Website URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://example.com/contact"
                        value={formData.websiteUrl}
                        onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                        className="pl-10 bg-background/50 border-border/40"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter the URL of the website's contact page
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="formSelector">Form Selector (Optional)</Label>
                    <Input
                      id="formSelector"
                      type="text"
                      placeholder="#contact-form or .contact-form"
                      value={formData.formSelector}
                      onChange={(e) => handleInputChange('formSelector', e.target.value)}
                      className="bg-background/50 border-border/40"
                    />
                    <p className="text-xs text-muted-foreground">
                      CSS selector for the contact form (leave empty for auto-detection)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message Content</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-background/50 border-border/40 min-h-[120px]"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This message will be sent through the contact forms
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientCount">Estimated Recipients</Label>
                    <Input
                      id="recipientCount"
                      type="number"
                      min="1"
                      max="10000"
                      value={formData.recipientCount}
                      onChange={(e) => handleInputChange('recipientCount', parseInt(e.target.value) || 0)}
                      className="bg-background/50 border-border/40"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of contact forms to submit (max 10,000)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gold-gradient text-black font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Processing Campaign...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Launch Campaign
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Usage This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Messages Used</span>
                    <span className="font-medium">245 / 1,000</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '24.5%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    755 messages remaining this month
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-primary" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Personalize your message for better response rates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Test with a small batch before launching large campaigns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Include a clear call-to-action in your message</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Monitor your campaigns for optimal timing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Upgrade Notice */}
            <Card className="glass-card border-border/40">
              <CardContent className="p-4">
                <div className="text-center">
                  <Crown className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Upgrade to VIP</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get unlimited messages and priority processing
                  </p>
                  <Link to="/plans">
                    <Button size="sm" className="gold-gradient text-black font-medium">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}