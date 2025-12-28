'use client';

import { useState, useEffect } from 'react';
import Image from 'components/Image';
import { getSiteMetaData } from 'utils/helpers';

export default function TerminalBio() {
  const { author, social } = getSiteMetaData();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [currentCommand, setCurrentCommand] = useState(0);

  const commands = [
    'whoami',
    'ls -la ~/projects',
    'cat ~/bio.txt',
    'echo "Building the future..."'
  ];

  const fullText = `${author.summary} Passionate about building software that improves the world.`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Typing complete, start cursor blinking
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorTimer);
    }
  }, [currentIndex, fullText]);

  // Cycle through commands
  useEffect(() => {
    const commandTimer = setInterval(() => {
      setCurrentCommand(prev => (prev + 1) % commands.length);
    }, 3000);
    return () => clearInterval(commandTimer);
  }, []);

  return (
    <div className="terminal-window p-8 mb-12 relative overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs terminal-text/60 font-mono">
          soubai@terminal:~$
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Terminal output */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="command-prompt text-sm">$</span>
            <span className="text-terminal-accent animate-pulse">
              {commands[currentCommand]}
            </span>
          </div>

          <div className="pl-4 border-l-2 border-terminal-accent/30 ">
            <div className="font-mono text-sm leading-relaxed min-h-[4rem] mb-4">
              <span className="terminal-text/90 orange-500">
                {currentCommand === 0 && displayText}
                {currentCommand === 1 && <span className="text-terminal-accent">📁 Projects: distributed-systems, iot-gateway, cli-tools, web-apps</span>}
                {currentCommand === 2 && fullText}
                {currentCommand === 3 && <span className="text-terminal-accent">🚀 Always learning, always building...</span>}
              </span>
              {showCursor && currentIndex >= fullText.length && (
                <span className="terminal-cursor ml-1 animate-pulse">_</span>
              )}
            </div>


          </div>
        </div>

        {/* Right side - Profile */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Image
              className="rounded-full border-2 border-terminal-accent w-16 h-16 shadow-lg"
              src={`https://github.com/${social.github}.png`}
              webpSrc={`https://github.com/${social.github}.png?webp`}
              previewSrc={`https://github.com/${social.github}.png?lqip-colors`}
              alt="Profile"
            />

          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 terminal-accent font-mono">
              {author.name}
            </h2>
            <p className="text-sm terminal-text/80 mb-4">
              Senior Software Engineer & DevOps Specialist
            </p>
          </div>

          <div className="flex gap-4 text-sm">
            <a href={`https://github.com/${social.github}`} className="social github px-3 py-1 rounded hover:bg-terminal-border transition-colors">
              GitHub
            </a>
            <a href={`https://twitter.com/${social.twitter}`} className="social twitter px-3 py-1 rounded hover:bg-terminal-border transition-colors">
              Twitter
            </a>
            <a href={`https://linkedin.com/in/${social.linkedin}`} className="social linkedin px-3 py-1 rounded hover:bg-terminal-border transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-4 left-4 font-mono text-xs terminal-text animate-pulse">
          {'>'} Initializing terminal interface...
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-xs terminal-text animate-pulse delay-1000">
          {'>'} System ready
        </div>
      </div>
    </div>
  );
}