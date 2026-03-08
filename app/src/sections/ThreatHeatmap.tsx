import { useState, useEffect } from 'react';
import {
  Map,
  Calendar,
  Filter,
  TrendingUp,
  AlertTriangle,
  Phone,
  MessageSquare,
  CreditCard,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export interface ThreatData {
  city: string;
  state: string;
  lat: number;
  lng: number;
  callScams: number;
  smsScams: number;
  upiFrauds: number;
  totalThreats: number;
  intensity: number;
}

// Mock threat data for major Indian cities
const threatData: ThreatData[] = [
  { city: 'Mumbai', state: 'Maharashtra', lat: 19.076, lng: 72.877, callScams: 1250, smsScams: 890, upiFrauds: 650, totalThreats: 2790, intensity: 95 },
  { city: 'Delhi', state: 'Delhi', lat: 28.704, lng: 77.102, callScams: 1180, smsScams: 920, upiFrauds: 780, totalThreats: 2880, intensity: 98 },
  { city: 'Bangalore', state: 'Karnataka', lat: 12.972, lng: 77.594, callScams: 980, smsScams: 750, upiFrauds: 620, totalThreats: 2350, intensity: 85 },
  { city: 'Chennai', state: 'Tamil Nadu', lat: 13.083, lng: 80.270, callScams: 720, smsScams: 540, upiFrauds: 410, totalThreats: 1670, intensity: 65 },
  { city: 'Kolkata', state: 'West Bengal', lat: 22.573, lng: 88.363, callScams: 650, smsScams: 480, upiFrauds: 350, totalThreats: 1480, intensity: 58 },
  { city: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.486, callScams: 580, smsScams: 420, upiFrauds: 380, totalThreats: 1380, intensity: 52 },
  { city: 'Pune', state: 'Maharashtra', lat: 18.520, lng: 73.856, callScams: 450, smsScams: 320, upiFrauds: 280, totalThreats: 1050, intensity: 42 },
  { city: 'Ahmedabad', state: 'Gujarat', lat: 23.022, lng: 72.571, callScams: 380, smsScams: 290, upiFrauds: 240, totalThreats: 910, intensity: 35 },
  { city: 'Jaipur', state: 'Rajasthan', lat: 26.912, lng: 75.787, callScams: 320, smsScams: 240, upiFrauds: 190, totalThreats: 750, intensity: 28 },
  { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.847, lng: 80.946, callScams: 290, smsScams: 210, upiFrauds: 170, totalThreats: 670, intensity: 25 },
];

const timeSlots = [
  '00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'
];

export default function ThreatHeatmap() {
  const [selectedTime, setSelectedTime] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState<'all' | 'call' | 'sms' | 'upi'>('all');
  const [selectedCity, setSelectedCity] = useState<ThreatData | null>(null);

  // Auto-play time slider
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSelectedTime(prev => (prev + 1) % timeSlots.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return '#ea384c';
    if (intensity >= 60) return '#f7d785';
    if (intensity >= 40) return '#2467ec';
    return '#16cc79';
  };

  const getFilteredValue = (city: ThreatData) => {
    switch (filter) {
      case 'call': return city.callScams;
      case 'sms': return city.smsScams;
      case 'upi': return city.upiFrauds;
      default: return city.totalThreats;
    }
  };

  const totalThreats = threatData.reduce((sum, city) => sum + getFilteredValue(city), 0);
  const avgIntensity = Math.round(threatData.reduce((sum, city) => sum + city.intensity, 0) / threatData.length);
  const highestRiskCity = threatData.reduce((max, city) => city.intensity > max.intensity ? city : max, threatData[0]);

  return (
    <div className="min-h-screen pt-14 lg:pl-64">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-exo font-bold text-2xl lg:text-3xl text-white mb-1">
              India Threat Heatmap
            </h1>
            <p className="text-white/50">
              Real-time scam and fraud activity across India
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-cyber-red/20 text-cyber-red border border-cyber-red/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="cyber-card p-4">
            <p className="text-xs text-white/50 mb-1">Total Threats (24h)</p>
            <p className="font-exo font-bold text-2xl text-white">{totalThreats.toLocaleString()}</p>
          </div>
          <div className="cyber-card p-4">
            <p className="text-xs text-white/50 mb-1">Avg Risk Level</p>
            <p className={`font-exo font-bold text-2xl text-${avgIntensity > 70 ? 'cyber-red' : avgIntensity > 40 ? 'cyber-yellow' : 'cyber-green'}`}>
              {avgIntensity}%
            </p>
          </div>
          <div className="cyber-card p-4">
            <p className="text-xs text-white/50 mb-1">Highest Risk City</p>
            <p className="font-exo font-bold text-lg text-cyber-red">{highestRiskCity.city}</p>
          </div>
          <div className="cyber-card p-4">
            <p className="text-xs text-white/50 mb-1">Active Alerts</p>
            <p className="font-exo font-bold text-2xl text-cyber-orange">{Math.floor(totalThreats / 10)}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Controls */}
            <div className="cyber-card p-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-white/50" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="cyber-input py-2 px-3 text-sm"
                  >
                    <option value="all">All Threats</option>
                    <option value="call">Call Scams</option>
                    <option value="sms">SMS Phishing</option>
                    <option value="upi">UPI Fraud</option>
                  </select>
                </div>

                {/* Time Slider */}
                <div className="flex-1 flex items-center gap-4 min-w-[200px]">
                  <Calendar className="w-4 h-4 text-white/50" />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-white/50 mb-1">
                      <span>Time: {timeSlots[selectedTime]}</span>
                    </div>
                    <Slider
                      value={[selectedTime]}
                      onValueChange={(v) => setSelectedTime(v[0])}
                      max={timeSlots.length - 1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTime(0)}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-cyber-blue/20 rounded-lg hover:bg-cyber-blue/30"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setSelectedTime(timeSlots.length - 1)}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Map Visualization */}
            <div className="cyber-card p-4 relative overflow-hidden">
              <svg viewBox="0 0 800 600" className="w-full h-[400px]">
                {/* India Outline (Simplified) */}
                <path
                  d="M250,150 Q300,120 350,130 Q400,100 450,120 Q500,90 550,110 Q600,100 650,130 Q680,180 670,230 Q680,280 650,330 Q660,380 630,430 Q600,480 550,500 Q500,520 450,500 Q400,520 350,500 Q300,480 280,430 Q250,380 260,330 Q240,280 250,230 Q230,180 250,150Z"
                  fill="rgba(36, 103, 236, 0.05)"
                  stroke="rgba(36, 103, 236, 0.3)"
                  strokeWidth="2"
                />

                {/* State Boundaries (Simplified) */}
                <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
                  <path d="M350,130 L350,500" />
                  <path d="M450,120 L450,500" />
                  <path d="M250,230 L650,230" />
                  <path d="M260,330 L630,330" />
                  <path d="M280,430 L550,430" />
                </g>

                {/* City Markers */}
                {threatData.map((city) => {
                  const x = ((city.lng - 68) / 15) * 500 + 150;
                  const y = ((37 - city.lat) / 15) * 400 + 100;
                  const value = getFilteredValue(city);
                  const radius = Math.sqrt(value / 10);

                  return (
                    <g
                      key={city.city}
                      className="cursor-pointer"
                      onClick={() => setSelectedCity(city)}
                    >
                      {/* Heat Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill={getIntensityColor(city.intensity)}
                        opacity={0.4}
                        className="animate-pulse"
                        style={{ animationDuration: `${3 - city.intensity / 50}s` }}
                      />
                      {/* Center Dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r={5}
                        fill={getIntensityColor(city.intensity)}
                      />
                      {/* City Label */}
                      <text
                        x={x}
                        y={y - radius - 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontFamily="Exo"
                      >
                        {city.city}
                      </text>
                      {/* Value Label */}
                      <text
                        x={x}
                        y={y + radius + 15}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.7)"
                        fontSize="9"
                      >
                        {value}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 glass-panel p-3 rounded-lg">
                <p className="text-xs text-white/50 mb-2">Threat Level</p>
                <div className="space-y-1">
                  {[
                    { label: 'Critical', color: '#ea384c' },
                    { label: 'High', color: '#f7d785' },
                    { label: 'Medium', color: '#2467ec' },
                    { label: 'Low', color: '#16cc79' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-white/70">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Selected City Details */}
            {selectedCity ? (
              <div className="cyber-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">{selectedCity.city}</h3>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="text-white/50 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="glass-panel p-3 rounded-lg">
                    <p className="text-xs text-white/50 mb-1">Threat Intensity</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${selectedCity.intensity}%`,
                            backgroundColor: getIntensityColor(selectedCity.intensity)
                          }}
                        />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getIntensityColor(selectedCity.intensity) }}
                      >
                        {selectedCity.intensity}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-cyber-blue" />
                        <span className="text-sm text-white/70">Call Scams</span>
                      </div>
                      <span className="text-white font-medium">{selectedCity.callScams}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-cyber-cyan" />
                        <span className="text-sm text-white/70">SMS Phishing</span>
                      </div>
                      <span className="text-white font-medium">{selectedCity.smsScams}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-cyber-green" />
                        <span className="text-sm text-white/70">UPI Fraud</span>
                      </div>
                      <span className="text-white font-medium">{selectedCity.upiFrauds}</span>
                    </div>
                  </div>

                  <Button className="w-full cyber-button text-sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Trends
                  </Button>
                </div>
              </div>
            ) : (
              <div className="cyber-card p-5 text-center">
                <Map className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/50">Click on a city to view details</p>
              </div>
            )}

            {/* Top Threat Cities */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-4">Top Threat Cities</h3>
              <div className="space-y-2">
                {threatData
                  .sort((a, b) => b.intensity - a.intensity)
                  .slice(0, 5)
                  .map((city, index) => (
                    <div
                      key={city.city}
                      className="flex items-center justify-between p-2 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10"
                      onClick={() => setSelectedCity(city)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-cyber-blue/20 text-cyber-blue text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm text-white">{city.city}</span>
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getIntensityColor(city.intensity) }}
                      >
                        {city.intensity}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Export */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-3">Export Data</h3>
              <Button className="w-full cyber-button text-sm">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
