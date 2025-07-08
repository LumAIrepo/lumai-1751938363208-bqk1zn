```tsx
'use client'

import { useState, useEffect } from 'react'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Shield, Zap, Globe, Copy, ExternalLink } from 'lucide-react'

interface WalletAdapter {
  name: string
  icon: string
  url: string
}

const WALLET_ADAPTERS: WalletAdapter[] = [
  { name: 'Phantom', icon: '👻', url: 'https://phantom.app' },
  { name: 'Solflare', icon: '🔥', url: 'https://solflare.com' },
  { name: 'Backpack', icon: '🎒', url: 'https://backpack.app' },
]

export default function SolanaWalletLanding() {
  const [wallet, setWallet] = useState<any>(null)
  const [connecting, setConnecting] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [publicKey, setPublicKey] = useState<string>('')

  const connection = new Connection(clusterApiUrl('mainnet-beta'))

  useEffect(() => {
    if (typeof window !== 'undefined' && window.solana) {
      setWallet(window.solana)
    }
  }, [])

  const connectWallet = async () => {
    if (!wallet) {
      window.open('https://phantom.app', '_blank')
      return
    }

    try {
      setConnecting(true)
      const response = await wallet.connect()
      setPublicKey(response.publicKey.toString())
      
      // Get balance
      const balance = await connection.getBalance(response.publicKey)
      setBalance(balance / 1e9) // Convert lamports to SOL
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    if (wallet) {
      await wallet.disconnect()
      setPublicKey('')
      setBalance(null)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(publicKey)
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SolanaConnect</span>
          </div>
          
          {publicKey ? (
            <div className="flex items-center space-x-3">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-3 flex items-center space-x-2">
                  <div className="text-sm">
                    <div className="text-gray-300 flex items-center space-x-1">
                      <span>{truncateAddress(publicKey)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyAddress}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    {balance !== null && (
                      <div className="text-purple-400 font-medium">
                        {balance.toFixed(4)} SOL
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Button
                onClick={disconnectWallet}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              disabled={connecting}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
            Solana Ecosystem
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Connect to the
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}Future{' '}
            </span>
            of Finance
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience lightning-fast transactions and low fees on Solana. 
            Connect your wallet to access the next generation of decentralized applications.
          </p>

          {!publicKey ? (
            <div className="space-y-6">
              <Button
                onClick={connectWallet}
                disabled={connecting}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-lg px-8 py-4 h-auto"
              >
                {connecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </>
                )}
              </Button>
              
              {!wallet && (
                <div className="text-sm text-gray-400">
                  Don't have a wallet?{' '}
                  <a
                    href="https://phantom.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Get Phantom Wallet
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-400 font-medium">Wallet Connected</span>
              </div>
              <p className="text-gray-300 text-sm">
                You're ready to explore the Solana ecosystem!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Solana?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Built for scale, designed for speed, optimized for developers and users alike.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Lightning Fast</CardTitle>
              <CardDescription className="text-gray-300">
                Process up to 65,000 transactions per second with sub-second finality.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Ultra Low Fees</CardTitle>
              <CardDescription className="text-gray-300">
                Transaction costs average $0.00025, making DeFi accessible to everyone.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Global Ecosystem</CardTitle>
              <CardDescription className="text-gray-300">
                Join thousands of projects building the future of web3 on Solana.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Supported Wallets */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Supported Wallets
          </h2>
          <p className="text-gray-300">
            Connect with your favorite Solana wallet
          </p>
        </div>

        <div className="flex justify-center space-x-8 max-w-2xl mx-auto">
          {WALLET_ADAPTERS.map((adapter) => (
            <a
              key={adapter.name}
              href={adapter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{adapter.icon}</div>
                  <div className="text-white font-medium">{adapter.name}</div>
                  <ExternalLink className="w-4 h-4 text-gray-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-violet-500 rounded-md flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">SolanaConnect</span>
            </div>
            <div className="text-sm text-gray-400">
              Built on Solana • Powered by Web3
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
```