'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { NameTooltip } from "@/components/ui/name-tooltip"
import { Loader2, Search } from 'lucide-react'
import { toast } from 'sonner'

type CurrencyBalanceMap = Record<string, number>;

interface AddressBalanceResult {
  balance?: number;                // VRSC in satoshis
  received?: number;               // VRSC in satoshis received
  currencybalance?: CurrencyBalanceMap; // {i-address: float, ...}
  currencyreceived?: CurrencyBalanceMap;
  // ...add any other fields if you discover more
}


export default function AddressViewerPage() {
  const [address, setAddress] = useState<string>('')
  const [queryAddress, setQueryAddress] = useState<string>('')

  // Query: fires when queryAddress is set (on submit)
  const { data, error, isLoading } = useQuery<{ result: AddressBalanceResult }>({
    queryKey: ['getaddressbalance', queryAddress],
    enabled: !!queryAddress,
    queryFn: async () => {
      const res = await fetch('/api/getaddressbalance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: queryAddress }),
      })
      const json = await res.json()
      if (json?.error || !json?.result) throw new Error(json?.error || 'No balances found')
      return json
    },
    refetchOnWindowFocus: false,
  })

  // Form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = address.trim()
    if (!trimmed) {
      toast.error('Please enter an address or ID@ name')
      return
    }
    setQueryAddress(trimmed)
  }

  // Helper: shows "No balances found" if empty
  const showNoBalances =
  !!queryAddress &&
  !isLoading &&
  (!data?.result ||
    (
      (!data.result.balance || data.result.balance === 0) &&
      (!data.result.currencybalance || Object.values(data.result.currencybalance).every((v) => !v || v === 0))
    ));

  return (
    <section className="max-w-xl mx-auto flex flex-col gap-7 pt-8">
      <h1 className="text-2xl font-bold text-[#3165D4] dark:text-white mb-2 text-center">
        Currency Balance by Address
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter R-address or ID@ name"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={isLoading || !address.trim()} size="icon" aria-label="Search">
          {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
        </Button>
      </form>

      {isLoading && (
        <div className="flex justify-center pt-8 text-muted-foreground">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded text-sm">
          {(error as Error).message}
        </div>
      )}

      {showNoBalances && (
        <div className="py-4 text-gray-500 text-center">No balances found for this address.</div>
      )}

{data?.result && !showNoBalances && (
  <BalancesTable result={data.result} />
)}


    </section>
  )
}

function BalancesTable({ result }: { result: AddressBalanceResult }) {
    if (!result?.currencybalance) return null;
  
    // Only show currencies found in "currencybalance"
    const rows = Object.entries(result.currencybalance)
      .map(([id, balance]) => ({
        id,
        balance: typeof balance === "number" ? balance : Number(balance),
      }))
      .filter(row => !isNaN(row.balance)); // filter out any NaN
  
    return (
      <div className="overflow-x-auto border rounded bg-white/95 dark:bg-[#181818]/70 shadow mt-2">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold">Currency</th>
              <th className="text-left p-2 font-bold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ id, balance }) => (
              <tr key={id} className="border-b last:border-b-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                <td className="p-2">
                  <a
                    href={`/currency?query=${encodeURIComponent(id)}`}
                    className="text-blue-700 dark:text-blue-300 underline font-medium hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <NameTooltip iAddress={id} type="currency">
                      <span className="underline decoration-dotted cursor-help">
                        {id}
                      </span>
                    </NameTooltip>
                  </a>
                </td>
                <td className="p-2 font-mono">{formatNum(balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }  

function formatNum(val: number): string {
  if (typeof val !== 'number') return '-'
  return val.toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })
}
