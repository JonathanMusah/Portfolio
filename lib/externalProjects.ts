export interface ExternalProject {
  id: string
  name: string
  category: string
  status: 'in-progress' | 'ready' | 'planned'
  summary: string
  architecture: string[]

  liveUrl?: string
  githubUrl?: string
  notes?: string
}

export const externalProjects: ExternalProject[] = [
  {
    id: 'crypto-buy-sell-platform',
    name: 'GhanaCryptoX — Crypto Buy & Sell Platform',
    category: 'Fintech Web Platform',
    status: 'ready',
    summary:
      'A full-stack cryptocurrency exchange platform focused on Ghana (GHS), featuring guided multi-step buy/sell flows, proof-of-payment uploads, dynamic rate calculations, JWT authentication, and a full admin control center for managing users, orders, rates, and payment methods.',
    architecture: ['React + Vite (Frontend)', 'Node.js + Express (Backend API)', 'MySQL on Railway (Database)', 'Vercel + Railway (Deployment)'],
    liveUrl: 'https://app-mu-blush-91.vercel.app',
    githubUrl: 'https://github.com/JonathanMusah/Buy-and-Sell',
  },
  {
    id: 'jiji-clone-marketplace',
    name: 'JijiClone — Marketplace Platform',
    category: 'E-commerce Web Platform',
    status: 'in-progress',
    summary:
      'A marketplace thesis-grade build focused on listings, messaging, reviews, favorites, and role-aware workflows. This project is presented as an active build while core modules are complete and production hardening is ongoing.',
    architecture: ['Next.js 16 + React 19 (Frontend)', 'NextAuth + Prisma (Auth/Data Access)', 'MySQL + Prisma Schema (Database)', 'Jest + RTL (Quality Gates)'],

    notes:
      'Positioned intentionally as Under Active Development: core architecture and modules are implemented; final build and test stabilization is in progress before production deployment.',
  },
  {
    id: 'ai-video-frame-extractor',
    name: 'AI Video Frame Extractor',
    category: 'Desktop AI Utility',
    status: 'ready',
    summary:
      'A professional standalone Windows application that parses and auto-formats messy AI-generated video annotation segments. Features smart merge modes (Auto, Suggest, Manual) and a built-in FFmpeg manager for precise frame extraction.',
    architecture: ['Python', 'Tkinter (GUI)', 'PyInstaller', 'FFmpeg'],

    githubUrl: 'https://github.com/JonathanMusah/ai-video-frame-extractor',
    notes: 'Built with a beautiful dark mode UI, handles complex text parsing and spawns FFmpeg processes for frame extraction.',
  },
  {
    id: 'moire-pattern-detection',
    name: 'Moiré Pattern Detection & Neural Realism Transfer',
    category: 'Computer Vision Research',
    status: 'in-progress',
    summary:
      'A neural transfer learning pipeline that generates photorealistic synthetic ID card images to train robust moiré pattern anti-spoofing detectors. Achieved 90.7% realism improvement using a U-Net architecture that outperforms hand-tuned 11-stage image processing pipelines across all 7 evaluation metrics.',
    architecture: ['Python', 'PyTorch (U-Net)', 'OpenCV', 'Streamlit', 'scikit-image'],
    githubUrl: 'https://github.com/JonathanMusah/moire-pattern-detection',
    notes: 'Active research project — showcase repo with methodology and results only. Full code release planned upon publication.',
  },
  {
    id: 'tgtoxic-banking-trojan',
    name: 'TgToxic Banking Trojan — Anti-Evasion Research',
    category: 'Cybersecurity Research',
    status: 'in-progress',
    summary:
      'Comprehensive reverse-engineering analysis of the TgToxic Android banking trojan. Developed a multi-layered bypass framework (14/14 checks passed) for its anti-emulator defenses using Frida instrumentation, and documented its novel dead-drop C2 infrastructure spanning 25+ community forums.',
    architecture: ['Python', 'Frida (Dynamic Instrumentation)', 'Android Emulator', 'Chrome DevTools Protocol', 'ADB'],
    githubUrl: 'https://github.com/JonathanMusah/TgToxic',
    notes: 'Active security research — showcase repo with methodology and findings only. Code and samples withheld to prevent misuse.',
  },
]
