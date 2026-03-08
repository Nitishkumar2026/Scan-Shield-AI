import { useEffect, useRef, useState } from 'react';
import { Activity, Clock, Zap, Globe, Server, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SplitContentMonitoring() {
  const [isVisible, setIsVisible] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
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

  // Animate stats
  useEffect(() => {
    if (!isVisible) return;

    const uptimeInterval = setInterval(() => {
      setUptime(prev => {
        if (prev >= 99.9) return 99.9;
        return prev + 1.5;
      });
    }, 30);

    const responseInterval = setInterval(() => {
      setResponseTime(prev => {
        if (prev >= 0.8) return 0.8;
        return prev + 0.05;
      });
    }, 50);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(responseInterval);
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-3xl" />
      </div>

      {/* Data Stream Canvas Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent"
            style={{
              top: `${10 + i * 12}%`,
              left: '-100%',
              right: '-100%',
              animation: `data-flow ${2 + i * 0.3}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content - Dashboard Preview */}
          <div className={`relative order-2 lg:order-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Glow Effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-cyber-cyan/10 to-cyber-blue/10 rounded-3xl blur-2xl" />

            {/* Dashboard Card */}
            <div className="relative cyber-card p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyber-cyan/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cyber-cyan" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">System Monitoring</h3>
                    <p className="text-xs text-white/50">Real-time Status</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="text-xs text-cyber-green">Operational</span>
                </div>
              </div>

              {/* Live Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-panel p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-cyber-green" />
                    <span className="text-xs text-white/50">Uptime</span>
                  </div>
                  <p className="font-exo font-bold text-2xl text-cyber-green">
                    {uptime.toFixed(1)}%
                  </p>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyber-green rounded-full transition-all duration-300"
                      style={{ width: `${uptime}%` }}
                    />
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-cyber-cyan" />
                    <span className="text-xs text-white/50">Response</span>
                  </div>
                  <p className="font-exo font-bold text-2xl text-cyber-cyan">
                    {responseTime.toFixed(2)}ms
                  </p>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyber-cyan rounded-full transition-all duration-300"
                      style={{ width: `${(responseTime / 1) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Live Activity Graph */}
              <div className="glass-panel rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/70">Live Activity</span>
                  <Badge className="bg-cyber-green/20 text-cyber-green text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green mr-1 animate-pulse" />
                    Live
                  </Badge>
                </div>
                <div className="h-24 flex items-end gap-1">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyber-blue to-cyber-cyan rounded-sm transition-all duration-300"
                      style={{
                        height: `${20 + Math.random() * 60}%`,
                        opacity: 0.3 + Math.random() * 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Server Status */}
              <div className="space-y-2">
                <p className="text-xs text-white/50 uppercase tracking-wider">Server Status</p>
                <div className="flex items-center gap-3">
                  {[
                    { name: 'API', status: 'online', icon: Server },
                    { name: 'AI', status: 'online', icon: Activity },
                    { name: 'DB', status: 'online', icon: Database },
                    { name: 'CDN', status: 'online', icon: Globe },
                  ].map((server) => (
                    <div key={server.name} className="flex-1 glass-panel p-2 rounded-lg text-center">
                      <server.icon className="w-4 h-4 mx-auto mb-1 text-cyber-blue" />
                      <p className="text-[10px] text-white/70">{server.name}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                        <span className="text-[10px] text-cyber-green">{server.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-4 -right-4 cyber-card p-3 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyber-cyan" />
                <div>
                  <p className="text-sm font-semibold text-white">12 Regions</p>
                  <p className="text-[10px] text-white/50">Global Coverage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`space-y-8 order-1 lg:order-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Badge className="bg-cyber-green/20 text-cyber-green border border-cyber-green/30">
              <Activity className="w-3 h-3 mr-1" />
              Always On
            </Badge>

            <div className="space-y-4">
              <h2 className="font-exo font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                24/7{' '}
                <span className="text-gradient">Security Monitoring</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Round-the-clock surveillance of your digital footprint with instant alerts. 
                Our national-level infrastructure ensures zero downtime and millisecond response times.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-cyber-green/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyber-green" />
                  </div>
                  <div>
                    <p className="font-exo font-bold text-2xl text-white">99.99%</p>
                    <p className="text-xs text-white/50">Uptime SLA</p>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-cyber-cyan/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyber-cyan" />
                  </div>
                  <div>
                    <p className="font-exo font-bold text-2xl text-white">&lt;1ms</p>
                    <p className="text-xs text-white/50">Response Time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Real-time threat detection and blocking',
                'Automated incident response',
                'Multi-region redundancy',
                'Instant alert notifications',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyber-green/20 flex items-center justify-center">
                    <Activity className="w-3 h-3 text-cyber-green" />
                  </div>
                  <span className="text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="cyber-button">
              View Live Status
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
