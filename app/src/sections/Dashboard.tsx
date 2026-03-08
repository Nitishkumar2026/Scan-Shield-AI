import { useState, useMemo } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Phone,
  MessageSquare,
  CreditCard,
  Target,
  Radio
} from 'lucide-react';
import IndiaHeatmap from '@/components/IndiaHeatmap';
import Clock from '@/components/Clock';
import InterceptionLog from '@/components/InterceptionLog';
import type { ThreatData } from '@/sections/ThreatHeatmap';
import type { Page } from '@/App';

// Mock threat data
const threatData: ThreatData[] = [
  { city: 'Mumbai', state: 'Maharashtra', lat: 19.076, lng: 72.877, callScams: 1250, smsScams: 890, upiFrauds: 650, totalThreats: 2790, intensity: 95 },
  { city: 'Delhi', state: 'Delhi', lat: 28.704, lng: 77.102, callScams: 1180, smsScams: 920, upiFrauds: 780, totalThreats: 2880, intensity: 98 },
  { city: 'Bangalore', state: 'Karnataka', lat: 12.972, lng: 77.594, callScams: 980, smsScams: 750, upiFrauds: 620, totalThreats: 2350, intensity: 85 },
  { city: 'Chennai', state: 'Tamil Nadu', lat: 13.083, lng: 80.270, callScams: 720, smsScams: 540, upiFrauds: 410, totalThreats: 1670, intensity: 65 },
  { city: 'Kolkata', state: 'West Bengal', lat: 22.573, lng: 88.363, callScams: 650, smsScams: 480, upiFrauds: 350, totalThreats: 1480, intensity: 58 },
  { city: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.486, callScams: 580, smsScams: 420, upiFrauds: 380, totalThreats: 1380, intensity: 52 },
];

