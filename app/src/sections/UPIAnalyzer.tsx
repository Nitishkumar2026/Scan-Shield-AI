import { useState } from 'react';
import { toast } from 'sonner';
import {
  CreditCard,
  Search,
  AlertTriangle,
  CheckCircle,
  Shield,
  Brain,
  History,
  User,
  Building2,
  AlertOctagon,
  TrendingUp,
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UPIAnalysis {
  id: string;
  upiId: string;
  name?: string;
  riskScore: number;
  isFraudulent: boolean;
  confidence: number;
  anomalyFactors: string[];
  transactionHistory?: {
    totalTransactions: number;
    flaggedTransactions: number;
    firstSeen: Date;
  };
  timestamp: Date;
}

const mockHistory: UPIAnalysis[] = [
  {
    id: '1',
    upiId: 'scammer@paytm',
    name: 'Unknown Entity',
    riskScore: 95,
    isFraudulent: true,
    confidence: 92,
    anomalyFactors: ['Multiple Reports', 'Recent Creation', 'Suspicious Pattern'],
    transactionHistory: {
      totalTransactions: 156,
      flaggedTransactions: 142,
      firstSeen: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    upiId: 'trusted@upi',
    name: 'Verified Merchant',
    riskScore: 5,
    isFraudulent: false,
    confidence: 99,
    anomalyFactors: [],
    transactionHistory: {
      totalTransactions: 50000,
      flaggedTransactions: 0,
      firstSeen: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    },
    timestamp: new Date(Date.now() - 7200000),
  },
];

const riskIndicators = [
  { label: 'Multiple Reports', desc: 'Reported by many users' },
  { label: 'Recent Creation', desc: 'New UPI ID' },
  { label: 'High Velocity', desc: 'Unusual transaction rate' },
  { label: 'Suspicious Pattern', desc: 'Irregular activity' },
];

export default function UPIAnalyzer() {
  const [upiId, setUpiId] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<UPIAnalysis | null>(null);
  const [history, setHistory] = useState<UPIAnalysis[]>(mockHistory);

  const analyzeUPI = async () => {
    if (!upiId.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis - random result for demo
    const isFraudulent = upiId.toLowerCase().includes('scam') || upiId.toLowerCase().includes('fake') || Math.random() > 0.7;

    const analysis: UPIAnalysis = {
      id: Date.now().toString(),
      upiId: upiId,
      name: isFraudulent ? 'Unknown Entity' : 'Verified User',
      riskScore: isFraudulent ? 75 + Math.floor(Math.random() * 25) : Math.floor(Math.random() * 20),
      isFraudulent,
      confidence: 85 + Math.floor(Math.random() * 15),
      anomalyFactors: isFraudulent
        ? riskIndicators.slice(0, Math.floor(Math.random() * 3) + 1).map(r => r.label)
        : [],
      transactionHistory: {
        totalTransactions: isFraudulent ? Math.floor(Math.random() * 500) : Math.floor(Math.random() * 50000),
        flaggedTransactions: isFraudulent ? Math.floor(Math.random() * 400) : 0,
        firstSeen: new Date(Date.now() - (isFraudulent ? 7 : 365) * 24 * 60 * 60 * 1000),
      },
      timestamp: new Date(),
    };

    setResult(analysis);
    setHistory(prev => [analysis, ...prev]);
    setIsAnalyzing(false);
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'cyber-green';
    if (score < 60) return 'cyber-yellow';
    if (score < 80) return 'cyber-orange';
    return 'cyber-red';
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'Low Risk';
    if (score < 60) return 'Medium Risk';
    if (score < 80) return 'High Risk';
    return 'Critical Risk';
  };

  return (
    <div className="min-h-screen pt-14 lg:pl-64">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-exo font-bold text-2xl lg:text-3xl text-white mb-1">
              UPI Fraud Analyzer
            </h1>
            <p className="text-white/50">
              Verify UPI IDs before making payments
            </p>
          </div>
          <Badge className="bg-cyber-green/20 text-cyber-green border border-cyber-green/30">
            <Brain className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Analyzer */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search Panel */}
            <div className="cyber-card p-6">
              <h3 className="font-semibold text-white mb-4">Verify UPI ID</h3>

              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <Input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g., name@upi)"
                    className="cyber-input pl-10"
                    onKeyDown={(e) => e.key === 'Enter' && analyzeUPI()}
                  />
                </div>
                <Button
                  onClick={analyzeUPI}
                  disabled={isAnalyzing || !upiId.trim()}
                  className="cyber-button"
                >
                  {isAnalyzing ? (
                    <><Search className="w-4 h-4 mr-2 animate-spin" />Analyzing...</>
                  ) : (
                    <><Search className="w-4 h-4 mr-2" />Verify</>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/40">
                <Info className="w-4 h-4" />
                <span>We check against national fraud database and AI pattern analysis</span>
              </div>
            </div>

            {/* Analysis Result */}
            {result && (
              <div className={`cyber-card p-6 border-${getRiskColor(result.riskScore)}/30`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-white">Analysis Result</h3>
                  <Badge className={`bg-${getRiskColor(result.riskScore)}/20 text-${getRiskColor(result.riskScore)}`}>
                    {getRiskLabel(result.riskScore)}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Risk Score */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="10"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          fill="none"
                          stroke={result.riskScore > 60 ? '#ea384c' : result.riskScore > 30 ? '#f7d785' : '#16cc79'}
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${result.riskScore * 2.76} 276`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`font-exo font-bold text-2xl text-${getRiskColor(result.riskScore)}`}>
                          {result.riskScore}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg text-white font-medium">{result.upiId}</p>
                      <p className="text-sm text-white/50">{result.name}</p>
                      <p className="text-xs text-white/40 mt-1">Confidence: {result.confidence}%</p>
                    </div>
                  </div>

                  {/* Transaction History */}
                  {result.transactionHistory && (
                    <div className="glass-panel p-4 rounded-lg">
                      <p className="text-sm text-white/70 mb-3">Transaction History</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">Total Transactions</span>
                          <span className="text-white">{result.transactionHistory.totalTransactions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">Flagged</span>
                          <span className={result.transactionHistory.flaggedTransactions > 0 ? 'text-cyber-red' : 'text-cyber-green'}>
                            {result.transactionHistory.flaggedTransactions}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">First Seen</span>
                          <span className="text-white">
                            {result.transactionHistory.firstSeen.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Anomaly Factors */}
                {result.anomalyFactors.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-white/70 mb-3">Risk Indicators:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.anomalyFactors.map((factor) => (
                        <Badge key={factor} className="bg-cyber-red/20 text-cyber-red">
                          <AlertOctagon className="w-3 h-3 mr-1" />
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning/ Safe Banner */}
                {result.isFraudulent ? (
                  <div className="mt-6 p-4 bg-cyber-red/10 border border-cyber-red/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-cyber-red flex-shrink-0" />
                      <div>
                        <p className="text-cyber-red font-medium">High Risk UPI ID Detected</p>
                        <p className="text-sm text-white/60 mt-1">
                          This UPI ID has been flagged by our system. We strongly recommend
                          not making any payments to this ID.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-cyber-green/10 border border-cyber-green/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-cyber-green flex-shrink-0" />
                      <div>
                        <p className="text-cyber-green font-medium">UPI ID Appears Safe</p>
                        <p className="text-sm text-white/60 mt-1">
                          No suspicious activity detected. However, always verify the recipient
                          before making payments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Risk Indicators Info */}
            <div className="cyber-card p-6">
              <h3 className="font-semibold text-white mb-4">What We Check</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {riskIndicators.map((indicator) => (
                  <div key={indicator.label} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-cyber-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-medium">{indicator.label}</p>
                      <p className="text-xs text-white/50">{indicator.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-4">Platform Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyber-green" />
                    <span className="text-sm text-white/70">Fraudulent IDs Blocked</span>
                  </div>
                  <span className="font-semibold text-cyber-green">1.2M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-cyber-blue" />
                    <span className="text-sm text-white/70">Daily Verifications</span>
                  </div>
                  <span className="font-semibold text-cyber-blue">500K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyber-cyan" />
                    <span className="text-sm text-white/70">Bank Partners</span>
                  </div>
                  <span className="font-semibold text-cyber-cyan">150+</span>
                </div>
              </div>
            </div>

            {/* Recent Verifications */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-4">
                <History className="w-4 h-4 inline mr-2" />
                Recent Verifications
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setResult(item)}
                    className={`p-3 rounded-lg border cursor-pointer hover:bg-white/5 transition-all ${item.isFraudulent
                      ? 'bg-cyber-red/5 border-cyber-red/20'
                      : 'bg-cyber-green/5 border-cyber-green/20'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white font-medium truncate">{item.upiId}</span>
                      <Badge className={`text-xs ${item.isFraudulent
                        ? 'bg-cyber-red/20 text-cyber-red'
                        : 'bg-cyber-green/20 text-cyber-green'
                        }`}>
                        {item.isFraudulent ? `${item.riskScore}%` : 'Safe'}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/40">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Fraud */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-3">Report Fraud</h3>
              <p className="text-sm text-white/50 mb-4">
                Encountered a fraudulent UPI ID? Report it to help protect others.
              </p>
              <Button
                onClick={() => toast.success('UPI fraud report submitted thank you.')}
                className="w-full cyber-button"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report UPI Fraud
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
