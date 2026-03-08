import { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="glass-panel px-4 py-2 rounded-none border-l-2 border-l-cyber-blue flex items-center gap-3 bg-cyber-blue/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <ClockIcon className="w-4 h-4 text-cyber-blue animate-pulse" />
            <span className="font-mono text-lg text-white tabular-nums tracking-tighter">
                {time.toLocaleTimeString('en-IN', { hour12: false })}
            </span>
            <div className="absolute top-0 right-0 w-1 h-1 bg-cyber-blue animate-ping" />
        </div>
    );
}
