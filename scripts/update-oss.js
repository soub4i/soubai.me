const fs = require('fs');
const path = require('path');
const https = require('https');

const owner = 'soub4i';
const repos = [
  'gh-relay',
  'lazystripe',
  'lghnay',
  'kubestatus-operator',
  'hermes-ci',
  'react-spotifycode',
  'spotify-js',
  'use-wikipedia',
  'web-merge',
  'moroccan-git',
  'figma-tailwindcss-config-plugin'
];

function fetchGitHubRepo(owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const repoData = JSON.parse(data);
          resolve(repoData);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function fetchAllRepos() {
  const repoData = {};

  console.log('Fetching GitHub repository data...');

  for (const repo of repos) {
    try {
      console.log(`Fetching ${owner}/${repo}...`);
      const data = await fetchGitHubRepo(owner, repo);

      repoData[repo] = {
        description: data.description || 'No description available',
        stars: data.stargazers_count || 0,
        language: data.language || 'Unknown',
        updated: data.updated_at ? new Date(data.updated_at).toISOString().split('T')[0] : 'Unknown'
      };

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error fetching ${repo}:`, error.message);
      // Fallback to basic data
      repoData[repo] = {
        description: `Repository: ${repo}`,
        stars: 0,
        language: 'Unknown',
        updated: 'Unknown'
      };
    }
  }

  return repoData;
}

async function updateOSSPage() {
  try {
    const repoData = await fetchAllRepos();

    // Read the current OSS page
    const ossPagePath = path.join(__dirname, '../app/oss/page.tsx');
    let ossPageContent = fs.readFileSync(ossPagePath, 'utf8');

    // Generate the new mockRepoData
    const mockDataString = Object.entries(repoData)
      .map(([repo, data]) => {
        return `  '${repo}': {
    description: '${data.description.replace(/'/g, "\\'")}',
    stars: ${data.stars},
    language: '${data.language}',
    updated: '${data.updated}'
  }`;
      })
      .join(',\n');

    const newMockData = `const mockRepoData: Record<string, { description: string; stars: number; language: string; updated: string }> = {\n${mockDataString}\n};`;

    // Replace the old mock data
    const oldMockDataRegex = /const mockRepoData: Record<string, \{ description: string; stars: number; language: string; updated: string \}> = \{[\s\S]*?\};/;
    ossPageContent = ossPageContent.replace(oldMockDataRegex, newMockData);

    // Write the updated file
    fs.writeFileSync(ossPagePath, ossPageContent);

    console.log('✅ OSS page updated with real GitHub data!');
    console.log('Updated repositories:');
    Object.entries(repoData).forEach(([repo, data]) => {
      console.log(`  - ${repo}: ${data.stars} ⭐ (${data.language})`);
    });

  } catch (error) {
    console.error('❌ Error updating OSS page:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  updateOSSPage();
}

module.exports = { updateOSSPage };