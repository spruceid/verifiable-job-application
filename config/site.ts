// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  previewImg: string
  localeDefault: string
  links: {
    docs: string
    discord: string
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://turboeth.xyz'

export const siteConfig: SiteConfig = {
  name: 'Verifiable Job Application',
  title: 'Verifiable Job Application: Own your data, get hired faster',
  emoji: '⚡',
  description: 'Store your job application data and credentials using SpruceKit and TurboETH.',
  previewImg: `${SITE_CANONICAL}/preview.png`,
  localeDefault: 'en',
  links: {
    docs: 'https://docs.turboeth.xyz/overview',
    discord: 'https://discord.gg/U4jy7Xfh76',
    twitter: 'https://twitter.com/district_labs',
    github: 'https://github.com/turbo-eth',
  },
}

export const DEPLOY_URL =
  'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app&project-name=TurboETH&repository-name=turbo-eth&demo-title=TurboETH&env=NEXTAUTH_SECRET,DATABASE_URL&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app%2Fblob%2Fmain%2F.env.example'
