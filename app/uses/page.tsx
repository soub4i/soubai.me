import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uses | What I Use',
  description: 'Hardware and software setup used by Abderrahim SOUBAI-ELIDRISI',
}

export default function Uses() {
  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-terminal-bg-secondary border-2 border-terminal-border shadow-lg p-6 mb-8 rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <span className="command-prompt">soubai@terminal:~$</span>
            <span className="text-terminal-text">cat uses.md</span>
          </div>

        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 terminal-accent font-mono">
          /uses - Hardware & Software Setup
        </h1>

          <div className="space-y-8">
            {/* Hardware Section */}
            <section className="border border-terminal-border rounded-lg p-4 md:p-6 bg-terminal-bg-secondary/50">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 terminal-accent font-mono flex items-center gap-2">
                <span className="text-terminal-text/60">#</span>
                Hardware
              </h2>

              <div className="space-y-3 md:space-y-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Primary Machine</span>
                  <span className="terminal-accent text-sm md:text-base break-words">macOS M4</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Secondary Machine</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Dell XPS 13 (Arch Linux)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Keyboard</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Keychron K6 Pro</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Mouse</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Logitech MX Master</span>
                </div>
              </div>
            </section>

            {/* Development Tools Section */}
            <section className="border border-terminal-border rounded-lg p-4 md:p-6 bg-terminal-bg-secondary/50">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 terminal-accent font-mono flex items-center gap-2">
                <span className="text-terminal-text/60">#</span>
                Development Tools
              </h2>

              <div className="space-y-3 md:space-y-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Editor</span>
                  <span className="terminal-accent text-sm md:text-base break-words">AstroVim & VSCode</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Language</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Go, Node.js, TypeScript</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Shell Prompt</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Starship</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Window Manager</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Hyprland (custom rice)</span>
                </div>
              </div>
            </section>

            {/* Additional Sections with Placeholders */}
            <section className="border border-terminal-border rounded-lg p-4 md:p-6 bg-terminal-bg-secondary/50">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 terminal-accent font-mono flex items-center gap-2">
                <span className="text-terminal-text/60">#</span>
                Additional Tools & Software
              </h2>

              <div className="space-y-3 md:space-y-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Version Control</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Git, GitHub CLI, GitHub Actions</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Databases</span>
                  <span className="terminal-accent text-sm md:text-base break-words">PostgreSQL, MongoDB, Redis, Elasticsearch</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Cloud Platforms</span>
                  <span className="terminal-accent text-sm md:text-base break-words">AWS, Vercel, Netlify, Docker</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-terminal-border/30">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Monitoring</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Prometheus, Grafana, ELK Stack</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                  <span className="terminal-text text-sm md:text-base mb-1 sm:mb-0">Infrastructure</span>
                  <span className="terminal-accent text-sm md:text-base break-words">Terraform, Ansible, Kubernetes</span>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center py-8 border-t border-terminal-border/30">
              <p className="terminal-text/60 font-mono text-sm">
                Last updated: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="terminal-text/40 font-mono text-xs mt-2">
                This setup evolves over time. Check back for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}