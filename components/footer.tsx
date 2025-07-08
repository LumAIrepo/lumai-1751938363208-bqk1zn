```tsx
import Link from 'next/link'
import { Github, Twitter, Globe, Heart } from 'lucide-react'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'Website',
      href: 'https://solana.com',
      icon: Globe,
    },
  ]

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Security', href: '#security' },
        { name: 'Roadmap', href: '#roadmap' },
        { name: 'Pricing', href: '#pricing' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'API Reference', href: '#api' },
        { name: 'SDK', href: '#sdk' },
        { name: 'Examples', href: '#examples' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord', href: '#discord' },
        { name: 'Forum', href: '#forum' },
        { name: 'Blog', href: '#blog' },
        { name: 'Newsletter', href: '#newsletter' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Contact', href: '#contact' },
        { name: 'Press', href: '#press' },
      ],
    },
  ]

  return (
    <footer className={`bg-gray-950 border-t border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SW</span>
              </div>
              <span className="text-xl font-bold text-white">SolanaWallet</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              The most secure and user-friendly Solana wallet for managing your digital assets with confidence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for the Solana ecosystem</span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <Link href="#privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <span>© {currentYear} SolanaWallet. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```