'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronUp, ChevronDown, Loader2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

// --- Define filter/sort helpers
const UNIQUE_TYPE_LABELS = [
  { label: 'Simple Token', isType: (opt: number) => opt === 32 || opt === 40 },
  { label: 'Basket Currency', isType: (opt: number) => opt === 33 || opt === 41 },
  { label: 'Gateway Converter', isType: (opt: number) => opt === 545 },
  { label: 'Outside System', isType: (opt: number) => opt === 128 },
  { label: 'PBaaS Chain', isType: (opt: number) => opt === 264 },
  { label: 'ID Control Token', isType: (opt: number) => opt === 2080 },
]
const PROVENANCE_MAP: Record<number, string> = {
  1: 'Decentralized',
  2: 'Centralized',
  3: 'Mapped ERC20'
}
const PAGE_SIZE = 20

export default function CurrenciesPage() {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{ by: SortCol; asc: boolean }>({ by: 'name', asc: true })
  const [filterType, setFilterType] = useState<string>('all')
  const [filterProof, setFilterProof] = useState<string>('all')

  // Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['listcurrencies'],
    queryFn: async () => {
      const res = await fetch('/api/listcurrencies', { method: 'POST' })
      const json = await res.json()
      if (!json?.result || json?.error) throw new Error(json?.error || 'Failed to load currencies')
      return json.result as CurrencyListItem[]
    }
  })

  // --- Filtering & sorting ---
  const prepared = useMemo(() => {
    if (!data) return []
    let filtered = data
    if (filterType !== 'all') {
      const t = UNIQUE_TYPE_LABELS.find(x => x.label === filterType)
      filtered = filtered.filter(c =>
        t && t.isType(c.currencydefinition.options)
      )
    }
    if (filterProof !== 'all') {
      filtered = filtered.filter(c => String(c.currencydefinition.proofprotocol) === filterProof)
    }
    const sorted = [...filtered]
    sorted.sort((a, b) => {
      const { by, asc } = sort
      let cmp = 0
      if (by === 'name') {
        cmp = a.currencydefinition.fullyqualifiedname.localeCompare(b.currencydefinition.fullyqualifiedname)
      } else if (by === 'supply') {
        cmp = ((a.bestcurrencystate?.supply ?? 0) - (b.bestcurrencystate?.supply ?? 0))
      } else if (by === 'startblock') {
        cmp = ((a.currencydefinition.startblock ?? 0) - (b.currencydefinition.startblock ?? 0))
      }
      return asc ? cmp : -cmp
    })
    return sorted
  }, [data, sort, filterType, filterProof])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(prepared.length / PAGE_SIZE))
  const paged = prepared.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const goToPage = (pg: number) => setPage(Math.max(1, Math.min(totalPages, pg)))

  // Table columns
  const TABLE_HEADERS: { key: SortCol | string, label: string, sortable?: boolean }[] = [
    { key: 'name', label: 'Fully Qualified Name', sortable: true },
    { key: 'currencyid', label: 'Currency ID' },
    { key: 'type', label: 'Type' },
    { key: 'proofprotocol', label: 'Provenance' },
    { key: 'supply', label: 'Supply', sortable: true },
    { key: 'startblock', label: 'Start Block', sortable: true },
    { key: 'actions', label: '' }
  ]

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Currency List</h1>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center mb-4">
        <div>
          <label className="mr-1 font-medium">Type:</label>
          <select
            value={filterType}
            onChange={e => { setPage(1); setFilterType(e.target.value) }}
            className="px-2 py-1 rounded border bg-white text-black dark:bg-[#232323] dark:text-white"
          >
            <option value="all">All</option>
            {UNIQUE_TYPE_LABELS.map(({label}) =>
              <option key={label} value={label}>{label}</option>
            )}
          </select>
        </div>
        <div>
          <label className="mr-1 font-medium">Provenance:</label>
          <select
            value={filterProof}
            onChange={e => { setPage(1); setFilterProof(e.target.value) }}
            className="px-2 py-1 rounded border bg-white text-black dark:bg-[#232323] dark:text-white"
          >
            <option value="all">All</option>
            {Object.entries(PROVENANCE_MAP).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Table */}
      {isLoading && (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin h-7 w-7" /></div>
      )}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">Error: {(error as Error).message}</div>
      )}
      {paged.length > 0 && (
        <div className="rounded-md overflow-x-auto border bg-white/95 dark:bg-[#181818]/60 mt-3 mb-2">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                {TABLE_HEADERS.map(col =>
                  <th
                    key={col.key}
                    className={`text-left p-2 select-none ${col.sortable ? 'cursor-pointer' : ''}`}
                    onClick={col.sortable
                      ? () => {
                          setSort(s =>
                            s.by === col.key
                              ? { by: col.key as SortCol, asc: !s.asc }
                              : { by: col.key as SortCol, asc: true })
                          setPage(1)
                        }
                      : undefined
                    }
                  >
                    <span className="inline-flex items-center gap-1 font-semibold">
                      {col.label}
                      {/* sort arrow */}
                      {col.sortable && sort.by === col.key && (
                        sort.asc
                          ? <ChevronUp className="inline w-6 h-6 text-blue-600" />
                          : <ChevronDown className="inline w-6 h-6 text-blue-600" />
                      )}
                      {col.sortable && sort.by !== col.key && (
                        <>
                          <ChevronUp className="inline w-5 h-5 text-gray-400 opacity-30" />
                          <ChevronDown className="inline w-5 h-5 text-gray-400 opacity-30 -ml-2" />
                        </>
                      )}
                    </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paged.map(currency => (
                <tr key={currency.currencydefinition.currencyid} className="border-b">
                  <td className="p-2">{currency.currencydefinition.fullyqualifiedname}</td>
                  <td className="p-2 whitespace-nowrap text-xs">{currency.currencydefinition.currencyid}</td>
                  <td className="p-2">{getTypeLabel(currency.currencydefinition.options)}</td>
                  <td className="p-2">{getProvenanceLabel(currency.currencydefinition.proofprotocol)}</td>
                  <td className="p-2">{formatSupply(currency.bestcurrencystate?.supply)}</td>
                  <td className="p-2">
                    <StartBlockExplorer blockheight={currency.currencydefinition.startblock} />
                  </td>
                  <td className="p-2">
                    <a
                      href={`/currency?query=${encodeURIComponent(currency.currencydefinition.name)}`}
                      className="px-3 py-1 text-xs rounded bg-[#3165D4] text-white font-semibold hover:bg-blue-800 whitespace-nowrap"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination */}
      <div className="flex flex-wrap gap-2 items-center justify-center mt-4">
        <button onClick={() => goToPage(page - 1)} disabled={page === 1} className="px-3 py-1 rounded border disabled:opacity-30">Prev</button>
        {Array.from({ length: totalPages }, (_, i) =>
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded border ${i + 1 === page
              ? 'bg-blue-500 text-white font-bold border-blue-700'
              : 'hover:bg-blue-50'}`}
          >{i + 1}</button>
        )}
        <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded border disabled:opacity-30">Next</button>
      </div>
    </main>
  )
}

// --- Helper components/functions ---

function StartBlockExplorer({ blockheight }: { blockheight?: number }) {
  const [blockhash, setBlockhash] = useState<string | null>(null)
  useState(() => {
    setBlockhash(null)
    if (typeof blockheight !== 'number' || isNaN(blockheight)) return
    fetch('/api/getblockhash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ height: blockheight }),
    })
      .then(res => res.json())
      .then(data => setBlockhash(typeof data.result === 'string' ? data.result : null))
      .catch(() => setBlockhash(null))
  })
  if (!blockheight || isNaN(blockheight)) return <>-</>
  if (!blockhash) return <span>{blockheight} <Loader2 className="inline h-3 w-3 animate-spin" /></span>
  return (
    <a
      href={`https://insight.verus.io/block/${blockhash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline inline-flex items-center"
    >
      {blockheight} <ExternalLink className="h-3 w-3 ml-1" />
    </a>
  )
}

function getTypeLabel(opt: number): string {
  const found = UNIQUE_TYPE_LABELS.find(t => t.isType(opt))
  return found ? found.label : `Unknown (${opt})`
}
function getProvenanceLabel(proof: number): string {
  return PROVENANCE_MAP[proof] || `Other (${proof})`
}
function formatSupply(val: any): string {
  if (!val && val !== 0) return '-'
  return Number(val).toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })
}
type SortCol = 'name' | 'supply' | 'startblock'
type CurrencyListItem = {
  currencydefinition: {
    fullyqualifiedname: string,
    name: string,
    currencyid: string,
    options: number,
    proofprotocol: number,
    startblock?: number
  }
  bestcurrencystate?: { supply?: number }
}
