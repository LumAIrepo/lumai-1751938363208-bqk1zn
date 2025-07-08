```typescript
'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'

export function useWalletBalance() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = async () => {
    if (!publicKey || !connected) {
      setBalance(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const lamports = await connection.getBalance(publicKey)
      const solBalance = lamports / LAMPORTS_PER_SOL
      setBalance(solBalance)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balance')
      setBalance(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [publicKey, connected, connection])

  const refetch = () => {
    fetchBalance()
  }

  return {
    balance,
    loading,
    error,
    refetch,
    connected,
    publicKey: publicKey?.toString() || null
  }
}
```