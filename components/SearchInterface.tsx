'use client';

import { useState } from 'react';
import Link from 'next/link';
import { searchContent } from '../utils/search';

export default function SearchInterface() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchContent(searchQuery, 10);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
      <div className="mb-4">
        <h3 className="text-lg font-mono terminal-text mb-2">Search Content</h3>
        <div className="flex items-center gap-2">
          <span className="text-terminal-accent font-mono">❯</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search posts and talks..."
            className="flex-1 bg-transparent border-b border-terminal-accent/30 outline-none font-mono text-sm pb-1 focus:border-terminal-accent"
          />
          <button
            onClick={() => handleSearch(query)}
            className="terminal-accent hover:terminal-text transition-colors font-mono text-sm px-3 py-1 border border-terminal-accent/30 hover:border-terminal-accent rounded"
          >
            {isSearching ? '...' : 'Search'}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm terminal-text/60 font-mono">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </div>

          {results.map((result, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <Link
                  href={`/${result.type === 'post' ? 'post' : 'talks'}/${result.slug}`}
                  className="text-terminal-accent hover:terminal-text transition-colors font-mono text-sm font-semibold hover:underline"
                >
                  {result.title}
                </Link>
                <div className="flex items-center gap-2 text-xs font-mono terminal-text/60">
                  <span className={`px-2 py-1 rounded ${
                    result.category === 'talk' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                    'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  }`}>
                    {result.category}
                  </span>
                  <span>{result.date}</span>
                </div>
              </div>

              {result.description && (
                <p className="text-sm terminal-text/80 mb-2 line-clamp-2">
                  {result.description.length > 150
                    ? `${result.description.substring(0, 150)}...`
                    : result.description
                  }
                </p>
              )}

              {result.tags && result.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {result.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-terminal-accent/10 text-terminal-accent rounded font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                  {result.tags.length > 3 && (
                    <span className="text-xs terminal-text/60 font-mono">
                      +{result.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {query && results.length === 0 && !isSearching && (
        <div className="text-center py-8">
          <div className="text-terminal-text/60 font-mono text-sm">
            No results found for {'"'}{query}{'"'}
          </div>
          <div className="text-terminal-text/40 font-mono text-xs mt-2">
            Try different keywords or check spelling
          </div>
        </div>
      )}
    </div>
  );
}