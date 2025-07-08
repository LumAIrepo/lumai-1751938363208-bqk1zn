```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string, chars = 4): string {
  if (!address) return ""
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function formatSol(lamports: number): string {
  return (lamports / LAMPORTS_PER_SOL).toFixed(4)
}

export async function getBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey)
    return balance
  } catch (error) {
    console.error("Error fetching balance:", error)
    return 0
  }
}

export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"
  }
  return num.toString()
}

export function getExplorerUrl(address: string, cluster: string = "mainnet-beta"): string {
  const baseUrl = "https://explorer.solana.com"
  const clusterParam = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`
  return `${baseUrl}/address/${address}${clusterParam}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
```