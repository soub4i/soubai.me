'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import MatrixBackground from './MatrixBackground';
import SearchInterface from './SearchInterface';

const commands = {
  'help': 'Available commands: help, ls posts, cat posts/[id].md, cat about, cd talks, cd oss, cd uses, search, clear',
  'ls posts': 'Navigate to posts listing',
  'cat posts/<id>.md': 'Display specific post by ID',
  'cat about': 'Display about page',
  'cd talks': 'Navigate to talks page',
  'cd oss': 'Navigate to open source page',
  'cd uses': 'Navigate to uses page',
  'search': 'Open search interface for posts and talks',
  'clear': 'Clear terminal output'
};

export default function CommandInterface() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [matrixTrigger, setMatrixTrigger] = useState(0);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'help') {
      setHistory(prev => [...prev, `$ ${cmd}`, commands.help]);
      return;
    }

    if (trimmedCmd === 'ls posts') {
      router.push('/');
      setHistory(prev => [...prev, `$ ${cmd}`, 'Navigating to posts...']);
      return;
    }

    if (trimmedCmd.startsWith('cat posts/') && trimmedCmd.endsWith('.md')) {
      const postId = trimmedCmd.replace('cat posts/', '').replace('.md', '');
      router.push(`/post/${postId}`);
      setHistory(prev => [...prev, `$ ${cmd}`, `Opening post: ${postId}`]);
      return;
    }

    if (trimmedCmd === 'cat about') {
      router.push('/about');
      setHistory(prev => [...prev, `$ ${cmd}`, 'Displaying about page...']);
      return;
    }

    if (trimmedCmd === 'cd talks') {
      router.push('/talks');
      setHistory(prev => [...prev, `$ ${cmd}`, 'Navigating to talks...']);
      return;
    }

    if (trimmedCmd === 'cd oss') {
      router.push('/oss');
      setHistory(prev => [...prev, `$ ${cmd}`, 'Navigating to open source...']);
      return;
    }

    if (trimmedCmd === 'cd uses') {
      router.push('/uses');
      setHistory(prev => [...prev, `$ ${cmd}`, 'Navigating to uses...']);
      return;
    }

    if (trimmedCmd === 'search') {
      setShowSearch(true);
      setHistory(prev => [...prev, `$ ${cmd}`, 'Opening search interface...']);
      return;
    }

    setHistory(prev => [...prev, `$ ${cmd}`, `Command not found: ${cmd}. Type 'help' for available commands.`]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && command.trim()) {
      executeCommand(command);
      setCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const commandFromHistory = history[history.length - 1 - newIndex];
        if (commandFromHistory?.startsWith('$ ')) {
          setCommand(commandFromHistory.slice(2));
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commandFromHistory = history[history.length - 1 - newIndex];
        if (commandFromHistory?.startsWith('$ ')) {
          setCommand(commandFromHistory.slice(2));
        }
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const toggleHackerMode = () => {
    if (!showTerminal) {
      // Entering hacker mode - trigger matrix animation
      setMatrixTrigger(prev => prev + 1);
    }
    setShowTerminal(!showTerminal);
  };

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      // check current theme
      const html = document.documentElement;
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      setCurrentTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  // Initialize theme on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      const html = document.documentElement;
      html.setAttribute('data-theme', savedTheme);
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="mb-8 relative">
      {/* Matrix Background */}
      <MatrixBackground trigger={matrixTrigger} />

      {/* Navigation Menu - Responsive with Hamburger */}
      <nav className="p-4 mb-6 bg-terminal-bg-secondary dark:bg-terminal-bg border-b border-terminal-border">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center gap-6">
          <div className="flex justify-center gap-6 flex-1">
            <Link href="/" className="dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-sm hover:underline underline-offset-4 decoration-2 decoration-gray-800 dark:decoration-terminal-accent">
              HOME
            </Link>
            <Link href="/talks" className="dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-sm hover:underline underline-offset-4 decoration-2 decoration-gray-800 dark:decoration-terminal-accent">
              TALKS
            </Link>
            <Link href="/oss" className="dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-sm hover:underline underline-offset-4 decoration-2 decoration-gray-800 dark:decoration-terminal-accent">
              OPEN SOURCE
            </Link>
            <Link href="/about" className="dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-sm hover:underline underline-offset-4 decoration-2 decoration-gray-800 dark:decoration-terminal-accent">
              ABOUT
            </Link>
            <Link href="/uses" className="dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-sm hover:underline underline-offset-4 decoration-2 decoration-gray-800 dark:decoration-terminal-accent">
              USES
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleHackerMode}
              className="bg-terminal-accent hover:bg-terminal-accent/80 text-white transition-all duration-200 font-mono text-xs px-3 py-1 rounded border border-terminal-accent hover:border-terminal-accent/80 font-semibold"
            >
              H4CK3R M0D3 {showTerminal ? '0FF' : '0N'}
            </button>
            <button
              onClick={toggleTheme}
              className="terminal-accent hover:terminal-text transition-all duration-200 text-lg ml-3"
              title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {currentTheme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-between items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="terminal-accent hover:terminal-text transition-all duration-200 text-xl p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="terminal-accent hover:terminal-text transition-all duration-200 text-lg"
              title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {currentTheme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={toggleHackerMode}
              className="bg-terminal-accent hover:bg-terminal-accent/80 text-white transition-all duration-200 font-mono text-xs px-2 py-1 rounded border border-terminal-accent hover:border-terminal-accent/80 font-semibold"
            >
              H4CK3R M0D3 {showTerminal ? '0FF' : '0N'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute right-0 top-0 h-full w-64 bg-terminal-bg-secondary dark:bg-terminal-bg border-l border-terminal-border shadow-xl">
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="terminal-accent hover:terminal-text transition-all duration-200 text-xl"
                  >
                    ✕
                  </button>
                </div>
                <nav className="space-y-6">
                  <Link
                    href="/"
                    className="block dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-lg py-2 border-b border-terminal-border/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    HOME
                  </Link>
                  <Link
                    href="/talks"
                    className="block dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-lg py-2 border-b border-terminal-border/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    TALKS
                  </Link>
                  <Link
                    href="/oss"
                    className="block dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-lg py-2 border-b border-terminal-border/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    OSS
                  </Link>
                  <Link
                    href="/about"
                    className="block dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-lg py-2 border-b border-terminal-border/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ABOUT
                  </Link>
                  <Link
                    href="/uses"
                    className="block dark:text-terminal-text hover:text-gray-600 dark:hover:text-terminal-accent transition-all duration-200 font-mono text-lg py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    USES
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Terminal Interface - Below Menu */}
      <div className="max-w-4xl mx-auto">
        {showTerminal && (
          <div className="bg-terminal-bg border-2 border-terminal-border shadow-xl p-4 rounded-lg">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-terminal-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm font-mono terminal-text">soubai@terminal</span>
              </div>
              <div className="text-xs terminal-text/60 font-mono">
                Interactive Shell
              </div>
            </div>

            {/* Terminal Content */}
            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto font-mono text-sm">
              <div className="terminal-text/80 text-xs">
                Welcome! Use commands or click navigation above.
              </div>

              {history.map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {line.startsWith('$ ') ? (
                    <div className="flex items-center gap-2">
                      <span className="command-prompt text-terminal-accent">❯</span>
                      <span className="terminal-text">{line.slice(2)}</span>
                    </div>
                  ) : (
                    <div className="pl-4 terminal-text/90 whitespace-pre-wrap text-sm">{line}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Command Input */}
            <div className="flex items-center font-mono border-t border-terminal-border pt-2">
              <span className="command-prompt mr-2 text-terminal-accent">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="command-input flex-1 bg-transparent outline-none text-sm"
                placeholder="help, ls posts, cat about..."
              />
              <span className="terminal-cursor animate-pulse">_</span>
            </div>
          </div>
        )}

        {/* Footer - Only show when terminal is visible */}
        {showTerminal && (
          <div className="mt-3 text-xs terminal-text/50 font-mono text-center">
            Available commands: help, ls posts, cat posts/&lt;id&gt;.md, cat about, cd talks, cd oss, cd uses, search, clear
          </div>
        )}

        {/* Search Interface */}
        {showSearch && (
          <div className="mt-6">
            <SearchInterface />
            <div className="text-center mt-4">
              <button
                onClick={() => setShowSearch(false)}
                className="terminal-accent hover:terminal-text transition-colors font-mono text-sm px-4 py-2 border border-terminal-accent/30 hover:border-terminal-accent rounded"
              >
                Close Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}