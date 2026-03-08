import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import type { Page } from '../App';

interface PricingProps {
  onNavigate: (page: Page) => void;
}

const plans = [
  {
    name: 'Basic',
    description: 'Essential protection for individuals',
    monthlyPrice: 9,
    yearlyPrice: 7,
    icon: Shield,
    features: [
      'Real-time scam detection',
      'Call analysis (100/month)',
      'SMS scanning (500/month)',
      'UPI fraud alerts',
      'Basic threat reports',
      'Email support',
    ],
    limits: { familyMembers: 1, callAnalysis: 100, smsAnalysis: 500, upiAnalysis: 200 },
    isPopular: false,
    color: 'cyber-blue',
  },
  {
    name: 'Premium',
    description: 'Advanced protection for power users',
    monthlyPrice: 19,
    yearlyPrice: 15,
    icon: Zap,
    features: [
      'Everything in Basic',
      'Unlimited call analysis',
      'Unlimited SMS scanning',
      'Unlimited UPI checks',
      'Fraud network graph',
      'Threat heatmap access',
      'Priority support',
      'API access',
    ],
    limits: { familyMembers: 3, callAnalysis: -1, smsAnalysis: -1, upiAnalysis: -1 },
    isPopular: true,
    color: 'cyber-cyan',
  },
  {
    name: 'Family',
    description: 'Complete protection for your family',
    monthlyPrice: 29,
    yearlyPrice: 24,
    icon: Users,
    features: [
      'Everything in Premium',
      'Up to 6 family members',
      'Family guardian mode',
      'Shared threat database',
      'Parental controls',
      'Emergency alerts',
      'Dedicated account manager',
      'White-glove onboarding',
    ],
    limits: { familyMembers: 6, callAnalysis: -1, smsAnalysis: -1, upiAnalysis: -1 },
    isPopular: false,
    color: 'cyber-purple',
  },
];

export default function Pricing({ onNavigate }: PricingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge className="bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30 mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple Pricing
          </Badge>
          <h2 className="font-exo font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Choose Your{' '}
            <span className="text-gradient">Protection Plan</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Flexible pricing for individuals and families. All plans include core protection features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-white/50'}`}>Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-cyber-blue"
            />
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-white/50'}`}>
              Yearly
              <Badge className="ml-2 bg-cyber-green/20 text-cyber-green text-xs">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8" style={{ perspective: '1000px' }}>
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.name;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
                }}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white border-0 px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className={`
                  relative h-full cyber-card p-6 lg:p-8
                  ${plan.isPopular ? 'border-cyber-cyan/50 shadow-glow-cyan scale-105' : ''}
                  ${isHovered ? `border-${plan.color}/50` : ''}
                  transition-all duration-300
                `}>
                  {/* Gradient Border for Popular */}
                  {plan.isPopular && (
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-blue opacity-50 blur-sm -z-10" />
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`
                      w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center
                      bg-${plan.color}/20 border border-${plan.color}/30
                    `}>
                      <Icon className={`w-7 h-7 text-${plan.color}`} />
                    </div>
                    <h3 className="font-exo font-bold text-xl text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-white/50">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-white/50">$</span>
                      <span className="font-exo font-bold text-4xl text-white">{price}</span>
                      <span className="text-white/50">/mo</span>
                    </div>
                    {isYearly && (
                      <p className="text-xs text-cyber-green mt-1">
                        Billed annually (${price * 12}/year)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-cyber-green" />
                        </div>
                        <span className="text-sm text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => onNavigate('dashboard')}
                    className={`
                      w-full py-6 group
                      ${plan.isPopular
                        ? 'cyber-button'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/20'
                      }
                    `}
                  >
                    Get Started
                    <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>

                  {/* Limits Info */}
                  <div className="mt-4 pt-4 border-t border-white/5 text-center">
                    <p className="text-xs text-white/40">
                      {plan.limits.familyMembers === 1
                        ? 'Individual use'
                        : `Up to ${plan.limits.familyMembers} family members`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/60 mb-4">
            Need enterprise-level protection for your organization?
          </p>
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
            className="border-cyber-blue/50 text-white hover:bg-cyber-blue/10"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
