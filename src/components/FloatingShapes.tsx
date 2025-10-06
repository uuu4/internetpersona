import React from 'react';
import { Shield, Lock, Key, Terminal, Code, Database } from 'lucide-react';

export const FloatingShapes: React.FC = () => {
  const shapes = [
    { Icon: Shield, delay: '0s', duration: '20s', top: '10%', left: '10%', size: 60 },
    { Icon: Lock, delay: '2s', duration: '25s', top: '20%', left: '80%', size: 50 },
    { Icon: Key, delay: '4s', duration: '22s', top: '60%', left: '15%', size: 45 },
    { Icon: Terminal, delay: '1s', duration: '28s', top: '70%', left: '85%', size: 55 },
    { Icon: Code, delay: '3s', duration: '24s', top: '40%', left: '90%', size: 48 },
    { Icon: Database, delay: '5s', duration: '26s', top: '80%', left: '20%', size: 52 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-20">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="absolute animate-float-slow"
          style={{
            top: shape.top,
            left: shape.left,
            animationDelay: shape.delay,
            animationDuration: shape.duration,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full" />
            <shape.Icon
              className="text-sky-500 dark:text-sky-400 relative"
              size={shape.size}
              strokeWidth={1.5}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
