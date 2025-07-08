```tsx
'use client'

import { useState, useEffect } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Copy, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WalletConnectionProps {
  network?: WalletAdapterNetwork
  className?: string
}

interface WalletInfoProps {
  publicKey: PublicKey
  balance: number | null
  onDisconnect: () => void
}

function WalletInfo({ publicKey, balance, onDisconnect }: WalletInfoProps) {
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    await navigator.clipboard.writeText(publicKey.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: number | null) => {
    if (balance === null) return 'Loading...'
    return `${balance.toFixed(4)} SOL`
  }

  return (
    <Card className="w-full max-w-md bg-gray-900 border-gray-800">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <CardTitle className="text-white">Wallet Connected</CardTitle>
        <CardDescription className="text-gray-400">
          Your Solana wallet is successfully connected
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Address:</span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                {formatAddress(publicKey.toString())}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyAddress}
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                {copied ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Balance:</span>
            <Badge variant="outline" className="border-gray-700 text-white">
              {formatBalance(balance)}
            </Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://explorer.solana.com/address/${publicKey.toString()}`, '_blank')}
            className="flex-1 border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Explorer
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDisconnect}
            className="flex-1"
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function WalletConnectionContent() {
  const { publicKey, disconnect, connected } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [connection] = useState(() => new Connection(clusterApiUrl(WalletAdapterNetwork.Devnet)))

  useEffect(() => {
    if (publicKey && connected) {
      const getBalance = async () => {
        try {
          const balance = await connection.getBalance(publicKey)
          setBalance(balance / LAMPORTS_PER_SOL)
        } catch (error) {
          console.error('Error fetching balance:', error)
          setBalance(0)
        }
      }
      getBalance()
    } else {
      setBalance(null)
    }
  }, [publicKey, connected, connection])

  if (connected && publicKey) {
    return (
      <WalletInfo
        publicKey={publicKey}
        balance={balance}
        onDisconnect={disconnect}
      />
    )
  }

  return (
    <Card className="w-full max-w-md bg-gray-900 border-gray-800">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Wallet className="h-8 w-8 text-purple-500" />
        </div>
        <CardTitle className="text-white">Connect Your Wallet</CardTitle>
        <CardDescription className="text-gray-400">
          Connect your Solana wallet to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-3">
          <WalletMultiButton className="!bg-purple-600 !hover:bg-purple-700 !text-white !font-medium !py-2 !px-4 !rounded-md !transition-colors !w-full !justify-center" />
          <div className="text-xs text-gray-500 text-center">
            Supported wallets: Phantom, Solflare, Torus, Ledger
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <AlertCircle className="h-4 w-4" />
            <span>Make sure you're on the Devnet network</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function WalletConnection({ network = WalletAdapterNetwork.Devnet, className }: WalletConnectionProps) {
  const endpoint = clusterApiUrl(network)
  
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
  ]

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <WalletConnectionContent />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}
```