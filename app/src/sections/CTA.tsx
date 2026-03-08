import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAProps {
  onGetStarted: () => void;
}

export default function CTA({ onGetStarted }: CTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Mouse tracking for particle effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#2467ec' : '#00d4ff',
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 19, 34, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // Draw connections
        particles.forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Particle Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Vortex Effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(36, 103, 236, 0.2) 0%, transparent 70%)',
          }}
        />
        
        {/* Orbiting Rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-blue/20"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              animation: `spin-slow ${20 + i * 10}s linear infinite`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-blue to-cyber-cyan mb-8 animate-pulse-glow">
            <Shield className="w-10 h-10 text-white" />
          </div>

          {/* Headline */}
          <h2 className="font-exo font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Ready to Secure Your{' '}
            <span className="text-gradient">Digital Life?</span>
          </h2>

          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Join thousands of protected users today. Start your free trial and 
            experience national-level cyber protection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={onGetStarted}
              className="cyber-button text-lg px-10 py-7 group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-7"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {[
              'No credit card required',
              '14-day free trial',
              'Cancel anytime',
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-white/50">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
