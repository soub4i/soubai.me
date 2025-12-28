'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen terminal-bg terminal-text flex items-center justify-center p-8">
      <div className="terminal-window p-8 max-w-md text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold mb-4 terminal-accent">System Error</h1>
        <p className="mb-6 terminal-text/80">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={reset}
          className="terminal-accent hover:terminal-text transition-all duration-200 font-mono px-4 py-2 rounded border border-terminal-accent/30 hover:border-terminal-accent"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}