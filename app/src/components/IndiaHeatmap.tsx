import { useState } from 'react';
import type { ThreatData } from '@/sections/ThreatHeatmap';

interface IndiaHeatmapProps {
  data: ThreatData[];
  onCityClick: (city: ThreatData) => void;
  className?: string;
}

export default function IndiaHeatmap({ data, onCityClick, className = '' }: IndiaHeatmapProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return '#ea384c';
    if (intensity >= 60) return '#f7d785';
    if (intensity >= 40) return '#2467ec';
    return '#16cc79';
  };

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-[0_0_15px_rgba(36,103,236,0.3)]">
        {/* India Outline (Simplified) */}
        <path
          d="M250,150 Q300,120 350,130 Q400,100 450,120 Q500,90 550,110 Q600,100 650,130 Q680,180 670,230 Q680,280 650,330 Q660,380 630,430 Q600,480 550,500 Q500,520 450,500 Q400,520 350,500 Q300,480 280,430 Q250,380 260,330 Q240,280 250,230 Q230,180 250,150Z"
          fill="rgba(36, 103, 236, 0.05)"
          stroke="rgba(36, 103, 236, 0.4)"
          strokeWidth="1.5"
          className="animate-pulse-slow"
        />

        {/* Grid Lines Overlay */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(36, 103, 236, 0.1)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none" />

        {/* State Boundaries (Simplified) */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" fill="none">
          <path d="M350,130 L350,500" />
          <path d="M450,120 L450,500" />
          <path d="M250,230 L650,230" />
          <path d="M260,330 L630,330" />
          <path d="M280,430 L550,430" />
        </g>

        {/* Connecting Lines (Network Effect) */}
        <g stroke="rgba(36, 103, 236, 0.1)" strokeWidth="0.5">
          {data.map((city, i) => {
            if (i >= data.length - 1) return null;
            const nextCity = data[i + 1];
            const x1 = ((city.lng - 68) / 15) * 500 + 150;
            const y1 = ((37 - city.lat) / 15) * 400 + 100;
            const x2 = ((nextCity.lng - 68) / 15) * 500 + 150;
            const y2 = ((37 - nextCity.lat) / 15) * 400 + 100;
            return <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* City Markers */}
        {data.map((city) => {
          const x = ((city.lng - 68) / 15) * 500 + 150;
          const y = ((37 - city.lat) / 15) * 400 + 100;
          const radius = Math.sqrt(city.totalThreats / 10) * 0.8; // Adjusted scale
          const color = getIntensityColor(city.intensity);
          const isSelected = selectedCity === city.city;

          return (
            <g
              key={city.city}
              className="cursor-pointer transition-all duration-300"
              onClick={() => {
                setSelectedCity(city.city);
                onCityClick(city);
              }}
              onMouseEnter={() => setSelectedCity(city.city)}
              onMouseLeave={() => setSelectedCity(null)}
            >
              {/* Pulse Effect */}
              <circle
                cx={x}
                cy={y}
                r={radius * 1.5}
                fill={color}
                opacity={0.2}
                className="animate-ping"
                style={{ animationDuration: `${3 - city.intensity / 50}s` }}
              />

              {/* Heat Circle */}
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                opacity={0.6}
                className="transition-all duration-300"
                stroke={isSelected ? '#fff' : 'none'}
                strokeWidth={isSelected ? 2 : 0}
              />

              {/* Center Dot */}
              <circle
                cx={x}
                cy={y}
                r={3}
                fill="#fff"
              />

              {/* Hover/Active Label */}
              <g
                className={`transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                pointerEvents="none"
              >
                <rect
                  x={x - 40}
                  y={y - radius - 35}
                  width="80"
                  height="25"
                  rx="4"
                  fill="rgba(15, 19, 34, 0.9)"
                  stroke={color}
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={y - radius - 18}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="Exo"
                  fontWeight="bold"
                >
                  {city.city}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
