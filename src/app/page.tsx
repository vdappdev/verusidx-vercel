
export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 gap-4">
      <h1 className="text-4xl font-extrabold text-[#3165D4] dark:text-white mb-2">Welcome to VerusIDX Lite</h1>
      <p className="max-w-lg text-gray-600 dark:text-gray-300 text-lg">
      Search IDs and currencies on Verus network
      </p>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <a href="/identities" className="px-6 py-3 bg-[#3165D4] text-white rounded-lg font-semibold shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#3165D4]">
          ID Lookup
        </a>
        <a href="/currencies" className="px-6 py-3 bg-[#3165D4] text-white rounded-lg font-semibold shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#3165D4]">
          Currency List
        </a>
        <a href="/currency" className="px-6 py-3 bg-[#3165D4] text-white rounded-lg font-semibold shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#3165D4]">
          Currency Lookup
        </a>
      </div>
    </section>
  )
}