'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Copy, Loader2, Search } from 'lucide-react'
import { toast } from "sonner"

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
  toast.success('Copied to clipboard!')
}

export default function CurrencyLookupPage() {
  // NEW: Get query param from URL (if present)
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('query') || ''

  // --- These two sync input and actual submitted query ---
  const [query, setQuery] = useState<string>(urlQuery)
  const [searchVal, setSearchVal] = useState<string>(urlQuery)

  // Sync input/submit if URL query param changes (for browser nav/etc)
  useEffect(() => {
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery)
      setSearchVal(urlQuery)
    }
    // Only runs if urlQuery changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery])

  // --- Query logic ---
  const currencyQuery = useQuery({
    queryKey: ['getcurrency', query],
    queryFn: async () => {
      const res = await fetch('/api/getcurrency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      if (data?.error || !data?.result) throw new Error(data?.error || 'Currency not found')
      return data.result
    },
    enabled: !!query,
    refetchOnWindowFocus: false,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(searchVal.trim())
    // Optionally, update URL query param for shareability (optional)
    if (window && window.history && searchVal.trim() && window.location.search !== `?query=${encodeURIComponent(searchVal.trim())}`) {
      window.history.replaceState({}, '', `?query=${encodeURIComponent(searchVal.trim())}`)
    }
  }

  return (
    <section className="max-w-xl mx-auto flex flex-col gap-6 pt-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          required
          placeholder="Enter currency name, symbol, or ID"
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={currencyQuery.isLoading || !searchVal.trim()}
          size="icon"
          aria-label="Search"
        >
          {currencyQuery.isLoading ? <Loader2 className="animate-spin" /> : <Search />}
        </Button>
      </form>

      {currencyQuery.isLoading && (
        <div className="flex justify-center pt-6 text-muted-foreground">
          <Loader2 className="animate-spin h-7 w-7" />
        </div>
      )}

      {currencyQuery.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded text-sm">
          {(currencyQuery.error as Error).message}
        </div>
      )}

      {currencyQuery.data && (
        <CurrencyAccordion data={currencyQuery.data} />
      )}
    </section>
  )
}

function CurrencyAccordion({ data }: { data: any }) {
  // Detect categories (you can tweak as more kinds come up!)
  // --- Core Info
  return (
    <Accordion type="multiple" className="border rounded-lg bg-muted/10">
      {/* General Info */}
      <AccordionItem value="general">
        <AccordionTrigger>General Info</AccordionTrigger>
        <AccordionContent>
          <DetailRow label="Name">{data.name}</DetailRow>
          <DetailRow label="Fully Qualified Name">{data.fullyqualifiedname}</DetailRow>
          <DetailRow label="Currency ID" copy>{data.currencyid}</DetailRow>
          <DetailRow label="Parent">{data.parent}</DetailRow>
          <DetailRow label="System ID">{data.systemid}</DetailRow>
          <DetailRow label="Launch System ID">{data.launchsystemid}</DetailRow>
          <DetailRow label="Options">{data.options}</DetailRow>
          <DetailRow label="Proof Protocol">{data.proofprotocol}</DetailRow>
          <DetailRow label="Notarization Protocol">{data.notarizationprotocol}</DetailRow>
        </AccordionContent>
      </AccordionItem>
      {/* Supply & State */}
      <AccordionItem value="supply">
        <AccordionTrigger>Supply & State</AccordionTrigger>
        <AccordionContent>
          <DetailRow label="Initial Supply">{renderNum(data.initialsupply)}</DetailRow>
          <DetailRow label="Supply">{renderNum(data.bestcurrencystate?.supply ?? data.supply)}</DetailRow>
        </AccordionContent>
      </AccordionItem>
      {/* Preallocations */}
{Array.isArray(data.preallocations) && data.preallocations.length > 0 && (
  <AccordionItem value="preallocations">
    <AccordionTrigger>Preallocations</AccordionTrigger>
    <AccordionContent>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="text-left p-1">Address (i-address)</th>
              <th className="text-left p-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* preallocations is an array of objects like [{address: amount}, ...] */}
            {data.preallocations.map((e: Record<string, number>, idx: number) =>
              Object.entries(e).map(([addr, amt]) => (
                <tr key={addr + '-' + idx}>
                  <td className="p-1">{addr} <CopyBtn value={addr} /></td>
                  <td className="p-1">{renderNum(amt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AccordionContent>
  </AccordionItem>
)}
      {/* Basket / Reserve structure */}
      {data.bestcurrencystate?.reservecurrencies && data.bestcurrencystate.reservecurrencies.length > 0 && (
        <AccordionItem value="basket">
          <AccordionTrigger>Basket / Reserve Info</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left p-1">Reserve Currency</th>
                    <th className="text-left p-1">Weight</th>
                    <th className="text-left p-1">Reserves</th>
                    <th className="text-left p-1">Price in Reserve</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bestcurrencystate.reservecurrencies.map((rc: any, i: number) => (
                    <tr key={rc.currencyid}>
                      <td className="p-1">{rc.currencyid} <CopyBtn value={rc.currencyid} /></td>
                      <td className="p-1">{renderNum(rc.weight)}</td>
                      <td className="p-1">{renderNum(rc.reserves)}</td>
                      <td className="p-1">{renderNum(rc.priceinreserve)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
      {/* Transactions */}
      <AccordionItem value="tx">
        <AccordionTrigger>Blockchain Info</AccordionTrigger>
        <AccordionContent>
          <DetailRow label="Start Block">{data.startblock}</DetailRow>
          <DetailRow label="Definition TX">
            <a
              href={`https://insight.verus.io/tx/${data.definitiontxid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.definitiontxid}
            </a>
            {`  (vout ${data.definitiontxout})`}
          </DetailRow>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function renderNum(val: any): string {
  if (val === undefined || val === null) return '-'
  return Number(val).toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })
}

function DetailRow({ label, children, copy }: { label: string, children?: React.ReactNode, copy?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="w-48 font-medium text-gray-500">{label}:</span>
      <span className="flex items-center gap-1 break-all">
        {children}
        {copy && typeof children === 'string' ?
          <CopyBtn value={children} />
          : null}
      </span>
    </div>
  )
}

function CopyBtn({ value }: { value: string }) {
  return (
    <button
      type="button"
      onClick={() => copyToClipboard(value)}
      className="p-1 ml-1 hover:bg-gray-200 rounded"
      title="Copy to clipboard"
    >
      <Copy className="h-3 w-3 text-gray-400" />
    </button>
  )
}
