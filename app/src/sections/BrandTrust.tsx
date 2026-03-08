import { useEffect, useRef, useState } from 'react';

const brands = [
  { name: 'RBI', initials: 'RBI' },
  { name: 'NPCI', initials: 'NPCI' },
  { name: 'SEBI', initials: 'SEBI' },
  { name: 'CERT-In', initials: 'CERT' },
  { name: 'MeitY', initials: 'MeitY' },
  { name: 'NCIIPC', initials: 'NCI' },
  { name: 'IB', initials: 'IB' },
  { name: 'NIA', initials: 'NIA' },
];

export default function BrandTrust() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-dark/95 to-cyber-dark" />
      
      {/* Section Header */}
      <div className={`relative z-10 text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-sm text-white/50 uppercase tracking-widest">
          Trusted by Leading Organizations
        </p>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cyber-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cyber-dark to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div 
          className={`flex gap-8 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            animation: `marquee 30s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="flex items-center gap-4 px-8 py-4 glass-panel rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-150 cursor-pointer">
                {/* Logo Placeholder */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-blue/20 to-cyber-cyan/20 flex items-center justify-center border border-cyber-blue/30 group-hover:border-cyber-blue/60 transition-colors">
                  <span className="font-exo font-bold text-cyber-blue text-sm">
                    {brand.initials}
                  </span>
                </div>
                
                {/* Brand Name */}
                <div>
                  <p className="font-semibold text-white/80 group-hover:text-white transition-colors">
                    {brand.name}
                  </p>
                  <p className="text-xs text-white/40">Partner</p>
                </div>

                {/* Status Indicator */}
                <div className="ml-2 w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className={`relative z-10 max-w-4xl mx-auto mt-12 px-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '1M+', label: 'Users Protected' },
            { value: '50M+', label: 'Threats Blocked' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Monitoring' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4">
              <p className="font-exo font-bold text-2xl md:text-3xl text-gradient">{stat.value}</p>
              <p className="text-xs text-white/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
