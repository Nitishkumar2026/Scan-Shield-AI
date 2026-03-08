import { useState } from 'react';
import { 
  Plus, 
  Shield,
  AlertTriangle,
  Bell,
  Settings,
  MoreVertical,
  Heart,
  MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  riskScore: number;
  status: 'safe' | 'warning' | 'danger';
  lastActive: string;
  threatsBlocked: number;
  location: string;
  alerts: number;
}

const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Mom',
    relationship: 'Mother',
    avatar: 'M',
    riskScore: 15,
    status: 'safe',
    lastActive: '2 min ago',
    threatsBlocked: 23,
    location: 'Home',
    alerts: 0,
  },
  {
    id: '2',
    name: 'Dad',
    relationship: 'Father',
    avatar: 'D',
    riskScore: 25,
    status: 'safe',
    lastActive: '15 min ago',
    threatsBlocked: 18,
    location: 'Office',
    alerts: 0,
  },
  {
    id: '3',
    name: 'Sister',
    relationship: 'Sister',
    avatar: 'S',
    riskScore: 45,
    status: 'warning',
    lastActive: '1 hour ago',
    threatsBlocked: 12,
    location: 'College',
    alerts: 2,
  },
  {
    id: '4',
    name: 'Grandma',
    relationship: 'Grandmother',
    avatar: 'G',
    riskScore: 65,
    status: 'danger',
    lastActive: '30 min ago',
    threatsBlocked: 45,
    location: 'Home',
    alerts: 3,
  },
];

const recentFamilyAlerts = [
  { id: 1, member: 'Grandma', type: 'call', message: 'Suspicious call blocked', time: '10 min ago' },
  { id: 2, member: 'Sister', type: 'sms', message: 'Phishing link detected', time: '25 min ago' },
  { id: 3, member: 'Grandma', type: 'upi', message: 'UPI fraud attempt', time: '1 hour ago' },
];

export default function FamilyGuardian() {
  const [members] = useState<FamilyMember[]>(mockFamilyMembers);
  const [, setSelectedMember] = useState<FamilyMember | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'cyber-green';
      case 'warning': return 'cyber-yellow';
      case 'danger': return 'cyber-red';
      default: return 'cyber-blue';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'cyber-green';
    if (score < 60) return 'cyber-yellow';
    return 'cyber-red';
  };

  const totalAlerts = members.reduce((sum, m) => sum + m.alerts, 0);
  const avgRisk = Math.round(members.reduce((sum, m) => sum + m.riskScore, 0) / members.length);

  return (
    <div className="min-h-screen pt-14 lg:pl-64">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-exo font-bold text-2xl lg:text-3xl text-white mb-1">
              Family Guardian
            </h1>
            <p className="text-white/50">
              Monitor and protect your family members
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30">
              <Heart className="w-3 h-3 mr-1" />
              {members.length} Members
            </Badge>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cyber-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-cyber-dark border-cyber-blue/30">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Family Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <input 
                    type="text" 
                    placeholder="Name"
                    className="cyber-input w-full"
                  />
                  <input 
                    type="text" 
                    placeholder="Relationship"
                    className="cyber-input w-full"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number"
                    className="cyber-input w-full"
                  />
                  <Button className="w-full cyber-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="cyber-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyber-green/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyber-green" />
              </div>
              <div>
                <p className="font-exo font-bold text-2xl text-white">{members.length}</p>
                <p className="text-sm text-white/50">Protected Members</p>
              </div>
            </div>
          </div>
          <div className="cyber-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyber-yellow/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-cyber-yellow" />
              </div>
              <div>
                <p className="font-exo font-bold text-2xl text-white">{totalAlerts}</p>
                <p className="text-sm text-white/50">Active Alerts</p>
              </div>
            </div>
          </div>
          <div className="cyber-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyber-blue/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-cyber-blue" />
              </div>
              <div>
                <p className="font-exo font-bold text-2xl text-white">{avgRisk}%</p>
                <p className="text-sm text-white/50">Avg Risk Score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Family Members Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {members.map((member) => (
              <div 
                key={member.id}
                className="cyber-card p-5 cursor-pointer hover:border-cyber-blue/50 transition-colors"
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-${getRiskColor(member.riskScore)}/20 flex items-center justify-center`}>
                      <span className={`font-exo font-bold text-lg text-${getRiskColor(member.riskScore)}`}>
                        {member.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="text-xs text-white/50">{member.relationship}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.alerts > 0 && (
                      <Badge className="bg-cyber-red/20 text-cyber-red">
                        <Bell className="w-3 h-3 mr-1" />
                        {member.alerts}
                      </Badge>
                    )}
                    <button className="text-white/30 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Risk Score */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/50">Risk Score</span>
                    <span className={`text-${getRiskColor(member.riskScore)}`}>{member.riskScore}%</span>
                  </div>
                  <Progress 
                    value={member.riskScore} 
                    className="h-2"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="glass-panel p-2 rounded-lg text-center">
                    <p className="text-lg font-bold text-cyber-blue">{member.threatsBlocked}</p>
                    <p className="text-[10px] text-white/50">Blocked</p>
                  </div>
                  <div className="glass-panel p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3 text-cyber-cyan" />
                      <span className="text-xs text-white/70">{member.location}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-${getStatusColor(member.status)} animate-pulse`} />
                    <span className={`text-xs text-${getStatusColor(member.status)} capitalize`}>
                      {member.status}
                    </span>
                  </div>
                  <span className="text-xs text-white/30">{member.lastActive}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Recent Alerts */}
            <div className="cyber-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">
                  <Bell className="w-4 h-4 inline mr-2" />
                  Recent Alerts
                </h3>
                <button className="text-xs text-cyber-blue hover:text-cyber-cyan">
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {recentFamilyAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{alert.member}</span>
                      <Badge className="text-xs bg-cyber-red/20 text-cyber-red">
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60">{alert.message}</p>
                    <p className="text-xs text-white/40 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Protection Settings */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-4">
                <Settings className="w-4 h-4 inline mr-2" />
                Protection Settings
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Call Monitoring', enabled: true },
                  { label: 'SMS Scanning', enabled: true },
                  { label: 'UPI Protection', enabled: true },
                  { label: 'Location Alerts', enabled: false },
                  { label: 'Emergency Contacts', enabled: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-sm text-white/70">{setting.label}</span>
                    <div className={`w-10 h-5 rounded-full p-1 transition-colors ${
                      setting.enabled ? 'bg-cyber-green' : 'bg-white/20'
                    }`}>
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                        setting.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div className="cyber-card p-5 border-cyber-red/30">
              <h3 className="font-semibold text-white mb-3">Emergency</h3>
              <p className="text-sm text-white/50 mb-4">
                In case of emergency, all family members will be notified.
              </p>
              <Button className="w-full bg-cyber-red hover:bg-cyber-red/80">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Send Emergency Alert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
