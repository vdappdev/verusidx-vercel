'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronUp, ChevronDown, Loader2, ExternalLink, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const UNIQUE_TYPE_LABELS = [
  { label: 'Simple Token', isType: (opt: number) => opt === 32 || opt === 40 },
  { label: 'Basket Currency', isType: (opt: number) => opt === 33 || opt === 41 },
  { label: 'Gateway Converter', isType: (opt: number) => opt === 545 },
  { label: 'Gateway', isType: (opt: number) => opt === 128 },
  { label: 'PBaaS Chain', isType: (opt: number) => opt === 264 || opt === 268 },
  { label: 'ID Control Token', isType: (opt: number) => opt === 2080 },
]
const PROVENANCE_MAP: Record<number, string> = {
  1: 'Decentralized',
  2: 'Centralized',
  3: 'Mapped ERC20'
}
const PAGE_SIZE = 20

const SYSTEMTYPES = ['local', 'imported', 'gateway', 'pbaas']

export default function CurrenciesPage() {
  // --- Param state for custom queries
  const [systemtype, setSystemType] = useState('')
  const [erc20Active, setErc20Active] = useState(false)
  const [converter1, setConverter1] = useState('')
  const [converter2, setConverter2] = useState('')
  const [customConvertersActive, setCustomConvertersActive] = useState(false)
  const [activeSource, setActiveSource] = useState('default') // "default" | "systemtype" | "erc20" | "converter"

  // Table state
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{ by: SortCol; asc: boolean }>({ by: 'name', asc: true })
  const [filterType, setFilterType] = useState<string>('all')
  const [filterProof, setFilterProof] = useState<string>('all')

  // -- ListCurrencies API Param construction
  let rpcParams: Record<string,any> = {}
  if (activeSource === 'systemtype' && systemtype) rpcParams = { systemtype }
  if (activeSource === 'erc20') rpcParams = { fromsystem: 'veth' }
  if (activeSource === 'converter' && (converter1 || converter2)) {
    rpcParams = { converter: [converter1, converter2].filter(Boolean) }
  }

  // Query (using rpcParams)
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    // key must include param value for caching
    queryKey: ['listcurrencies', JSON.stringify(rpcParams)],
    queryFn: async () => {
      const res = await fetch('/api/listcurrencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: Object.keys(rpcParams).length ? JSON.stringify(rpcParams) : '{}'
      })
      const json = await res.json()
      if (!json?.result || json?.error) throw new Error(json?.error || 'Failed to load currencies')
      return json.result as CurrencyListItem[]
    }
  })

  // Filtering & sorting (client-side for display)
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

  // -- Button/Shortcut actions
  const clickDefault = () => {
    setActiveSource('default'); setSystemType(''); setErc20Active(false); setCustomConvertersActive(false)
    setConverter1(''); setConverter2(''); setPage(1)
    refetch()
  }
  const clickSystemType = (val: string) => {
    setSystemType(val); setActiveSource('systemtype')
    setErc20Active(false); setCustomConvertersActive(false)
    setConverter1(''); setConverter2(''); setPage(1)
    refetch()
  }
  const clickERC20 = () => {
    setActiveSource('erc20'); setSystemType(''); setErc20Active(true); setCustomConvertersActive(false)
    setConverter1(''); setConverter2(''); setPage(1)
    refetch()
  }
  const clickConverters = () => {
    setActiveSource('converter'); setErc20Active(false); setSystemType('')
    setCustomConvertersActive(true); setPage(1)
    refetch()
  }
  // For showing active chips/tags
  let activeChip = ''
  if (activeSource === 'systemtype' && systemtype) activeChip = `System Type: ${systemtype}`
  if (activeSource === 'erc20') activeChip = 'All mapped ERC20s'
  if (activeSource === 'converter') activeChip = `Converter(s): ${[converter1, converter2].filter(Boolean).join(', ')}`

  // Table columns
  const TABLE_HEADERS: { key: SortCol | string, label: string, sortable?: boolean }[] = [
    { key: 'name', label: 'Fully Qualified Name', sortable: true },
    { key: 'currencyid', label: 'Currency ID' },
    { key: 'type', label: 'Type' },
    { key: 'proofprotocol', label: 'Provenance' },
    { key: 'supply', label: 'Supply', sortable: true },
    { key: 'startblock', label: 'Start Block', sortable: true },
    { key: 'actions', label: 'Get Currency' }
  ]

  return (
    <main className="max-w-screen-xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Currency List</h1>

      {/* --- PARAMETER Shortcuts/Inputs --- */}
      <div className="flex flex-wrap gap-2 items-center mb-3 pb-2 border-b border-muted">
        <button onClick={clickDefault}
          className={`px-3 py-1 rounded font-semibold border ${activeSource === 'default' ? 'bg-blue-600 text-white border-blue-700' : ''}`}>
          Default
        </button>
        {/* Systemtype Dropdown */}
        <div className="flex items-center gap-1">
          <span className="font-medium">Systemtype:</span>
          <select
            className="px-2 py-1 rounded border bg-white text-black dark:bg-[#232323] dark:text-white"
            value={activeSource === 'systemtype' ? systemtype : ''}
            onChange={e => clickSystemType(e.target.value)}
          >
            <option value="">--</option>
            {SYSTEMTYPES.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>
        <button
          onClick={clickERC20}
          className={`px-3 py-1 rounded font-semibold border ${activeSource === 'erc20' ? 'bg-blue-600 text-white border-blue-700' : ''}`}>
          All mapped ERC20s
        </button>
        {/* Converters Inputs */}
        <form onSubmit={e => { e.preventDefault(); clickConverters(); }} className="flex gap-1 items-center">
          <span className="font-medium">Baskets with reserves:</span>
          <input
            type="text"
            value={converter1}
            onChange={e => setConverter1(e.target.value)}
            placeholder="Reserve Name"
            className="px-1 py-1 rounded border dark:bg-[#232323] dark:text-white"
            style={{width: 120}}
          />
          <input
            type="text"
            value={converter2}
            onChange={e => setConverter2(e.target.value)}
            placeholder="Reserve (optional)"
            className="px-0.1 py-1 rounded border dark:bg-[#232323] dark:text-white"
            style={{width: 140}}
          />
          <button
            type="submit"
            className={`px-2 py-1 rounded font-semibold border bg-gray-100 hover:bg-blue-100 dark:bg-[#232323] dark:hover:bg-blue-900 transition`}>
            Show
          </button>
        </form>
        {/* Active tag/chip */}
        {activeChip && (
          <span className="ml-2 px-2 py-1 bg-blue-600 text-white font-bold rounded-full flex items-center gap-1">
            {activeChip}
            <button className="ml-1" onClick={clickDefault}><X className="h-4 w-4" /></button>
          </span>
        )}
        {isFetching && <Loader2 className="animate-spin h-5 w-5 ml-2 text-blue-600" />}
      </div>

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
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr>
                {TABLE_HEADERS.map(col =>
                  <th
                    key={col.key}
                    className={`
                      text-left p-2 select-none font-semibold
                      ${col.key === 'name' ? 'sticky left-0 z-20 bg-white dark:bg-[#181818] shadow-md border-r' : ''}
                      ${col.sortable ? 'cursor-pointer' : ''}
                    `}
                    style={col.key === 'name'
                      ? { minWidth: 200, maxWidth: 320 }
                      : undefined}
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
                    <span className="inline-flex items-center gap-1">
                      {col.label}
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
                  {/* Sticky left column */}
                  <td className="p-2 sticky left-0 z-10 bg-white dark:bg-[#181818] font-semibold shadow-md border-r whitespace-nowrap" style={{ minWidth: 200, maxWidth: 320 }}>
                    {currency.currencydefinition.fullyqualifiedname}
                  </td>
                  <td className="p-2 whitespace-nowrap text-xs">{currency.currencydefinition.currencyid}</td>
                  <td className="p-2">{getTypeLabel(currency.currencydefinition.options)}</td>
                  <td className="p-2">{getProvenanceLabel(currency.currencydefinition.proofprotocol)}</td>
                  <td className="p-2">{formatSupply(currency.bestcurrencystate?.supply)}</td>
                  <td className="p-2">{currency.currencydefinition.startblock}</td>
                  <td className="p-2">
                    <a
                      href={`/currency?query=${encodeURIComponent(currency.currencydefinition.fullyqualifiedname)}`}
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

