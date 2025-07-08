```tsx
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, Zap, Globe, Lock, TrendingUp } from "lucide-react"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  badge?: string
}

interface FeaturesSectionProps {
  className?: string
}

const features: Feature[] = [
  {
    icon: Wallet,
    title: "Multi-Wallet Support",
    description: "Connect with Phantom, Solflare, Backpack, and other popular Solana wallets seamlessly.",
    badge: "Popular"
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Built-in security measures and transaction verification to protect your assets.",
    badge: "Secure"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience near-instant transactions with Solana's high-performance blockchain.",
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description: "Access your wallet and manage assets from any device, anywhere in the world.",
  },
  {
    icon: Lock,
    title: "Private & Anonymous",
    description: "Your private keys never leave your device. Complete control over your digital assets.",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Track your portfolio performance with live market data and detailed analytics.",
  }
]

export default function FeaturesSection({ className = "" }: FeaturesSectionProps) {
  return (
    <section className={`py-24 bg-gradient-to-b from-gray-900 to-black ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ml-3">
              Solana Wallet
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the future of decentralized finance with our cutting-edge wallet solution
            built specifically for the Solana ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                  </div>
                  {feature.badge && (
                    <Badge 
                      variant="secondary" 
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-100 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <Zap className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300 font-medium">
              Powered by Solana's lightning-fast blockchain
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
```