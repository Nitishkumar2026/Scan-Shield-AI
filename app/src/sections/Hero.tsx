import { useEffect, useRef, useState } from 'react';
import { Shield, Play, ArrowRight, Check, Activity, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 10, y: y * 10 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Activity, value: '99.9%', label: 'Detection Rate' },
    { icon: Lock, value: '50K+', label: 'Users Protected' },
    { icon: Zap, value: '<1ms', label: 'Response Time' },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
        
        {/* Data Stream Lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              animation: `data-flow ${3 + i}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex">
              <Badge className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 px-4 py-1.5 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-cyber-green mr-2 animate-pulse" />
                National Cyber Intelligence Platform
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-exo font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
                <span className="text-white">Protect Your Digital Life with</span>
                <br />
                <span className="text-gradient">AI Scam Shield X</span>
              </h1>
              <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                Advanced AI-powered protection against scams, phishing, and fraud. 
                Real-time threat detection powered by machine learning and national-level 
                cyber intelligence.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-3">
              {['Real-time Detection', 'AI Analysis', 'Network Intelligence', 'Family Protection'].map((feature, i) => (
                <div 
                  key={feature}
                  className="flex items-center gap-2 text-sm text-white/80"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <Check className="w-4 h-4 text-cyber-green" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onGetStarted}
                className="cyber-button text-base px-8 py-6 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline"
                className="border-cyber-blue/50 text-white hover:bg-cyber-blue/10 px-8 py-6 group"
              >
                <Play className="w-5 h-5 mr-2 text-cyber-cyan" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map((stat, i) => (
                <div 
                  key={stat.label}
                  className={`flex items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="font-exo font-bold text-xl text-white">{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-cyan border-2 border-cyber-dark flex items-center justify-center text-xs font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60">
                Trusted by <span className="text-white font-semibold">50,000+</span> users worldwide
              </p>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div 
            className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ 
              transitionDelay: '0.3s',
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)` 
            }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyber-blue/20 via-cyber-cyan/20 to-cyber-blue/20 rounded-3xl blur-2xl opacity-50" />
            
            {/* Dashboard Card */}
            <div className="relative cyber-card p-6 animate-float">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyber-blue/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Security Dashboard</h3>
                    <p className="text-xs text-white/50">Live Protection Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="text-xs text-cyber-green">Protected</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Scams Blocked', value: '2,847', color: 'cyber-green' },
                  { label: 'Active Threats', value: '12', color: 'cyber-red' },
                  { label: 'Risk Score', value: '23%', color: 'cyber-blue' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-panel p-3 rounded-lg">
                    <p className="text-xs text-white/50 mb-1">{stat.label}</p>
                    <p className={`font-exo font-bold text-lg text-${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Network Graph Visualization */}
              <div className="glass-panel rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-white/70">Threat Network Analysis</p>
                  <Badge className="bg-cyber-red/20 text-cyber-red text-xs">Live</Badge>
                </div>
                <div className="relative h-32 flex items-center justify-center">
                  {/* Animated Nodes */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full ${i === 0 ? 'bg-cyber-red' : 'bg-cyber-blue'} animate-pulse`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {[...Array(4)].map((_, i) => (
                      <line
                        key={i}
                        x1={`${20 + i * 15}%`}
                        y1={`${30 + (i % 2) * 30}%`}
                        x2={`${40 + i * 12}%`}
                        y2={`${25 + ((i + 1) % 2) * 40}%`}
                        stroke="rgba(36, 103, 236, 0.3)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="animate-data-flow"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="space-y-2">
                <p className="text-xs text-white/50 uppercase tracking-wider">Recent Alerts</p>
                {[
                  { type: 'Scam Call', time: '2 min ago', risk: 'High' },
                  { type: 'Phishing SMS', time: '15 min ago', risk: 'Medium' },
                ].map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${alert.risk === 'High' ? 'bg-cyber-red' : 'bg-cyber-yellow'}`} />
                      <span className="text-sm text-white/80">{alert.type}</span>
                    </div>
                    <span className="text-xs text-white/40">{alert.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 cyber-card p-3 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="text-center">
                <p className="text-2xl font-exo font-bold text-cyber-green">99%</p>
                <p className="text-[10px] text-white/50">Accuracy</p>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-24 h-16 cyber-card p-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <p className="text-lg font-exo font-bold text-cyber-cyan">24/7</p>
                <p className="text-[10px] text-white/50">Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-dark to-transparent" />
    </section>
  );
}
