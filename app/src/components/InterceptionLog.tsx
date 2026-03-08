import React from 'react';

interface ActivityLog {
    id: number;
    action: string;
    type: string;
    source: string;
    location: string;
    time: string;
}

interface InterceptionLogProps {
    logs: ActivityLog[];
}

const LogItem = React.memo(({ log }: { log: ActivityLog }) => (
    <div className="flex gap-3 items-start border-l-2 border-white/5 pl-3 hover:border-cyber-blue hover:bg-white/5 p-2 transition-all duration-300 group rounded-r-md">
        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${log.type === 'call' ? 'text-cyber-blue bg-cyber-blue' :
            log.type === 'sms' ? 'text-cyber-cyan bg-cyber-cyan' :
                'text-cyber-green bg-cyber-green'
            }`} />
        <div className="flex-1">
            <div className="flex justify-between items-center mb-0.5">
                <span className={`text-[10px] font-black tracking-tighter ${log.action === 'BLOCKED' ? 'text-cyber-red' :
                    log.action === 'VERIFIED' ? 'text-cyber-green' : 'text-cyber-blue'
                    }`}>{log.action}</span>
                <span className="text-[9px] text-white/30 font-mono italic">{log.time}</span>
            </div>
            <p className="text-xs text-white/80 line-clamp-1 group-hover:text-white transition-colors font-medium">
                {log.source} <span className="text-white/20 font-light mx-1">/</span> <span className="text-white/40">{log.location}</span>
            </p>
        </div>
    </div>
));

export default function InterceptionLog({ logs }: InterceptionLogProps) {
    // Simulate a larger list for the scroll effect
    const displayLogs = React.useMemo(() => [...logs, ...logs, ...logs, ...logs], [logs]);

    return (
        <div className="cyber-card flex-1 flex flex-col overflow-hidden border-cyber-blue/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-cyber-blue shadow-[0_0_8px_#2467ec]" />
                    <h3 className="font-exo font-bold text-white text-xs tracking-widest uppercase">Interception Log</h3>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
                    </span>
                    <span className="text-[9px] font-mono text-cyber-green/80 font-bold uppercase tracking-tighter">Live Feed</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin hover:scrollbar-thumb-cyber-blue/50 transition-colors">
                {displayLogs.map((log, i) => (
                    <LogItem key={`${log.id}-${i}`} log={log} />
                ))}
            </div>
            <div className="p-2 border-t border-white/5 bg-black/20 text-center">
                <button className="text-[9px] text-cyber-blue font-bold tracking-widest hover:text-white transition-colors uppercase">View Full Archive</button>
            </div>
        </div>
    );
}
