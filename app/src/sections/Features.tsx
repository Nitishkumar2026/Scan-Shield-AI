import { useEffect, useRef, useState } from 'react';
import {
  Shield,
  Bot,
  Globe,
  Lock,
  User,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Page } from '../App';

interface FeaturesProps {
  onNavigate: (page: Page) => void;
}

const features = [
  {
    icon: Shield,
    title: 'Real-time Protection',
    description: 'Instant threat detection and blocking across all communication channels with sub-millisecond response time.',
    color: 'cyber-blue',
    stats: '2.5M+ threats blocked daily',
  },
  {
    icon: Bot,
    title: 'AI Scam Detection',
    description: 'Advanced machine learning models trained on millions of scam patterns to identify even the most sophisticated attacks.',
    color: 'cyber-cyan',
    stats: '99.7% detection accuracy',
  },
  {
    icon: Globe,
    title: 'Threat Intelligence',
    description: 'Global threat database updated in real-time with intelligence from national cybersecurity agencies.',
    color: 'cyber-purple',
    stats: 'Connected to 50+ agencies',
  },
  {
    icon: Lock,
    title: 'Secure Browsing',
    description: 'AI-powered web protection that blocks phishing sites and malicious downloads before they reach you.',
    color: 'cyber-green',
    stats: '10M+ URLs analyzed daily',
  },
  {
    icon: User,
    title: 'Identity Protection',
    description: 'Monitor your digital identity across the dark web and receive alerts if your information is compromised.',
    color: 'cyber-yellow',
    stats: 'Dark web monitoring active',
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Round-the-clock surveillance of your digital footprint with instant alerts and automated response.',
    color: 'cyber-red',
    stats: 'Zero downtime since launch',
  },
];

export default function Features({ onNavigate }: FeaturesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Powerful Features
          </Badge>
          <h2 className="font-exo font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Everything You Need to{' '}
            <span className="text-gradient">Stay Protected</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Comprehensive security features powered by advanced AI and national-level cyber intelligence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={feature.title}
                className={`group relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  transform: isHovered ? 'translateY(-4px)' : undefined
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`
                  relative h-full cyber-card p-6 overflow-hidden
                  transition-all duration-300
                  ${isHovered ? `border-${feature.color}/50 shadow-glow` : ''}
                `}>
                  {/* Glitch Effect on Hover */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-cyber-red/5 animate-pulse" style={{ animationDuration: '0.1s' }} />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`
                    relative w-14 h-14 rounded-xl mb-5 flex items-center justify-center
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                    bg-${feature.color}/10 border border-${feature.color}/30
                  `}>
                    <Icon className={`w-7 h-7 text-${feature.color}`} />

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-${feature.color}/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-exo font-bold text-xl text-white mb-3 group-hover:text-gradient transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color} animate-pulse`} />
                    <span className={`text-xs text-${feature.color}`}>{feature.stats}</span>
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group/link"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className={`absolute -top-8 -right-8 w-16 h-16 bg-${feature.color}/10 rotate-45`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/60 mb-4">
            And many more features to keep you safe
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 text-cyber-blue hover:text-cyber-cyan transition-colors"
          >
            View all features
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
