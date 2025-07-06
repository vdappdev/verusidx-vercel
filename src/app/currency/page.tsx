'use client'

import { useState, useEffect, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AddressLink } from "@/components/ui/address-link"
import { NameTooltip } from "@/components/ui/name-tooltip"
import { Copy, Loader2, Search } from 'lucide-react'
import { toast } from "sonner"
import { ExternalLink } from '@/components/ui/external-link'

// --- TYPES ---
interface Preallocation {
  [address: string]: number
}
interface ReserveCurrency {
  currencyid: string
  weight: number
  reserves: number
  priceinreserve: number
}

interface CurrencyResult {
  name: string
  fullyqualifiedname: string
  currencyid: string
  parent: string
  systemid: string
  launchsystemid: string
  options: number
  proofprotocol: number
  notarizationprotocol: number
  initialsupply: number
  supply?: number
  preallocations?: Preallocation[]
  bestcurrencystate?: {
    supply?: number
    reservecurrencies?: ReserveCurrency[]
    primarycurrencyfees?: number
    primarycurrencyconversionfees?: number
    primarycurrencyout?: number
    preconvertedout?: number}
  startblock?: number
  definitiontxid?: string
  definitiontxout?: number
  nativecurrencyid?: { address: string; type?: number } | string
  idregistrationfees?: number
  idreferrallevels?: number
  idimportfees?: number
  currencyregistrationfee?: number
  pbaassystemregistrationfee?: number
  currencyimportfee?: number
  transactionimportfee?: number
  transactionexportfee?: number
  currencynames?: Record<string, string>
  currencies?: string[]
conversions?: number[]
minpreconversion?: number[]
maxpreconversion?: number[]
prelaunchcarveout?: number
initialcontributions?: number[]
gateway?: string
gatewayconverterid?: string
gatewayconvertername?: string
gatewayconverterissuance?: number
  // Add any other relevant fields you want!
}

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
  toast.success('Copied to clipboard!')
}

export default function CurrencyLookupPageWrapper() {
    return (
      <Suspense fallback={<div className="py-32 flex justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>}>
        <CurrencyLookupPage />
      </Suspense>
    );
  }

function CurrencyLookupPage() {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('query') || ''

  const [query, setQuery] = useState<string>(urlQuery)
  const [searchVal, setSearchVal] = useState<string>(urlQuery)

  useEffect(() => {
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery)
      setSearchVal(urlQuery)
    }
    // Only runs if urlQuery changes
  }, [urlQuery])

  const currencyQuery = useQuery<CurrencyResult>({
    queryKey: ['getcurrency', query],
    queryFn: async () => {
      const res = await fetch('/api/getcurrency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      if (data?.error || !data?.result) throw new Error(data?.error || 'Currency not found')
      return data.result as CurrencyResult
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
  <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded text-sm flex items-start gap-2">
    <span aria-hidden className="pt-0.5">
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/><path d="M10 6v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    </span>
    <span>
      <strong>Currency not found.</strong><br />
      Please verify the name, symbol, or currency ID.<br />
      {currencyQuery.error.message.includes('Network') ?
        <>Network error—please try again shortly.</>
        : null
      }
      {!currencyQuery.error.message.includes('not found') && !currencyQuery.error.message.includes('Network') &&
        <details className="mt-1 text-xs"><summary className="cursor-pointer text-muted-foreground">Show error details</summary>{currencyQuery.error.message}</details>
      }
    </span>
  </div>
)}


      {currencyQuery.data && (
        <CurrencyAccordion data={currencyQuery.data} />
      )}
    </section>
  )
}

