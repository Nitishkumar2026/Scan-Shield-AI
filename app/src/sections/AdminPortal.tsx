import { useState } from 'react';
import {
  Settings,
  Users,
  Shield,
  Database,
  Activity,
  AlertTriangle,
  RefreshCw,
  LogOut,
  Server,
  Globe,
  BarChart3,
  FileText,
  Lock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Mock system data
const systemMetrics = [
  { time: '00:00', cpu: 45, memory: 60, requests: 1200 },
  { time: '04:00', cpu: 35, memory: 55, requests: 800 },
  { time: '08:00', cpu: 65, memory: 70, requests: 2500 },
  { time: '12:00', cpu: 78, memory: 75, requests: 3200 },
  { time: '16:00', cpu: 82, memory: 80, requests: 3500 },
  { time: '20:00', cpu: 70, memory: 72, requests: 2800 },
];

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'entities', label: 'Flagged Entities', icon: AlertTriangle },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'system', label: 'System', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-14 lg:pl-64 bg-[#05070a] cyber-grid">
      <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-exo font-black text-3xl text-white tracking-tight uppercase">
                Admin Control <span className="text-cyber-purple italic">Portal</span>
              </h1>
              <Badge className="bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/30 font-mono tracking-widest text-[10px] uppercase">
                <Lock className="w-3 h-3 mr-2" />
                SECURE AUTH: ACTIVE
              </Badge>
            </div>
            <p className="text-white/40 font-mono text-xs tracking-widest">
              INSTITUTIONAL ACCESS // NODE-24-IND-ADMIN
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              className={`p-3 glass-panel border-white/10 text-cyber-blue hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Button variant="outline" className="border-cyber-red/30 text-cyber-red hover:bg-cyber-red hover:text-white transition-all font-black tracking-widest uppercase text-[10px] px-6">
              <LogOut className="w-4 h-4 mr-2" />
              Terminate Session
            </Button>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex flex-wrap gap-2 p-1 bg-white/[0.02] border border-white/5 inline-flex backdrop-blur-3xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 transition-all duration-300 relative group overflow-hidden ${activeTab === tab.id
                ? 'bg-cyber-blue text-white shadow-glow'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rotate-45 translate-x-4 -translate-y-4" />
              )}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Network Reach', value: '1.2M', change: '+5.2%', icon: Users, color: 'cyber-blue' },
                { label: 'Defensive Ops', value: '45.2K', change: '+12.8%', icon: Shield, color: 'cyber-green' },
                { label: 'Active Intel', value: '234', change: '-8.5%', icon: FileText, color: 'cyber-yellow' },
                { label: 'Core Uptime', value: '99.99%', change: 'Stable', icon: Activity, color: 'cyber-cyan' },
              ].map((kpi) => (
                <div key={kpi.label} className="cyber-card p-6 overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-${kpi.color}/10 border border-${kpi.color}/20 flex items-center justify-center`}>
                      <kpi.icon className={`w-5 h-5 text-${kpi.color}`} />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-1 bg-${kpi.color}/10 text-${kpi.color} border border-${kpi.color}/20`}>
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="font-exo font-black text-3xl text-white tracking-tight mb-1">{kpi.value}</h3>
                  <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">{kpi.label}</p>
                  <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-${kpi.color}/20`}>
                    <div className={`w-[60%] h-full bg-${kpi.color} shadow-[0_0_10px_currentColor]`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts View */}
            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 cyber-card p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-exo font-black text-white text-xs tracking-widest uppercase flex items-center gap-3">
                    <Activity className="w-4 h-4 text-cyber-blue" />
                    Neural Traffic Analytics
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyber-blue" />
                      <span className="text-[10px] text-white/40 uppercase font-mono">CPU Load</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyber-cyan" />
                      <span className="text-[10px] text-white/40 uppercase font-mono">Memory</span>
                    </div>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.1)" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.1)" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0a0d17',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '0px',
                          color: '#fff'
                        }}
                      />
                      <Line type="step" dataKey="cpu" stroke="#2467ec" strokeWidth={3} dot={false} />
                      <Line type="step" dataKey="memory" stroke="#00d4ff" strokeWidth={3} dot={true} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-2 cyber-card p-8 bg-cyber-green/[0.02]">
                <h3 className="font-exo font-black text-white text-xs tracking-widest uppercase flex items-center gap-3 mb-8">
                  <RefreshCw className="w-4 h-4 text-cyber-green" />
                  Request Propagation
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={systemMetrics}>
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.1)" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0a0d17',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '0px'
                        }}
                      />
                      <Bar dataKey="requests" fill="#16cc79" radius={[0, 0, 0, 0]} opacity={0.6} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Tab Integration */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'API Gateway', status: 'operational', latency: '12ms', icon: Globe },
                { label: 'AI Service', status: 'operational', latency: '45ms', icon: Server },
                { label: 'Database', status: 'operational', latency: '8ms', icon: Database },
                { label: 'Cache', status: 'operational', latency: '2ms', icon: Activity },
              ].map((service) => (
                <div key={service.label} className="cyber-card p-6 overflow-hidden">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 glass-panel">
                      <service.icon className="w-5 h-5 text-cyber-blue" />
                    </div>
                    <span className="text-white text-sm font-black tracking-widest uppercase">{service.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse shadow-[0_0_8px_#16cc79]" />
                      <span className="text-[10px] font-mono text-cyber-green uppercase font-bold tracking-tighter">{service.status}</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase">{service.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cyber-card p-8 border-cyber-blue/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-4 bg-cyber-blue" />
                <h3 className="font-exo font-black text-white text-xs tracking-widest uppercase">System Flux - Terminal Output</h3>
              </div>
              <div className="bg-black/60 border border-white/5 rounded-none p-6 font-mono text-[11px] leading-relaxed max-h-80 overflow-y-auto scrollbar-thin">
                <p className="text-cyber-green/80 flex gap-4 transition-colors hover:bg-white/5 p-1"><span className="text-white/20 tracking-tighter">[10:23:45]</span> <span className="text-cyber-blue">INFO:</span> NEURAL_GATEWAY :: Propagation successful (342ms)</p>
                <p className="text-cyber-blue/80 flex gap-4 transition-colors hover:bg-white/5 p-1"><span className="text-white/20 tracking-tighter">[10:23:44]</span> <span className="text-cyber-blue">INFO:</span> AI_CORE :: Analysis complete (Threat_Score: 0.87)</p>
                <p className="text-cyber-yellow/80 flex gap-4 transition-colors hover:bg-white/5 p-1"><span className="text-white/20 tracking-tighter">[10:23:42]</span> <span className="text-cyber-yellow">WARN:</span> DB_CLUSTER :: Sync latency exceeding 200ms in region: AS_SOUTH</p>
                <p className="text-cyber-green/80 flex gap-4 transition-colors hover:bg-white/5 p-1"><span className="text-white/20 tracking-tighter">[10:23:40]</span> <span className="text-cyber-blue">INFO:</span> EDGE_CACHE :: Hit_Ratio optimized to 94.5%</p>
                <p className="text-cyber-blue/80 flex gap-4 transition-colors hover:bg-white/5 p-1"><span className="text-white/20 tracking-tighter">[10:23:38]</span> <span className="text-cyber-blue">INFO:</span> AUTH_SERVICE :: Root admin session established</p>
                <p className="text-cyber-green/80 flex gap-4 transition-colors hover:bg-white/5 p-1"><span className="text-white/20 tracking-tighter">[10:23:35]</span> <span className="text-cyber-blue">INFO:</span> INTEL_SYNC :: Successfully ingested 4,231 new phishing signatures</p>
                <p className="text-cyber-blue/80 flex gap-4 transition-colors hover:bg-white/5 p-1"><span className="text-white/20 tracking-tighter">[10:23:30]</span> <span className="text-cyber-blue">INFO:</span> SYSTEM_CORE :: Kernel heartbeat stable, load: 1.45</p>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs with consistent styling */}
        {(activeTab === 'reports' || activeTab === 'entities' || activeTab === 'users' || activeTab === 'settings') && (
          <div className="cyber-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/10 opacity-60">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Settings className="w-8 h-8 text-cyber-blue animate-spin-slow" />
            </div>
            <h3 className="font-exo font-black text-xl text-white tracking-widest uppercase italic">Secure Module Encrypted</h3>
            <p className="text-white/30 text-[10px] tracking-widest max-w-sm uppercase leading-loose">The requested high-level intelligence module is currently undergoing periodic security re-encryption. Operational status expected in T-04:00:00.</p>
            <Button variant="outline" className="mt-8 border-cyber-blue/30 text-cyber-blue uppercase font-black text-[10px] tracking-widest hover:bg-cyber-blue hover:text-white transition-all px-8">Decrypt Module Preview</Button>
          </div>
        )}
      </div>
    </div>
  );
}
