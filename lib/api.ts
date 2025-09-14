// API functions for the cybersecurity scanning application

export interface DomainScanRequest {
  domain: string;
}

export interface DomainScanResponse {
  id: string;
  domain: string;
  status: 'scanning' | 'completed' | 'failed';
  vulnerabilities: Array<{
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    recommendation: string;
  }>;
  scanDate: string;
}

// New interfaces for scan results
export interface ActionItem {
  title: string;
  bad_thing: string;
  business_impact: string;
  timeline: string;
  how_to_fix_simple: string; // markdown
  how_to_fix_technical?: string; // markdown - optional for technical items
  priority: string;
  location?: string; // optional for technical compliance items
  is_technical_complience?: boolean; // if it's also a technical compliance from scan
  completed?: boolean; // frontend completion status
}

export interface ScanResultsResponse {
  audit_percent: number; // 0-100
  action_items: ActionItem[];
}

export interface EmailSubmissionRequest {
  email: string;
}

export interface EmailSubmissionResponse {
  success: boolean;
  message: string;
  userId?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Domain scanning API
export const scanDomain = async (data: DomainScanRequest): Promise<DomainScanResponse> => {
  await delay(2000); // Simulate network delay
  
  // Simulate random success/failure
  if (Math.random() < 0.1) {
    throw new Error('Failed to initiate domain scan. Please try again.');
  }

  // Mock scan results
  const mockVulnerabilities = [
    {
      id: 'vuln-1',
      type: 'SSL/TLS Configuration',
      severity: 'medium' as const,
      description: 'Weak SSL/TLS configuration detected',
      recommendation: 'Update to TLS 1.3 and disable weak cipher suites'
    },
    {
      id: 'vuln-2',
      type: 'HTTP Security Headers',
      severity: 'low' as const,
      description: 'Missing security headers (HSTS, CSP)',
      recommendation: 'Implement proper security headers'
    },
    {
      id: 'vuln-3',
      type: 'Subdomain Enumeration',
      severity: 'high' as const,
      description: 'Multiple subdomains exposed with potential vulnerabilities',
      recommendation: 'Review and secure all subdomains'
    }
  ];

  return {
    id: `scan-${Date.now()}`,
    domain: data.domain,
    status: 'completed',
    vulnerabilities: mockVulnerabilities,
    scanDate: new Date().toISOString()
  };
};

// Email submission API
export const submitEmail = async (data: EmailSubmissionRequest): Promise<EmailSubmissionResponse> => {
  await delay(1500); // Simulate network delay
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Please enter a valid email address');
  }

  // Simulate random success/failure
  if (Math.random() < 0.05) {
    throw new Error('Failed to submit email. Please try again.');
  }

  return {
    success: true,
    message: 'Email submitted successfully! Redirecting to scan...',
    userId: `user-${Date.now()}`
  };
};

