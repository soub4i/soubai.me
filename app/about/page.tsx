import type { Metadata } from 'next'
import TerminalBio from 'components/TerminalBio'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Abderrahim SOUBAI-ELIDRISI - Software Engineer',
}

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-8">
      {/* <TerminalBio /> */}

      <div className="bg-terminal-bg-secondary border-2 border-terminal-border shadow-lg p-4 md:p-8 mt-6 md:mt-8 rounded-lg">
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

        <div className="flex items-center gap-2 mb-6">
          <span className="command-prompt">soubai@terminal:~$</span>
          <span className="text-terminal-text">neofetch</span>
        </div>

        {/* Neofetch-style layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-mono">
          {/* System Information */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <pre className="text-terminal-accent text-xs leading-tight">
{`       .---.
      /     \\
     | () () |
      \\  ^  /
       |||||
       |||||
     =========
    /         \\
   |           |
    \\         /
     '-------'
      |     |
      |     |
      |     |
      |     |
      '-----'`}
            </pre>
            <div className="mt-4 text-left">
              <div className="text-terminal-accent font-bold">soubai@terminal</div>
              <div className="text-terminal-accent text-sm">Senior Software Engineer & DevOps Specialist</div>
            </div>
          </div>

          {/* ASCII Art / Avatar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div>
              <span className="text-terminal-accent">OS:</span>
              <span className="ml-2 terminal-text">Abderrahim Soubai-Elidrisi</span>
            </div>

            <div>
              <span className="text-terminal-accent">Host:</span>
              <span className="ml-2 terminal-text">Marrakech/Dublin</span>
            </div>

            <div>
              <span className="text-terminal-accent">Kernel:</span>
              <span className="ml-2 terminal-text">Cloud-Native & SRE</span>
            </div>

            <div>
              <span className="text-terminal-accent">Uptime:</span>
              <span className="ml-2 terminal-text">10+ years in Tech</span>
            </div>

            <div>
              <span className="text-terminal-accent">Shell:</span>
              <span className="ml-2 terminal-text">Kubernetes & AWS</span>
            </div>

            <div>
              <span className="text-terminal-accent">WM:</span>
              <span className="ml-2 terminal-text">Distributed Systems</span>
            </div>

            <div className="mt-6">
              <div className="text-terminal-accent mb-2">Colors:</div>
              <div className="flex gap-1">
                {['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-terminal-accent', 'bg-gray-500'].map((color, index) => (
                  <div key={index} className={`w-4 h-4 ${color} rounded-sm`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-terminal-border/30">
          <div className="font-mono text-terminal-accent dark:text-terminal-accent leading-relaxed text-sm md:text-base">
            <p className="mb-4 md:mb-6">
              Abderrahim Soubai-Elidrisi is a seasoned Software and Platform Engineer with over a decade of experience in the tech industry. Currently based in Dublin, Ireland, he serves as a Platform Engineer at IBM, where he focuses on designing cloud-native infrastructure, Site Reliability Engineering (SRE) practices, and distributed systems. His professional journey has seen him evolve from a background in Android and back-end development into technical leadership roles, where he has successfully steered large-scale projects ranging from complex banking systems to AWS-driven DevOps and CI/CD architectures.
            </p>

            <p className="mb-6">
              Beyond his corporate contributions, Abderrahim is a prominent figure in the Moroccan tech community and a passionate advocate for open-source software. He is the co-lead of the Facebook Developer Circle in Marrakech and a frequent speaker at major tech conferences like BlaBlaConf, where he shares insights on Kubernetes operators, FaaS (Function as a Service), and scalable web technologies. His commitment to knowledge-sharing is further evidenced by his active presence on Stack Overflow, where he is a top contributor in the JavaScript and Angular communities, and through his personal blog at soubai.me.
            </p>

            <p>
              Deeply invested in community building, Abderrahim is also the host of the S7aba podcast, where he explores cloud computing and modern engineering trends. He maintains several open-source projects, including the "awesome-morocco" repository and various developer tools like `kubestatus` and `hermes-ci`. By blending a pragmatic platform mindset with a focus on developer experience, he continues to empower teams to build resilient, high-quality software while fostering a vibrant ecosystem for the next generation of engineers.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-terminal-border/30">
            <h2 className="text-terminal-accent font-bold mb-3 md:mb-4 font-mono text-base md:text-lg">Skills & Expertise</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-terminal-bg/30 border border-terminal-accent/20 rounded p-3 md:p-4">
                <h3 className="text-terminal-accent font-semibold mb-2 font-mono text-sm md:text-base">Cloud & Infrastructure</h3>
                <ul className="text-xs md:text-sm terminal-text/80 space-y-1 font-mono">
                  <li>Kubernetes & Operators</li>
                  <li>AWS (EC2, Lambda, S3, RDS)</li>
                  <li>Docker & Containerization</li>
                  <li>Infrastructure as Code</li>
                  <li>Site Reliability Engineering</li>
                </ul>
              </div>

              <div className="bg-terminal-bg/30 border border-terminal-accent/20 rounded p-3 md:p-4">
                <h3 className="text-terminal-accent font-semibold mb-2 font-mono text-sm md:text-base">Programming Languages</h3>
                <ul className="text-xs md:text-sm terminal-text/80 space-y-1 font-mono">
                  <li>JavaScript/TypeScript</li>
                  <li>Go (Golang)</li>
                  <li>Python</li>
                  <li>Java & Kotlin</li>
                  <li>Shell Scripting</li>
                </ul>
              </div>

              <div className="bg-terminal-bg/30 border border-terminal-accent/20 rounded p-3 md:p-4">
                <h3 className="text-terminal-accent font-semibold mb-2 font-mono text-sm md:text-base">Frameworks & Tools</h3>
                <ul className="text-xs md:text-sm terminal-text/80 space-y-1 font-mono">
                  <li>React & Next.js</li>
                  <li>Node.js & Express</li>
                  <li>Spring Boot</li>
                  <li>Git & GitHub Actions</li>
                  <li>Terraform & Ansible</li>
                </ul>
              </div>

              <div className="bg-terminal-bg/30 border border-terminal-accent/20 rounded p-3 md:p-4">
                <h3 className="text-terminal-accent font-semibold mb-2 font-mono text-sm md:text-base">DevOps & CI/CD</h3>
                <ul className="text-xs md:text-sm terminal-text/80 space-y-1 font-mono">
                  <li>Jenkins & GitLab CI</li>
                  <li>ArgoCD & Flux</li>
                  <li>Prometheus & Grafana</li>
                  <li>ELK Stack</li>
                  <li>CloudWatch & Logging</li>
                </ul>
              </div>

              <div className="bg-terminal-bg/30 border border-terminal-accent/20 rounded p-3 md:p-4">
                <h3 className="text-terminal-accent font-semibold mb-2 font-mono text-sm md:text-base">Databases</h3>
                <ul className="text-xs md:text-sm terminal-text/80 space-y-1 font-mono">
                  <li>PostgreSQL & MySQL</li>
                  <li>MongoDB</li>
                  <li>Redis & Caching</li>
                  <li>Elasticsearch</li>
                  <li>DynamoDB</li>
                </ul>
              </div>

              <div className="bg-terminal-bg/30 border border-terminal-accent/20 rounded p-3 md:p-4">
                <h3 className="text-terminal-accent font-semibold mb-2 font-mono text-sm md:text-base">Leadership & Community</h3>
                <ul className="text-xs md:text-sm terminal-text/80 space-y-1 font-mono">
                  <li>Technical Leadership</li>
                  <li>Team Mentoring</li>
                  <li>Conference Speaking</li>
                  <li>Open Source Contribution</li>
                  <li>Community Building</li>
                </ul>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  );
}