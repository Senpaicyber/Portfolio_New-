/* ================================================================
   CONFIG.JS  —  EDIT THIS FILE TO PERSONALISE YOUR PORTFOLIO
   ================================================================ */

const CONFIG = {

  /* ── IDENTITY ────────────────────────────────────────────────── */
  name:       "David Budha Magar",
  tagline:    "Cybersecurity Professional · Penetration Tester · Digital Risk Analyst",
  location:   "Kalanki, Kathmandu, Nepal",
  phone:      "+977 9847825017",
  available:  true,

  /* ── PHOTO & CV ──────────────────────────────────────────────── */
  photoSrc:  "assets/david.png",
  photoAlt:  "David Budha Magar — Cybersecurity Professional",
  cvFile:    "assets/David_Budha_Magar_CV.pdf",

  /* ── SPLASH ──────────────────────────────────────────────────── */
  welcomeWord: "Welcome.",
  heroSub:     "Security Portfolio · 2026",

  /* ── SOCIAL ──────────────────────────────────────────────────── */
  email:       "davidbudha17@gmail.com",
  emailHref:   "mailto:davidbudha17@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/david-budha-magar-2a601b26a",
  githubUrl:   "https://github.com/Senpaicyber",
  websiteUrl:  "https://www.davidbudhamagar.com.np",
  twitterUrl:  "#",

  /* ── ABOUT ───────────────────────────────────────────────────── */
  aboutBio1: `I'm a <strong>eJPT-certified cybersecurity professional</strong> with hands-on experience in
    <strong>penetration testing, digital risk monitoring, web application security,
    and threat detection</strong>. Experienced in identifying malicious activity
    across social media platforms and collaborating with enforcement teams to
    mitigate digital threats.`,

  aboutBio2: `My philosophy: <strong>Master the attacker’s mindset</strong>.  
              Security is not optional it is <strong>essential</strong>.  
              Grounded in <strong>Zero Trust principles</strong>, where every access is continuously verified.`,

  aboutStats: [
    { num: "2+", label: "Years exp."     },
    { num: "5",  label: "Certifications" },
  ],

  skills: [
    "Penetration Testing", "Web App Security",   "Digital Risk Monitoring",
    "Vuln Assessment",     "Social Eng. Defense", "Threat Analysis",
    "Python",              "Linux",               "Burp Suite",
    "Metasploit",          "SIEM Fundamentals",   "AWS Cloud",
  ],

  /* ── CERTIFICATIONS ──────────────────────────────────────────── */
  certs: [
    { code:"eJPT",    name:"Junior Penetration Tester",                     issuer:"INE / eLearnSecurity",  year:"2026", credUrl:"https://www.credential.net/fd31705e-c07e-4242-a046-51fd073da5fc" },
    { code:"CSEDP",   name:"Certified Social Engineering Defense Practitioner", issuer:"2026",               year:"2026", credUrl:"#" },
    { code:"CCEP",    name:"Certified Cybersecurity Educator Professional",  issuer:"Red Team Leaders",      year:"2026", credUrl:"#" },
    { code:"AWS-DCT", name:"AWS Academy Data Center Technician",             issuer:"Amazon Web Services",   year:"2024", credUrl:"#" },
    { code:"AWS-CF",  name:"AWS Academy Cloud Foundations",                  issuer:"Amazon Web Services",   year:"2024", credUrl:"#" },
    { code:"AWS-CSF", name:"AWS Academy Cloud Security Foundations",         issuer:"Amazon Web Services",   year:"2024", credUrl:"#" },
  ],

  /* ── INTERESTS ───────────────────────────────────────────────── */
  interests: [
    "CTF competitions &amp; write-ups",
    "Reverse engineering &amp; malware analysis",
    "Open-source security tooling",
    "2nd Degree Black Belt · Karate Champion",
  ],

  /* ── PROJECTS ────────────────────────────────────────────────── */
  projects: [
    {
      num:"01", featured:true, badge:"Featured",
      name:"Signature-Based IDS",
      desc:"Real-time web-based IDS using Python, Flask, and Scapy. Integrated AbuseIPDB, AlienVault OTX, and MalwareBazaar APIs with automated IP blocking and email alerts.",
      tags:["Python","Flask","Scapy","Threat Intel","IDS"], link:"https://github.com/Senpaicyber/IDS-IPS",
    },
    {
      num:"02", name:"SQL Injection Lab",
      desc:"Full SQL injection attack simulation to identify vulnerabilities, with comprehensive security measures and input sanitisation implemented to prevent future exploitation.",
      tags:["SQLi","Web Security","OWASP"], link:"#",
    },
    {
      num:"03", name:"Cryptographic Algorithm",
      desc:"Robust cryptographic algorithm combining multiple ciphers to enhance ciphertext security — academic research into layered encryption strategies.",
      tags:["Cryptography","Python","Research"], link:"#",
    },
    {
      num:"04", name:"LPG Gas Detection System",
      desc:"Real-time LPG gas detection and monitoring system using NodeMCU as the microcontroller with live alerting and sensor integration.",
      tags:["NodeMCU","IoT","Embedded"], link:"#",
    },
    {
      num:"05", name:"Risk Management Research",
      desc:"In-depth research on risk management and control frameworks using the NVIDIA data breach as a real-world case study, analysing gaps, impacts, and mitigations.",
      tags:["Research","Risk Mgmt","Case Study"], link:"#",
    },
  ],

  /* ── EXPERIENCE ──────────────────────────────────────────────── */
  experience: [
    {
      company:"Vairav Technology", dates:"March 2025 — Present",
      role:"Digital Risk Monitoring & Enforcement",
      bullets:[
        "Monitor digital platforms to detect impersonation, coordinated inauthentic behaviour, and online abuse.",
        "Investigate malicious accounts, fraudulent activity, and emerging digital threat patterns.",
        "Conduct behavioural analysis to identify risk trends across social media environments.",
        "Collaborate with enforcement and takedown teams to mitigate harmful content and platform misuse.",
        "Document incidents and contribute to structured digital risk response processes.",
      ],
    },
    {
      company:"Mero Solutions", dates:"Dec 2024 — Feb 2025",
      role:"Security Specialist Intern",
      bullets:[
        "Conducted web application security testing to identify vulnerabilities.",
        "Assisted in developing internal security frameworks and mitigation strategies.",
        "Evaluated system risks and documented remediation recommendations.",
        "Gained exposure to real-world IT infrastructure security controls.",
      ],
    },
    {
      company:"Vairav Technology", dates:"June 2024 — Dec 2025",
      role:"SMET Intern",
      bullets:[
        "Created and managed intelligence-based monitoring profiles across digital platforms.",
        "Collected and analysed threat intelligence data to identify abuse trends.",
        "Reported malicious activity and assisted in content takedown operations.",
        "Supported investigations related to digital impersonation and fraudulent accounts.",
      ],
    },
  ],

  /* ── EDUCATION ───────────────────────────────────────────────── */
  education: [
    { degree:"BSc (Hons) Computer Networking and IT Security", school:"Islington College / London Metropolitan University", years:"2022 — 2025" },
    { degree:"HSEB +2 in Management", school:"Mount View English Boarding School, Dang", years:"2015 — 2017" },
    { degree:"SLC", school:"Annapurna Boarding School, Ghorahi, Dang, Nepal", years:"2015" },
  ],

  /* ── FOOTER ──────────────────────────────────────────────────── */
  footerYear: "2026",
};
