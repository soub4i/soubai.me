'use client';

import { useEffect, useState } from 'react';

interface MatrixBackgroundProps {
  trigger: number;
}

export default function MatrixBackground({ trigger }: MatrixBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  useEffect(() => {
    if (!trigger) return;

    // Generate matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?░▒▓█▄▀▌▐■□▪▫▬▭▮▯▰▱▲▼◄►◆◇○◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿';
    const newChars = Array.from({ length: 80 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    );
    setMatrixChars(newChars);

    // Show matrix for 1.5 seconds
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Matrix rain effect */}
      <div className="absolute inset-0 bg-black opacity-98">
        {matrixChars.map((char, index) => (
          <div
            key={index}
            className="absolute text-orange-400 font-mono text-2xl animate-matrix-fall opacity-95 font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.2}s`,
              animationDuration: `${1.2 + Math.random() * 0.8}s`,
              textShadow: '0 0 10px #ffb347, 0 0 20px #ffb347, 0 0 30px #ffb347',
              filter: 'brightness(1.5) contrast(1.2)',
            }}
          >
            {char}
          </div>
        ))}
      </div>

      {/* Additional glowing overlay */}
      <div className="absolute inset-0 bg-orange-500 opacity-5 animate-pulse" />
    </div>
  );
}