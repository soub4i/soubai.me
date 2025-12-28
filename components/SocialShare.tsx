'use client';

import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
}

export default function SocialShare({ url, title, description, hashtags = [] }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  const shareText = `${title}${description ? ` - ${description}` : ''}`;
  const twitterHashtags = hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : '';

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}${twitterHashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-terminal-bg/30 rounded-lg border border-terminal-accent/20">
      <h3 className="text-lg font-mono terminal-accent font-semibold">Share this post</h3>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-mono text-sm"
          title="Share on Twitter"
        >
          🐦 Twitter
        </button>

        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-mono text-sm"
          title="Share on LinkedIn"
        >
          💼 LinkedIn
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-mono text-sm"
          title="Share on Facebook"
        >
          📘 Facebook
        </button>

        <button
          onClick={() => handleShare('reddit')}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-mono text-sm"
          title="Share on Reddit"
        >
          🟠 Reddit
        </button>

        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-mono text-sm ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
          title="Copy link"
        >
          {copied ? '✅ Copied!' : '🔗 Copy Link'}
        </button>
      </div>
    </div>
  );
}