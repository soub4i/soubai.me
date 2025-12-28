// Client-side search utility that loads pre-built index
let searchIndex: any[] = [];
let fuseInstance: any = null;

export async function initializeSearch() {
  if (searchIndex.length === 0) {
    try {
      const response = await fetch('/search-index.json');
      searchIndex = await response.json();

      // Import Fuse dynamically to avoid SSR issues
      const Fuse = (await import('fuse.js')).default;

      fuseInstance = new Fuse(searchIndex, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'description', weight: 0.3 },
          { name: 'content', weight: 0.2 },
          { name: 'tags', weight: 0.1 },
        ],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
      });
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  }

  return { index: searchIndex, fuse: fuseInstance };
}

export async function searchContent(query: string, limit = 10) {
  if (!query || query.length < 2) return [];

  const { fuse } = await initializeSearch();
  if (!fuse) return [];

  const results = fuse.search(query);
  return results.slice(0, limit).map((result: any) => ({
    ...result.item,
    score: result.score,
    matches: result.matches,
  }));
}