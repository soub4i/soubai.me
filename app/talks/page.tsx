import type { Metadata } from 'next'
import { getSortedTalks } from 'utils/talks'

export const metadata: Metadata = {
  title: 'Talks',
  description: 'Presentations and talks by Abderrahim SOUBAI-ELIDRISI',
}

// Additional talks data
const additionalTalks = [
  {
    title: 'Demystifying K8s Operators',
    description: 'A technical deep dive into Kubernetes Operators, explaining their architecture, the reconciliation loop, and how to automate complex application lifecycles.',
    date: 'February 6, 2025',
    event: 'BlaBlaConf 5.0',
    link: 'https://www.youtube.com/watch?v=BVTqQ4piGag',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/BVTqQ4piGag/maxresdefault.jpg'
  },
  {
    title: 'System Design: Concurrency Control using Distributed Locks',
    description: 'A session conducted in Darija (Moroccan Arabic) covering how to handle race conditions in distributed systems using locks via Redis and other distributed stores.',
    date: 'July 23, 2025',
    event: '',
    link: 'https://www.youtube.com/watch?v=vvUAaYXp0NM',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/vvUAaYXp0NM/maxresdefault.jpg'
  },
  {
    title: 'Dynamic Tenant Provisioning in Cloud - Application SaaSification',
    description: 'Exploring the infrastructure required to transition applications into multi-tenant SaaS models, focusing on automated tenant isolation and provisioning.',
    date: 'November 2, 2024',
    event: '',
    link: 'https://www.youtube.com/watch?v=wcRYEZ7Klag',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/wcRYEZ7Klag/maxresdefault.jpg'
  },
  {
    title: 'FaaS 101: Introduction to Function as a Service on K8s',
    description: 'An entry-level overview of serverless concepts, demonstrating how to run and scale functions within a Kubernetes ecosystem.',
    date: 'February 11, 2023',
    event: 'BlaBlaConf',
    link: 'https://www.youtube.com/watch?v=OYNgFWjTJfI',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/OYNgFWjTJfI/maxresdefault.jpg'
  },
  {
    title: 'GitHub Actions in Action',
    description: 'A practical walkthrough of building robust CI/CD pipelines using GitHub Actions, highlighting best practices for automation, security, and developer workflow efficiency.',
    date: '2021',
    event: 'BlaBlaConf',
    link: 'https://www.youtube.com/watch?v=rQ0Xb7SlJo8',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/rQ0Xb7SlJo8/maxresdefault.jpg'
  },
  {
    title: 'KechTech #06: Introduction to JAMstack',
    description: 'An in-depth exploration of the JAMstack (JavaScript, APIs, and Markup) architecture. Abderrahim discusses how to transition from traditional server-side rendering to modern, fast, and secure workflows using tools like Next.js and Vercel.',
    date: 'July 6, 2020',
    event: 'KechTech',
    link: 'https://www.youtube.com/watch?v=L6r9G7gb1YI',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/L6r9G7gb1YI/maxresdefault.jpg'
  },
  {
    title: 'Your Way to Waypoint (HashiTalks: Africa)',
    description: 'In this session for HashiCorp\'s official conference, Abderrahim introduces HashiCorp Waypoint. He demonstrates how developers can use a single configuration file and a consistent workflow to build, deploy, and release applications across different platforms like Docker and Kubernetes.',
    date: 'August 9, 2022',
    event: 'HashiTalks: Africa',
    link: 'https://www.youtube.com/watch?v=c4R_Vz0-QlE',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/c4R_Vz0-QlE/maxresdefault.jpg'
  },
  {
    title: 'Gentle Introduction to Infrastructure as Code (IaC)',
    description: 'A comprehensive guide to Infrastructure as Code, focusing on Terraform. Abderrahim explains why IaC is essential for modern DevOps, how to manage cloud resources (like AWS S3 buckets) through code, and best practices for state management and automation.',
    date: 'October 20, 2024',
    event: '',
    link: 'https://www.youtube.com/watch?v=W9MyhMiJyj4',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/W9MyhMiJyj4/maxresdefault.jpg'
  },
  {
    title: 'Build Your Product Quickly Using Function As a Service (FaaS)',
    description: 'This meetup session focuses on the practical benefits of Serverless architecture. Abderrahim explains how startups and developers can use FaaS to scale applications instantly and reduce operational costs by only paying for actual execution time.',
    date: 'January 26, 2023',
    event: '',
    link: 'https://www.youtube.com/watch?v=A_pBtz3SIjg',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/A_pBtz3SIjg/maxresdefault.jpg'
  },
  {
    title: 'Workshop: Getting Started with Waypoint',
    description: 'A hands-on technical workshop where Abderrahim walks through the installation and configuration of Waypoint, showcasing its UI for real-time monitoring and log management during the application lifecycle.',
    date: '2022',
    event: '',
    link: 'https://www.youtube.com/watch?v=plsrbwBxR74',
    linkText: 'Watch on YouTube',
    image: 'https://img.youtube.com/vi/plsrbwBxR74/maxresdefault.jpg'
  }
];

