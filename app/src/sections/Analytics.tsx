import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Shield,
  AlertTriangle,
  Clock
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

// Mock data
const weeklyData = [
  { day: 'Mon', blocked: 450, detected: 520 },
  { day: 'Tue', blocked: 380, detected: 450 },
  { day: 'Wed', blocked: 520, detected: 580 },
  { day: 'Thu', blocked: 490, detected: 550 },
  { day: 'Fri', blocked: 600, detected: 680 },
  { day: 'Sat', blocked: 720, detected: 800 },
  { day: 'Sun', blocked: 650, detected: 720 },
];

const monthlyTrend = [
  { month: 'Jan', scams: 12000 },
  { month: 'Feb', scams: 15000 },
  { month: 'Mar', scams: 18000 },
  { month: 'Apr', scams: 14000 },
  { month: 'May', scams: 22000 },
  { month: 'Jun', scams: 28000 },
];

const threatTypes = [
  { name: 'Call Scams', value: 45, color: '#2467ec' },
  { name: 'SMS Phishing', value: 25, color: '#00d4ff' },
  { name: 'UPI Fraud', value: 20, color: '#16cc79' },
  { name: 'Email Scams', value: 7, color: '#f7d785' },
  { name: 'App Fraud', value: 3, color: '#ea384c' },
];

const hourlyPattern = [
  { hour: '00:00', threats: 120 },
  { hour: '04:00', threats: 80 },
  { hour: '08:00', threats: 350 },
  { hour: '12:00', threats: 480 },
  { hour: '16:00', threats: 520 },
  { hour: '20:00', threats: 450 },
  { hour: '23:59', threats: 280 },
];

const topScamScripts = [
  { name: 'Bank KYC Update', count: 2847, trend: 'up', change: 12 },
  { name: 'Lottery Win', count: 1923, trend: 'down', change: 5 },
  { name: 'UPI Refund', count: 1654, trend: 'up', change: 23 },
  { name: 'Job Offer', count: 1234, trend: 'up', change: 8 },
  { name: 'Tax Refund', count: 987, trend: 'down', change: 3 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen pt-14 lg:pl-64">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-exo font-bold text-2xl lg:text-3xl text-white mb-1">
              Analytics Dashboard
            </h1>
            <p className="text-white/50">
              Deep insights into threat patterns and protection metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="cyber-input py-2 px-3 text-sm"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <Button className="cyber-button">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Blocked', value: '3,847', change: '+12.5%', trend: 'up', icon: Shield },
            { label: 'Active Threats', value: '156', change: '-8.2%', trend: 'down', icon: AlertTriangle },
            { label: 'Protected Users', value: '52.3K', change: '+5.1%', trend: 'up', icon: Users },
            { label: 'Avg Response', value: '0.8ms', change: '-0.2ms', trend: 'up', icon: Clock },
          ].map((kpi) => (
            <div key={kpi.label} className="cyber-card-hover p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-cyber-blue/20 flex items-center justify-center`}>
                  <kpi.icon className="w-5 h-5 text-cyber-blue" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${kpi.trend === 'up' ? 'text-cyber-green' : 'text-cyber-red'}`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <p className="font-exo font-bold text-2xl text-white">{kpi.value}</p>
              <p className="text-sm text-white/50">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Activity */}
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white">Weekly Activity</h3>
                <p className="text-xs text-white/50">Threats blocked vs detected</p>
              </div>
              <Badge className="bg-cyber-blue/20 text-cyber-blue">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15%
              </Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f36', 
                      border: '1px solid rgba(36, 103, 236, 0.3)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="blocked" fill="#2467ec" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="detected" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white">Monthly Trend</h3>
                <p className="text-xs text-white/50">Scam attempts over time</p>
              </div>
              <Badge className="bg-cyber-red/20 text-cyber-red">
                <TrendingUp className="w-3 h-3 mr-1" />
                High
              </Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorScams" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea384c" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ea384c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f36', 
                      border: '1px solid rgba(234, 56, 76, 0.3)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="scams" stroke="#ea384c" fillOpacity={1} fill="url(#colorScams)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Threat Distribution */}
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white">Threat Distribution</h3>
                <p className="text-xs text-white/50">By attack vector</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {threatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f36', 
                      border: '1px solid rgba(36, 103, 236, 0.3)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {threatTypes.map((type) => (
                <div key={type.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                  <span className="text-xs text-white/70">{type.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Pattern */}
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white">Hourly Pattern</h3>
                <p className="text-xs text-white/50">Peak activity hours</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyPattern}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f36', 
                      border: '1px solid rgba(36, 103, 236, 0.3)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="threats" stroke="#f7d785" strokeWidth={2} dot={{ fill: '#f7d785' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Scam Scripts */}
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white">Top Scam Scripts</h3>
              <p className="text-xs text-white/50">Most common scam patterns</p>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm text-white/50 font-medium">Scam Type</th>
                  <th className="text-left py-3 px-4 text-sm text-white/50 font-medium">Incidents</th>
                  <th className="text-left py-3 px-4 text-sm text-white/50 font-medium">Trend</th>
                  <th className="text-left py-3 px-4 text-sm text-white/50 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {topScamScripts.map((script) => (
                  <tr key={script.name} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{script.name}</td>
                    <td className="py-3 px-4 text-white">{script.count.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      {script.trend === 'up' ? (
                        <span className="flex items-center gap-1 text-cyber-red">
                          <TrendingUp className="w-4 h-4" /> Rising
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-cyber-green">
                          <TrendingDown className="w-4 h-4" /> Declining
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={script.trend === 'up' ? 'text-cyber-red' : 'text-cyber-green'}>
                        {script.trend === 'up' ? '+' : '-'}{script.change}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
