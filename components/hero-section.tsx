```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Shield, Zap, ArrowRight, Copy, Check } from 'lucide-react'

interface HeroSectionProps {
  onConnectWallet?: () => void
  isConnected?: boolean
  walletAddress?: string
  isConnecting?: boolean
}

export default function HeroSection({
  onConnectWallet,
  isConnected = false,
  walletAddress,
  isConnecting = false
}: HeroSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="border-purple-500/50 text-purple-300 bg-purple-500/10 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Solana
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Connect to the
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Solana Ecosystem
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience lightning-fast transactions and seamless DeFi interactions with your Solana wallet
            </p>
          </div>

          {/* Wallet Connection */}
          <div className="flex flex-col items-center space-y-6">
            {!isConnected ? (
              <Button
                onClick={onConnectWallet}
                disabled={isConnecting}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-3" />
                    Connect Wallet
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </>
                )}
              </Button>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
                      <div className="flex items-center space-x-2">
                        <code className="text-white font-mono">
                          {walletAddress ? truncateAddress(walletAddress) : 'Unknown'}
                        </code>
                        {walletAddress && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyAddress}
                            className="h-8 w-8 p-0 hover:bg-gray-700"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400">Sub-second transaction finality on Solana network</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
                <p className="text-gray-400">Bank-grade security with decentralized architecture</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Wallet className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
                <p className="text-gray-400">Connect any Solana wallet with one click</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
```