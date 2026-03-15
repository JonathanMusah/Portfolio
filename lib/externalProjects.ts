export interface ExternalProject {
  id: string
  name: string
  category: string
  status: 'in-progress' | 'ready' | 'planned'
  summary: string
  architecture: string[]
  repoPath?: string
  liveUrl?: string
  githubUrl?: string
  notes?: string
}

export const externalProjects: ExternalProject[] = [
  {
    id: 'crypto-buy-sell-platform',
    name: 'Crypto Buy & Sell Platform',
    category: 'Fintech Web Platform',
    status: 'in-progress',
    summary:
      'A large buy/sell crypto platform that is being integrated into this portfolio as a flagship case study rather than embedding its full codebase.',
    architecture: ['Frontend App', 'Backend API', 'Database Layer', 'Fullstack Module'],
    repoPath: 'Crypto Buy and Sell website',
    notes:
      'Smart integration: keep this project separate, deploy independently, and present it here with architecture, screenshots, and outcomes.',
  },
]