const liveActivity = [
  { id: 1, action: 'BLOCKED', type: 'call', source: '+91-98***-12345', location: 'Mumbai', time: 'Just now' },
  { id: 2, action: 'DETECTED', type: 'sms', source: 'AX-HDFC', location: 'Delhi', time: '2s ago' },
  { id: 3, action: 'VERIFIED', type: 'upi', source: 'shop@paytm', location: 'Bangalore', time: '5s ago' },
  { id: 4, action: 'BLOCKED', type: 'call', source: '+91-88***-98765', location: 'Chennai', time: '12s ago' },
  { id: 5, action: 'REPORTED', type: 'sms', source: 'Unknown', location: 'Pune', time: '18s ago' },
];

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedCity, setSelectedCity] = useState<ThreatData | null>(null);

  const stats = useMemo(() => [
    { label: 'TOTAL THREATS BLOCKED', value: '1,284,932', color: 'cyber-green', icon: Shield, trend: '+4.2%' },
    { label: 'ACTIVE THREATS', value: '42', color: 'cyber-red', icon: Target, trend: '-2.1%' },
    { label: 'PROTECTED CITIZENS', value: '14.2M', color: 'cyber-blue', icon: CheckCircle, trend: '+1.5M' },
    { label: 'SYSTEM LOAD', value: '12%', color: 'cyber-cyan', icon: Activity, trend: 'STABLE' },
  ], []);

  return (
    <div className="min-h-screen pt-14 lg:pl-64 bg-black/40 cyber-grid transition-opacity duration-1000">
      <div className="p-4 lg:p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* COMMAND CENTER HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="relative group">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-cyber-blue shadow-[0_0_12px_#2467ec]" />
              <span className="font-exo font-bold text-xs tracking-[0.3em] text-cyber-blue flex items-center gap-2">
                COMMAND CENTER // LIVE
                <div className="w-8 h-[2px] bg-cyber-blue/30" />
              </span>
            </div>
            <h1 className="font-exo font-black text-4xl text-white tracking-tight uppercase">
              National Cyber Intelligence
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-[10px] font-mono tracking-wider">
              <div className="flex items-center gap-2 text-cyber-green/80 group">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-green shadow-[0_0_8px_#16cc79]" />
                <span>NET: <span className="text-white">ONLINE</span></span>
              </div>
              <div className="flex items-center gap-2 text-cyber-green/80">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-green shadow-[0_0_8px_#16cc79]" />
                <span>AI: <span className="text-white">ACTIVE</span></span>
              </div>
              <div className="flex items-center gap-2 text-cyber-blue/80">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue shadow-[0_0_8px_#2467ec]" />
                <span>G-SHIELD: <span className="text-white">ENABLED</span></span>
              </div>
            </div>

            <div className="h-10 w-px bg-white/10 hidden md:block mx-2" />
            <Clock />
          </div>
        </div>

        {/* KEY METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="cyber-card p-5 relative overflow-hidden group hover:bg-white/2 transition-colors border-white/10">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                <stat.icon className={`w-16 h-16 text-${stat.color}`} />
              </div>
              <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{stat.label}</p>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-${stat.color}/10 text-${stat.color}`}>
                  {stat.trend}
                </span>
              </div>
              <p className={`font-exo font-bold text-3xl text-${stat.color} glow-text mb-2 tracking-tight`}>{stat.value}</p>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-${stat.color}/5 overflow-hidden`}>
                <div className={`h-full w-[70%] bg-${stat.color} shadow-[0_0_10px_currentColor] animate-pulse`} />
              </div>
            </div>
          ))}
        </div>

        {/* MAIN VISUALIZATION AREA */}
        <div className="grid lg:grid-cols-3 gap-6 lg:h-[600px]">

          {/* THREAT MAP (2/3) */}
          <div className="lg:col-span-2 cyber-card relative overflow-hidden flex flex-col border-cyber-red/10">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
              <div className="flex items-center gap-3 glass-panel px-4 py-2 border-cyber-red/20 shadow-[0_0_15px_rgba(234,56,76,0.1)]">
                <div className="relative">
                  <Radio className="w-4 h-4 text-cyber-red" />
                  <div className="absolute inset-0 w-4 h-4 text-cyber-red animate-ping opacity-50"><Radio /></div>
                </div>
                <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">Visual Threat Feed</span>
              </div>
              <div className="flex gap-1 pointer-events-auto">
                {['ALL', 'CALL', 'SMS', 'UPI'].map(filter => (
                  <button key={filter} className="px-3 py-1 bg-black/60 border border-white/5 text-[9px] font-bold text-white/40 hover:text-cyber-blue hover:border-cyber-blue hover:bg-cyber-blue/5 transition-all rounded-none uppercase tracking-widest">
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#1a1f36_0%,_#0a0d17_100%)]">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full cyber-grid" />
              </div>
              <IndiaHeatmap
                data={threatData}
                onCityClick={setSelectedCity}
                className="w-full h-full p-8 relative z-0"
              />

              {/* Detail Panel */}
              {selectedCity && (
                <div className="absolute bottom-6 left-6 glass-panel p-5 w-72 border border-cyber-blue/30 shadow-glow animate-in slide-in-from-left-4 pointer-events-auto overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-blue/5 rotate-45 translate-x-12 -translate-y-12" />
                  <div className="flex justify-between items-start mb-4 relative">
                    <div>
                      <h3 className="font-exo font-black text-xl text-white tracking-tight italic uppercase">{selectedCity.city}</h3>
                      <p className="text-[10px] text-white/40 tracking-widest font-mono uppercase">{selectedCity.state}</p>
                    </div>
                    <button onClick={() => setSelectedCity(null)} className="text-white/20 hover:text-white bg-white/5 w-6 h-6 flex items-center justify-center rounded-full transition-colors border border-white/10 uppercase">×</button>
                  </div>
                  <div className="space-y-3 relative">
                    <div className="flex justify-between text-[11px] font-mono group">
                      <span className="text-white/40 group-hover:text-white transition-colors uppercase">Call Scams</span>
                      <span className="text-cyber-red font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {selectedCity.callScams}
                      </span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5" />
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono uppercase">
                        <span className="text-white/40">Risk Intensity</span>
                        <span className="text-cyber-red font-bold">{selectedCity.intensity}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                        <div className="h-full bg-cyber-red shadow-[0_0_10px_#ea384c]" style={{ width: `${selectedCity.intensity}%` }} />
                      </div>
                    </div>
                    <button className="w-full py-2 bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue font-bold text-[10px] tracking-widest uppercase hover:bg-cyber-blue hover:text-white transition-all shadow-[0_0_15px_rgba(36,103,236,0.1)] mt-2">
                      Request Full Data Surge
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR (1/3) */}
          <div className="flex flex-col gap-6 h-full">
            <InterceptionLog logs={liveActivity} />

            {/* QUICK ACTIONS */}
            <div className="cyber-card p-5 bg-cyber-blue/5 border-cyber-blue/20 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/5 -rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />
              <div className="mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyber-blue" />
                <h3 className="font-exo font-black text-white text-xs tracking-[0.2em] uppercase">Critical Deployment</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('call-analysis')}
                  className="flex flex-col items-center justify-center p-4 glass-panel hover:bg-cyber-blue group/btn transition-all duration-500 border-white/5 hover:border-cyber-blue/50 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                >
                  <Phone className="w-6 h-6 text-cyber-blue mb-2 group-hover/btn:text-white transition-all scale-90 group-hover/btn:scale-110" />
                  <span className="text-[9px] font-black text-white/50 group-hover/btn:text-white uppercase tracking-widest transition-colors mb-1">Analyze</span>
                  <span className="text-[10px] font-black text-white group-hover/btn:text-white inline-block">CALLS</span>
                </button>
                <button
                  onClick={() => onNavigate('sms-scanner')}
                  className="flex flex-col items-center justify-center p-4 glass-panel hover:bg-cyber-cyan group/btn transition-all duration-500 border-white/5 hover:border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                >
                  <MessageSquare className="w-6 h-6 text-cyber-cyan mb-2 group-hover/btn:text-white transition-all scale-90 group-hover/btn:scale-110" />
                  <span className="text-[9px] font-black text-white/50 group-hover/btn:text-white uppercase tracking-widest transition-colors mb-1">Scan</span>
                  <span className="text-[10px] font-black text-white group-hover/btn:text-white inline-block">SMS</span>
                </button>
                <button
                  onClick={() => onNavigate('upi-analyzer')}
                  className="flex flex-col items-center justify-center p-4 glass-panel hover:bg-cyber-green group/btn transition-all duration-500 border-white/5 hover:border-cyber-green/50 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                >
                  <CreditCard className="w-6 h-6 text-cyber-green mb-2 group-hover/btn:text-white transition-all scale-90 group-hover/btn:scale-110" />
                  <span className="text-[9px] font-black text-white/50 group-hover/btn:text-white uppercase tracking-widest transition-colors mb-1">Verify</span>
                  <span className="text-[10px] font-black text-white group-hover/btn:text-white inline-block">UPI</span>
                </button>
                <button
                  onClick={() => onNavigate('community-reports')}
                  className="flex flex-col items-center justify-center p-4 glass-panel hover:bg-cyber-red group/btn transition-all duration-500 border-white/5 hover:border-cyber-red/50 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                >
                  <AlertTriangle className="w-6 h-6 text-cyber-red mb-2 group-hover/btn:text-white transition-all scale-90 group-hover/btn:scale-110" />
                  <span className="text-[9px] font-black text-white/50 group-hover/btn:text-white uppercase tracking-widest transition-colors mb-1">Report</span>
                  <span className="text-[10px] font-black text-white group-hover/btn:text-white inline-block">THREAT</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
