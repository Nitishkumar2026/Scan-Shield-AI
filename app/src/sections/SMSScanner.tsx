import { useState } from 'react';
import { toast } from 'sonner';
import {
  Scan,
  AlertTriangle,
  CheckCircle,
  Shield,
  Brain,
  Phone,
  CreditCard,
  History,
  Trash2,
  Search,
  Globe,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ScanResult {
  id: string;
  type: 'SMS' | 'URL' | 'UPI' | 'UNKNOWN';
  input: string;
  riskScore: number;
  isScam: boolean;
  confidence: number;
  entities: string[];
  timestamp: Date;
}

const mockHistory: ScanResult[] = [
  {
    id: '1',
    type: 'SMS',
    input: 'Dear Customer, Your account is blocked. Verify at bit.ly/3xScam',
    riskScore: 95,
    isScam: true,
    confidence: 98,
    entities: ['bit.ly/3xScam', 'Account Blocked'],
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    type: 'UPI',
    input: 'payment@okhdfcbank',
    riskScore: 10,
    isScam: false,
    confidence: 99,
    entities: ['HDFC Bank'],
    timestamp: new Date(Date.now() - 5000000),
  },
];

export default function SMSScanner() {
  const [input, setInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>(mockHistory);
  const [detectedType, setDetectedType] = useState<'SMS' | 'URL' | 'UPI' | 'UNKNOWN'>('UNKNOWN');

  // Auto-detect type
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);

    if (val.includes('http') || val.includes('www') || val.includes('.com')) setDetectedType('URL');
    else if (val.includes('@')) setDetectedType('UPI');
    else if (val.length > 20 || val.includes('OTP')) setDetectedType('SMS');
    else setDetectedType('UNKNOWN');
  };

  const handleScan = async () => {
    if (!input.trim()) return;

    setIsScanning(true);
    setResult(null);

    // Simulate complex scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isScam = input.toLowerCase().includes('scam') || input.toLowerCase().includes('block') || input.includes('bit.ly');

    const analysis: ScanResult = {
      id: Date.now().toString(),
      type: detectedType !== 'UNKNOWN' ? detectedType : 'SMS',
      input: input,
      riskScore: isScam ? 85 + Math.floor(Math.random() * 15) : Math.floor(Math.random() * 20),
      isScam: isScam,
      confidence: 85 + Math.floor(Math.random() * 14),
      entities: isScam ? ['Malicious Link', 'Urgency Tactic'] : ['Safe Domain'],
      timestamp: new Date(),
    };

    setResult(analysis);
    setHistory(prev => [analysis, ...prev]);
    setIsScanning(false);
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="min-h-screen pt-14 lg:pl-64 bg-black/40">
      <div className="p-4 lg:p-6 h-full flex flex-col">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scan className="w-5 h-5 text-cyber-cyan" />
              <span className="font-exo font-bold text-lg tracking-widest text-cyber-cyan">THREAT ANALYZER // MULTI-MODAL</span>
            </div>
            <h1 className="font-exo font-bold text-3xl text-white">Universal Scanner</h1>
          </div>
          <div className="flex gap-2">
            {['SMS', 'URL', 'UPI NO', 'QR CODE'].map(mode => (
              <Badge key={mode} variant="outline" className="border-white/10 text-white/50">{mode}</Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* LEFT: SCANNER INPUT & RESULT (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Input Area */}
            <div className="cyber-card p-6 relative group">
              <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-100 transition-opacity">
                <Brain className="w-6 h-6 text-cyber-cyan animate-pulse" />
              </div>

              <h3 className="font-exo font-bold text-white mb-4">INPUT SOURCE</h3>

              <div className="relative">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Paste SMS content, suspicious URL, receiver phone number, or UPI ID..."
                  className="cyber-input min-h-[120px] bg-black/40 border-cyber-cyan/30 focus:border-cyber-cyan text-lg resize-none"
                />
                {input && (
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50">
                      {detectedType === 'UNKNOWN' ? 'DETECTING TYPE...' : `${detectedType} DETECTED`}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-4">
                <Button
                  onClick={handleScan}
                  disabled={isScanning || !input.trim()}
                  className="flex-1 cyber-button bg-cyber-cyan hover:bg-cyan-600 text-black font-bold h-12 text-lg shadow-[0_0_20px_rgba(34,213,255,0.3)]"
                >
                  {isScanning ? (
                    <><Scan className="w-5 h-5 mr-2 animate-spin" />SCANNING THREAT DB...</>
                  ) : (
                    <><Search className="w-5 h-5 mr-2" />INITIATE DEEP SCAN</>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setInput('')} className="border-white/20 hover:bg-white/10 text-white h-12 w-12 p-0">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Analysis Result Display */}
            {result && (
              <div className={`cyber-card p-6 border-2 ${result.riskScore > 70 ? 'border-cyber-red/50 bg-cyber-red/5' : 'border-cyber-green/50 bg-cyber-green/5'
                } animate-in`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {result.riskScore > 70 ? <AlertTriangle className="w-5 h-5 text-cyber-red" /> : <CheckCircle className="w-5 h-5 text-cyber-green" />}
                      <span className={`font-exo font-bold text-xl ${result.riskScore > 70 ? 'text-cyber-red' : 'text-cyber-green'
                        }`}>{result.riskScore > 70 ? 'MALICIOUS THREAT DETECTED' : 'SOURCE VERIFIED SAFE'}</span>
                    </div>
                    <p className="text-white/60 text-sm font-mono">ID: {result.id} // {result.timestamp.toLocaleTimeString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-white/50">RISK SCORE</span>
                    <span className={`font-exo font-bold text-4xl ${result.riskScore > 70 ? 'text-cyber-red' : 'text-cyber-green'
                      }`}>{result.riskScore}/100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-panel p-3">
                    <span className="text-xs text-white/50 block mb-1">CONFIDENCE</span>
                    <span className="text-white font-mono">{result.confidence}%</span>
                  </div>
                  <div className="glass-panel p-3">
                    <span className="text-xs text-white/50 block mb-1">TYPE</span>
                    <span className="text-white font-mono">{result.type}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Detected Indicators</p>
                  <div className="flex flex-wrap gap-2">
                    {result.entities.map((ent, i) => (
                      <Badge key={i} variant="outline" className={`
                              ${result.riskScore > 70 ? 'border-cyber-red/40 text-cyber-red bg-cyber-red/10' : 'border-cyber-green/40 text-cyber-green bg-cyber-green/10'}
                           `}>
                        {ent}
                      </Badge>
                    ))}
                  </div>
                </div>

                {result.isScam && (
                  <div className="mt-6 pt-4 border-t border-white/10 flex gap-4">
                    <Button
                      onClick={() => toast.success('Sender blocked across all linked devices.')}
                      className="flex-1 bg-cyber-red hover:bg-red-600 text-white font-bold"
                    >
                      <Shield className="w-4 h-4 mr-2" /> BLOCK SENDER
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast.info('Detailed threat report submitted to I4C portal.')}
                      className="flex-1 border-white/20 text-white"
                    >
                      REPORT TO AUTHORITIES
                    </Button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* RIGHT: HISTORY (5 cols) */}
          <div className="lg:col-span-5 cyber-card p-0 flex flex-col h-[600px] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="font-exo font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-white/50" /> RECENT SCANS
              </h3>
              <button onClick={clearHistory} className="text-[10px] text-cyber-red hover:underline">CLEAR LOGS</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/30">
                  <Scan className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-sm">No scan history</p>
                </div>
              ) : (
                history.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setResult(item)}
                    className="glass-panel p-3 hover:bg-white/5 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-cyber-cyan"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {item.type === 'SMS' && <Phone className="w-3 h-3 text-cyber-blue" />}
                        {item.type === 'URL' && <Globe className="w-3 h-3 text-cyber-purple" />}
                        {item.type === 'UPI' && <CreditCard className="w-3 h-3 text-cyber-green" />}
                        <span className="text-xs font-bold text-white/70">{item.type}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.isScam ? 'bg-cyber-red/20 text-cyber-red' : 'bg-cyber-green/20 text-cyber-green'
                        }`}>
                        {item.isScam ? 'RISK' : 'SAFE'}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2 font-mono text-xs mb-2">{item.input}</p>
                    <div className="flex justify-between items-center text-[10px] text-white/40">
                      <span>{item.timestamp.toLocaleTimeString()}</span>
                      <span className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-cyber-cyan">
                        VIEW REPORT <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
