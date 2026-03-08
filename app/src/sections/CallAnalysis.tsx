import { useEffect, useState, useRef } from 'react';
import {
  Phone,
  Mic,
  AlertTriangle,
  Brain,
  Play,
  Share2,
  RotateCcw,
  ShieldAlert,
  Activity,
  User,
  XCircle,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface TranscriptSegment {
  time: string;
  speaker: 'user' | 'caller';
  text: string;
  riskIndicator?: boolean;
}

const mockTranscript: TranscriptSegment[] = [
  { time: '00:00', speaker: 'caller', text: 'Hello, this is calling from State Bank of India.' },
  { time: '00:03', speaker: 'caller', text: 'We have detected suspicious activity on your account.', riskIndicator: true },
  { time: '00:06', speaker: 'user', text: 'What kind of activity?' },
  { time: '00:08', speaker: 'caller', text: 'Someone is trying to transfer 50,000 rupees from your account.', riskIndicator: true },
  { time: '00:12', speaker: 'caller', text: 'To stop this transaction, I need your OTP.', riskIndicator: true },
  { time: '00:15', speaker: 'user', text: 'I didn\'t initiate any transfer.' },
  { time: '00:17', speaker: 'caller', text: 'That\'s why we need to verify. Please share the OTP sent to your number.', riskIndicator: true },
];

const riskFactors = [
  { name: 'Urgency Tactics', score: 85, description: 'Creating false time pressure' },
  { name: 'Authority Impersonation', score: 92, description: 'Pretending to be from bank' },
  { name: 'OTP Request', score: 98, description: 'Asking for sensitive code' },
  { name: 'Threat Language', score: 75, description: 'Using fear-based messaging' },
];

const detectedEntities = [
  { type: 'ORG', value: 'State Bank of India', confidence: 98 },
  { type: 'MONEY', value: '50,000 INR', confidence: 95 },
  { type: 'SENSITIVE', value: 'OTP Request', confidence: 99 },
];

export default function CallAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Simulate call analysis
  useEffect(() => {
    if (!isAnalyzing || isPaused) return;

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnalyzing, isPaused]);

  // Simulate transcript streaming
  useEffect(() => {
    if (!isAnalyzing || isPaused || showResults) return;

    if (currentSegment < mockTranscript.length) {
      const timer = setTimeout(() => {
        setTranscript(prev => [...prev, mockTranscript[currentSegment]]);

        // Update risk score based on segment
        if (mockTranscript[currentSegment].riskIndicator) {
          setRiskScore(prev => Math.min(prev + 15, 95));
        }

        setCurrentSegment(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // Analysis complete
      setTimeout(() => setShowResults(true), 1000);
    }
  }, [isAnalyzing, isPaused, currentSegment, showResults]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTranscript([]);
    setCurrentSegment(0);
    setRiskScore(10);
    setCallDuration(0);
    setShowResults(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-14 lg:pl-64 bg-black/40">
      <div className="p-4 lg:p-6 h-full flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-cyber-blue" />
              <span className="font-exo font-bold text-lg tracking-widest text-cyber-blue">LIVE INTERCEPT // VOICE</span>
            </div>
            <h1 className="font-exo font-bold text-3xl text-white">Call Analysis</h1>
          </div>
          {isAnalyzing && (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-3 h-3 bg-cyber-red rounded-full shadow-[0_0_10px_#ea384c]" />
              <span className="font-mono text-cyber-red font-bold tracking-widest">RECORDING</span>
            </div>
          )}
        </div>

        {!isAnalyzing ? (
          // START SCREEN
          <div className="flex-1 flex items-center justify-center">
            <div className="cyber-card p-10 max-w-2xl w-full text-center relative overflow-hidden group">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-cyber-blue/5 group-hover:bg-cyber-blue/10 transition-colors" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-scan-line" />

              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-cyber-blue/30 flex items-center justify-center bg-cyber-blue/10 shadow-[0_0_30px_rgba(36,103,236,0.2)]">
                  <Phone className="w-10 h-10 text-cyber-blue animate-pulse" />
                </div>

                <h2 className="font-exo font-bold text-3xl text-white mb-4">Initialize Voice Intercept</h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  Activate real-time voice pattern analysis. The AI acts as a silent guardian, monitoring for semantic threats, synthetic voice signatures, and known scam scripts.
                </p>

                <Button onClick={startAnalysis} className="cyber-button text-lg px-12 py-8 hover:scale-105 transition-transform">
                  <Mic className="w-5 h-5 mr-3" />
                  INITIATE SCAN
                </Button>

                <div className="mt-8 grid grid-cols-3 gap-4 text-xs font-mono text-white/40">
                  <div className="flex flex-col items-center">
                    <Brain className="w-4 h-4 mb-1 text-cyber-cyan" />
                    <span>NEURAL ENGINE</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldAlert className="w-4 h-4 mb-1 text-cyber-red" />
                    <span>THREAT DB</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Activity className="w-4 h-4 mb-1 text-cyber-green" />
                    <span>SENTIMENT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // MAIN ANALYSIS INTERFACE
          <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">

            {/* LEFT: VISUALIZER & STATS (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">

              {/* Visualizer Card */}
              <div className="cyber-card p-4 flex-1 flex flex-col justify-between relative overflow-hidden border-cyber-red/30">
                <div className="absolute inset-0 bg-cyber-red/5 animate-pulse-slow" />

                <div className="relative z-10 flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-cyber-red">SIGNAL STRENGTH</span>
                  <span className="font-mono text-xl text-white">{formatTime(callDuration)}</span>
                </div>

                {/* Audio Waveform Viz */}
                <div className="flex-1 flex items-center justify-center gap-1 opacity-80">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-cyber-red rounded-full animate-wave"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center text-xs font-mono text-white/50">
                  <span>FREQ: 44.1kHz</span>
                  <span>CH: MONO</span>
                </div>
              </div>

              {/* Risk Gauge Card */}
              <div className="cyber-card p-6 border-cyber-red/30 bg-cyber-red/5">
                <h3 className="font-exo font-bold text-white mb-4 text-center">THREAT PROBABILITY</h3>
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full -rotate-90">
                    {/* Background Circle */}
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                    {/* Progress Circle */}
                    <circle
                      cx="80" cy="80" r="70"
                      fill="none"
                      stroke={riskScore > 80 ? '#ea384c' : '#f7d785'}
                      strokeWidth="12"
                      strokeDasharray={`${riskScore * 4.4} 440`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-exo font-bold text-4xl text-white">{riskScore}%</span>
                    <span className="text-[10px] font-mono text-cyber-red tracking-widest mt-1">CRITICAL</span>
                  </div>
                </div>
              </div>

              {/* Entity Extraction Sidebar */}
              <div className="cyber-card p-4 flex-1">
                <h3 className="font-exo font-bold text-white text-sm mb-3 border-b border-white/10 pb-2">DETECTED ENTITIES</h3>
                <div className="space-y-3">
                  {detectedEntities.map((entity, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded border-l-2 border-cyber-blue">
                      <div>
                        <span className="text-[10px] text-cyber-blue font-bold block">{entity.type}</span>
                        <span className="text-xs text-white/80">{entity.value}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] border-white/20 text-white/50">{entity.confidence}%</Badge>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* MIDDLE: TRANSCRIPT (5 cols) */}
            <div className="lg:col-span-5 cyber-card flex flex-col h-full overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-exo font-bold text-white">LIVE TRANSCRIPT</h3>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-white/10 rounded"><Download className="w-4 h-4 text-white/50" /></button>
                  <button className="p-1.5 hover:bg-white/10 rounded"><Share2 className="w-4 h-4 text-white/50" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {transcript.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/30 animate-pulse">
                    <Mic className="w-8 h-8 mb-2" />
                    <span className="font-mono text-xs">LISTENING FOR AUDIO...</span>
                  </div>
                ) : (
                  transcript.map((seg, i) => (
                    <div key={i} className={`flex gap-3 ${seg.speaker === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${seg.speaker === 'user' ? 'bg-cyber-blue/20' : 'bg-cyber-red/20'
                        }`}>
                        {seg.speaker === 'user' ? <User className="w-4 h-4 text-cyber-blue" /> : <User className="w-4 h-4 text-cyber-red" />}
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${seg.speaker === 'user' ? 'bg-cyber-blue/10 rounded-tr-none' : 'bg-white/5 rounded-tl-none'
                        } ${seg.riskIndicator ? 'border border-cyber-red/50 shadow-[0_0_10px_rgba(234,56,76,0.1)]' : ''}`}>
                        <p className="text-white/90">{seg.text}</p>
                        {seg.riskIndicator && (
                          <div className="mt-2 flex items-center gap-1 text-[10px] text-cyber-red font-bold">
                            <AlertTriangle className="w-3 h-3" /> THREAT DETECTED
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                <div ref={transcriptEndRef} />
              </div>
            </div>

            {/* RIGHT: ACTIONS & CONTROLS (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-4">

              {/* Action Buttons */}
              <div className="cyber-card p-4 space-y-3 bg-cyber-red/5 border-cyber-red/20">
                <h3 className="font-exo font-bold text-cyber-red mb-2 text-sm">INTERVENTION</h3>
                <Button className="w-full cyber-button bg-cyber-red hover:bg-red-600 border-none h-14 text-lg font-bold shadow-[0_0_20px_rgba(234,56,76,0.4)]">
                  <XCircle className="w-6 h-6 mr-2" />
                  TERMINATE CALL
                </Button>
                <Button className="w-full cyber-button bg-cyber-blue hover:bg-blue-600 border-none h-12 font-bold">
                  <ShieldAlert className="w-5 h-5 mr-2" />
                  ALERT AUTHORITIES
                </Button>
              </div>

              {/* Risk Factors List */}
              <div className="cyber-card p-4 flex-1">
                <h3 className="font-exo font-bold text-white text-sm mb-3 border-b border-white/10 pb-2">RISK INDICATORS</h3>
                <div className="space-y-3">
                  {riskFactors.map((factor, i) => (
                    <div key={i} className="glass-panel p-2 rounded">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">{factor.name}</span>
                        <span className={`font-bold ${factor.score > 80 ? 'text-cyber-red' : 'text-cyber-yellow'
                          }`}>{factor.score}%</span>
                      </div>
                      <Progress value={factor.score} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={startAnalysis} className="flex-1 border-white/20 text-white hover:bg-white/10">
                  <RotateCcw className="w-4 h-4 mr-2" /> RESET
                </Button>
                <Button variant="outline" onClick={() => setIsPaused(!isPaused)} className="flex-1 border-white/20 text-white hover:bg-white/10">
                  {isPaused ? <Play className="w-4 h-4 mr-2" /> : <div className="w-4 h-4 mr-2 border-2 border-white/70 border-l-0 border-t-0 border-r-0 h-[10px]" />}
                  {isPaused ? 'RESUME' : 'PAUSE'}
                </Button>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
