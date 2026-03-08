import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Phone, 
  MessageSquare, 
  CreditCard,
  Mail,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
  Filter,
  Search,
  TrendingUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Report {
  id: string;
  type: 'call' | 'sms' | 'upi' | 'email' | 'website';
  title: string;
  description: string;
  reporter: string;
  upvotes: number;
  comments: number;
  status: 'verified' | 'pending' | 'investigating';
  timestamp: Date;
  phoneNumber?: string;
  upiId?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    type: 'call',
    title: 'Fake SBI KYC Call',
    description: 'Received a call from someone claiming to be from SBI asking for KYC update. They asked for OTP and card details.',
    reporter: 'Rahul S.',
    upvotes: 234,
    comments: 45,
    status: 'verified',
    timestamp: new Date(Date.now() - 3600000),
    phoneNumber: '+91-99999-12345',
  },
  {
    id: '2',
    type: 'sms',
    title: 'Flipkart Fake Order SMS',
    description: 'Got SMS about fake order delivery with phishing link. Link leads to fake payment page.',
    reporter: 'Priya M.',
    upvotes: 189,
    comments: 23,
    status: 'verified',
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    type: 'upi',
    title: 'UPI Collect Request Fraud',
    description: 'Received UPI collect request from unknown ID claiming refund. Do not approve!',
    reporter: 'Amit K.',
    upvotes: 156,
    comments: 34,
    status: 'investigating',
    timestamp: new Date(Date.now() - 10800000),
    upiId: 'fakerefund@upi',
  },
  {
    id: '4',
    type: 'email',
    title: 'Income Tax Refund Phishing',
    description: 'Email claiming income tax refund with malicious attachment. Subject: "URGENT: Tax Refund Pending"',
    reporter: 'Sneha R.',
    upvotes: 98,
    comments: 12,
    status: 'pending',
    timestamp: new Date(Date.now() - 14400000),
  },
  {
    id: '5',
    type: 'website',
    title: 'Fake IRCTC Booking Site',
    description: 'Website mimicking IRCTC for ticket booking. Steals card details. URL: irctc-booking.com',
    reporter: 'Vikram P.',
    upvotes: 312,
    comments: 67,
    status: 'verified',
    timestamp: new Date(Date.now() - 18000000),
  },
];

const typeIcons = {
  call: Phone,
  sms: MessageSquare,
  upi: CreditCard,
  email: Mail,
  website: Globe,
};

const typeColors = {
  call: 'cyber-blue',
  sms: 'cyber-cyan',
  upi: 'cyber-green',
  email: 'cyber-yellow',
  website: 'cyber-purple',
};

export default function CommunityReports() {
  const [reports] = useState<Report[]>(mockReports);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.type === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-cyber-green/20 text-cyber-green"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'investigating':
        return <Badge className="bg-cyber-yellow/20 text-cyber-yellow"><Clock className="w-3 h-3 mr-1" />Investigating</Badge>;
      default:
        return <Badge className="bg-white/10 text-white/70"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen pt-14 lg:pl-64">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-exo font-bold text-2xl lg:text-3xl text-white mb-1">
              Community Reports
            </h1>
            <p className="text-white/50">
              Report and discover scams reported by the community
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              {reports.length} Reports
            </Badge>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cyber-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Report Scam
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-cyber-dark border-cyber-blue/30 max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-white">Report a Scam</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <select className="cyber-input w-full">
                    <option>Select scam type</option>
                    <option>Phone Call</option>
                    <option>SMS/Message</option>
                    <option>UPI/Payment</option>
                    <option>Email</option>
                    <option>Website/App</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Title"
                    className="cyber-input w-full"
                  />
                  <textarea 
                    placeholder="Describe the scam..."
                    className="cyber-input w-full min-h-[100px]"
                  />
                  <input 
                    type="text" 
                    placeholder="Phone number / UPI ID / URL (optional)"
                    className="cyber-input w-full"
                  />
                  <Button className="w-full cyber-button">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="cyber-card p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="cyber-input pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/50" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="cyber-input py-2 px-3"
              >
                <option value="all">All Types</option>
                <option value="call">Phone Calls</option>
                <option value="sms">SMS</option>
                <option value="upi">UPI</option>
                <option value="email">Email</option>
                <option value="website">Websites</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'All', count: reports.length, color: 'cyber-blue' },
            { label: 'Calls', count: reports.filter(r => r.type === 'call').length, color: 'cyber-blue' },
            { label: 'SMS', count: reports.filter(r => r.type === 'sms').length, color: 'cyber-cyan' },
            { label: 'UPI', count: reports.filter(r => r.type === 'upi').length, color: 'cyber-green' },
            { label: 'Verified', count: reports.filter(r => r.status === 'verified').length, color: 'cyber-green' },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setFilter(stat.label === 'All' ? 'all' : stat.label.toLowerCase())}
              className={`cyber-card p-3 text-center hover:border-cyber-blue/50 transition-colors`}
            >
              <p className={`font-exo font-bold text-xl text-${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-white/50">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => {
            const Icon = typeIcons[report.type];
            const color = typeColors[report.type];

            return (
              <div key={report.id} className="cyber-card p-5 hover:border-cyber-blue/30 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Type Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-${color}/20 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 text-${color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{report.title}</h3>
                        <p className="text-sm text-white/50">
                          Reported by {report.reporter} • {report.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>

                    <p className="text-white/70 mb-4 line-clamp-2">{report.description}</p>

                    {/* Details */}
                    {(report.phoneNumber || report.upiId) && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {report.phoneNumber && (
                          <Badge className="bg-white/5 text-white/70">
                            <Phone className="w-3 h-3 mr-1" />
                            {report.phoneNumber}
                          </Badge>
                        )}
                        {report.upiId && (
                          <Badge className="bg-white/5 text-white/70">
                            <CreditCard className="w-3 h-3 mr-1" />
                            {report.upiId}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-white/50 hover:text-cyber-blue transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {report.upvotes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-white/50 hover:text-cyber-blue transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {report.comments}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-white/50 hover:text-cyber-blue transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="cyber-card p-12 text-center">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">No reports found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
