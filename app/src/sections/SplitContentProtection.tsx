import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, Cpu, Brain, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  'Machine learning algorithms',
  'Behavioral analysis',
  'Real-time threat updates',
  'Pattern recognition',
];

export default function SplitContentProtection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyber-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <Badge className="bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>

            <div className="space-y-4">
              <h2 className="font-exo font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Advanced{' '}
                <span className="text-gradient">Threat Detection</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Our AI continuously analyzes millions of data points to identify 
                and neutralize threats before they reach you. Using state-of-the-art 
                machine learning models trained on national cyber intelligence data.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={feature}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-cyber-green/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-cyber-green" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { value: '50M+', label: 'Data Points', icon: Cpu },
                { value: '99.7%', label: 'Accuracy', icon: Brain },
                { value: '<1ms', label: 'Response', icon: Shield },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="font-exo font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="cyber-button group">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Morphing Shape Background */}
            <div className="absolute -inset-8">
              <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow opacity-30">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2467ec', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#00d4ff', stopOpacity: 0.1 }} />
                  </linearGradient>
                </defs>
                <path
                  d="M200,50 Q350,100 350,200 Q350,300 200,350 Q50,300 50,200 Q50,100 200,50"
                  fill="url(#grad1)"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Dashboard Card */}
            <div className="relative cyber-card p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-white">Threat Detection</h3>
                  <p className="text-xs text-white/50">Real-time Analysis</p>
                </div>
                <Badge className="bg-cyber-green/20 text-cyber-green">
                  Active
                </Badge>
              </div>

              {/* Threat List */}
              <div className="space-y-3 mb-6">
                {[
                  { name: 'Suspicious Call Pattern', severity: 'High', time: '2 min ago' },
                  { name: 'Phishing URL Detected', severity: 'Medium', time: '5 min ago' },
                  { name: 'UPI Fraud Attempt', severity: 'Critical', time: '12 min ago' },
                  { name: 'SMS Scam Pattern', severity: 'Low', time: '1 hour ago' },
                ].map((threat) => (
                  <div 
                    key={threat.name}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        threat.severity === 'Critical' ? 'bg-cyber-red animate-pulse' :
                        threat.severity === 'High' ? 'bg-cyber-red' :
                        threat.severity === 'Medium' ? 'bg-cyber-yellow' : 'bg-cyber-green'
                      }`} />
                      <span className="text-sm text-white/80">{threat.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`text-xs ${
                        threat.severity === 'Critical' ? 'bg-cyber-red/20 text-cyber-red' :
                        threat.severity === 'High' ? 'bg-cyber-red/20 text-cyber-red' :
                        threat.severity === 'Medium' ? 'bg-cyber-yellow/20 text-cyber-yellow' :
                        'bg-cyber-green/20 text-cyber-green'
                      }`}>
                        {threat.severity}
                      </Badge>
                      <span className="text-xs text-white/40">{threat.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Analysis Panel */}
              <div className="glass-panel rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-4 h-4 text-cyber-cyan" />
                  <span className="text-sm text-white/70">AI Analysis</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Pattern Match</span>
                    <span className="text-cyber-cyan">94.2%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Confidence</span>
                    <span className="text-cyber-green">98.7%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full" />
                  </div>
                </div>
              </div>

              {/* Processing Indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                Processing 1,247 data points...
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 cyber-card p-3 animate-float">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyber-green/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyber-green" />
                </div>
                <div>
                  <p className="text-lg font-exo font-bold text-white">2,847</p>
                  <p className="text-[10px] text-white/50">Blocked Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