function CurrencyAccordion({ data }: { data: CurrencyResult }) {
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
        </AccordionContent>
      </AccordionItem>
      {/* Native Currency Info */}
{data.nativecurrencyid && (
  <AccordionItem value="nativecurrencyid">
  <AccordionTrigger>Native Currency</AccordionTrigger>
  <AccordionContent>
    <DetailRow label="Address">
      <span className="flex items-center gap-1 whitespace-nowrap overflow-x-auto">
        <AddressLink
          address={
            typeof data.nativecurrencyid === "object"
              ? data.nativecurrencyid.address
              : (data.nativecurrencyid as string)
          }
        />
        <CopyBtn
          value={
            typeof data.nativecurrencyid === "object"
              ? data.nativecurrencyid.address
              : (data.nativecurrencyid as string)
          }
        />
      </span>
    </DetailRow>
    {typeof data.nativecurrencyid === "object" && "type" in data.nativecurrencyid && (
      <DetailRow label="Type">{data.nativecurrencyid.type}</DetailRow>
    )}
  </AccordionContent>
</AccordionItem>
)}
      {/* Supply & State */}
      <AccordionItem value="supply">
        <AccordionTrigger>Supply & State</AccordionTrigger>
        <AccordionContent>
          <DetailRow label="Initial Supply">{renderNum(data.initialsupply)}</DetailRow>
          <DetailRow label="Supply">{renderNum(data.bestcurrencystate?.supply ?? data.supply)}</DetailRow>
        </AccordionContent>
      </AccordionItem>
      

{/* Currency Names Map */}
{data.currencynames && Object.keys(data.currencynames).length > 0 && (
  <AccordionItem value="currencynames">
    <AccordionTrigger>Currency Names</AccordionTrigger>
    <AccordionContent>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="text-left p-1">Currency ID</th>
              <th className="text-left p-1">Fully Qualified Name</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.currencynames).map(([id, name]) => (
              <tr key={id}>
                <td className="p-1">{id} <CopyBtn value={id} /></td>
                <td className="p-1">{name}</td>
              </tr>
            ))}
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
                  {data.bestcurrencystate.reservecurrencies.map((rc) => (
                    <tr key={rc.currencyid}>
                      <td className="p-1">
  <NameTooltip iAddress={rc.currencyid} type="currency">
    <span className="underline decoration-dotted cursor-help">
      {rc.currencyid}
    </span>
  </NameTooltip>
</td>
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
      
{/* ID/Fee Info */}
{(data.idregistrationfees !== undefined || data.idreferrallevels !== undefined || data.idimportfees !== undefined) && (
  <AccordionItem value="idfees">
    <AccordionTrigger>ID/Fee Info</AccordionTrigger>
    <AccordionContent>
      {data.idregistrationfees !== undefined && <DetailRow label="ID Registration Fees">{renderNum(data.idregistrationfees)}</DetailRow>}
      {data.idreferrallevels !== undefined && <DetailRow label="ID Referral Levels">{data.idreferrallevels}</DetailRow>}
      {data.idimportfees !== undefined && <DetailRow label="ID Import Fees">{renderNum(data.idimportfees)}</DetailRow>}
    </AccordionContent>
  </AccordionItem>
)}

{/* Multicurrency PBaaS */}
{(
  data.currencyregistrationfee !== undefined ||
  data.pbaassystemregistrationfee !== undefined ||
  data.currencyimportfee !== undefined ||
  data.transactionimportfee !== undefined ||
  data.transactionexportfee !== undefined
) && (
  <AccordionItem value="multicurrencypbaas">
    <AccordionTrigger>Multicurrency PBaaS</AccordionTrigger>
    <AccordionContent>
      {data.currencyregistrationfee !== undefined && <DetailRow label="Currency Registration Fee">{renderNum(data.currencyregistrationfee)}</DetailRow>}
      {data.pbaassystemregistrationfee !== undefined && <DetailRow label="PBaaS System Registration Fee">{renderNum(data.pbaassystemregistrationfee)}</DetailRow>}
      {data.currencyimportfee !== undefined && <DetailRow label="Currency Import Fee">{renderNum(data.currencyimportfee)}</DetailRow>}
      {data.transactionimportfee !== undefined && <DetailRow label="Transaction Import Fee">{renderNum(data.transactionimportfee)}</DetailRow>}
      {data.transactionexportfee !== undefined && <DetailRow label="Transaction Export Fee">{renderNum(data.transactionexportfee)}</DetailRow>}
    </AccordionContent>
  </AccordionItem>
)}
{(
  data.bestcurrencystate?.primarycurrencyfees !== undefined ||
  data.bestcurrencystate?.primarycurrencyconversionfees !== undefined ||
  data.bestcurrencystate?.primarycurrencyout !== undefined ||
  data.bestcurrencystate?.preconvertedout !== undefined
) && (
  <AccordionItem value="currencyfees">
    <AccordionTrigger>Currency Fees</AccordionTrigger>
    <AccordionContent>
      {data.bestcurrencystate?.primarycurrencyfees !== undefined && (
        <DetailRow label="Primary Currency Fees">{renderNum(data.bestcurrencystate.primarycurrencyfees)}</DetailRow>
      )}
      {data.bestcurrencystate?.primarycurrencyconversionfees !== undefined && (
        <DetailRow label="Primary Currency Conversion Fees">{renderNum(data.bestcurrencystate.primarycurrencyconversionfees)}</DetailRow>
      )}
      {data.bestcurrencystate?.primarycurrencyout !== undefined && (
        <DetailRow label="Primary Currency Out">{renderNum(data.bestcurrencystate.primarycurrencyout)}</DetailRow>
      )}
      {data.bestcurrencystate?.preconvertedout !== undefined && (
        <DetailRow label="Preconverted Out">{renderNum(data.bestcurrencystate.preconvertedout)}</DetailRow>
      )}
    </AccordionContent>
  </AccordionItem>
)}
      {/* Preconversion */}
      {(
  (Array.isArray(data.currencies) && data.currencies.length > 0) ||
  (Array.isArray(data.conversions) && data.conversions.length > 0) ||
  (Array.isArray(data.minpreconversion) && data.minpreconversion.length > 0) ||
  (Array.isArray(data.maxpreconversion) && data.maxpreconversion.length > 0) ||
  data.prelaunchcarveout !== undefined ||
  (Array.isArray(data.initialcontributions) && data.initialcontributions.length > 0) ||
  (Array.isArray(data.preallocations) && data.preallocations.length > 0)
) && (
  <AccordionItem value="preconversion">
    <AccordionTrigger>Preconversion</AccordionTrigger>
    <AccordionContent>
      {Array.isArray(data.currencies) && data.currencies.length > 0 && (
        <DetailRow label="Currencies">
        <span className="flex flex-wrap gap-2">
          {data.currencies.map((addr: string) => (
            <NameTooltip key={addr} iAddress={addr} type="currency">
              <span className="underline decoration-dotted cursor-help">
                {addr}
              </span>
            </NameTooltip>
          ))}
        </span>
      </DetailRow>      
      )}
      {Array.isArray(data.conversions) && data.conversions.length > 0 && (
        <DetailRow label="Conversions">
          {data.conversions.map((c: number) => renderNum(c)).join(', ')}
        </DetailRow>
      )}
      {Array.isArray(data.minpreconversion) && data.minpreconversion.length > 0 && (
        <DetailRow label="Min Preconversion">
          {data.minpreconversion.map((c: number) => renderNum(c)).join(', ')}
        </DetailRow>
      )}
      {Array.isArray(data.maxpreconversion) && data.maxpreconversion.length > 0 && (
        <DetailRow label="Max Preconversion">
          {data.maxpreconversion.map((c: number) => renderNum(c)).join(', ')}
        </DetailRow>
      )}
      {data.prelaunchcarveout !== undefined && (
        <DetailRow label="Prelaunch Carveout">{renderNum(data.prelaunchcarveout)}</DetailRow>
      )}
      {Array.isArray(data.initialcontributions) && data.initialcontributions.length > 0 && (
        <DetailRow label="Initial Contributions">
          {data.initialcontributions.map((c: number) => renderNum(c)).join(', ')}
        </DetailRow>
      )}
      {/* Preallocations moved here */}
      {Array.isArray(data.preallocations) && data.preallocations.length > 0 && (
  <div className="mt-2">
    <div className="font-semibold mb-1 text-xs text-muted-foreground">Preallocations</div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead>
          <tr>
            <th className="text-left p-1">Address (i-address)</th>
            <th className="text-left p-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.preallocations.map((e: Record<string, number>) =>
            Object.entries(e).map(([addr, amt]) => (
              <tr key={addr}>
                <td className="p-1">
                  <NameTooltip iAddress={addr} type="identity">
                    <span className="underline decoration-dotted cursor-help">
                      {addr}
                    </span>
                  </NameTooltip>
                  <CopyBtn value={addr} />
                </td>
                <td className="p-1">{renderNum(amt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
    </AccordionContent>
  </AccordionItem>
)}
{/* Gateway */}
{(
  data.gateway !== undefined ||
  data.gatewayconverterid !== undefined ||
  data.gatewayconvertername !== undefined ||
  data.gatewayconverterissuance !== undefined
) && (
  <AccordionItem value="gatewayinfo">
    <AccordionTrigger>Gateway Info</AccordionTrigger>
    <AccordionContent>
      {data.gateway !== undefined && <DetailRow label="Gateway">{data.gateway}</DetailRow>}
      {data.gatewayconverterid !== undefined && <DetailRow label="Gateway Converter ID">{data.gatewayconverterid}</DetailRow>}
      {data.gatewayconvertername !== undefined && <DetailRow label="Gateway Converter Name">{data.gatewayconvertername}</DetailRow>}
      {data.gatewayconverterissuance !== undefined && <DetailRow label="Gateway Converter Issuance">{renderNum(data.gatewayconverterissuance)}</DetailRow>}
    </AccordionContent>
  </AccordionItem>
)}

      {/* Transactions */}
      <AccordionItem value="tx">
        <AccordionTrigger>Blockchain Info</AccordionTrigger>
        <AccordionContent>
          <DetailRow label="Start Block">{data.startblock}</DetailRow>
          <DetailRow label="Definition TX">
            <ExternalLink
              href={`https://insight.verus.io/tx/${data.definitiontxid}`}
              showIcon={false}
            >
              {data.definitiontxid}
            </ExternalLink>
          </DetailRow>
          <DetailRow label="Definition Tx Out">{data.definitiontxout}</DetailRow>
          <DetailRow label="Notarization Protocol">{data.notarizationprotocol}</DetailRow>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function renderNum(val: number | undefined | null): string {
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