export default function Talks() {
  const talks = getSortedTalks();

  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-8">
      <div className="bg-terminal-bg-secondary border-2 border-terminal-border shadow-lg p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="command-prompt">soubai@terminal:~$</span>
          <span className="text-terminal-text">ls talks/</span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 terminal-accent font-mono">
          Talks & Presentations
        </h1>

        <div className="mb-6">
          <p className="terminal-text mb-4">
            Here are some of my talks and presentations from various conferences and meetups.
          </p>
        </div>

        <div className="space-y-6">
          {/* Additional Talks */}
          {additionalTalks.map((talk, index) => (
            <div key={`additional-${index}`} className="border border-terminal-border rounded-lg p-4 md:p-6 hover:bg-terminal-accent/5 transition-colors">
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                {/* Talk Image */}
                <div className="lg:w-1/3">
                  <img
                    src={talk.image}
                    alt={talk.title}
                    className="w-full h-32 md:h-40 lg:h-48 object-cover rounded-lg border border-terminal-accent/20"
                  />
                </div>

                {/* Talk Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="terminal-accent font-mono text-lg md:text-xl">🎤</span>
                      <div>
                        <h3 className="font-bold terminal-text font-mono text-lg md:text-xl">
                          {talk.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm terminal-text/70 mt-1">
                          <span className="flex items-center gap-1">
                            📅 {talk.date}
                          </span>
                          {talk.event && (
                            <span className="flex items-center gap-1">
                              🏛️ {talk.event}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm terminal-text/80 mb-3 md:mb-4 leading-relaxed">
                    {talk.description}
                  </p>

                  {/* Links Section */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={talk.link}
                      className="terminal-accent hover:terminal-text px-4 py-2 rounded border border-terminal-accent/30 hover:border-terminal-accent text-sm font-mono transition-colors flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {talk.linkText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Existing Talks from File System */}
          {talks && talks.length > 0 && (
            talks.map((talk: any, index: number) => (
              <div key={`existing-${index}`} className="border border-terminal-border rounded-lg p-4 md:p-6 hover:bg-terminal-accent/5 transition-colors">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                  {/* Talk Image */}
                  {talk.frontmatter.socialImage && (
                    <div className="lg:w-1/3">
                      <img
                        src={`/${talk.frontmatter.socialImage}`}
                        alt={talk.frontmatter.title || `Talk ${index + 1}`}
                        className="w-full h-32 md:h-40 lg:h-48 object-cover rounded-lg border border-terminal-accent/20"
                      />
                    </div>
                  )}

                  {/* Talk Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="terminal-accent font-mono text-lg md:text-xl">🎤</span>
                        <div>
                          <h3 className="font-bold terminal-text font-mono text-lg md:text-xl">
                            {talk.frontmatter.title || `Talk ${index + 1}`}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm terminal-text/70 mt-1">
                            <span className="flex items-center gap-1">
                              📅 {talk.frontmatter.date}
                            </span>
                            {talk.frontmatter.conference && (
                              <span className="flex items-center gap-1">
                                🏛️ {talk.frontmatter.conference}
                              </span>
                            )}
                            {talk.frontmatter.location && (
                              <span className="flex items-center gap-1">
                                📍 {talk.frontmatter.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {talk.frontmatter.description && (
                      <p className="text-xs md:text-sm terminal-text/80 mb-3 md:mb-4 leading-relaxed">
                        {talk.frontmatter.description}
                      </p>
                    )}

                    {/* Links Section */}
                    <div className="flex flex-wrap gap-3">
                      {talk.frontmatter.slide && (
                        <a
                          href={talk.frontmatter.slide}
                          className="terminal-accent hover:terminal-text px-4 py-2 rounded border border-terminal-accent/30 hover:border-terminal-accent text-sm font-mono transition-colors flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📊 Slides
                        </a>
                      )}
                      {talk.frontmatter.video && (
                        <a
                          href={talk.frontmatter.video}
                          className="terminal-accent hover:terminal-text px-4 py-2 rounded border border-terminal-accent/30 hover:border-terminal-accent text-sm font-mono transition-colors flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🎥 Video
                        </a>
                      )}
                      {talk.frontmatter.demo && (
                        <a
                          href={talk.frontmatter.demo}
                          className="terminal-accent hover:terminal-text px-4 py-2 rounded border border-terminal-accent/30 hover:border-terminal-accent text-sm font-mono transition-colors flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          💻 Demo
                        </a>
                      )}
                      {talk.frontmatter.conferenceLink && (
                        <a
                          href={talk.frontmatter.conferenceLink}
                          className="terminal-accent hover:terminal-text px-4 py-2 rounded border border-terminal-accent/30 hover:border-terminal-accent text-sm font-mono transition-colors flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🌐 Conference
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-terminal-border/30">
          <p className="terminal-text/60 text-sm font-mono text-center">
            Interested in having me speak at your event? Get in touch!
          </p>
        </div>
      </div>
    </div>
  );
}