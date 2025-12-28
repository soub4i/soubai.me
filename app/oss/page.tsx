import type { Metadata } from 'next'
import { getProjects } from 'utils/oss'

// Mock GitHub data - in production, this would come from GitHub API
const mockRepoData: Record<string, { description: string; stars: number; language: string; updated: string }> = {
  'lazystripe': {
    description: 'Lazystripe is a powerful Terminal UI (TUI) for Stripe, designed for developers who want to manage their balances, customers, and transactions without leaving the command line.',
    stars: 15,
    language: 'Go',
    updated: '2025-12-27'
  },
  'lghnay': {
    description: 'a robust SMS forwarding system designed for scenarios where you need to monitor SMS messages remotely. Whether you\'re tracking verification codes, monitoring alert systems, or simply need remote access to SMS messages, this project provides a complete end-to-end solution.',
    stars: 35,
    language: 'Rust',
    updated: '2025-12-26'
  },
  'kubestatus-operator': {
    description: 'kubestatus operator',
    stars: 54,
    language: 'Go',
    updated: '2025-12-11'
  },
  'hermes-ci': {
    description: 'Hermes CI is an open-source continuous integration platform',
    stars: 26,
    language: 'Vue',
    updated: '2025-10-07'
  },
  'react-spotifycode': {
    description: 'React library for Spotify codes',
    stars: 11,
    language: 'TypeScript',
    updated: '2022-10-20'
  },
  'spotify-js': {
    description: 'Spotify.js is Universal wrapper for Spotify web API',
    stars: 21,
    language: 'JavaScript',
    updated: '2022-01-26'
  },
  'use-wikipedia': {
    description: 'A hook to help you to query a Wikipedia search API',
    stars: 6,
    language: 'JavaScript',
    updated: '2023-04-02'
  },
  'web-merge': {
    description: 'Declarative client-side web fragment merger using web component APIs',
    stars: 25,
    language: 'JavaScript',
    updated: '2023-03-02'
  },
  'moroccan-git': {
    description: 'A collection of Moroccan aliases for Git workflow.',
    stars: 69,
    language: 'JavaScript',
    updated: '2025-10-15'
  },
  'figma-tailwindcss-config-plugin': {
    description: 'Figma plugin to generate a configuration file for Tailwindcss framework',
    stars: 14,
    language: 'JavaScript',
    updated: '2025-06-16'
  }
};

export const metadata: Metadata = {
  title: 'Open Source',
  description: 'Open source projects and contributions by Abderrahim SOUBAI-ELIDRISI',
}

export default function OSS() {
  const projectData = getProjects() as { owner: string; repos: string[]; slug: string };
  const { owner, repos } = projectData;

  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-8">
      <div className="bg-terminal-bg-secondary border-2 border-terminal-border shadow-lg p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="command-prompt">soubai@terminal:~$</span>
          <span className="text-terminal-text">ls oss/</span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 terminal-accent font-mono">
          Open Source Projects
        </h1>

        <div className="mb-6">
          <p className="terminal-text mb-4">
            Here are some of my open source projects and contributions on GitHub.
          </p>
          <p className="terminal-text/80 text-sm">
            GitHub: <a href={`https://github.com/${owner}`} className="terminal-accent hover:underline" target="_blank" rel="noopener noreferrer">@{owner}</a>
          </p>
        </div>

        <div className="space-y-4">
          {repos && repos.length > 0 ? (
            repos.map((repo: string, index: number) => {
              const repoInfo = mockRepoData[repo] || {
                description: 'No description available',
                stars: 0,
                language: 'Unknown',
                updated: 'Unknown'
              };

              return (
                <div key={index} className="border border-terminal-border rounded-lg p-4 md:p-6 hover:bg-terminal-accent/5 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <span className="terminal-accent font-mono text-base md:text-lg">📦</span>
                        <h3 className="font-bold terminal-text font-mono text-base md:text-lg">
                          <a
                            href={`https://github.com/${owner}/${repo}`}
                            className="terminal-accent hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {repo}
                          </a>
                        </h3>
                      </div>

                      <p className="text-xs md:text-sm terminal-text/80 mb-3 leading-relaxed">
                        {repoInfo.description}
                      </p>

                      <div className="flex items-center gap-3 md:gap-4 text-xs terminal-text/60 font-mono">
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{repoInfo.stars} stars</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💻</span>
                          <span>{repoInfo.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>Updated {repoInfo.updated}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <a
                        href={`https://github.com/${owner}/${repo}`}
                        className="terminal-accent hover:terminal-text px-4 py-2 rounded border border-terminal-accent/30 hover:border-terminal-accent text-sm font-mono transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="terminal-border border rounded p-4">
              <p className="terminal-text/60 font-mono text-sm">
                No projects found. Check back later!
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-terminal-border/30">
          <p className="terminal-text/60 text-sm font-mono text-center">
            Want to contribute or collaborate? Reach out on GitHub!
          </p>
        </div>
      </div>
    </div>
  );
}