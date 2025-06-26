'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { NameTooltip } from "@/components/ui/name-tooltip"
import { Copy, Loader2, Search } from 'lucide-react'
import { toast } from "sonner"

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
  toast.success('Copied to clipboard!')
}

export default function IdentityLookupPage() {
  const [query, setQuery] = useState<string>('')
  const [searchVal, setSearchVal] = useState<string>('')

  const identityQuery = useQuery({
    queryKey: ['getidentity', query],
    queryFn: async () => {
      const res = await fetch('/api/getidentity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      if (data?.error || !data?.result) throw new Error(data?.error || 'Identity not found')
      return data.result
    },
    enabled: !!query,
    refetchOnWindowFocus: false,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(searchVal.trim())
  }

  return (
    <section className="max-w-xl mx-auto flex flex-col gap-6 pt-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          required
          placeholder="Enter identity name@ or i-address"
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={identityQuery.isLoading || !searchVal.trim()} size="icon" aria-label="Search">
          {identityQuery.isLoading ? <Loader2 className="animate-spin" /> : <Search />}
        </Button>
      </form>

      {identityQuery.isLoading && (
        <div className="flex justify-center pt-6 text-muted-foreground">
          <Loader2 className="animate-spin h-7 w-7" />
        </div>
      )}

      {identityQuery.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded text-sm">
          {(identityQuery.error as Error).message}
        </div>
      )}

      {identityQuery.data && (
        <IdentityAccordion data={identityQuery.data} />
      )}
    </section>
  )
}

type IdentityResult = {
  friendlyname: string
  fullyqualifiedname: string
  identity: {
    version: number
    flags: number
    primaryaddresses: string[]
    minimumsignatures: number
    name: string
    identityaddress: string
    parent: string
    systemid: string
    contentmap: Record<string, unknown>
    contentmultimap: Record<string, unknown>
    revocationauthority: string
    recoveryauthority: string
    privateaddress?: string
    timelock?: number
  }
  status: string
  canspendfor: boolean
  cansignfor: boolean
  blockheight: number
  txid: string
  vout: number
}

function IdentityAccordion({ data }: { data: IdentityResult }) {
  const identity = data.identity

  return (
    <Accordion type="multiple" className="border rounded-lg bg-muted/10">
      {/* Name ID */}
      <AccordionItem value="nameid">
        <AccordionTrigger>Name ID</AccordionTrigger>
        <AccordionContent>
          <DetailRow label="Name">{identity.name}</DetailRow>
          <DetailRow label="Friendly Name">{data.friendlyname}</DetailRow>
          <DetailRow label="Fully Qualified Name">{data.fullyqualifiedname}</DetailRow>
          <DetailRow label="Identity Address" copy>{identity.identityaddress}</DetailRow>
          <DetailRow label="Parent">{identity.parent}</DetailRow>
          <DetailRow label="System ID">{identity.systemid}</DetailRow>
        </AccordionContent>
      </AccordionItem>
      {/* Authorities */}
      <AccordionItem value="authorities">
        <AccordionTrigger>Authorities</AccordionTrigger>
        <AccordionContent>
        <DetailRow label="Primary Addresses">
  <span className="flex flex-wrap gap-2">
    {identity.primaryaddresses.map(addr => (
      <span key={addr} className="flex items-center gap-1">
        <a
          href={`https://insight.verus.io/address/${addr}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
          title="View on Verus Explorer"
        >
          {addr}
        </a>
      </span>
    ))}
  </span>
</DetailRow>
          <DetailRow label="Minimum Signatures">{identity.minimumsignatures}</DetailRow>
          <DetailRow label="Revocation Authority" copy>
  <NameTooltip iAddress={identity.revocationauthority} type="identity">
    <span className="underline decoration-dotted cursor-help">
      {identity.revocationauthority}
    </span>
  </NameTooltip>
</DetailRow>
<DetailRow label="Recovery Authority" copy>
  <NameTooltip iAddress={identity.recoveryauthority} type="identity">
    <span className="underline decoration-dotted cursor-help">
      {identity.recoveryauthority}
    </span>
  </NameTooltip>
</DetailRow>
          <DetailRow label="Private Address" copy>
            {identity.privateaddress ?? <em className="text-gray-400">none</em>}
          </DetailRow>
          <DetailRow label="Timelock">{identity.timelock ?? 0}</DetailRow>
        </AccordionContent>
      </AccordionItem>
      {/* Technical Details */}
      <AccordionItem value="technical">
        <AccordionTrigger>Technical Details</AccordionTrigger>
        <AccordionContent>
          <DetailRow label="Status">{data.status}</DetailRow>
          <DetailRow label="Flags">{identity.flags}</DetailRow>
          <DetailRow label="Version">{identity.version}</DetailRow>
          <DetailRow label="Block Height">
            <BlockExplorerLink blockHeight={data.blockheight} />
          </DetailRow>
          <DetailRow label="TXID">
            <a
              href={`https://insight.verus.io/tx/${data.txid}`}
              target="_blank"
              rel="noopener"
              className="text-blue-600 hover:underline"
            >
              {data.txid}
            </a>
          </DetailRow>
          <DetailRow label="VOUT">{data.vout}</DetailRow>
        </AccordionContent>
      </AccordionItem>
      {/* Content */}
      {(identity.contentmap && Object.keys(identity.contentmap).length > 0) && (
        <AccordionItem value="contentmap">
          <AccordionTrigger>Content Map</AccordionTrigger>
          <AccordionContent>
            <pre className="overflow-x-auto whitespace-pre-wrap text-xs bg-gray-100 dark:bg-gray-900 rounded p-2">{JSON.stringify(identity.contentmap, null, 2)}</pre>
          </AccordionContent>
        </AccordionItem>
      )}
      {(identity.contentmultimap && Object.keys(identity.contentmultimap).length > 0) && (
        <AccordionItem value="contentmultimap">
          <AccordionTrigger>Content MultiMap</AccordionTrigger>
          <AccordionContent>
            <pre className="overflow-x-auto whitespace-pre-wrap text-xs bg-gray-100 dark:bg-gray-900 rounded p-2">{JSON.stringify(identity.contentmultimap, null, 2)}</pre>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}

// --- BlockExplorerLink: Fetches the hash and links properly to insight explorer. ---
function BlockExplorerLink({ blockHeight }: { blockHeight: number }) {
  const [blockhash, setBlockhash] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchBlockhash() {
      setBlockhash(null)
      try {
        const res = await fetch('/api/getblockhash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ height: blockHeight }),
        })
        const data = await res.json()
        if (!cancelled && data.result) setBlockhash(data.result)
      } catch {
        if (!cancelled) setBlockhash(null)
      }
    }
    if (typeof blockHeight === 'number') fetchBlockhash()
    return () => { cancelled = true }
  }, [blockHeight])

  if (!blockhash) return <span>{blockHeight}</span>
  return (
    <a
      href={`https://insight.verus.io/block/${blockhash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {blockHeight}
    </a>
  )
}

// Helper for detail display
function DetailRow({
  label,
  children,
  copy
}: {
  label: string,
  children?: React.ReactNode,
  copy?: boolean
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="w-48 font-medium text-gray-500">{label}:</span>
      <span className="flex items-center gap-1 break-all">
        {children}
        {copy && typeof children === 'string' ?
          <button
            type="button"
            onClick={() => copyToClipboard(children)}
            className="p-1 ml-1 hover:bg-gray-200 rounded"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4 text-gray-400" />
          </button> : null}
      </span>
    </div>
  )
}