// Mock data function for scan results
export const getMockScanResults = (): ScanResultsResponse => {
  return {
    audit_percent: 40, // Will be calculated from action items completion
    action_items: [
      // Survey-based action items
      {
        title: "Update SSL Certificate",
        bad_thing: "You could be fined €5,000 for non-compliance with data protection regulations",
        business_impact: "You could lose customers due to security warnings in browsers",
        timeline: "1 week",
        how_to_fix_simple: "Contact your hosting provider to update your SSL certificate. This usually takes 1-2 business days and costs around €50-100.",
        priority: "Critical"
      },
      {
        title: "Implement Security Headers",
        bad_thing: "Your website is vulnerable to cross-site scripting (XSS) attacks",
        business_impact: "Customer data could be stolen, leading to legal liability and reputation damage",
        timeline: "2 weeks",
        how_to_fix_simple: "Ask your web developer to add security headers like Content Security Policy (CSP) and X-Frame-Options to your website configuration.",
        priority: "High"
      },
      {
        title: "Update Dependencies",
        bad_thing: "Outdated packages contain known security vulnerabilities",
        business_impact: "Hackers could exploit these vulnerabilities to gain access to your system",
        timeline: "1 week",
        how_to_fix_simple: "Run 'npm audit fix' command or ask your developer to update all packages to their latest secure versions.",
        priority: "High"
      },
      {
        title: "Configure Cookie Security",
        bad_thing: "Authentication cookies can be stolen by attackers",
        business_impact: "User accounts could be compromised, leading to data breaches",
        timeline: "3 days",
        how_to_fix_simple: "Set Secure, HttpOnly, and SameSite flags on all cookies. This is a simple configuration change.",
        priority: "Medium"
      },
      {
        title: "Hide Server Information",
        bad_thing: "Server version information helps attackers plan attacks",
        business_impact: "Makes it easier for hackers to find specific vulnerabilities in your system",
        timeline: "1 day",
        how_to_fix_simple: "Configure your web server to hide version information in response headers.",
        priority: "Low"
      },
      // Technical compliance items from scan
      {
        title: "SSL Certificate Validation Error",
        bad_thing: "Invalid certificate chain allows man-in-the-middle attacks",
        business_impact: "Data interception and credential theft could occur",
        timeline: "1 week",
        how_to_fix_simple: "Contact your hosting provider to fix the certificate chain. They need to install intermediate certificates properly.",
        how_to_fix_technical: "```bash\n# Check certificate chain\nopenssl s_client -connect yourdomain.com:443 -showcerts\n\n# Install intermediate certificates\n# Contact your CA for the proper intermediate certificate bundle\n# Configure your web server to use the complete chain\n```",
        priority: "Critical",
        location: "/api/auth",
        is_technical_complience: true
      },
      {
        title: "Weak Cipher Suites Detected",
        bad_thing: "Deprecated cipher suites are vulnerable to cryptographic attacks",
        business_impact: "Encryption can be bypassed, leading to data decryption",
        timeline: "1 week",
        how_to_fix_simple: "Ask your hosting provider to disable weak encryption methods and only allow strong ones.",
        how_to_fix_technical: "```nginx\n# Nginx configuration\nssl_protocols TLSv1.2 TLSv1.3;\nssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256;\nssl_prefer_server_ciphers off;\n```",
        priority: "Critical",
        location: "HTTPS Config",
        is_technical_complience: true
      },
      {
        title: "Missing HSTS Headers",
        bad_thing: "Allows protocol downgrade attacks",
        business_impact: "Users could be redirected to unsecured HTTP version",
        timeline: "1 week",
        how_to_fix_simple: "Add HSTS header to your website configuration to force HTTPS connections.",
        how_to_fix_technical: "```nginx\n# Add to server block\nadd_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;\n```",
        priority: "High",
        location: "Server Config",
        is_technical_complience: true
      },
      {
        title: "Outdated Dependencies with Security Vulnerabilities",
        bad_thing: "Multiple npm packages contain known security vulnerabilities",
        business_impact: "Remote code execution and data breach risks",
        timeline: "1 week",
        how_to_fix_simple: "Update all packages to their latest secure versions using package manager commands.",
        how_to_fix_technical: "```bash\n# Check for vulnerabilities\nnpm audit\n\n# Fix automatically\nnpm audit fix\n\n# Update all packages\nnpm update\n\n# Or use yarn\nyarn audit\nyarn audit fix\n```",
        priority: "High",
        location: "package.json",
        is_technical_complience: true
      },
      {
        title: "Missing Security Headers (CSP, X-Frame-Options)",
        bad_thing: "Vulnerable to XSS and clickjacking attacks",
        business_impact: "Malicious scripts could be injected, users could be tricked into actions",
        timeline: "2 weeks",
        how_to_fix_simple: "Add security headers to your website configuration to prevent common web attacks.",
        how_to_fix_technical: "```nginx\n# Add security headers\nadd_header Content-Security-Policy \"default-src 'self'\" always;\nadd_header X-Frame-Options \"SAMEORIGIN\" always;\nadd_header X-Content-Type-Options \"nosniff\" always;\nadd_header Referrer-Policy \"strict-origin-when-cross-origin\" always;\n```",
        priority: "High",
        location: "HTTP Response",
        is_technical_complience: true
      },
      {
        title: "Information Disclosure - Server Version Exposed",
        bad_thing: "Server version information helps attackers plan targeted attacks",
        business_impact: "Makes it easier for hackers to find specific vulnerabilities",
        timeline: "1 day",
        how_to_fix_simple: "Configure your web server to hide version information in response headers.",
        how_to_fix_technical: "```nginx\n# Hide server version\nserver_tokens off;\n\n# Or in Apache\nServerTokens Prod\n```",
        priority: "Medium",
        location: "HTTP Headers",
        is_technical_complience: true
      },
      {
        title: "Cookie Security Configuration Issues",
        bad_thing: "Authentication cookies missing security flags",
        business_impact: "Session hijacking and unauthorized access risks",
        timeline: "3 days",
        how_to_fix_simple: "Set security flags on all cookies to prevent theft and unauthorized access.",
        how_to_fix_technical: "```javascript\n// Set secure cookie flags\nres.cookie('sessionId', value, {\n  secure: true,\n  httpOnly: true,\n  sameSite: 'strict',\n  maxAge: 3600000\n});\n```",
        priority: "Medium",
        location: "Authentication System",
        is_technical_complience: true
      },
      {
        title: "Clickjacking Protection Missing",
        bad_thing: "X-Frame-Options header not configured",
        business_impact: "Users could be tricked into clicking hidden elements",
        timeline: "1 day",
        how_to_fix_simple: "Add X-Frame-Options header to prevent your site from being embedded in frames.",
        how_to_fix_technical: "```nginx\n# Prevent clickjacking\nadd_header X-Frame-Options \"SAMEORIGIN\" always;\n\n# Or for stricter protection\nadd_header X-Frame-Options \"DENY\" always;\n```",
        priority: "Low",
        location: "Web Pages",
        is_technical_complience: true
      },
      {
        title: "Content Type Sniffing Prevention Missing",
        bad_thing: "X-Content-Type-Options header not set",
        business_impact: "MIME type sniffing attacks could occur",
        timeline: "1 day",
        how_to_fix_simple: "Add X-Content-Type-Options header to prevent browsers from guessing content types.",
        how_to_fix_technical: "```nginx\n# Prevent MIME sniffing\nadd_header X-Content-Type-Options \"nosniff\" always;\n```",
        priority: "Low",
        location: "Static Assets",
        is_technical_complience: true
      }
    ]
  };
};

// API function to fetch scan results
export const fetchScanResults = async (): Promise<ScanResultsResponse> => {
  await delay(1000); // Simulate network delay
  
  // Simulate random success/failure
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch scan results. Please try again.');
  }

  return getMockScanResults();
};
