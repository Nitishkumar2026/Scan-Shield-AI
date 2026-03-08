import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const outX = useSpring(cursorX, springConfig);
    const outY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsHovered(
                !!target.closest('button') ||
                !!target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer'
            );
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <style>{`
        * { cursor: none !important; }
        @media (max-width: 768px) {
          * { cursor: auto !important; }
          .cyber-cursor { display: none !important; }
        }
      `}</style>

            {/* Outer Ring */}
            <motion.div
                className="cyber-cursor fixed top-0 left-0 w-10 h-10 border border-cyber-blue/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: outX,
                    y: outY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicked ? 0.8 : isHovered ? 1.5 : 1,
                    borderColor: isHovered ? 'var(--cyber-cyan)' : 'var(--cyber-blue)',
                    backgroundColor: isHovered ? 'rgba(0, 212, 255, 0.1)' : 'rgba(36, 103, 236, 0)',
                }}
            >
                <div className="absolute inset-0 border border-white/10 rounded-full scale-110" />
            </motion.div>

            {/* Precision Core */}
            <motion.div
                className="cyber-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-white pointer-events-none z-[9999] shadow-[0_0_10px_white]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 2 : 1,
                    backgroundColor: isHovered ? 'var(--cyber-cyan)' : '#fff',
                }}
            />

            {/* Click Ping */}
            {isClicked && (
                <motion.div
                    className="cyber-cursor fixed top-0 left-0 w-4 h-4 border-2 border-white rounded-full pointer-events-none z-[9998]"
                    initial={{ x: cursorX.get(), y: cursorY.get(), translateX: '-50%', translateY: '-50%', scale: 0, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </>
    );
}
