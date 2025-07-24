import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Crown, Check, ArrowLeft, Zap, Shield, MessageSquare } from 'lucide-react'

export default function MembershipPlans() {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'Forever',
      description: 'Perfect for getting started',
      features: [
        '10 messages per month',
        'Basic contact form tool',
        'Email support',
        'Standard processing speed',
        'Basic analytics'
      ],
      limitations: [
        'Limited message volume',
        'Standard support response time',
        'Basic features only'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.99,
      period: 'per month',
      description: 'Best for growing businesses',
      features: [
        '1,000 messages per month',
        'Advanced contact form tool',
        'Priority email support',
        'Fast processing speed',
        'Advanced analytics & reporting',
        'Campaign scheduling',
        'Custom message templates',
        'Success rate optimization'
      ],
      limitations: [],
      popular: true,
      buttonText: 'Start Premium Trial',
      buttonVariant: 'default' as const
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 99.99,
      period: 'per month',
      description: 'For enterprise-level operations',
      features: [
        'Unlimited messages',
        'All premium features',
        '24/7 priority support',
        'Lightning-fast processing',
        'Advanced analytics & reporting',
        'Campaign scheduling',
        'Custom message templates',
        'Success rate optimization',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'API access'
      ],
      limitations: [],
      popular: false,
      buttonText: 'Go VIP',
      buttonVariant: 'default' as const
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gold-text">GoldTier</span>
            </Link>
            <div className="flex items-center space-x-4">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your <span className="gold-text">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Scale your outreach with our powerful contact form submission tools. 
            Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`glass-card relative ${
                plan.popular 
                  ? 'border-primary/50 ring-2 ring-primary/20' 
                  : 'border-border/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="gold-gradient text-black font-medium px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="mb-4">
                  {plan.id === 'free' && <MessageSquare className="h-12 w-12 text-primary mx-auto" />}
                  {plan.id === 'premium' && <Zap className="h-12 w-12 text-primary mx-auto" />}
                  {plan.id === 'vip' && <Crown className="h-12 w-12 text-primary mx-auto" />}
                </div>
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {plan.description}
                </CardDescription>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/member/signup">
                  <Button 
                    className={`w-full ${
                      plan.buttonVariant === 'default' 
                        ? 'gold-gradient text-black font-medium' 
                        : 'border-primary text-primary hover:bg-primary hover:text-black'
                    }`}
                    variant={plan.buttonVariant}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature <span className="gold-text">Comparison</span>
          </h2>
          
          <Card className="glass-card border-border/40">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-6 font-medium">Features</th>
                      <th className="text-center p-6 font-medium">Free</th>
                      <th className="text-center p-6 font-medium">Premium</th>
                      <th className="text-center p-6 font-medium">VIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/40">
                      <td className="p-6">Monthly Messages</td>
                      <td className="text-center p-6">10</td>
                      <td className="text-center p-6">1,000</td>
                      <td className="text-center p-6">Unlimited</td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-6">Contact Form Tool</td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-6">Analytics & Reporting</td>
                      <td className="text-center p-6">Basic</td>
                      <td className="text-center p-6">Advanced</td>
                      <td className="text-center p-6">Advanced</td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-6">Support</td>
                      <td className="text-center p-6">Email</td>
                      <td className="text-center p-6">Priority Email</td>
                      <td className="text-center p-6">24/7 Priority</td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-6">Campaign Scheduling</td>
                      <td className="text-center p-6">-</td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-6">Custom Templates</td>
                      <td className="text-center p-6">-</td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-6">API Access</td>
                      <td className="text-center p-6">-</td>
                      <td className="text-center p-6">-</td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-6">Dedicated Account Manager</td>
                      <td className="text-center p-6">-</td>
                      <td className="text-center p-6">-</td>
                      <td className="text-center p-6"><Check className="h-4 w-4 text-primary mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and you'll be billed pro-rata for any upgrades.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">What happens if I exceed my message limit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your campaigns will be paused until the next billing cycle or you can upgrade to a higher plan. 
                  We'll notify you before you reach your limit.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial for premium plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! All premium plans come with a 7-day free trial. No credit card required to start, 
                  and you can cancel anytime during the trial period.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, 
                  contact our support team for a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card border-border/40 p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="gold-text">Scale</span> Your Outreach?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our platform to reach more customers and grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/member/signup">
                <Button size="lg" className="gold-gradient text-black font-medium text-lg px-8 py-4">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/member/login">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}