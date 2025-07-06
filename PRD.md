# Verus ID & Currency Lookup — PRD.md

## 1. Overview

**Purpose:**  
A simple, secure, modern web application for searching, browsing, and displaying Verus identities and currency definitions — powered by the Verus blockchain (via https://api.verus.services).  
**Scope v1:**  
- Identity lookup by friendly name or i-address  
- Browse all currencies (filter/sortable table)  
- Currency detail (by opening currency from listings table or currency lookup by name)  
- Modern, beautiful, no-nonsense UI

---

## 2. Pages & Features

### 2.1 Landing Page

- Short project description, links to each feature/page
- Clear navigation: Identities | Currencies | [Future: Dashboard]
- Beautiful, minimal first impression
- Tagline: Welcome to VerusIDX lite
- (TODO: Specify possible featured summary stats)

---

### 2.2 Identity Lookup

**Flow:**
- User enters an `ID@` or i-address
- Result: Expandable panels showing identity data
- Show categories with these fields:  
    - Name ID:  name, friendly name, fully qualified name, identity address, parent, system ID
    - Authorities: primary addresses, minimum signatures, revoke, recover, private address, timelock
    - Technical Details: status, flags, version, blockheight, txid, vout
    
    - Content: content map, content multimap (in future iteration update)

    (I'm not sure if content map or content multimap will work to display, or if it's even worth it, since it won't display the data as a proper viewer but instead it will show the raw data)  
       
- **UI/UX:** Expand/collapse panels (shadcn/ui Accordion), (copy buttons for addresses?), links to the following:
- txid should link to the explorer https://insight.verus.io page with that transaction

-in the getidentity results, privateaddress only shows in the results if there is one assigned to the ID, otherwise it won't even show up as a field in the getidentity results; so if that's the case we should show privateaddress: none
---

### 2.3 Currencies Listing Table

**Flow:**
- Loads all currencies via `listcurrencies`
- Also includes a link to currency lookup page?
- Responsive data table with:  
    Table columns:
Fully Qualified Name
Currency ID
Options
Proofprotocol
Supply (from latest available: bestcurrencystate.supply)
Start Block (with explorer link using block hash similar to getidentity page)

With Params:
At the top of the page (beside/above "Currency List"):
"Default" button — shows normal list (listcurrencies with no params)
"Systemtype:" Dropdown — user picks one of: "local", "imported", "gateway", "pbaas"
Shows list for {"systemtype": "..."}
"All mapped ERC20s" — a button; fetches results for {"fromsystem": "veth"}
"Baskets with these reserves" —
Two input fields for the user to enter (e.g. "vusdt.veth", "vusdc.veth")
Click a “Show” button to submit — calls listcurrencies with {"converter":["vusdt.veth", "vusdc.veth"]} as an array


Filtering/sorting by:

Sort by:

Name (alphabetical), 
Supply,
Startblock

Filter by:

Type (using "options":  32 and 40 are "simple token", 33 and 41 are "basket currency", 545 is "gateway converter", 128 is "outside system", 248 is "pbaas chain", 2080 is "ID control token") 
Provenance (using "proofprotocol": 1 is "decentralized", 2 is "centralized", 3 is "Mapped ERC20" 

- **UI/UX:** Modern, performant table (shadcn/ui DataTable), sticky header

---

### 2.4 Currency Lookup Page

**Flow:**
- Three routes to the currency lookup page: 1 - Opened from currencies table/view when choosing a specific currency; 2 - using a lookup/search field/form on the currencies listing page where user fills in currency name and it opens the currency lookup page with the currency data from getcurrency; 3 - directly opening the currency lookup page and using the lookup/search field/form to search for a currency by name 
- Fetches currency via `getcurrency`
- Expandable/categorized panels for:  
    - General Info  
    - Basket/Reserve Structure (if any)  
    - Supply & State  
    - Fees  
    - Authorities  
    - Transactions (txid, start block, etc)
- **UI/UX:**  
    - Panels for each category (shadcn/ui Accordion)  
    - Highlight key stats  
    - Address copy, external link to explorer for txid  
    - [Future: chart components for state/supply?]

---



### 2.5 Address Viewer Page

**Flow:**
- Distinct page similar to the others; user inputs an R-address or ID@ name (can have spaces and/or emojis); then the page displays all the currencies and their balances within that address 
- Fetches address balance via `getaddressbalance`
- getaddressbalance "insert address here"

- **UI/UX:**  
    - At the top have "Currency Balance by Address" or "currency balance for address" 
    - Form/field to input address with button "view" or user can also just press enter
    - [Future: add it to identity lookup page for the ID@ and primary addresses so it can link open this address viewer page with that particular R address or "identity name@".]

---






#:zap: Future Feature(s) — Dashboard

- Home dashboard (latest block number, # of currencies, trends, basic charts)
- “Top”/recent activity for currencies and IDs
- Quick links to searches  
(TODO: Define when ready)

---

## 3. Component/UX/Design Principles

- Apple/Material-inspired, world-class visual polish  
- Responsive/mobile-first layout  
- Light/dark mode (user toggle via next-theme)
- Accessible, keyboard and screen reader friendly
- Minimal loading states, instant feedback, clear errors
- **Component Library:** shadcn/ui (Radix UI), Tailwind CSS for styling  
- Use React Query for all data fetching (for great UX/performance)

---

## 4. API Interactions

| Page               | RPC Method         | Notes/Params                               |
|--------------------|-------------------|--------------------------------------------|
| Identity Lookup    | `getidentity`     | `"name@"` or `"i-address"`                 |
| Currencies List    | `listcurrencies`  | Filter params? [TODO]                      |
| Currency Lookup    | `getcurrency`     | `"currencyname"`                           |
| Dashboard [future] | `getblockcount`   | No params                                  |

- All RPCs proxied through serverless Next.js API routes to hide infra details from frontend (no direct calls to https://api.verus.services from browser).

---

## 5. Tech Stack

- **Frontend:** React + TypeScript (Next.js page routing)
- **Styling:** TailwindCSS
- **Components:** shadcn/ui (Radix UI)
- **Dark/Light:** next-theme
- **State/Store:** Zustand
- **Data:** React Query (tanstack/query)
- **Backend:** Vercel serverless API routes (handle all RPC proxying)
- **Security:** Hide all sensitive endpoints/logic, best practices
- **Hosting:** Vercel


---

### (Optional) **`.env.example` (handy for other devs):**

```env
# Copy this to your own .env.local and fill out as needed
VERUS_API_URL=https://yourverus.api
NEXT_PUBLIC_APP_NAME=VerusAPPNAME
---

## 6. Non-Functional Requirements

- Accessibility (WCAG 2.1 AA+)
- Fast initial load (perf budget: <2s FCP)
- Secure: no dangerous CORS exposure, protect endpoints
- SEO meta/default tags (home page only at first)
- Easy for non-devs to copy/share addresses and info

---

## 7. Future Features / Open Threads

- [ ] Dashboard/statistics page (add “getblockcount” & advanced stats)
- [ ] Embedded graphs (supply over time, composition, recent changes, etc)
- [ ] Account system/Favorites
- [ ] Indexing or caching frequent lookups
- [ ] (Collab: fill out as needed per new feature requests)

---

## 8. Outstanding Decisions & TODOs

- [ ] Specify which fields in identity/currency are “most important” for each panel
- [ ] List/filter features for currency list table (advanced search UX?)
- [ ] Confirm landing page text/layout
- [ ] Define next “deep-dive” feature/page to specify

---

**Feel free to comment, edit, or expand sections as we go! 🍐**