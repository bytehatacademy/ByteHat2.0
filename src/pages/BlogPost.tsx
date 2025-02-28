import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import { toastService } from '../components/ToastContainer';
import { sendEmail } from '../utils/emailService';

// Mock data for blog posts
const blogPostsData = {
  'top-5-cloud-security-tips-for-2025': {
    title: 'Top 5 Cloud Security Tips for 2025',
    excerpt:
      'Essential cloud security practices to protect your infrastructure in the age of distributed computing.',
    author: 'Sethu Satheesh',
    date: 'March 15, 2025',
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    category: 'Cloud Security',
    content: `
      <p>As organizations continue to migrate their infrastructure to the cloud, security concerns remain at the forefront of priorities for IT leaders. In 2025, the landscape of cloud security has evolved significantly, with new threats emerging and new solutions being developed to counter them.</p>

      <h2>1. Implement Zero Trust Architecture</h2>
      <p>The traditional security model of "trust but verify" is no longer sufficient in today's distributed cloud environments. Zero Trust operates on the principle of "never trust, always verify," requiring all users and systems to be authenticated and authorized before accessing resources, regardless of their location.</p>
      <p>Key components of a Zero Trust strategy include:</p>
      <ul>
        <li>Strong identity verification for all users and devices</li>
        <li>Micro-segmentation to limit lateral movement</li>
        <li>Just-in-time and just-enough-access principles</li>
        <li>Continuous monitoring and validation</li>
      </ul>

      <h2>2. Automate Security Policies</h2>
      <p>Manual security processes can't keep pace with the scale and speed of cloud environments. Automating security policies helps ensure consistent application of security controls across your entire cloud infrastructure.</p>
      <p>Benefits of security automation include:</p>
      <ul>
        <li>Reduced human error</li>
        <li>Faster response to threats</li>
        <li>Consistent application of security policies</li>
        <li>Improved compliance reporting</li>
      </ul>

      <h2>3. Leverage Cloud-Native Security Tools</h2>
      <p>Cloud providers offer robust security tools designed specifically for their environments. Leveraging these native tools can provide better integration and visibility compared to third-party solutions.</p>
      <p>Essential cloud-native security tools include:</p>
      <ul>
        <li>Cloud Security Posture Management (CSPM)</li>
        <li>Cloud Workload Protection Platform (CWPP)</li>
        <li>Cloud Access Security Broker (CASB)</li>
        <li>Cloud Infrastructure Entitlement Management (CIEM)</li>
      </ul>

      <h2>4. Adopt DevSecOps Practices</h2>
      <p>Integrating security into the development process from the start is crucial for maintaining secure cloud applications. DevSecOps practices help identify and address vulnerabilities early in the development lifecycle.</p>
      <p>Key DevSecOps practices include:</p>
      <ul>
        <li>Container and serverless security</li>
        <li>API security</li>
        <li>Cloud workload protection</li>
        <li>Runtime application self-protection</li>
      </ul>

      <h2>5. Enforce Data-Centric Security</h2>
      <p>As data moves freely between cloud services, security must follow the data rather than focusing solely on perimeter defenses.</p>
      <p>Essential data security measures include:</p>
      <ul>
        <li>Data classification and discovery</li>
        <li>Encryption for data at rest and in transit</li>
        <li>Data loss prevention controls</li>
        <li>Data access governance</li>
      </ul>

      <h2>Conclusion</h2>
      <p>As cloud environments become more complex, security strategies must evolve to address new challenges. By implementing these five critical security measures, organizations can better protect their cloud infrastructure and data in 2025 and beyond.</p>
      <p>Remember that cloud security is a shared responsibility between cloud providers and customers. While providers secure the underlying infrastructure, customers must secure their data, applications, and access controls.</p>
    `,
    relatedPosts: [
      'why-learn-ethical-hacking-in-2025',
      'devsecops-the-future-of-secure-development',
      'ai-in-cybersecurity-trends-to-watch'
    ]
  },
  'why-learn-ethical-hacking-in-2025': {
    title: 'Why Learn Ethical Hacking in 2025',
    excerpt:
      "The growing importance of ethical hacking skills in today's cybersecurity landscape.",
    author: 'Michael Rodriguez',
    date: 'March 10, 2025',
    image:
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
    category: 'Ethical Hacking',
    content: `
      <p>As cyber threats continue to evolve in sophistication and impact, the demand for skilled ethical hackers has never been higher. In 2025, ethical hacking has become an essential discipline for organizations seeking to protect their digital assets and infrastructure.</p>

      <h2>The Evolution of Cyber Threats</h2>
      <p>The threat landscape has evolved dramatically over the past few years. Advanced persistent threats (APTs), ransomware attacks, and zero-day exploits have become more prevalent and damaging. Organizations need professionals who understand these threats from the inside out.</p>

      <h2>Career Opportunities in Ethical Hacking</h2>
      <p>The cybersecurity job market continues to experience a significant skills gap, with demand far outpacing supply. Certified ethical hackers can expect:</p>
      <ul>
        <li>Competitive salaries starting at $90,000 and reaching over $150,000 for experienced professionals</li>
        <li>Job stability and growth opportunities</li>
        <li>Diverse roles including penetration tester, security analyst, and security consultant</li>
        <li>Opportunities across industries including finance, healthcare, government, and tech</li>
      </ul>

      <h2>Essential Skills for Ethical Hackers in 2025</h2>
      <p>The most successful ethical hackers possess a combination of technical expertise and soft skills:</p>
      <ul>
        <li>Strong understanding of operating systems and networking</li>
        <li>Programming knowledge (Python, Bash, PowerShell)</li>
        <li>Familiarity with common security tools and frameworks</li>
        <li>Cloud security expertise</li>
        <li>Strong analytical and problem-solving abilities</li>
        <li>Excellent communication skills for reporting findings to technical and non-technical stakeholders</li>
      </ul>

      <h2>Ethical Hacking Certifications Worth Pursuing</h2>
      <p>Several certifications have emerged as industry standards for validating ethical hacking skills:</p>
      <ul>
        <li>Certified Ethical Hacker (CEH)</li>
        <li>Offensive Security Certified Professional (OSCP)</li>
        <li>GIAC Penetration Tester (GPEN)</li>
        <li>CompTIA PenTest+</li>
      </ul>

      <h2>The Ethical Component</h2>
      <p>Beyond technical skills, ethical hackers must maintain the highest standards of integrity and ethics. Understanding the legal and ethical boundaries of security testing is crucial, as is obtaining proper authorization before conducting any penetration testing activities.</p>

      <h2>Conclusion</h2>
      <p>Learning ethical hacking in 2025 offers tremendous value for both aspiring cybersecurity professionals and organizations seeking to bolster their security posture. By understanding how attackers think and operate, ethical hackers play a vital role in defending against cyber threats in our increasingly connected world.</p>
    `,
    relatedPosts: [
      'top-5-cloud-security-tips-for-2025',
      'devsecops-the-future-of-secure-development',
      'ai-in-cybersecurity-trends-to-watch'
    ]
  },
  'devsecops-the-future-of-secure-development': {
    title: 'DevSecOps: The Future of Secure Development',
    excerpt:
      'How DevSecOps is transforming the way we approach security in software development.',
    author: 'Emma Watson',
    date: 'March 5, 2025',
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
    category: 'DevSecOps',
    content: `
      <p>DevSecOps represents a fundamental shift in how organizations approach security in the software development lifecycle. By integrating security practices throughout the development process rather than treating it as a final checkpoint, companies can build more secure applications while maintaining development velocity.</p>

      <h2>Beyond DevOps: The Evolution to DevSecOps</h2>
      <p>Traditional DevOps focused on bridging the gap between development and operations to enable faster, more reliable software delivery. DevSecOps extends this philosophy by embedding security as a shared responsibility across the entire CI/CD pipeline.</p>

      <h2>Key Components of a DevSecOps Strategy</h2>
      <p>Implementing DevSecOps requires several fundamental changes to traditional development processes:</p>
      <ul>
        <li><strong>Shift Left Security:</strong> Moving security testing earlier in the development process</li>
        <li><strong>Automated Security Testing:</strong> Integrating security scans into CI/CD pipelines</li>
        <li><strong>Security as Code:</strong> Defining security policies and controls in code</li>
        <li><strong>Continuous Monitoring:</strong> Implementing real-time security monitoring in production</li>
        <li><strong>Cultural Transformation:</strong> Fostering a security-aware culture across teams</li>
      </ul>

      <h2>Tools Enabling DevSecOps</h2>
      <p>A robust DevSecOps toolchain typically includes:</p>
      <ul>
        <li><strong>Static Application Security Testing (SAST):</strong> Tools like SonarQube, Checkmarx, and Fortify</li>
        <li><strong>Dynamic Application Security Testing (DAST):</strong> OWASP ZAP, Burp Suite</li>
        <li><strong>Software Composition Analysis (SCA):</strong> Snyk, WhiteSource, Black Duck</li>
        <li><strong>Infrastructure as Code (IaC) Security:</strong> Terraform Sentinel, Checkov</li>
        <li><strong>Container Security:</strong> Aqua Security, Twistlock, Sysdig Secure</li>
      </ul>

      <h2>Benefits of DevSecOps</h2>
      <p>Organizations that successfully implement DevSecOps often experience:</p>
      <ul>
        <li>Reduced security vulnerabilities in production</li>
        <li>Lower cost of fixing security issues</li>
        <li>Faster time to market for secure applications</li>
        <li>Improved compliance posture</li>
        <li>Better collaboration between development, operations, and security teams</li>
      </ul>

      <h2>Challenges in DevSecOps Adoption</h2>
      <p>Despite its benefits, implementing DevSecOps comes with challenges:</p>
      <ul>
        <li>Resistance to cultural change</li>
        <li>Tool integration complexities</li>
        <li>Balancing security with development velocity</li>
        <li>Skills gaps across teams</li>
      </ul>

      <h2>Conclusion</h2>
      <p>As cyber threats continue to evolve, traditional security approaches are no longer sufficient. DevSecOps represents the future of secure software development, enabling organizations to build security into their applications from the start rather than trying to add it later. By adopting DevSecOps principles and practices, companies can deliver secure, high-quality software at the speed modern business demands.</p>
    `,
    relatedPosts: [
      'top-5-cloud-security-tips-for-2025',
      'why-learn-ethical-hacking-in-2025',
      'ai-in-cybersecurity-trends-to-watch'
    ]
  },
  'ai-in-cybersecurity-trends-to-watch': {
    title: 'AI in Cybersecurity: Trends to Watch',
    excerpt:
      'Exploring the latest developments in AI-powered cybersecurity solutions.',
    author: 'Sethu Satheesh',
    date: 'March 1, 2025',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    category: 'AI Security',
    content: `
      <p>Artificial intelligence has emerged as a powerful force in cybersecurity, enabling organizations to detect and respond to threats more quickly and effectively than ever before. As we look ahead, several key trends are shaping the intersection of AI and cybersecurity.</p>

      <h2>The Rise of Autonomous Security Systems</h2>
      <p>Fully autonomous security systems capable of detecting, analyzing, and responding to threats without human intervention are becoming increasingly sophisticated. These systems leverage machine learning algorithms to:</p>
      <ul>
        <li>Identify abnormal network behavior in real-time</li>
        <li>Automatically contain potential threats</li>
        <li>Adapt defenses based on emerging attack patterns</li>
        <li>Self-heal vulnerabilities before they can be exploited</li>
      </ul>

      <h2>AI-Powered Threat Hunting</h2>
      <p>Traditional security monitoring relies on known signatures and rules to detect threats. AI-powered threat hunting takes a more proactive approach by:</p>
      <ul>
        <li>Using unsupervised learning to identify hidden patterns</li>
        <li>Correlating seemingly unrelated events to reveal attack campaigns</li>
        <li>Analyzing user behavior to detect insider threats</li>
        <li>Continuously learning from new threat data to improve detection accuracy</li>
      </ul>

      <h2>The Arms Race: AI vs. AI</h2>
      <p>As security teams leverage AI to strengthen defenses, attackers are developing their own AI-powered tools to evade detection and maximize impact. This has created an unprecedented arms race with several concerning developments:</p>
      <ul>
        <li>AI-generated phishing emails that are increasingly difficult to distinguish from legitimate communications</li>
        <li>Adversarial machine learning techniques designed to confuse security models</li>
        <li>Automated vulnerability discovery and exploitation</li>
        <li>Deepfake technology used for social engineering attacks</li>
      </ul>

      <h2>Natural Language Processing for Security Intelligence</h2>
      <p>Security teams are leveraging NLP to process vast amounts of unstructured data, including:</p>
      <ul>
        <li>Threat intelligence reports</li>
        <li>Security blogs and forums</li>
        <li>Dark web monitoring</li>
        <li>Vendor security advisories</li>
      </ul>
      <p>This enables analysts to stay informed about emerging threats without manually reading thousands of documents.</p>

      <h2>Explainable AI for Compliance and Trust</h2>
      <p>As AI systems make increasingly important security decisions, the need for transparency and explainability has become critical. Explainable AI (XAI) approaches help security teams:</p>
      <ul>
        <li>Understand why specific alerts were triggered</li>
        <li>Validate the reasoning behind automated responses</li>
        <li>Meet regulatory requirements for transparency</li>
        <li>Build trust in AI-powered security solutions</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The integration of AI into cybersecurity represents one of the most significant technological shifts in the industry's history. While AI offers tremendous potential to enhance security posture, it also introduces new challenges and considerations. Organizations that stay informed about these trends and thoughtfully implement AI-powered security solutions will be best positioned to defend against the increasingly sophisticated threat landscape of 2025 and beyond.</p>
    `,
    relatedPosts: [
      'top-5-cloud-security-tips-for-2025',
      'why-learn-ethical-hacking-in-2025',
      'devsecops-the-future-of-secure-development'
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug as keyof typeof blogPostsData] : null;
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!post) {
    return (
      <div className="pt-20 pb-16 flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">
            Sorry, the blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog" className="btn-primary">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      toastService.show('Please fill all fields', 'warning');
      return;
    }

    try {
      await sendEmail({
        to_email: 'bytehatacademy@gmail.com',
        from_name: name,
        message: `Comment on ${post.title}: ${comment}`,
        reply_to: email,
      });

      toastService.show('Comment submitted successfully!', 'success');
      setComment('');
      setEmail('');
      setName('');
    } catch (error) {
      toastService.show('Failed to submit comment. Please try again.', 'error');
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | ByteHat Academy Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, ByteHat Academy, cybersecurity, ${post.title}`} />
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link to="/blog" className="inline-flex items-center text-accent hover:text-accent/80 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <article className="card overflow-hidden">
            {/* Featured image */}
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />

            {/* Article content */}
            <div className="p-8">
              {/* Meta information */}
              <div className="flex flex-wrap items-center justify-between mb-4">
                <span className="text-accent text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              {/* Author */}
              <div className="flex items-center mb-8">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-300">{post.author}</span>
              </div>

              {/* Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-400 mr-2">Tags:</span>
                  <span className="bg-gray-800 text-sm text-gray-200 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="bg-gray-800 text-sm text-gray-200 px-3 py-1 rounded-full">
                    Cybersecurity
                  </span>
                  <span className="bg-gray-800 text-sm text-gray-200 px-3 py-1 rounded-full">
                    ByteHat
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Comment section */}
          <div className="mt-12 card">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-5 w-5 text-accent mr-2" />
                <h2 className="text-2xl font-bold">Leave a Comment</h2>
              </div>

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={6}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your comment"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Submit Comment
                </button>
              </form>
            </div>
          </div>

          {/* Related posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {post.relatedPosts.map((relatedSlug) => {
                  const relatedPost = blogPostsData[relatedSlug as keyof typeof blogPostsData];
                  return (
                    <Link to={`/blog/${relatedSlug}`} key={relatedSlug} className="card overflow-hidden hover:bg-gray-800 transition-colors">
                      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${relatedPost.image})` }} />
                      <div className="p-4">
                        <h3 className="font-bold mb-2">{relatedPost.title}</h3>
                        <p className="text-sm text-gray-400">{relatedPost.date}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;