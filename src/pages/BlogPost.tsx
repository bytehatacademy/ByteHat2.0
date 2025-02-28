import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import { toastService } from '../components/ToastContainer';
import { sendEmail } from '../utils/emailService';

// Mock data for blog posts
const blogPosts = [
  {
    title: 'Top 5 Cloud Security Tips for 2025',
    content: `
      <p>Cloud security continues to be a major concern for organizations of all sizes. As more companies move their infrastructure to the cloud, the need for robust security measures becomes increasingly important. Here are the top 5 cloud security tips for 2025:</p>

      <h3>1. Implement Zero Trust Architecture</h3>
      <p>Zero Trust is no longer just a buzzword—it's a necessity. Assuming that threats can come from both inside and outside your network helps create more robust security policies. Implement strict identity verification for anyone trying to access resources in your network, regardless of their location.</p>

      <h3>2. Use Multi-Factor Authentication (MFA)</h3>
      <p>MFA adds an extra layer of security by requiring multiple forms of verification. This simple step can prevent up to 99.9% of account compromise attacks, according to Microsoft studies.</p>

      <h3>3. Regular Security Assessments</h3>
      <p>Conduct regular security assessments and penetration testing to identify vulnerabilities before malicious actors can exploit them. Cloud environments are dynamic, so your security testing should be as well.</p>

      <h3>4. Data Encryption at All Levels</h3>
      <p>Encrypt data at rest, in transit, and ideally, in use. Encryption is your last line of defense if other security measures fail, ensuring that even if unauthorized access occurs, the data remains unreadable.</p>

      <h3>5. Cloud Security Posture Management (CSPM)</h3>
      <p>Implement CSPM tools to continuously monitor your cloud infrastructure for misconfigurations, compliance issues, and security risks. These tools can automate the detection and remediation of common cloud security issues.</p>

      <p>By implementing these cloud security practices, you can significantly reduce your organization's risk of data breaches and ensure your cloud infrastructure remains secure in 2025 and beyond.</p>
    `,
    author: 'Sethu Satheesh',
    date: 'March 15, 2025',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    category: 'Cloud Security',
    slug: 'top-5-cloud-security-tips-for-2025',
    tags: ['Cloud Security', 'Cybersecurity', 'AWS', 'Zero Trust'],
  },
  {
    title: 'Why Learn Ethical Hacking in 2025',
    content: `
      <p>Ethical hacking has never been more relevant than it is in 2025. As organizations continue to digitize their operations, the attack surface expands, creating more opportunities for threat actors. Here's why learning ethical hacking is a valuable skill set today:</p>

      <h3>1. Growing Demand for Security Professionals</h3>
      <p>The global cybersecurity workforce gap continues to grow. Organizations are desperate for skilled security professionals who can identify and remediate vulnerabilities before they are exploited.</p>

      <h3>2. Evolving Threat Landscape</h3>
      <p>Modern attacks are more sophisticated than ever. Understanding how these attacks work helps organizations better defend against them. Ethical hackers must continuously update their skills to stay ahead of malicious actors.</p>

      <h3>3. Remote Work Security Challenges</h3>
      <p>With remote work becoming the norm, organizations face new security challenges. Ethical hackers help identify vulnerabilities in remote access solutions, VPNs, and cloud services that support distributed workforces.</p>

      <h3>4. Valuable Career Path</h3>
      <p>Ethical hacking skills command high salaries and offer excellent career progression. Certifications like CEH, OSCP, and SANS GPEN provide a structured learning path and industry recognition.</p>

      <h3>5. Learning by Doing</h3>
      <p>Platforms like HackTheBox, TryHackMe, and VulnHub offer hands-on experience that simulates real-world scenarios. These platforms allow aspiring ethical hackers to develop practical skills in a legal environment.</p>

      <p>At ByteHat Academy, our Ethical Hacking course covers all these aspects and more, preparing you for a successful career in cybersecurity. Join us to learn how to think like a hacker but act with integrity and ethics.</p>
    `,
    author: 'Michael Rodriguez',
    date: 'March 10, 2025',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
    category: 'Ethical Hacking',
    slug: 'why-learn-ethical-hacking-in-2025',
    tags: ['Ethical Hacking', 'Penetration Testing', 'Cybersecurity Career', 'Skill Development'],
  },
  {
    title: 'DevSecOps: The Future of Secure Development',
    content: `
      <p>DevSecOps represents a fundamental shift in how organizations approach security in software development. By integrating security practices throughout the development lifecycle, DevSecOps helps organizations deliver secure applications at the speed of modern development. Here's why DevSecOps is the future:</p>

      <h3>1. Security as Code</h3>
      <p>DevSecOps promotes the concept of "security as code," where security checks and controls are automated and integrated into CI/CD pipelines. This approach ensures that security is not a bottleneck but a continuous part of the development process.</p>

      <h3>2. Shift Left Security</h3>
      <p>Finding and fixing security issues early in the development process is more cost-effective than addressing them in production. DevSecOps embodies the "shift left" principle, pushing security considerations earlier in the development lifecycle.</p>

      <h3>3. Automated Security Testing</h3>
      <p>Automation is key to DevSecOps success. Tools for static application security testing (SAST), dynamic application security testing (DAST), and software composition analysis (SCA) can be integrated into CI/CD pipelines to identify vulnerabilities automatically.</p>

      <h3>4. Collaboration and Shared Responsibility</h3>
      <p>DevSecOps breaks down silos between development, operations, and security teams. This collaborative approach creates a culture where security is everyone's responsibility, not just the security team's.</p>

      <h3>5. Continuous Monitoring and Response</h3>
      <p>Security doesn't end with deployment. DevSecOps extends into production with continuous monitoring, threat detection, and incident response capabilities, creating a complete security lifecycle.</p>

      <p>At ByteHat Academy, our DevSecOps course teaches you how to implement these principles in practice, helping you build a secure development pipeline that doesn't sacrifice speed for security.</p>
    `,
    author: 'Emma Watson',
    date: 'March 5, 2025',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
    category: 'DevSecOps',
    slug: 'devsecops-the-future-of-secure-development',
    tags: ['DevSecOps', 'Secure Development', 'CI/CD', 'Automation'],
  },
  {
    title: 'AI in Cybersecurity: Trends to Watch',
    content: `
      <p>Artificial Intelligence is transforming every industry, and cybersecurity is no exception. AI-powered security tools are helping organizations detect and respond to threats faster than ever before. Here are the key AI cybersecurity trends to watch:</p>

      <h3>1. Advanced Threat Detection</h3>
      <p>AI algorithms can analyze vast amounts of data to identify patterns that might indicate a cyber attack. By learning what normal network behavior looks like, AI can flag anomalies that might represent threats that traditional signature-based tools would miss.</p>

      <h3>2. Automated Response</h3>
      <p>When threats are detected, AI can take automated actions to contain them. This capability significantly reduces the time between detection and response, limiting the potential damage of an attack.</p>

      <h3>3. Predictive Security</h3>
      <p>Rather than just reacting to attacks, AI can help predict where and how attacks might occur. By analyzing historical data and current trends, AI can identify vulnerabilities that attackers might target, allowing organizations to patch them proactively.</p>

      <h3>4. Intelligent Phishing Detection</h3>
      <p>Phishing remains one of the most common attack vectors. AI can analyze email content, sender information, and behavioral patterns to identify sophisticated phishing attempts that might bypass traditional filters.</p>

      <h3>5. The Rise of Adversarial Machine Learning</h3>
      <p>As defenders use AI, attackers are adapting. Adversarial machine learning—techniques designed to fool AI systems—is becoming more common. Security teams must understand these techniques to build more robust AI defenses.</p>

      <p>At ByteHat Academy, we incorporate AI security concepts into our courses, ensuring our students are prepared for this evolving aspect of cybersecurity.</p>
    `,
    author: 'Sethu Satheesh',
    date: 'March 1, 2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    category: 'AI Security',
    slug: 'ai-in-cybersecurity-trends-to-watch',
    tags: ['AI Security', 'Machine Learning', 'Threat Detection', 'Cybersecurity Trends'],
  },
];

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<typeof blogPosts[0] | null>(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Find the blog post with the matching slug
    const post = blogPosts.find((post) => post.slug === slug);

    if (post) {
      setBlogPost(post);
    } else {
      // Redirect to blog list if post not found
      navigate('/blog');
      toastService.show('Blog post not found', 'error');
    }
  }, [slug, navigate]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      toastService.show('Please fill in all fields', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail({
        to_email: 'bytehatacademy@gmail.com',
        from_name: name,
        message: `Comment on "${blogPost?.title}": ${comment}`,
        reply_to: email,
      });

      toastService.show('Your comment has been submitted for moderation.', 'success');
      setComment('');
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toastService.show('Failed to submit comment. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!blogPost) {
    return (
      <div className="pt-20 pb-16 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blogPost.title} | ByteHat Academy</title>
        <meta name="description" content={blogPost.content.substring(0, 160)} />
        <meta name="keywords" content={blogPost.tags.join(', ')} />
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-accent hover:text-accent/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <div
            className="h-64 md:h-80 bg-cover bg-center rounded-xl mb-8"
            style={{ backgroundImage: `url(${blogPost.image})` }}
          />

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {blogPost.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {blogPost.author}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                {blogPost.category}
              </div>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>

          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="h-6 w-6 mr-2 text-accent" />
              <h3 className="text-xl font-bold">Leave a Comment</h3>
            </div>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
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
                <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
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
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Comment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;