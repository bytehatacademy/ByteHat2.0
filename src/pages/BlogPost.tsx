import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import { toastService } from '../components/ToastContainer';

// Mock data for blog posts (should match the data in Blog.tsx)
const blogPosts = [
  {
    title: 'Top 5 Cloud Security Tips for 2025',
    content: `
      <p>Cloud security continues to be a top concern for businesses of all sizes. As organizations increasingly migrate their operations to the cloud, understanding and implementing robust security measures becomes essential. Here are five essential tips for maintaining strong cloud security in 2025:</p>

      <h3>1. Implement Zero Trust Architecture</h3>
      <p>The traditional security model of "trust but verify" is no longer sufficient. Zero Trust operates on the principle of "never trust, always verify." By requiring verification from anyone trying to access resources in your network, regardless of whether they are inside or outside the organization's perimeter, you can significantly improve your security posture.</p>

      <h3>2. Utilize Cloud Security Posture Management (CSPM)</h3>
      <p>CSPM tools help identify and remediate risks across cloud infrastructures. These automated solutions continuously monitor your cloud environment for misconfigurations, compliance issues, and potential vulnerabilities. By 2025, CSPM will be an essential component of any comprehensive cloud security strategy.</p>

      <h3>3. Enhance Container Security</h3>
      <p>As container adoption continues to grow, securing these environments becomes increasingly critical. Implement scanning tools to check for vulnerabilities in container images, utilize runtime protection, and follow the principle of least privilege when configuring container access permissions.</p>

      <h3>4. Adopt Security as Code</h3>
      <p>Just as Infrastructure as Code has revolutionized deployment, Security as Code integrates security directly into the development process. By codifying security policies and automatically enforcing them during the CI/CD pipeline, you can ensure that security is built into your applications from the ground up.</p>

      <h3>5. Implement Robust Cloud Data Protection</h3>
      <p>Protecting data stored in the cloud requires a multi-layered approach. Utilize encryption for data both in transit and at rest, implement strict access controls, and regularly backup your critical data. Additionally, consider using data loss prevention (DLP) tools to monitor and control the flow of sensitive information.</p>

      <p>By implementing these five cloud security tips, organizations can better protect their cloud infrastructure and data in the increasingly complex digital landscape of 2025.</p>
    `,
    author: 'Sethu Satheesh',
    date: 'March 15, 2025',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    category: 'Cloud Security',
    slug: 'top-5-cloud-security-tips-for-2025',
    comments: 23,
  },
  {
    title: 'Why Learn Ethical Hacking in 2025',
    content: `
      <p>As cybersecurity threats continue to evolve and escalate, the demand for skilled ethical hackers has never been higher. In 2025, learning ethical hacking isn't just a career option—it's a crucial skill set that can provide tremendous value across various industries. Here's why you should consider learning ethical hacking this year:</p>

      <h3>Unprecedented Job Growth</h3>
      <p>The cybersecurity skills gap continues to widen, with millions of unfilled positions globally. Ethical hackers, in particular, are in high demand as organizations seek professionals who can think like attackers to strengthen their defenses. This demand translates to competitive salaries and excellent career growth opportunities.</p>

      <h3>The Changing Threat Landscape</h3>
      <p>Cyber attacks are becoming more sophisticated, leveraging advanced techniques like AI-powered exploits and zero-day vulnerabilities. Understanding these attack methodologies firsthand is essential for developing effective defenses. Ethical hacking provides this insight, allowing security professionals to stay one step ahead of malicious actors.</p>

      <h3>Practical Skills Development</h3>
      <p>Learning ethical hacking develops practical, hands-on skills that go beyond theoretical knowledge. The process of identifying and exploiting vulnerabilities enhances problem-solving abilities, technical knowledge, and critical thinking skills applicable across many IT disciplines.</p>

      <h3>Regulatory Compliance</h3>
      <p>With regulations like GDPR, HIPAA, and others imposing strict requirements for data protection, organizations need ethical hackers to verify compliance through penetration testing and security assessments. This regulatory pressure further increases the value of ethical hacking skills.</p>

      <h3>Protection of Critical Infrastructure</h3>
      <p>As critical infrastructure becomes increasingly connected, the potential impact of cyber attacks grows exponentially. Ethical hackers play a vital role in securing essential systems like power grids, water treatment facilities, and transportation networks against potentially catastrophic breaches.</p>

      <p>Learning ethical hacking in 2025 isn't just about career opportunities—it's about contributing to a safer digital ecosystem. Whether you're looking to enter the cybersecurity field or enhance your existing IT skills, ethical hacking provides valuable knowledge that can make a real difference in today's security landscape.</p>
    `,
    author: 'Michael Rodriguez',
    date: 'March 10, 2025',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
    category: 'Ethical Hacking',
    slug: 'why-learn-ethical-hacking-in-2025',
    comments: 15,
  },
  {
    title: 'DevSecOps: The Future of Secure Development',
    content: `
      <p>DevSecOps represents a fundamental shift in how organizations approach security in the software development lifecycle. By integrating security practices within the DevOps process, DevSecOps enables teams to deliver secure applications without sacrificing speed and agility. Here's why DevSecOps is becoming the standard for secure development:</p>

      <h3>Security as a Shared Responsibility</h3>
      <p>DevSecOps breaks down the traditional silos between development, operations, and security teams. Security becomes everyone's responsibility, fostering a culture where all team members consider security implications at every stage of development. This collaborative approach leads to more secure applications and reduces the friction often associated with security reviews.</p>

      <h3>Shifting Security Left</h3>
      <p>One of the core principles of DevSecOps is "shifting left"—addressing security concerns earlier in the development process. By identifying and fixing security issues during development rather than after deployment, organizations can significantly reduce remediation costs and minimize security risks. Tools like static application security testing (SAST) and software composition analysis (SCA) enable developers to catch vulnerabilities as they code.</p>

      <h3>Automation for Consistency</h3>
      <p>DevSecOps leverages automation to ensure consistent application of security controls. Security testing becomes integrated into CI/CD pipelines, allowing for automated vulnerability scanning, compliance checks, and security validations with each build and deployment. This automation eliminates the human error factor and ensures that no security step is accidentally skipped or bypassed.</p>

      <h3>Continuous Monitoring and Feedback</h3>
      <p>The DevSecOps approach extends security into production through continuous monitoring and feedback loops. Runtime application self-protection (RASP) and dynamic application security testing (DAST) provide ongoing protection and assessment, while security information and event management (SIEM) systems help detect and respond to potential security incidents. This continuous monitoring allows teams to identify and address new vulnerabilities as they emerge.</p>

      <h3>Improved Compliance Management</h3>
      <p>For organizations operating in regulated industries, DevSecOps can streamline compliance efforts. By building compliance requirements into automated testing and providing comprehensive audit trails, DevSecOps practices make it easier to demonstrate adherence to regulatory standards like PCI DSS, HIPAA, or SOC 2. This approach not only improves security but also reduces the burden of compliance documentation.</p>

      <p>As we move forward, DevSecOps will continue to evolve, incorporating new technologies like AI for predictive security analysis and advanced threat modeling. Organizations that embrace this approach gain not only more secure applications but also the agility to respond quickly to emerging threats in an increasingly complex digital landscape.</p>
    `,
    author: 'Emma Watson',
    date: 'March 5, 2025',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
    category: 'DevSecOps',
    slug: 'devsecops-the-future-of-secure-development',
    comments: 8,
  },
  {
    title: 'AI in Cybersecurity: Trends to Watch',
    content: `
      <p>Artificial Intelligence is revolutionizing the cybersecurity landscape, offering new capabilities for both defenders and attackers. As we navigate 2025, several key trends are emerging in the application of AI to cybersecurity challenges:</p>

      <h3>1. AI-Powered Threat Detection and Response</h3>
      <p>AI systems are increasingly capable of identifying suspicious patterns and potential threats that might escape human analysts. Using machine learning algorithms, security tools can now analyze vast amounts of data, recognize anomalies, and flag potential security incidents in real-time. These systems continuously learn from new data, improving their accuracy over time and adapting to evolving threat landscapes. In 2025, we're seeing AI-based systems that can not only detect threats but also autonomously respond to certain types of attacks, containing breaches before they cause significant damage.</p>

      <h3>2. Predictive Security Analytics</h3>
      <p>Beyond just responding to threats, AI is enabling predictive security capabilities. By analyzing historical attack data, system vulnerabilities, and threat intelligence, AI systems can forecast potential attack vectors and vulnerabilities before they're exploited. This proactive approach allows security teams to prioritize their efforts, focusing on the most likely attack paths and implementing preventive measures. Organizations leveraging predictive security analytics are demonstrating significantly improved security postures and reduced successful breach incidents.</p>

      <h3>3. Advanced Phishing and Social Engineering Detection</h3>
      <p>Phishing remains one of the most common attack vectors, but AI is providing new tools to combat these threats. Natural language processing and computer vision algorithms can analyze email content, detect subtle signs of phishing attempts, and identify deepfake communications that might fool human recipients. These systems examine multiple factors—linguistic patterns, sender behavior, image inconsistencies, and contextual anomalies—to identify sophisticated social engineering attempts with unprecedented accuracy.</p>

      <h3>4. AI in Vulnerability Management</h3>
      <p>Finding and prioritizing vulnerabilities across complex IT environments presents a significant challenge. AI systems are now helping security teams sort through thousands of potential vulnerabilities, prioritizing them based on actual exploitability, business impact, and threat actor behavior. These tools can even suggest the most effective remediation strategies and patch management approaches, streamlining what was previously a highly manual process.</p>

      <h3>5. The Dark Side: AI-Powered Attacks</h3>
      <p>As defenders adopt AI technologies, so too are attackers. We're seeing a rise in AI-augmented cyber attacks that can adapt to defenses, generate convincing phishing content tailored to targets, and discover new vulnerabilities. Perhaps most concerning is the use of AI to create smart malware that can evade traditional detection methods by modifying its behavior and signatures. This escalating AI arms race requires security professionals to continuously update their defense strategies and tools.</p>

      <p>The integration of AI in cybersecurity represents both an opportunity and a challenge. Organizations that effectively leverage these technologies while understanding their limitations will be best positioned to defend against increasingly sophisticated threats. As we move through 2025, the rapid evolution of AI capabilities will continue to reshape the cybersecurity landscape in profound ways.</p>
    `,
    author: 'Sethu Satheesh',
    date: 'March 1, 2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    category: 'AI Security',
    slug: 'ai-in-cybersecurity-trends-to-watch',
    comments: 42,
  },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundShown, setNotFoundShown] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Find the blog post that matches the slug
    // First try exact match
    let foundPost = blogPosts.find((post) => post.slug === slug);
    
    // If not found, check if the slug might be the title slugified from search results
    if (!foundPost && slug) {
      foundPost = blogPosts.find((post) => 
        post.title.toLowerCase().replace(/\s+/g, '-').includes(slug.toLowerCase())
      );
    }

    // Simulate API delay
    setTimeout(() => {
      if (foundPost) {
        setPost(foundPost);
        setNotFoundShown(false);
      } else if (!notFoundShown) {
        toastService.show('Blog post not found', 'error');
        setNotFoundShown(true);
      }
      setLoading(false);
    }, 300);
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-12"></div>
            <div className="h-64 bg-gray-700 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2 inline" />
            Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | ByteHat Academy</title>
        <meta name="description" content={post.content.substring(0, 155)} />
        <meta name="keywords" content={`${post.category}, cybersecurity, ByteHat Academy, ${post.title}`} />
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-accent hover:text-accent/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Posts
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {post.category}
            </div>
          </div>

          <div
            className="h-72 bg-cover bg-center rounded-xl mb-8"
            style={{ backgroundImage: `url(${post.image})` }}
          />

          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogPost;