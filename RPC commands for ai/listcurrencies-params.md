
listcurrencies with params


help command:

./verus help listcurrencies
listcurrencies ({query object}) startblock endblock

Returns a complete definition for any given chain if it is registered on the blockchain. If the chain requested

is NULL, chain definition of the current chain is returned.

Arguments
{                                    (json, optional) specify valid query conditions
   "launchstate" :                   ("prelaunch" | "launched" | "refund" | "complete") (optional) return only currencies in that state
   "systemtype" :                    ("local" | "imported" | "gateway" | "pbaas")
   "fromsystem" :                    ("systemnameeorid") default is the local chain, but if currency is from another system, specify here
   "converter": ["currency1", ("currency2")] (array, optional) default empty, only return fractional currency converters of one or more currencies
}

Result:
[
  {
    "version" : n,                           (int) version of this chain definition
    "name" : "string",                     (string) name or symbol of the chain, same as passed
    "fullyqualifiedname" : "string",       (string) name or symbol of the chain with all parent namespaces, separated by "."
    "currencyid" : "i-address",            (string) string that represents the currency ID, same as the ID behind the currency
    "currencyidhex" : "hex",               (string) hex representation of currency ID, getcurrency API supports "hex:currencyidhex"
    "parent" : "i-address",                (string) parent blockchain ID
    "systemid" : "i-address",              (string) system on which this currency is considered to run
    "launchsystemid" : "i-address",        (string) system from which this currency was launched
    "notarizationprotocol" : n               (int) protocol number that determines variations in cross-chain or bridged notarizations
    "proofprotocol" : n                      (int) protocol number that determines variations in cross-chain or bridged proofs
    "startblock" : n,                        (int) block # on this chain, which must be notarized into block one of the chain
    "endblock" : n,                          (int) block # after which, this chain's useful life is considered to be over
    "currencies" : "["i-address", ...]", (stringarray) currencies that can be converted to this currency at launch or makeup a liquidity basket
    "weights" : "[n, ...]",                (numberarray) relative currency weights (only returned for a liquidity basket)
    "conversions" : "[n, ...]",            (numberarray) pre-launch conversion rates for non-fractional currencies
    "minpreconversion" : "[n, ...]",       (numberarray) minimum amounts required in pre-conversions for currency to launch
    "currencies" : "["i-address", ...]", (stringarray) currencies that can be converted to this currency at launch or makeup a liquidity basket
    "currencynames" : "{"i-address":"fullname",...}", (obj) i-addresses mapped to fully qualified names of all sub-currencies
    "initialsupply" : n,                     (number) initial currency supply for fractional currencies before preallocation or issuance
    "prelaunchcarveout" : n,                 (number) pre-launch percentage of proceeds for fractional currency sent to launching ID
    "preallocations" : "[{"i-address":n}, ...]", (objarray) VerusIDs and amounts for pre-allocation at launch
    "initialcontributions" : "[n, ...]",   (numberarray) amounts of pre-conversions reserved for launching ID
    "idregistrationfees" : n,                (number) base cost of IDs for this currency namespace in this currency
    "idreferrallevels" : n,                  (int) levels of ID referrals (only for native PBaaS chains and IDs)
    "idimportfees" : n,                      (number) fees required to import an ID to this system (only for native PBaaS chains and IDs)
    "eras" : "[obj, ...]",                 (objarray) different chain phases of rewards and convertibility
    {
      "reward" : "[n, ...]",               (int) reward start for each era in native coin
      "decay" : "[n, ...]",                (int) exponential or linear decay of rewards during each era
      "halving" : "[n, ...]",              (int) blocks between halvings during each era
      "eraend" : "[n, ...]",               (int) block marking the end of each era
      "eraoptions" : "[n, ...]",           (int) options (reserved)
    }
    "nodes"      : "[obj, ..]",    (objectarray, optional) up to 8 nodes that can be used to connect to the blockchain      [{
         "nodeidentity" : "txid", (string,  optional) internet, TOR, or other supported address for node
         "paymentaddress" : n,     (int,     optional) rewards payment address
       }, .. ]
    "lastconfirmedcurrencystate" : {
     }
    "besttxid" : "txid"
     }
    "confirmednotarization" : {
     }
    "confirmedtxid" : "txid"
  }, ...
]

Examples:
> verus listcurrencies true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listcurrencies", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:27486/







EXAMPLES:






./verus listcurrencies '{"fromsystem":"veth"}'
[
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "MKR",
      "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
        "type": 9
      },
      "launchsystemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "startblock": 0,
      "endblock": 0,
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "21a2b645754e1812886bab56b60eaaa4c6aab565",
      "fullyqualifiedname": "MKR.vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 5
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "DAI",
      "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
        "type": 9
      },
      "launchsystemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "startblock": 0,
      "endblock": 0,
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "daa10c4f62cf85e39866d4ad76d326d3c2f1728b",
      "fullyqualifiedname": "DAI.vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 6
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vLINK",
      "currencyid": "iJczmut8fHgRvVxaNfEPm7SkgJLDFtPcrK",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2777280,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "5d42bb467e3385238e9df7dfe5703aa2d40924a6",
      "fullyqualifiedname": "vLINK.vETH",
      "definitiontxid": "1aaf726d67bed46fa569f0a7474abb29252804fe73833d3a1509c8d5a802a908",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "EURC",
      "currencyid": "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2765931,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "6d446b02b755dd64048897b9ed74f41520335c5e",
      "fullyqualifiedname": "EURC.vETH",
      "definitiontxid": "eefacb28331ba9f2ddd7492cff10c8bbb7375f52a71dc92b105252b98970ab10",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "paxg",
      "currencyid": "iSYJ5L91bURKemiuALK1uBUXad3ZKCpDX7",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x45804880de22913dafe09f4980848ece6ecbaf78",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3051898,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "a6512e8a4290db8116a00b68a31fcc400c6801fd",
      "fullyqualifiedname": "paxg.vETH",
      "definitiontxid": "5ca908b302501518e2484f092ce3086ad6b0cb70dd05f3208b4a6b3600bd8913",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vwBTC",
      "currencyid": "iS3NjE3XRYWoHRoovpLhFnbDraCq7NFStf",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2782714,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "590cc940ca125014eb883d8ca6ba75915c3a89f7",
      "fullyqualifiedname": "vwBTC.vETH",
      "definitiontxid": "96e4be8e07a51733dd89ca0d9acb5bb59446b81d0d1b5fbd294afe5b74301132",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "pepecoin",
      "currencyid": "i5VVBEi6efBrXMaeqFW3MTPSzbmpNLysGR",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xa9e8acf069c58aec8825542845fd754e41a9489a",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3336638,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "be1b5a5ef316a7e0a6041eabf624dfd9d0c81e16",
      "fullyqualifiedname": "pepecoin.vETH",
      "definitiontxid": "34ee8d707e61568a42b9ad7c23505498028de1e2c5f9d56b2e487c8405f30233",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "OIL",
      "currencyid": "i4YYnZvzhaQPJvQsVMsDPjPouLSEpZS6vP",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x921c91fe10dc5718b74b9371755b91caa49fcc48",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2818647,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "867242e59f1459397126eedb56502b4258ebba0b",
      "fullyqualifiedname": "OIL.vETH",
      "definitiontxid": "c476914de26143e23b60682f30e20fceb6a1892eb8c597b22b992984b297964a",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "tBTC",
      "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x18084fba666a33d37592fa2633fd49a74dd93a88",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2813208,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "08c3027f32f50d8593822e45c4d7da12446d7ff8",
      "fullyqualifiedname": "tBTC.vETH",
      "definitiontxid": "521d03133078af43afb0343742f2adfd042fe31fb1830f94d56f02919dae094f",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "thUSD",
      "currencyid": "iD18hxe8Qpt9QMWn3xgFjDyqyBqS7NQsex",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xcfc5bd99915aaa815401c5a41a927ab7a38d29cf",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3337162,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "39e030a1ef019d98d2ad6af29f971663580e8368",
      "fullyqualifiedname": "thUSD.vETH",
      "definitiontxid": "51316dca295bff3772c4dd6acae83196ecddad595fc9d315e7524ba9aa925f5e",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vUSDT",
      "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2788858,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "fda7f4b7b72772e13a02a81ee71112fbf7ce5845",
      "fullyqualifiedname": "vUSDT.vETH",
      "definitiontxid": "e2f0e53630f5f14821484bd133a1f903c1b9a68804b201eb225c73fcd17be165",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "scrvUSD",
      "currencyid": "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x0655977feb2f289a4ab78af67bab0d17aab84367",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3322516,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "5e41213856c739e352b6b1490b81dd1625102f45",
      "fullyqualifiedname": "scrvUSD.vETH",
      "definitiontxid": "cda889372eb97a980423a160261e7dc3093502a62b1085459a642442cb903a86",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "NATI",
      "currencyid": "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x4f14e88b5037f0ca24348fa707e4a7ee5318d9d5",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3155220,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "e40986128dc1c15b285328926fc8f2c94f2639b6",
      "fullyqualifiedname": "NATI.vETH",
      "definitiontxid": "12b57c342d20e73dcc6d9c4c7bf7a476a2dafdd522b491808a919e17156a099d",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vUSDC",
      "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2780158,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "67d6df2ccc766daffb1f36ccc9b8b5f0db5cd11b",
      "fullyqualifiedname": "vUSDC.vETH",
      "definitiontxid": "c2044237229427a4d898eec2db0e3cccfce5e68aa65a551333b5207b2811dbb9",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "OVERRIDE",
      "currencyid": "iSUD6kGQKDaFUfK6EMYRtR4SNU4wjhEpMi",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x71e64383b4fef62426dd1f7483df75f832b84722",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2844022,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "0c6ba3537a26b44d69b2c1c8b0894077d4963bfc",
      "fullyqualifiedname": "OVERRIDE.vETH",
      "definitiontxid": "d029a79d26fe282c9eac13536b4e43048de9c611bd362db340f0e48c866c1ebd",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "TRAC",
      "currencyid": "iEnQEjjozf1HZkqFT9U4NKnzz1iGZ7LbJ4",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2760318,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "9f1a475afd3adfd3c8f897b08055a16b4bdd0a7c",
      "fullyqualifiedname": "TRAC.vETH",
      "definitiontxid": "b6b1bc919d7597aab65ccdea8a3a77479d63baae0029cd0d1d8b176b3a97bdc6",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vMars4",
      "currencyid": "iNtUUdjsqV34snGZJerAvPLaojo6tV9sfd",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x16cda4028e9e872a38acb903176719299beaed87",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2786426,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "8da897c4b951f3c1024b37db696d167acfe7f1d4",
      "fullyqualifiedname": "vMars4",
      "definitiontxid": "17dfba7261913d7d607cce75b4926180477519fb03300004dab1f933f3b457ca",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "xaut",
      "currencyid": "i7eFvyL44S2iWz9EZjd6HTaBioFqhALcdi",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x68749665ff8d2d112fa859aa293f07a622782f38",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3054776,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "a4d51e14ab3f231d5e65118e4c9b5793f5b8b72d",
      "fullyqualifiedname": "xaut.vETH",
      "definitiontxid": "6d02a291d003714cf45860d92396f5924af898006e2379179ad07a87c18d92cf",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "BAT",
      "currencyid": "i9A4wBXUastzupqZwkich4zhCtziZS1JoF",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2980300,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "9c158cb0a9c6a2c2a95a7db70ff08ec5d725533e",
      "fullyqualifiedname": "BAT.vETH",
      "definitiontxid": "be86bcb120f25a0b2f94877ab778572e2bebb1be47e70f7d67c29ba3cd3bf8fc",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "crvUSD",
      "currencyid": "iQ1mX2VtESKfJ3PoWVcYKfnDEpYkWW59ZB",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xf939e0a03fb07f59a73314e73794be0e57ac1b4e",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3322994,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "81654f84691ce16b43180409d803a48e182b4be1",
      "fullyqualifiedname": "crvUSD.vETH",
      "definitiontxid": "09676ac486330d179acb34431a74320ad61bc757942e50e34a68a77886fb19fe",
      "definitiontxout": 1
    },
    "bestheight": 0
  }
]






./verus listcurrencies '{"fromsystem":"varrr"}'
[
  {
    "currencydefinition": {
      "version": 1,
      "options": 268,
      "name": "vARRR",
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2986660,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X"
      ],
      "conversions": [
        1.00000000,
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000,
        0.00000000
      ],
      "preallocations": [
        {
          "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": 9400000.00000000
        }
      ],
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 500000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "notaries": [
        "iEGoYCsnSJSzt1kQzR7HjXv1ziCEAAn4VW",
        "iMEjMWbjy4HmNsRPMSnXfaknxacY6CU4Mf",
        "iJjCZgUbBDNgsHFRMcYPV3B61cvJri9Vpi",
        "iF9hSjYCiZ8B1B3KLptX4nW98j8KonV2Ui",
        "iRvxpXgY7gyuNj4PtcENxHP34J2wC78YHd",
        "iMEjUTZFS6T7s7M48izd5SPKnnrwSeerWk",
        "iPkWiJi6SAsCepS7qz3R3ah2dRiFDEbySS",
        "iF29cxgMn6oAQwRc8wPTBNAAjbqNUtPoqX",
        "iLhPGd6CmJ4c99AiJ7nPjT4bzMQc5aYbyS",
        "iEXXfyxeuUzTZ1ZoM47ht9F5B4sUKfD2hg",
        "iRhBRttmktjn7eQERCm548tABEgheF3HUL"
      ],
      "minnotariesconfirm": 6,
      "currencyregistrationfee": 200.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 100.00000000,
      "transactionimportfee": 0.01000000,
      "transactionexportfee": 0.01000000,
      "gatewayconverterid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
      "gatewayconvertername": "Bridge",
      "initialtarget": "000000ff0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 60,
      "powaveragingwindow": 45,
      "notarizationperiod": 10,
      "eras": [
        {
          "reward": 8000000,
          "decay": 0,
          "halving": 0,
          "eraend": 1125001
        },
        {
          "reward": 200000,
          "decay": 0,
          "halving": 0,
          "eraend": 6125001
        },
        {
          "reward": 0,
          "decay": 0,
          "halving": 0,
          "eraend": 0
        }
      ],
      "currencyidhex": "e9e10955b7d16031e3d6f55d9c908a038e3ae47d",
      "fullyqualifiedname": "vARRR",
      "definitiontxid": "196dacfc5f9d452f0ec3bfb1b4d571c6f50ebd8d55dd51119a23838a9825d758",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "198.244.188.47:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "37.187.149.92:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.4.87.18:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "51.161.198.160:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "178.159.2.25:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 619394,
    "lastconfirmedtxid": "3d40a3a944529ea1ca04cf475e9ac235882fac17f3a2f7a95bbc2268004eda06",
    "lastconfirmedtxout": 0,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "ismirror": true,
      "proposer": {
        "address": "iCSb7jgkLSHJXiAsSPa7zqERYoprq5QUYZ",
        "auxdests": [
          {
            "address": "iF9hSjYCiZ8B1B3KLptX4nW98j8KonV2Ui",
            "type": 4
          }
        ],
        "type": 68
      },
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationheight": 619394,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          },
          {
            "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 9900000.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00025000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          },
          "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "c1e43b79d77e7a519e86490d80119fbcec758956215917c40a46e2719fc51360",
      "prevnotarizationout": 1,
      "prevheight": 3608708,
      "hashprevcrossnotarization": "a96b0d8b289489cae69013a80d884ee520f5a9d6082e3cdce3b5068f758abdad",
      "currencystates": [
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB": {
            "flags": 49,
            "version": 1,
            "currencyid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.25000000,
                "reserves": 46444.78716633,
                "priceinreserve": 1.79871838
              },
              {
                "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
                "weight": 0.25000000,
                "reserves": 763618.14123774,
                "priceinreserve": 29.57348004
              },
              {
                "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
                "weight": 0.25000000,
                "reserves": 8669.78461522,
                "priceinreserve": 0.33576428
              },
              {
                "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
                "weight": 0.25000000,
                "reserves": 1.04367581,
                "priceinreserve": 0.00004041
              }
            ],
            "initialsupply": 80000.00000000,
            "emitted": 0.00000000,
            "supply": 103284.17758057,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 110.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 1.79605462,
                "viaconversionprice": 1.79765161,
                "fees": 0.05500000,
                "conversionfees": 0.05500000,
                "priorweights": 0.25000000
              },
              "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.45254099,
                "lastconversionprice": 29.57349757,
                "viaconversionprice": 29.55595627,
                "fees": 0.00020010,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.33576428,
                "viaconversionprice": 0.33556535,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00247613,
                "lastconversionprice": 0.00004051,
                "viaconversionprice": 0.00004045,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608714,
          "stateroot": "7eb28112f46f9cb63e77e2f3257e50071aa401c484d41b6b8e1588d7f8b68deb",
          "blockhash": "84da9caf28b476bdd9ebe717e705758606822ba710f2b4fc441d9ea2dae971c0",
          "power": "00000000000d7a0ea41349a5c9e94360000000026e5624a8790cf9cce10d9be0"
        },
        {
          "version": 1,
          "type": 1,
          "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "height": 619394,
          "stateroot": "59a1c4e9f59360f9d893a52fda2a70f8dd09ef03a19c25c0710db3b80b49d320",
          "blockhash": "00000000000bf18a21e5a743d7410981e4bbf3be63e6426ce90261c94495106a",
          "power": "0000000000000001d7f0fe8ccd2c757e0000000000000001490e05d10412ab1d"
        }
      ],
      "nodes": [
        {
          "networkaddress": "65.109.123.188:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.59.40.199:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 619413,
    "besttxid": "d894fb792b280bee5652e1bf4295cd7a80c47e3563e6a74a7ce590b63eb6f2ea",
    "besttxout": 0,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 9900000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00025000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
      "parent": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2986660,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
        "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "prelaunchdiscount": 0.05000000,
      "initialsupply": 80000.00000000,
      "prelaunchcarveout": 0.00000000,
      "preallocations": [
        {
          "i5v3h9FWVdRFbNHU7DfcpGykQjRaHtMqu7": 20000.00000000
        }
      ],
      "gateway": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 500000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "1d271d1a9ef8a6b9f5ac8c488bc42067a5d95669",
      "fullyqualifiedname": "Bridge.vARRR",
      "definitiontxid": "196dacfc5f9d452f0ec3bfb1b4d571c6f50ebd8d55dd51119a23838a9825d758",
      "definitiontxout": 5
    },
    "bestheight": 2986659,
    "besttxid": "68e3cfd6cade957c1d2fadeca6f27a01cf63cd6693f8e5ed71338851973c637c",
    "besttxout": 3,
    "bestcurrencystate": {
      "flags": 27,
      "version": 1,
      "currencyid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 67081.42013852,
          "priceinreserve": 2.68325680
        },
        {
          "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "weight": 0.25000000,
          "reserves": 500000.00000000,
          "priceinreserve": 20.00000000
        },
        {
          "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
          "weight": 0.25000000,
          "reserves": 6702.39307585,
          "priceinreserve": 0.26809572
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.25000000,
          "reserves": 1.11617918,
          "priceinreserve": 0.00004464
        }
      ],
      "initialsupply": 80000.00000000,
      "emitted": 20000.00000000,
      "supply": 100000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 67081.42013852,
          "primarycurrencyin": 67064.64558989,
          "reserveout": 0.00000000,
          "lastconversionprice": 2.51555321,
          "viaconversionprice": 3.35407101,
          "fees": 100.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
          "reservein": 500000.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 25.00000000,
          "viaconversionprice": 25.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
          "reservein": 6702.39307585,
          "primarycurrencyin": 6700.71705862,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.25133975,
          "viaconversionprice": 0.33511966,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 1.11617918,
          "primarycurrencyin": 1.11590011,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00004186,
          "viaconversionprice": 0.00005581,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 20000.00000000,
      "preconvertedout": 0.00000000
    }
  }
]





./verus listcurrencies '{"systemtype":"pbaas"}'
[
  {
    "currencydefinition": {
      "version": 1,
      "options": 264,
      "name": "VRSC",
      "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "startblock": 0,
      "endblock": 0,
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "minnotariesconfirm": 0,
      "currencyregistrationfee": 200.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 100.00000000,
      "transactionimportfee": 0.01000000,
      "transactionexportfee": 0.01000000,
      "initialtarget": "00000f0f0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 60,
      "powaveragingwindow": 45,
      "notarizationperiod": 10,
      "eras": [
        {
          "reward": 0,
          "decay": 100000000,
          "halving": 1,
          "eraend": 10080
        },
        {
          "reward": 38400000000,
          "decay": 0,
          "halving": 43200,
          "eraend": 226080
        },
        {
          "reward": 2400000000,
          "decay": 0,
          "halving": 1051920,
          "eraend": 0
        }
      ],
      "currencyidhex": "4c6c9b5a9f7f31d8ea604cb49ad3645c01b8f51a",
      "fullyqualifiedname": "VRSC",
      "definitiontxid": "af0cba3fbfc5868d4e09d7049594f4936df656691297e5623b7fea94821d6004",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "157.90.155.113:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "45.79.111.201:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "45.79.237.198:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "172.104.48.148:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "66.228.59.168:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 3608959,
    "lastconfirmedtxid": "0000000000000000000000000000000000000000000000000000000000000000",
    "lastconfirmedtxout": 4294967295,
    "lastconfirmednotarization": {
      "version": 2,
      "launchconfirmed": true,
      "proposer": {
        "address": "iLcSuBHwtgVrKxe5V77ALSAwaiYxx2RKcW",
        "type": 4
      },
      "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationheight": 3608959,
      "currencystate": {
        "flags": 16,
        "version": 1,
        "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "launchcurrencies": [
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 0.00000000,
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "0000000000000000000000000000000000000000000000000000000000000000",
      "prevnotarizationout": 4294967295,
      "prevheight": 0,
      "hashprevcrossnotarization": "0000000000000000000000000000000000000000000000000000000000000000",
      "currencystates": [
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608959,
          "stateroot": "e419b0be9bf31fcb2192d9f2ec118e519698ff557349892ccb2c69b5d05ed26b",
          "blockhash": "99eac8c7187065d3a795403ac714913f594fda39af26d7e9b0f6e9a664f9a508",
          "power": "00000000000d7a0eae43d810f37ef414000000026e5624a8795b5d53a21cb29c"
        }
      ],
      "nodes": [
      ]
    },
    "bestheight": 3608959,
    "besttxid": "0000000000000000000000000000000000000000000000000000000000000000",
    "besttxout": 4294967295,
    "bestcurrencystate": {
      "flags": 16,
      "version": 1,
      "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 264,
      "name": "vDEX",
      "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3159230,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "preallocations": [
        {
          "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": 819300.00000000
        }
      ],
      "initialcontributions": [
        0.00000000
      ],
      "gatewayconverterissuance": 43000.00000000,
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 2,
      "idimportfees": 0.00200000,
      "notaries": [
        "i6HRJuzHug7p1NXNEWFZzYuXq9Q5b6kw5E",
        "i9vysLqFUdYSYYpeTMADbsXbC1DXdjE2Yf",
        "iKXJrtWuTrja9xDWdcahu6euQe2P1hKJdy",
        "iJYWxX3qo7vDjqhGyoDtBM5NwMWiaBRQTc",
        "i5MYMsw9sFPjLba83jKWfPGWUjisy6zXiX",
        "iEfZmUfDHx1XR6bZV62ZniFyGdd6gcjjyy",
        "iC1ep1QL8FxUvvVVmodwsZFcv3oAG9fTvs",
        "iJWjwaRMp5t4rKSydHSMybzxruUZLgPeQp",
        "iBCWKY18bXN28bDucjzi1kPzBy3TgRFn9f",
        "i9Tt7c1NVRnXXot4HeSqW4GY7XxCpZdApq",
        "iRnwC9pYLwfFnaMKD5QLZzMo6HjTNvRDXv"
      ],
      "minnotariesconfirm": 6,
      "currencyregistrationfee": 10.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 5.00000000,
      "transactionimportfee": 0.00100000,
      "transactionexportfee": 0.00050000,
      "gatewayconverterid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
      "gatewayconvertername": "Bridge",
      "initialtarget": "000000ff0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 60,
      "powaveragingwindow": 45,
      "notarizationperiod": 10,
      "eras": [
        {
          "reward": 777000,
          "decay": 0,
          "halving": 643500,
          "eraend": 0
        }
      ],
      "currencyidhex": "53fe39eea8c06bba32f1a4e20db67e5524f0309d",
      "fullyqualifiedname": "vDEX",
      "definitiontxid": "dffce4bb3d0cf97acb12e8fd1bfba22b6672b54fea696501a1771c43cf86c117",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "198.244.188.47:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "37.187.149.92:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.4.87.18:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "51.161.198.160:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "178.159.2.25:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 449951,
    "lastconfirmedtxid": "dad294cd72a524669b66bbcdd74164301b6d3f8b9af38a1ad1c4de52e7cca3d1",
    "lastconfirmedtxout": 0,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "ismirror": true,
      "proposer": {
        "address": "RWyCyhLW4koEXs5ZaJabeBQ4LHuSYearod",
        "auxdests": [
          {
            "address": "iLoHAVc8hv2ntJodJTBXns9tQv8jFKFYpb",
            "type": 4
          }
        ],
        "type": 66
      },
      "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "notarizationheight": 449951,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 862300.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00239883,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "f406708c9e2703de16a14c207bc2cef2e87aedc66622391fc029c93b7d972b31",
      "prevnotarizationout": 1,
      "prevheight": 3608714,
      "hashprevcrossnotarization": "601a6b3feb9291045eb2018d9037c75720639ebf95cc7bea67603ea02ed90bdc",
      "currencystates": [
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9": {
            "flags": 49,
            "version": 1,
            "currencyid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.20000000,
                "reserves": 30124.43730056,
                "priceinreserve": 2.44185518
              },
              {
                "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
                "weight": 0.20000000,
                "reserves": 66971.75897928,
                "priceinreserve": 5.42866029
              },
              {
                "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
                "weight": 0.20000000,
                "reserves": 28.73357089,
                "priceinreserve": 0.00232911
              },
              {
                "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
                "weight": 0.20000000,
                "reserves": 69862.62020042,
                "priceinreserve": 5.66299046
              },
              {
                "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
                "weight": 0.20000000,
                "reserves": 0.67475909,
                "priceinreserve": 0.00005469
              }
            ],
            "initialsupply": 85000.00000000,
            "emitted": 0.00000000,
            "supply": 61683.50510556,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.04799984,
                "lastconversionprice": 2.44185907,
                "viaconversionprice": 2.44185544,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              },
              "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": {
                "reservein": 0.10673854,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 5.42865921,
                "viaconversionprice": 5.42865856,
                "fees": 0.00053360,
                "conversionfees": 0.00005336,
                "priorweights": 0.20000000
              },
              "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00232911,
                "viaconversionprice": 0.00232911,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              },
              "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 5.66299046,
                "viaconversionprice": 5.66298865,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              },
              "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00005469,
                "viaconversionprice": 0.00005469,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608714,
          "stateroot": "7eb28112f46f9cb63e77e2f3257e50071aa401c484d41b6b8e1588d7f8b68deb",
          "blockhash": "84da9caf28b476bdd9ebe717e705758606822ba710f2b4fc441d9ea2dae971c0",
          "power": "00000000000d7a0ea41349a5c9e94360000000026e5624a8790cf9cce10d9be0"
        },
        {
          "version": 1,
          "type": 1,
          "systemid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
          "height": 449951,
          "stateroot": "5337619e36c2cae438b7f9432c33517297452f7de1099e424d7b9d7759565683",
          "blockhash": "5a0e428874032fcc5a6e511f7842659fa1c25c3c2af98a9368d6bb9b3c2454f6",
          "power": "00000000000000001d03f8363036acd3000000000000000100a155d2a6e0a8b7"
        }
      ],
      "nodes": [
        {
          "networkaddress": "15.235.160.231:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "198.244.188.47:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 449961,
    "besttxid": "c4a1ad8aa6f4cdc1c57eb5c02599da2724dc340014dfa33b2351bfc4444126d1",
    "besttxout": 0,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 862300.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00239883,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 268,
      "name": "vARRR",
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2986660,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X"
      ],
      "conversions": [
        1.00000000,
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000,
        0.00000000
      ],
      "preallocations": [
        {
          "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": 9400000.00000000
        }
      ],
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 500000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "notaries": [
        "iEGoYCsnSJSzt1kQzR7HjXv1ziCEAAn4VW",
        "iMEjMWbjy4HmNsRPMSnXfaknxacY6CU4Mf",
        "iJjCZgUbBDNgsHFRMcYPV3B61cvJri9Vpi",
        "iF9hSjYCiZ8B1B3KLptX4nW98j8KonV2Ui",
        "iRvxpXgY7gyuNj4PtcENxHP34J2wC78YHd",
        "iMEjUTZFS6T7s7M48izd5SPKnnrwSeerWk",
        "iPkWiJi6SAsCepS7qz3R3ah2dRiFDEbySS",
        "iF29cxgMn6oAQwRc8wPTBNAAjbqNUtPoqX",
        "iLhPGd6CmJ4c99AiJ7nPjT4bzMQc5aYbyS",
        "iEXXfyxeuUzTZ1ZoM47ht9F5B4sUKfD2hg",
        "iRhBRttmktjn7eQERCm548tABEgheF3HUL"
      ],
      "minnotariesconfirm": 6,
      "currencyregistrationfee": 200.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 100.00000000,
      "transactionimportfee": 0.01000000,
      "transactionexportfee": 0.01000000,
      "gatewayconverterid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
      "gatewayconvertername": "Bridge",
      "initialtarget": "000000ff0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 60,
      "powaveragingwindow": 45,
      "notarizationperiod": 10,
      "eras": [
        {
          "reward": 8000000,
          "decay": 0,
          "halving": 0,
          "eraend": 1125001
        },
        {
          "reward": 200000,
          "decay": 0,
          "halving": 0,
          "eraend": 6125001
        },
        {
          "reward": 0,
          "decay": 0,
          "halving": 0,
          "eraend": 0
        }
      ],
      "currencyidhex": "e9e10955b7d16031e3d6f55d9c908a038e3ae47d",
      "fullyqualifiedname": "vARRR",
      "definitiontxid": "196dacfc5f9d452f0ec3bfb1b4d571c6f50ebd8d55dd51119a23838a9825d758",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "198.244.188.47:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "37.187.149.92:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.4.87.18:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "51.161.198.160:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "178.159.2.25:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 619394,
    "lastconfirmedtxid": "3d40a3a944529ea1ca04cf475e9ac235882fac17f3a2f7a95bbc2268004eda06",
    "lastconfirmedtxout": 0,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "ismirror": true,
      "proposer": {
        "address": "iCSb7jgkLSHJXiAsSPa7zqERYoprq5QUYZ",
        "auxdests": [
          {
            "address": "iF9hSjYCiZ8B1B3KLptX4nW98j8KonV2Ui",
            "type": 4
          }
        ],
        "type": 68
      },
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationheight": 619394,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          },
          {
            "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 9900000.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00025000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          },
          "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "c1e43b79d77e7a519e86490d80119fbcec758956215917c40a46e2719fc51360",
      "prevnotarizationout": 1,
      "prevheight": 3608708,
      "hashprevcrossnotarization": "a96b0d8b289489cae69013a80d884ee520f5a9d6082e3cdce3b5068f758abdad",
      "currencystates": [
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB": {
            "flags": 49,
            "version": 1,
            "currencyid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.25000000,
                "reserves": 46444.78716633,
                "priceinreserve": 1.79871838
              },
              {
                "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
                "weight": 0.25000000,
                "reserves": 763618.14123774,
                "priceinreserve": 29.57348004
              },
              {
                "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
                "weight": 0.25000000,
                "reserves": 8669.78461522,
                "priceinreserve": 0.33576428
              },
              {
                "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
                "weight": 0.25000000,
                "reserves": 1.04367581,
                "priceinreserve": 0.00004041
              }
            ],
            "initialsupply": 80000.00000000,
            "emitted": 0.00000000,
            "supply": 103284.17758057,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 110.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 1.79605462,
                "viaconversionprice": 1.79765161,
                "fees": 0.05500000,
                "conversionfees": 0.05500000,
                "priorweights": 0.25000000
              },
              "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.45254099,
                "lastconversionprice": 29.57349757,
                "viaconversionprice": 29.55595627,
                "fees": 0.00020010,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.33576428,
                "viaconversionprice": 0.33556535,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00247613,
                "lastconversionprice": 0.00004051,
                "viaconversionprice": 0.00004045,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608714,
          "stateroot": "7eb28112f46f9cb63e77e2f3257e50071aa401c484d41b6b8e1588d7f8b68deb",
          "blockhash": "84da9caf28b476bdd9ebe717e705758606822ba710f2b4fc441d9ea2dae971c0",
          "power": "00000000000d7a0ea41349a5c9e94360000000026e5624a8790cf9cce10d9be0"
        },
        {
          "version": 1,
          "type": 1,
          "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "height": 619394,
          "stateroot": "59a1c4e9f59360f9d893a52fda2a70f8dd09ef03a19c25c0710db3b80b49d320",
          "blockhash": "00000000000bf18a21e5a743d7410981e4bbf3be63e6426ce90261c94495106a",
          "power": "0000000000000001d7f0fe8ccd2c757e0000000000000001490e05d10412ab1d"
        }
      ],
      "nodes": [
        {
          "networkaddress": "65.109.123.188:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.59.40.199:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 619413,
    "besttxid": "d894fb792b280bee5652e1bf4295cd7a80c47e3563e6a74a7ce590b63eb6f2ea",
    "besttxout": 0,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 9900000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00025000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 264,
      "name": "CHIPS",
      "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "notarizationprotocol": 2,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3414690,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "preallocations": [
        {
          "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": 19849949.97690000
        }
      ],
      "initialcontributions": [
        0.00000000
      ],
      "gatewayconverterissuance": 150000.00000000,
      "idregistrationfees": 77.70000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "notaries": [
        "iCejozKaBwZHLGKRdbEL9nph8vShwTCEru",
        "iHqyTSUNhYMRKbHqRgGzjUnh1TJM3dnnj2",
        "iQoZQGnhRRRUwjfRAALzeknrja6KJ4cZgi",
        "iAcce56aAbjBYE8A2zWs4cejq8xL6w6LXx",
        "iCrkCEiFzCLRLEiRoJovaQUkvTKYrkQFf2",
        "iNjjRh1aRpdSSXpLjJLUHGbwsxZ6hgGeVe",
        "iGhdADLPZ3wKs1GHiniSGGF4arQaLfXYpm",
        "iPJreVeNTR2VzDNj8fFtQgjMLT11yoEAAY",
        "iG1RLyuwKMbJGFUVzoXRNAnyAs9MrHdmct",
        "iATW3A5WS2ns52BWZbGNkc4voN9c8u6brj",
        "iLoHAVc8hv2ntJodJTBXns9tQv8jFKFYpb"
      ],
      "minnotariesconfirm": 6,
      "currencyregistrationfee": 77.70000000,
      "pbaassystemregistrationfee": 7777.00000000,
      "currencyimportfee": 40.77700000,
      "transactionimportfee": 0.01000000,
      "transactionexportfee": 0.10000000,
      "gatewayconverterid": "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH",
      "gatewayconvertername": "Bridge",
      "initialtarget": "000000ff0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 10,
      "powaveragingwindow": 180,
      "notarizationperiod": 60,
      "eras": [
        {
          "reward": 3968258,
          "decay": 0,
          "halving": 12600000,
          "eraend": 0
        }
      ],
      "currencyidhex": "f315367528394674d45277e369629605a1c3ce9f",
      "fullyqualifiedname": "CHIPS",
      "definitiontxid": "d67bde7aa286ca6cd69516194fca3b68eeffcff1ef194530fdcc9b1d85846bca",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "144.217.65.10:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "198.244.188.47:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "15.235.160.231:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "167.114.197.250:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "51.161.198.160:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 1198680,
    "lastconfirmedtxid": "fd8db84d2f504df07592b12628fe61a82b2e6e2a54a421db137ad5dcd2e47744",
    "lastconfirmedtxout": 0,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "ismirror": true,
      "proposer": {
        "address": "RAo8ZTzU8zC8oZN6KwG2AEAD3cW7GqVu34",
        "auxdests": [
          {
            "address": "iLoHAVc8hv2ntJodJTBXns9tQv8jFKFYpb",
            "type": 4
          }
        ],
        "type": 66
      },
      "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "notarizationheight": 1198680,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 19999949.97690000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 40.77800000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "05596c551ae987f5eed6a2fb60f762d6bf0ad25c59151771b9d8b41b30f2f386",
      "prevnotarizationout": 1,
      "prevheight": 3608708,
      "hashprevcrossnotarization": "95a8ffc48d6af1b82585ea38e835e0575936d98b7c5ec6a64387ed7e0b6d2d84",
      "currencystates": [
        {
          "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH": {
            "flags": 49,
            "version": 1,
            "currencyid": "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.50000000,
                "reserves": 13703.00061727,
                "priceinreserve": 0.27478501
              },
              {
                "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
                "weight": 0.50000000,
                "reserves": 251928.30484633,
                "priceinreserve": 5.05189514
              }
            ],
            "initialsupply": 100000.00000000,
            "emitted": 0.00000000,
            "supply": 99736.15741959,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.07199934,
                "lastconversionprice": 0.27478645,
                "viaconversionprice": 0.27478536,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.50000000
              },
              "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": {
                "reservein": 1.32402552,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 5.05187550,
                "viaconversionprice": 5.05188186,
                "fees": 0.00138252,
                "conversionfees": 0.00066216,
                "priorweights": 0.50000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608714,
          "stateroot": "7eb28112f46f9cb63e77e2f3257e50071aa401c484d41b6b8e1588d7f8b68deb",
          "blockhash": "84da9caf28b476bdd9ebe717e705758606822ba710f2b4fc441d9ea2dae971c0",
          "power": "00000000000d7a0ea41349a5c9e94360000000026e5624a8790cf9cce10d9be0"
        },
        {
          "version": 1,
          "type": 1,
          "systemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
          "height": 1198680,
          "stateroot": "8dd2d8022abde2fd4a9fcbe89050be346408e4b4a728b8d37e410609b3bb9d18",
          "blockhash": "00000000001d573dafb78d5ff5d2261323a68ae2cb726cffddeee1e52b930777",
          "power": "00000000000000054640a56175be043100000000000000002789c9911d438bff"
        }
      ],
      "nodes": [
        {
          "networkaddress": "178.16.140.181:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 1199287,
    "besttxid": "41d9f189f3d5314830a758b90c3a14384e8bd32701aade4692dcc53b002a4e8a",
    "besttxout": 0,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 19999949.97690000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 40.77800000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  }
]






./verus listcurrencies '{"systemtype":"gateway"}'
[
  {
    "currencydefinition": {
      "version": 1,
      "options": 128,
      "name": "vETH",
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x71518580f36feceffe0721f06ba4703218cd7f63",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 0,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        10.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "initialcontributions": [
        0.00000000
      ],
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 0.01000000,
      "idreferrallevels": 3,
      "idimportfees": 2500000.00000000,
      "notaries": [
        "iGW68WRwhHWyKDRGsYDd84CQXUuDiJHHuF",
        "iHXYU7ve9tQHa4kr2m9ZSfJKpYZMq79KeB",
        "iArGFqFy2TNrgFB5U8w7QMhMC1N3jRSDkE",
        "iPHjrbdcpuq2R6V2wjpAdHfG5zV9izVFAB",
        "iFrb9Bxz3hoiie53pam4JMbRXEKEATV5tq",
        "iAb9qKbJojyAeSbC94JUgTPbvCRQm7gwty",
        "iABWvTHVazhZoc7yBLx5cANZfayauUemRd",
        "iAkaGVggvvTqZcUEb8AQW9jB4ktN3jbQvs",
        "iPeojLxt8virFNSGwR97kUtSkwXryXVns6",
        "i3VA3QoyVkXxogL9uVF3vAwGjSg2Yakatu",
        "iByTJrnrwStZyV2qnLg5jipp12rnAPfCZZ",
        "iGsc6WXgerUydfBkb1xF5pQ8vHraXtjytc",
        "iCNfNggEJeRt1NV1uQPJc1xV2tHmhKQCPo",
        "iJLKrwdW5WBW2yyRmcicWNcUchJ2MsvjVb",
        "i6444FftGwEAT8qNAYNx43pjnU6XYETrmG"
      ],
      "minnotariesconfirm": 8,
      "currencyregistrationfee": 5000000.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 5000000.00000000,
      "transactionimportfee": 1400000.00000000,
      "transactionexportfee": 700000.00000000,
      "gatewayconverterid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "gatewayconvertername": "Bridge",
      "currencyidhex": "52c7a71ed15802d33778235e7988d61339b84c45",
      "fullyqualifiedname": "vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "127.0.0.1:8000",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 22748212,
    "lastconfirmedtxid": "9a5b35302a3a86448e2b2cd5c26a7ea207591595ee719796f0fbbc2291c6f48a",
    "lastconfirmedtxout": 1,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "proposer": {
        "address": "iC3rq46jaEZmHVhESR3ruhqmzt5qEfBcxj",
        "type": 4
      },
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationheight": 22748212,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 10.00000000,
            "priceinreserve": 10.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 0.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 5.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "a7e337b60867604b32715199efa3b8cc8300a179fb27c02af1098af1e3051000",
      "prevnotarizationout": 1,
      "prevheight": 22748149,
      "hashprevcrossnotarization": "45df18aeb92312f3c10bbbd41a40e37fb93178ede8768c6279a4b1fdf0d214fb",
      "currencystates": [
        {
          "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
            "flags": 49,
            "version": 1,
            "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.25000000,
                "reserves": 350305.95313450,
                "priceinreserve": 5.28565827
              },
              {
                "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
                "weight": 0.25000000,
                "reserves": 813729.44195201,
                "priceinreserve": 12.27811209
              },
              {
                "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
                "weight": 0.25000000,
                "reserves": 436.85680764,
                "priceinreserve": 0.00659159
              },
              {
                "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
                "weight": 0.25000000,
                "reserves": 334.82001748,
                "priceinreserve": 0.00505199
              }
            ],
            "initialsupply": 100000.00000000,
            "emitted": 0.00000000,
            "supply": 265099.20598146,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.12953538,
                "lastconversionprice": 5.28566023,
                "viaconversionprice": 5.28370388,
                "fees": 0.00060030,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 1204.20475587,
                "lastconversionprice": 12.29628197,
                "viaconversionprice": 12.28491915,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00659159,
                "viaconversionprice": 0.00658916,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
                "reservein": 0.49500000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00504731,
                "viaconversionprice": 0.00505012,
                "fees": 0.00024748,
                "conversionfees": 0.00024748,
                "priorweights": 0.25000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608869,
          "stateroot": "9240598dcb6e218a5e21cfbc0a78ce19d6a3c7d6222d365e1d87eaff63fb6d27",
          "blockhash": "43d7d32b6dd03dcb94e4345868822dacf155412ac22c09d237827294d6de5e8f",
          "power": "00000000000d7a0eaa2543e0f1c0bde9000000026e5624a87940ab7e89820ba6"
        },
        {
          "version": 1,
          "type": 2,
          "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "height": 22748212,
          "stateroot": "b289922960f92d358abfcc4f64a32b615a3efe02e0927d54964aef84edbd23c6",
          "blockhash": "d3716eb7b4abe82661e86804a94bbb8b14286e1704e491972a270d1aa334645d",
          "power": "0000000000000000000000000000000000000000000000000000000000000000",
          "gasprice": 5.00000000
        }
      ],
      "nodes": [
        {
          "networkaddress": "135.181.136.102:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "157.90.113.198:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 22748235,
    "besttxid": "52ca3bb30adb93b64cec5cc0a8c48856ef07e0f2c0d4c2067d81e52cc1e89cbd",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 10.00000000,
          "priceinreserve": 10.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 5.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  }
]




















./verus listcurrencies '{"systemtype":"imported"}'[
  {
    "currencydefinition": {
      "version": 1,
      "options": 128,
      "name": "vETH",
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x71518580f36feceffe0721f06ba4703218cd7f63",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 0,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        10.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "initialcontributions": [
        0.00000000
      ],
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 0.01000000,
      "idreferrallevels": 3,
      "idimportfees": 2500000.00000000,
      "notaries": [
        "iGW68WRwhHWyKDRGsYDd84CQXUuDiJHHuF",
        "iHXYU7ve9tQHa4kr2m9ZSfJKpYZMq79KeB",
        "iArGFqFy2TNrgFB5U8w7QMhMC1N3jRSDkE",
        "iPHjrbdcpuq2R6V2wjpAdHfG5zV9izVFAB",
        "iFrb9Bxz3hoiie53pam4JMbRXEKEATV5tq",
        "iAb9qKbJojyAeSbC94JUgTPbvCRQm7gwty",
        "iABWvTHVazhZoc7yBLx5cANZfayauUemRd",
        "iAkaGVggvvTqZcUEb8AQW9jB4ktN3jbQvs",
        "iPeojLxt8virFNSGwR97kUtSkwXryXVns6",
        "i3VA3QoyVkXxogL9uVF3vAwGjSg2Yakatu",
        "iByTJrnrwStZyV2qnLg5jipp12rnAPfCZZ",
        "iGsc6WXgerUydfBkb1xF5pQ8vHraXtjytc",
        "iCNfNggEJeRt1NV1uQPJc1xV2tHmhKQCPo",
        "iJLKrwdW5WBW2yyRmcicWNcUchJ2MsvjVb",
        "i6444FftGwEAT8qNAYNx43pjnU6XYETrmG"
      ],
      "minnotariesconfirm": 8,
      "currencyregistrationfee": 5000000.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 5000000.00000000,
      "transactionimportfee": 1400000.00000000,
      "transactionexportfee": 700000.00000000,
      "gatewayconverterid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "gatewayconvertername": "Bridge",
      "currencyidhex": "52c7a71ed15802d33778235e7988d61339b84c45",
      "fullyqualifiedname": "vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "127.0.0.1:8000",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 22748212,
    "lastconfirmedtxid": "9a5b35302a3a86448e2b2cd5c26a7ea207591595ee719796f0fbbc2291c6f48a",
    "lastconfirmedtxout": 1,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "proposer": {
        "address": "iC3rq46jaEZmHVhESR3ruhqmzt5qEfBcxj",
        "type": 4
      },
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationheight": 22748212,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 10.00000000,
            "priceinreserve": 10.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 0.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 5.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "a7e337b60867604b32715199efa3b8cc8300a179fb27c02af1098af1e3051000",
      "prevnotarizationout": 1,
      "prevheight": 22748149,
      "hashprevcrossnotarization": "45df18aeb92312f3c10bbbd41a40e37fb93178ede8768c6279a4b1fdf0d214fb",
      "currencystates": [
        {
          "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
            "flags": 49,
            "version": 1,
            "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.25000000,
                "reserves": 350305.95313450,
                "priceinreserve": 5.28565827
              },
              {
                "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
                "weight": 0.25000000,
                "reserves": 813729.44195201,
                "priceinreserve": 12.27811209
              },
              {
                "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
                "weight": 0.25000000,
                "reserves": 436.85680764,
                "priceinreserve": 0.00659159
              },
              {
                "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
                "weight": 0.25000000,
                "reserves": 334.82001748,
                "priceinreserve": 0.00505199
              }
            ],
            "initialsupply": 100000.00000000,
            "emitted": 0.00000000,
            "supply": 265099.20598146,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.12953538,
                "lastconversionprice": 5.28566023,
                "viaconversionprice": 5.28370388,
                "fees": 0.00060030,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 1204.20475587,
                "lastconversionprice": 12.29628197,
                "viaconversionprice": 12.28491915,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00659159,
                "viaconversionprice": 0.00658916,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
                "reservein": 0.49500000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00504731,
                "viaconversionprice": 0.00505012,
                "fees": 0.00024748,
                "conversionfees": 0.00024748,
                "priorweights": 0.25000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608869,
          "stateroot": "9240598dcb6e218a5e21cfbc0a78ce19d6a3c7d6222d365e1d87eaff63fb6d27",
          "blockhash": "43d7d32b6dd03dcb94e4345868822dacf155412ac22c09d237827294d6de5e8f",
          "power": "00000000000d7a0eaa2543e0f1c0bde9000000026e5624a87940ab7e89820ba6"
        },
        {
          "version": 1,
          "type": 2,
          "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "height": 22748212,
          "stateroot": "b289922960f92d358abfcc4f64a32b615a3efe02e0927d54964aef84edbd23c6",
          "blockhash": "d3716eb7b4abe82661e86804a94bbb8b14286e1704e491972a270d1aa334645d",
          "power": "0000000000000000000000000000000000000000000000000000000000000000",
          "gasprice": 5.00000000
        }
      ],
      "nodes": [
        {
          "networkaddress": "135.181.136.102:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "157.90.113.198:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 22748235,
    "besttxid": "52ca3bb30adb93b64cec5cc0a8c48856ef07e0f2c0d4c2067d81e52cc1e89cbd",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 10.00000000,
          "priceinreserve": 10.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 5.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "MKR",
      "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
        "type": 9
      },
      "launchsystemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "startblock": 0,
      "endblock": 0,
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "21a2b645754e1812886bab56b60eaaa4c6aab565",
      "fullyqualifiedname": "MKR.vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 5
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "DAI",
      "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
        "type": 9
      },
      "launchsystemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "startblock": 0,
      "endblock": 0,
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "daa10c4f62cf85e39866d4ad76d326d3c2f1728b",
      "fullyqualifiedname": "DAI.vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 6
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2758800,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 0.01000000,
      "idreferrallevels": 0,
      "idimportfees": 0.00000003,
      "currencyidhex": "ebca0ade2cc8370d4ad82061867b4626bdeb0002",
      "fullyqualifiedname": "Bridge.vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 22
    },
    "bestheight": 3608958,
    "besttxid": "fd4c6aa4971379dc6bdfe2b38e259f5d00d45b0c467107736d054037248ddda3",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 351637.28090331,
          "priceinreserve": 5.30532993
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.25000000,
          "reserves": 805722.15850449,
          "priceinreserve": 12.15633869
        },
        {
          "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
          "weight": 0.25000000,
          "reserves": 435.82624381,
          "priceinreserve": 0.00657553
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 337.77412521,
          "priceinreserve": 0.00509616
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 265120.00973183,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 63.98400000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 24.08302045,
          "lastconversionprice": 5.30496919,
          "viaconversionprice": 5.30498651,
          "fees": 0.03380090,
          "conversionfees": 0.03200000,
          "priorweights": 0.25000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 227.47888260,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 12.15460460,
          "viaconversionprice": 12.15492718,
          "fees": 0.11373938,
          "conversionfees": 0.11373938,
          "priorweights": 0.25000000
        },
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00657553,
          "viaconversionprice": 0.00657476,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.13368026,
          "lastconversionprice": 0.00509818,
          "viaconversionprice": 0.00509662,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vLINK",
      "currencyid": "iJczmut8fHgRvVxaNfEPm7SkgJLDFtPcrK",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2777280,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "5d42bb467e3385238e9df7dfe5703aa2d40924a6",
      "fullyqualifiedname": "vLINK.vETH",
      "definitiontxid": "1aaf726d67bed46fa569f0a7474abb29252804fe73833d3a1509c8d5a802a908",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "EURC",
      "currencyid": "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2765931,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "6d446b02b755dd64048897b9ed74f41520335c5e",
      "fullyqualifiedname": "EURC.vETH",
      "definitiontxid": "eefacb28331ba9f2ddd7492cff10c8bbb7375f52a71dc92b105252b98970ab10",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "paxg",
      "currencyid": "iSYJ5L91bURKemiuALK1uBUXad3ZKCpDX7",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x45804880de22913dafe09f4980848ece6ecbaf78",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3051898,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "a6512e8a4290db8116a00b68a31fcc400c6801fd",
      "fullyqualifiedname": "paxg.vETH",
      "definitiontxid": "5ca908b302501518e2484f092ce3086ad6b0cb70dd05f3208b4a6b3600bd8913",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 264,
      "name": "vDEX",
      "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3159230,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "preallocations": [
        {
          "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": 819300.00000000
        }
      ],
      "initialcontributions": [
        0.00000000
      ],
      "gatewayconverterissuance": 43000.00000000,
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 2,
      "idimportfees": 0.00200000,
      "notaries": [
        "i6HRJuzHug7p1NXNEWFZzYuXq9Q5b6kw5E",
        "i9vysLqFUdYSYYpeTMADbsXbC1DXdjE2Yf",
        "iKXJrtWuTrja9xDWdcahu6euQe2P1hKJdy",
        "iJYWxX3qo7vDjqhGyoDtBM5NwMWiaBRQTc",
        "i5MYMsw9sFPjLba83jKWfPGWUjisy6zXiX",
        "iEfZmUfDHx1XR6bZV62ZniFyGdd6gcjjyy",
        "iC1ep1QL8FxUvvVVmodwsZFcv3oAG9fTvs",
        "iJWjwaRMp5t4rKSydHSMybzxruUZLgPeQp",
        "iBCWKY18bXN28bDucjzi1kPzBy3TgRFn9f",
        "i9Tt7c1NVRnXXot4HeSqW4GY7XxCpZdApq",
        "iRnwC9pYLwfFnaMKD5QLZzMo6HjTNvRDXv"
      ],
      "minnotariesconfirm": 6,
      "currencyregistrationfee": 10.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 5.00000000,
      "transactionimportfee": 0.00100000,
      "transactionexportfee": 0.00050000,
      "gatewayconverterid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
      "gatewayconvertername": "Bridge",
      "initialtarget": "000000ff0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 60,
      "powaveragingwindow": 45,
      "notarizationperiod": 10,
      "eras": [
        {
          "reward": 777000,
          "decay": 0,
          "halving": 643500,
          "eraend": 0
        }
      ],
      "currencyidhex": "53fe39eea8c06bba32f1a4e20db67e5524f0309d",
      "fullyqualifiedname": "vDEX",
      "definitiontxid": "dffce4bb3d0cf97acb12e8fd1bfba22b6672b54fea696501a1771c43cf86c117",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "198.244.188.47:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "37.187.149.92:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.4.87.18:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "51.161.198.160:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "178.159.2.25:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 449951,
    "lastconfirmedtxid": "dad294cd72a524669b66bbcdd74164301b6d3f8b9af38a1ad1c4de52e7cca3d1",
    "lastconfirmedtxout": 0,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "ismirror": true,
      "proposer": {
        "address": "RWyCyhLW4koEXs5ZaJabeBQ4LHuSYearod",
        "auxdests": [
          {
            "address": "iLoHAVc8hv2ntJodJTBXns9tQv8jFKFYpb",
            "type": 4
          }
        ],
        "type": 66
      },
      "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "notarizationheight": 449951,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 862300.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00239883,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "f406708c9e2703de16a14c207bc2cef2e87aedc66622391fc029c93b7d972b31",
      "prevnotarizationout": 1,
      "prevheight": 3608714,
      "hashprevcrossnotarization": "601a6b3feb9291045eb2018d9037c75720639ebf95cc7bea67603ea02ed90bdc",
      "currencystates": [
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9": {
            "flags": 49,
            "version": 1,
            "currencyid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.20000000,
                "reserves": 30124.43730056,
                "priceinreserve": 2.44185518
              },
              {
                "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
                "weight": 0.20000000,
                "reserves": 66971.75897928,
                "priceinreserve": 5.42866029
              },
              {
                "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
                "weight": 0.20000000,
                "reserves": 28.73357089,
                "priceinreserve": 0.00232911
              },
              {
                "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
                "weight": 0.20000000,
                "reserves": 69862.62020042,
                "priceinreserve": 5.66299046
              },
              {
                "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
                "weight": 0.20000000,
                "reserves": 0.67475909,
                "priceinreserve": 0.00005469
              }
            ],
            "initialsupply": 85000.00000000,
            "emitted": 0.00000000,
            "supply": 61683.50510556,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.04799984,
                "lastconversionprice": 2.44185907,
                "viaconversionprice": 2.44185544,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              },
              "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": {
                "reservein": 0.10673854,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 5.42865921,
                "viaconversionprice": 5.42865856,
                "fees": 0.00053360,
                "conversionfees": 0.00005336,
                "priorweights": 0.20000000
              },
              "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00232911,
                "viaconversionprice": 0.00232911,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              },
              "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 5.66299046,
                "viaconversionprice": 5.66298865,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              },
              "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00005469,
                "viaconversionprice": 0.00005469,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.20000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608714,
          "stateroot": "7eb28112f46f9cb63e77e2f3257e50071aa401c484d41b6b8e1588d7f8b68deb",
          "blockhash": "84da9caf28b476bdd9ebe717e705758606822ba710f2b4fc441d9ea2dae971c0",
          "power": "00000000000d7a0ea41349a5c9e94360000000026e5624a8790cf9cce10d9be0"
        },
        {
          "version": 1,
          "type": 1,
          "systemid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
          "height": 449951,
          "stateroot": "5337619e36c2cae438b7f9432c33517297452f7de1099e424d7b9d7759565683",
          "blockhash": "5a0e428874032fcc5a6e511f7842659fa1c25c3c2af98a9368d6bb9b3c2454f6",
          "power": "00000000000000001d03f8363036acd3000000000000000100a155d2a6e0a8b7"
        }
      ],
      "nodes": [
        {
          "networkaddress": "15.235.160.231:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "198.244.188.47:21777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 449961,
    "besttxid": "c4a1ad8aa6f4cdc1c57eb5c02599da2724dc340014dfa33b2351bfc4444126d1",
    "besttxout": 0,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 862300.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00239883,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
      "parent": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "systemid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3159230,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "prelaunchdiscount": 0.05000000,
      "initialsupply": 85000.00000000,
      "prelaunchcarveout": 0.00000000,
      "preallocations": [
        {
          "i5v3h9FWVdRFbNHU7DfcpGykQjRaHtMqu7": 5000.00000000
        },
        {
          "iQXPpqsMsMZKauJ4sGHKppSfoeaZ1ggvZu": 10000.00000000
        }
      ],
      "gateway": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 43000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "6a274253b910d4d003e9a97438eb38d0c4eea523",
      "fullyqualifiedname": "Bridge.vDEX",
      "definitiontxid": "dffce4bb3d0cf97acb12e8fd1bfba22b6672b54fea696501a1771c43cf86c117",
      "definitiontxout": 5
    },
    "bestheight": 3159229,
    "besttxid": "8c3e445c76af5c1ef6e187982783067f0e0c754f7562b2d6ef4f0821f266e39c",
    "besttxout": 3,
    "bestcurrencystate": {
      "flags": 27,
      "version": 1,
      "currencyid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 100774.41009750,
          "priceinreserve": 5.03872050
        },
        {
          "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
          "weight": 0.20000000,
          "reserves": 43000.00000000,
          "priceinreserve": 2.15000000
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.20000000,
          "reserves": 28.21971680,
          "priceinreserve": 0.00141098
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.20000000,
          "reserves": 87610.75715539,
          "priceinreserve": 4.38053785
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.20000000,
          "reserves": 1.31390724,
          "priceinreserve": 0.00006569
        }
      ],
      "initialsupply": 85000.00000000,
      "emitted": 15000.00000000,
      "supply": 100000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 100774.41009750,
          "primarycurrencyin": 100749.21019500,
          "reserveout": 0.00000000,
          "lastconversionprice": 4.74232519,
          "viaconversionprice": 5.92790648,
          "fees": 100.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": {
          "reservein": 43000.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 2.52941176,
          "viaconversionprice": 2.52941177,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 28.21971680,
          "primarycurrencyin": 28.21266016,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00132799,
          "viaconversionprice": 0.00165999,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 87610.75715539,
          "primarycurrencyin": 87588.84898909,
          "reserveout": 0.00000000,
          "lastconversionprice": 4.12285917,
          "viaconversionprice": 5.15357396,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 1.31390724,
          "primarycurrencyin": 1.31357873,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00006184,
          "viaconversionprice": 0.00007729,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 15000.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "Bankroll",
      "currencyid": "iDetLA1snrDVhCCk42rdWfqmJcYCMcEFry",
      "parent": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "systemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "startblock": 492222,
      "endblock": 0,
      "currencies": [
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "minpreconversion": [
        0.00000001,
        0.00000001,
        0.00000001,
        25000.00000000
      ],
      "initialsupply": 1000000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 7.77000000,
      "idreferrallevels": 1,
      "idimportfees": 0.00000003,
      "currencyidhex": "d545ab8bc0745632d4908061e93009b7b6dca66f",
      "fullyqualifiedname": "Bankroll.CHIPS",
      "definitiontxid": "622d9a0bcc2b4f43b322fb40a17dd9230a71a79c4fc17c959add17270d720d32",
      "definitiontxout": 5
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vwBTC",
      "currencyid": "iS3NjE3XRYWoHRoovpLhFnbDraCq7NFStf",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2782714,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "590cc940ca125014eb883d8ca6ba75915c3a89f7",
      "fullyqualifiedname": "vwBTC.vETH",
      "definitiontxid": "96e4be8e07a51733dd89ca0d9acb5bb59446b81d0d1b5fbd294afe5b74301132",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "pepecoin",
      "currencyid": "i5VVBEi6efBrXMaeqFW3MTPSzbmpNLysGR",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xa9e8acf069c58aec8825542845fd754e41a9489a",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3336638,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "be1b5a5ef316a7e0a6041eabf624dfd9d0c81e16",
      "fullyqualifiedname": "pepecoin.vETH",
      "definitiontxid": "34ee8d707e61568a42b9ad7c23505498028de1e2c5f9d56b2e487c8405f30233",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "Highroller",
      "currencyid": "iNLBYPcNM3c5mzRdtfjd9Hk86WPijQfZhW",
      "parent": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "systemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "startblock": 492345,
      "endblock": 0,
      "currencies": [
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.50000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "minpreconversion": [
        0.00000001,
        0.00000001,
        0.30000000
      ],
      "initialsupply": 1000000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 777.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.00000000,
      "currencyidhex": "ced7d4a623f053f466531befb9b6f39c3975d6ce",
      "fullyqualifiedname": "Highroller.CHIPS",
      "definitiontxid": "5fff63825244554e74f889249a98026cd578a4f34c2b249726efc6c1a1cb1748",
      "definitiontxout": 5
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "OIL",
      "currencyid": "i4YYnZvzhaQPJvQsVMsDPjPouLSEpZS6vP",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x921c91fe10dc5718b74b9371755b91caa49fcc48",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2818647,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "867242e59f1459397126eedb56502b4258ebba0b",
      "fullyqualifiedname": "OIL.vETH",
      "definitiontxid": "c476914de26143e23b60682f30e20fceb6a1892eb8c597b22b992984b297964a",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "tBTC",
      "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x18084fba666a33d37592fa2633fd49a74dd93a88",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2813208,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "08c3027f32f50d8593822e45c4d7da12446d7ff8",
      "fullyqualifiedname": "tBTC.vETH",
      "definitiontxid": "521d03133078af43afb0343742f2adfd042fe31fb1830f94d56f02919dae094f",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 268,
      "name": "vARRR",
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2986660,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X"
      ],
      "conversions": [
        1.00000000,
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000,
        0.00000000
      ],
      "preallocations": [
        {
          "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": 9400000.00000000
        }
      ],
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 500000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "notaries": [
        "iEGoYCsnSJSzt1kQzR7HjXv1ziCEAAn4VW",
        "iMEjMWbjy4HmNsRPMSnXfaknxacY6CU4Mf",
        "iJjCZgUbBDNgsHFRMcYPV3B61cvJri9Vpi",
        "iF9hSjYCiZ8B1B3KLptX4nW98j8KonV2Ui",
        "iRvxpXgY7gyuNj4PtcENxHP34J2wC78YHd",
        "iMEjUTZFS6T7s7M48izd5SPKnnrwSeerWk",
        "iPkWiJi6SAsCepS7qz3R3ah2dRiFDEbySS",
        "iF29cxgMn6oAQwRc8wPTBNAAjbqNUtPoqX",
        "iLhPGd6CmJ4c99AiJ7nPjT4bzMQc5aYbyS",
        "iEXXfyxeuUzTZ1ZoM47ht9F5B4sUKfD2hg",
        "iRhBRttmktjn7eQERCm548tABEgheF3HUL"
      ],
      "minnotariesconfirm": 6,
      "currencyregistrationfee": 200.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 100.00000000,
      "transactionimportfee": 0.01000000,
      "transactionexportfee": 0.01000000,
      "gatewayconverterid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
      "gatewayconvertername": "Bridge",
      "initialtarget": "000000ff0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 60,
      "powaveragingwindow": 45,
      "notarizationperiod": 10,
      "eras": [
        {
          "reward": 8000000,
          "decay": 0,
          "halving": 0,
          "eraend": 1125001
        },
        {
          "reward": 200000,
          "decay": 0,
          "halving": 0,
          "eraend": 6125001
        },
        {
          "reward": 0,
          "decay": 0,
          "halving": 0,
          "eraend": 0
        }
      ],
      "currencyidhex": "e9e10955b7d16031e3d6f55d9c908a038e3ae47d",
      "fullyqualifiedname": "vARRR",
      "definitiontxid": "196dacfc5f9d452f0ec3bfb1b4d571c6f50ebd8d55dd51119a23838a9825d758",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "198.244.188.47:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "37.187.149.92:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.4.87.18:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "51.161.198.160:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "178.159.2.25:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 619394,
    "lastconfirmedtxid": "3d40a3a944529ea1ca04cf475e9ac235882fac17f3a2f7a95bbc2268004eda06",
    "lastconfirmedtxout": 0,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "ismirror": true,
      "proposer": {
        "address": "iCSb7jgkLSHJXiAsSPa7zqERYoprq5QUYZ",
        "auxdests": [
          {
            "address": "iF9hSjYCiZ8B1B3KLptX4nW98j8KonV2Ui",
            "type": 4
          }
        ],
        "type": 68
      },
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationheight": 619394,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          },
          {
            "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 9900000.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00025000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          },
          "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "c1e43b79d77e7a519e86490d80119fbcec758956215917c40a46e2719fc51360",
      "prevnotarizationout": 1,
      "prevheight": 3608708,
      "hashprevcrossnotarization": "a96b0d8b289489cae69013a80d884ee520f5a9d6082e3cdce3b5068f758abdad",
      "currencystates": [
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB": {
            "flags": 49,
            "version": 1,
            "currencyid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.25000000,
                "reserves": 46444.78716633,
                "priceinreserve": 1.79871838
              },
              {
                "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
                "weight": 0.25000000,
                "reserves": 763618.14123774,
                "priceinreserve": 29.57348004
              },
              {
                "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
                "weight": 0.25000000,
                "reserves": 8669.78461522,
                "priceinreserve": 0.33576428
              },
              {
                "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
                "weight": 0.25000000,
                "reserves": 1.04367581,
                "priceinreserve": 0.00004041
              }
            ],
            "initialsupply": 80000.00000000,
            "emitted": 0.00000000,
            "supply": 103284.17758057,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 110.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 1.79605462,
                "viaconversionprice": 1.79765161,
                "fees": 0.05500000,
                "conversionfees": 0.05500000,
                "priorweights": 0.25000000
              },
              "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.45254099,
                "lastconversionprice": 29.57349757,
                "viaconversionprice": 29.55595627,
                "fees": 0.00020010,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.33576428,
                "viaconversionprice": 0.33556535,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00247613,
                "lastconversionprice": 0.00004051,
                "viaconversionprice": 0.00004045,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608714,
          "stateroot": "7eb28112f46f9cb63e77e2f3257e50071aa401c484d41b6b8e1588d7f8b68deb",
          "blockhash": "84da9caf28b476bdd9ebe717e705758606822ba710f2b4fc441d9ea2dae971c0",
          "power": "00000000000d7a0ea41349a5c9e94360000000026e5624a8790cf9cce10d9be0"
        },
        {
          "version": 1,
          "type": 1,
          "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "height": 619394,
          "stateroot": "59a1c4e9f59360f9d893a52fda2a70f8dd09ef03a19c25c0710db3b80b49d320",
          "blockhash": "00000000000bf18a21e5a743d7410981e4bbf3be63e6426ce90261c94495106a",
          "power": "0000000000000001d7f0fe8ccd2c757e0000000000000001490e05d10412ab1d"
        }
      ],
      "nodes": [
        {
          "networkaddress": "65.109.123.188:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "46.59.40.199:20777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 619413,
    "besttxid": "d894fb792b280bee5652e1bf4295cd7a80c47e3563e6a74a7ce590b63eb6f2ea",
    "besttxout": 0,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 9900000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00025000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
      "parent": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "systemid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2986660,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
        "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "prelaunchdiscount": 0.05000000,
      "initialsupply": 80000.00000000,
      "prelaunchcarveout": 0.00000000,
      "preallocations": [
        {
          "i5v3h9FWVdRFbNHU7DfcpGykQjRaHtMqu7": 20000.00000000
        }
      ],
      "gateway": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 500000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "1d271d1a9ef8a6b9f5ac8c488bc42067a5d95669",
      "fullyqualifiedname": "Bridge.vARRR",
      "definitiontxid": "196dacfc5f9d452f0ec3bfb1b4d571c6f50ebd8d55dd51119a23838a9825d758",
      "definitiontxout": 5
    },
    "bestheight": 2986659,
    "besttxid": "68e3cfd6cade957c1d2fadeca6f27a01cf63cd6693f8e5ed71338851973c637c",
    "besttxout": 3,
    "bestcurrencystate": {
      "flags": 27,
      "version": 1,
      "currencyid": "iD5WRg7jdQM1uuoVHsBCAEKfJCKGs1U3TB",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 67081.42013852,
          "priceinreserve": 2.68325680
        },
        {
          "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "weight": 0.25000000,
          "reserves": 500000.00000000,
          "priceinreserve": 20.00000000
        },
        {
          "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
          "weight": 0.25000000,
          "reserves": 6702.39307585,
          "priceinreserve": 0.26809572
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.25000000,
          "reserves": 1.11617918,
          "priceinreserve": 0.00004464
        }
      ],
      "initialsupply": 80000.00000000,
      "emitted": 20000.00000000,
      "supply": 100000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 67081.42013852,
          "primarycurrencyin": 67064.64558989,
          "reserveout": 0.00000000,
          "lastconversionprice": 2.51555321,
          "viaconversionprice": 3.35407101,
          "fees": 100.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
          "reservein": 500000.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 25.00000000,
          "viaconversionprice": 25.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
          "reservein": 6702.39307585,
          "primarycurrencyin": 6700.71705862,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.25133975,
          "viaconversionprice": 0.33511966,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 1.11617918,
          "primarycurrencyin": 1.11590011,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00004186,
          "viaconversionprice": 0.00005581,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 20000.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "thUSD",
      "currencyid": "iD18hxe8Qpt9QMWn3xgFjDyqyBqS7NQsex",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xcfc5bd99915aaa815401c5a41a927ab7a38d29cf",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3337162,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "39e030a1ef019d98d2ad6af29f971663580e8368",
      "fullyqualifiedname": "thUSD.vETH",
      "definitiontxid": "51316dca295bff3772c4dd6acae83196ecddad595fc9d315e7524ba9aa925f5e",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vUSDT",
      "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2788858,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "fda7f4b7b72772e13a02a81ee71112fbf7ce5845",
      "fullyqualifiedname": "vUSDT.vETH",
      "definitiontxid": "e2f0e53630f5f14821484bd133a1f903c1b9a68804b201eb225c73fcd17be165",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "scrvUSD",
      "currencyid": "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x0655977feb2f289a4ab78af67bab0d17aab84367",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3322516,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "5e41213856c739e352b6b1490b81dd1625102f45",
      "fullyqualifiedname": "scrvUSD.vETH",
      "definitiontxid": "cda889372eb97a980423a160261e7dc3093502a62b1085459a642442cb903a86",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "NATI",
      "currencyid": "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x4f14e88b5037f0ca24348fa707e4a7ee5318d9d5",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3155220,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "e40986128dc1c15b285328926fc8f2c94f2639b6",
      "fullyqualifiedname": "NATI.vETH",
      "definitiontxid": "12b57c342d20e73dcc6d9c4c7bf7a476a2dafdd522b491808a919e17156a099d",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vUSDC",
      "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2780158,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "67d6df2ccc766daffb1f36ccc9b8b5f0db5cd11b",
      "fullyqualifiedname": "vUSDC.vETH",
      "definitiontxid": "c2044237229427a4d898eec2db0e3cccfce5e68aa65a551333b5207b2811dbb9",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "OVERRIDE",
      "currencyid": "iSUD6kGQKDaFUfK6EMYRtR4SNU4wjhEpMi",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x71e64383b4fef62426dd1f7483df75f832b84722",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2844022,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "0c6ba3537a26b44d69b2c1c8b0894077d4963bfc",
      "fullyqualifiedname": "OVERRIDE.vETH",
      "definitiontxid": "d029a79d26fe282c9eac13536b4e43048de9c611bd362db340f0e48c866c1ebd",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "TRAC",
      "currencyid": "iEnQEjjozf1HZkqFT9U4NKnzz1iGZ7LbJ4",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2760318,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "9f1a475afd3adfd3c8f897b08055a16b4bdd0a7c",
      "fullyqualifiedname": "TRAC.vETH",
      "definitiontxid": "b6b1bc919d7597aab65ccdea8a3a77479d63baae0029cd0d1d8b176b3a97bdc6",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "vMars4",
      "currencyid": "iNtUUdjsqV34snGZJerAvPLaojo6tV9sfd",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x16cda4028e9e872a38acb903176719299beaed87",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2786426,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "8da897c4b951f3c1024b37db696d167acfe7f1d4",
      "fullyqualifiedname": "vMars4",
      "definitiontxid": "17dfba7261913d7d607cce75b4926180477519fb03300004dab1f933f3b457ca",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 264,
      "name": "CHIPS",
      "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "notarizationprotocol": 2,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3414690,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "preallocations": [
        {
          "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": 19849949.97690000
        }
      ],
      "initialcontributions": [
        0.00000000
      ],
      "gatewayconverterissuance": 150000.00000000,
      "idregistrationfees": 77.70000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "notaries": [
        "iCejozKaBwZHLGKRdbEL9nph8vShwTCEru",
        "iHqyTSUNhYMRKbHqRgGzjUnh1TJM3dnnj2",
        "iQoZQGnhRRRUwjfRAALzeknrja6KJ4cZgi",
        "iAcce56aAbjBYE8A2zWs4cejq8xL6w6LXx",
        "iCrkCEiFzCLRLEiRoJovaQUkvTKYrkQFf2",
        "iNjjRh1aRpdSSXpLjJLUHGbwsxZ6hgGeVe",
        "iGhdADLPZ3wKs1GHiniSGGF4arQaLfXYpm",
        "iPJreVeNTR2VzDNj8fFtQgjMLT11yoEAAY",
        "iG1RLyuwKMbJGFUVzoXRNAnyAs9MrHdmct",
        "iATW3A5WS2ns52BWZbGNkc4voN9c8u6brj",
        "iLoHAVc8hv2ntJodJTBXns9tQv8jFKFYpb"
      ],
      "minnotariesconfirm": 6,
      "currencyregistrationfee": 77.70000000,
      "pbaassystemregistrationfee": 7777.00000000,
      "currencyimportfee": 40.77700000,
      "transactionimportfee": 0.01000000,
      "transactionexportfee": 0.10000000,
      "gatewayconverterid": "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH",
      "gatewayconvertername": "Bridge",
      "initialtarget": "000000ff0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 10,
      "powaveragingwindow": 180,
      "notarizationperiod": 60,
      "eras": [
        {
          "reward": 3968258,
          "decay": 0,
          "halving": 12600000,
          "eraend": 0
        }
      ],
      "currencyidhex": "f315367528394674d45277e369629605a1c3ce9f",
      "fullyqualifiedname": "CHIPS",
      "definitiontxid": "d67bde7aa286ca6cd69516194fca3b68eeffcff1ef194530fdcc9b1d85846bca",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "144.217.65.10:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "198.244.188.47:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "15.235.160.231:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "167.114.197.250:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "51.161.198.160:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 1198680,
    "lastconfirmedtxid": "fd8db84d2f504df07592b12628fe61a82b2e6e2a54a421db137ad5dcd2e47744",
    "lastconfirmedtxout": 0,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "ismirror": true,
      "proposer": {
        "address": "RAo8ZTzU8zC8oZN6KwG2AEAD3cW7GqVu34",
        "auxdests": [
          {
            "address": "iLoHAVc8hv2ntJodJTBXns9tQv8jFKFYpb",
            "type": 4
          }
        ],
        "type": 66
      },
      "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "notarizationheight": 1198680,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 1.00000000,
            "priceinreserve": 1.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 19999949.97690000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 1.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 40.77800000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "05596c551ae987f5eed6a2fb60f762d6bf0ad25c59151771b9d8b41b30f2f386",
      "prevnotarizationout": 1,
      "prevheight": 3608708,
      "hashprevcrossnotarization": "95a8ffc48d6af1b82585ea38e835e0575936d98b7c5ec6a64387ed7e0b6d2d84",
      "currencystates": [
        {
          "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH": {
            "flags": 49,
            "version": 1,
            "currencyid": "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.50000000,
                "reserves": 13703.00061727,
                "priceinreserve": 0.27478501
              },
              {
                "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
                "weight": 0.50000000,
                "reserves": 251928.30484633,
                "priceinreserve": 5.05189514
              }
            ],
            "initialsupply": 100000.00000000,
            "emitted": 0.00000000,
            "supply": 99736.15741959,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.07199934,
                "lastconversionprice": 0.27478645,
                "viaconversionprice": 0.27478536,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.50000000
              },
              "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": {
                "reservein": 1.32402552,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 5.05187550,
                "viaconversionprice": 5.05188186,
                "fees": 0.00138252,
                "conversionfees": 0.00066216,
                "priorweights": 0.50000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608714,
          "stateroot": "7eb28112f46f9cb63e77e2f3257e50071aa401c484d41b6b8e1588d7f8b68deb",
          "blockhash": "84da9caf28b476bdd9ebe717e705758606822ba710f2b4fc441d9ea2dae971c0",
          "power": "00000000000d7a0ea41349a5c9e94360000000026e5624a8790cf9cce10d9be0"
        },
        {
          "version": 1,
          "type": 1,
          "systemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
          "height": 1198680,
          "stateroot": "8dd2d8022abde2fd4a9fcbe89050be346408e4b4a728b8d37e410609b3bb9d18",
          "blockhash": "00000000001d573dafb78d5ff5d2261323a68ae2cb726cffddeee1e52b930777",
          "power": "00000000000000054640a56175be043100000000000000002789c9911d438bff"
        }
      ],
      "nodes": [
        {
          "networkaddress": "178.16.140.181:22777",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 1199287,
    "besttxid": "41d9f189f3d5314830a758b90c3a14384e8bd32701aade4692dcc53b002a4e8a",
    "besttxout": 0,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 1.00000000,
          "priceinreserve": 1.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 19999949.97690000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 40.77800000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH",
      "parent": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "systemid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3414690,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP"
      ],
      "weights": [
        0.50000000,
        0.50000000
      ],
      "conversions": [
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "gateway": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 150000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "192b10ec519f6faec7932d22ace838f6931c7503",
      "fullyqualifiedname": "Bridge.CHIPS",
      "definitiontxid": "d67bde7aa286ca6cd69516194fca3b68eeffcff1ef194530fdcc9b1d85846bca",
      "definitiontxout": 5
    },
    "bestheight": 3414689,
    "besttxid": "d43fabd5d3b5dade3aa0bdad5b3382e4f7bbcfda008111c8208e19a62d9727c2",
    "besttxout": 3,
    "bestcurrencystate": {
      "flags": 27,
      "version": 1,
      "currencyid": "i3nokiCTVevZMLpR3VmZ7YDfCqA5juUqqH",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 23070.23100000,
          "priceinreserve": 0.46140462
        },
        {
          "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
          "weight": 0.50000000,
          "reserves": 150000.00000000,
          "priceinreserve": 3.00000000
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 100000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 23070.23100000,
          "primarycurrencyin": 23064.46200000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.23070231,
          "viaconversionprice": 0.46140462,
          "fees": 100.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        },
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": {
          "reservein": 150000.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 3.00000000,
          "viaconversionprice": 3.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "xaut",
      "currencyid": "i7eFvyL44S2iWz9EZjd6HTaBioFqhALcdi",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x68749665ff8d2d112fa859aa293f07a622782f38",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3054776,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "a4d51e14ab3f231d5e65118e4c9b5793f5b8b72d",
      "fullyqualifiedname": "xaut.vETH",
      "definitiontxid": "6d02a291d003714cf45860d92396f5924af898006e2379179ad07a87c18d92cf",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "BAT",
      "currencyid": "i9A4wBXUastzupqZwkich4zhCtziZS1JoF",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2980300,
      "endblock": 0,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "9c158cb0a9c6a2c2a95a7db70ff08ec5d725533e",
      "fullyqualifiedname": "BAT.vETH",
      "definitiontxid": "be86bcb120f25a0b2f94877ab778572e2bebb1be47e70f7d67c29ba3cd3bf8fc",
      "definitiontxout": 1
    },
    "bestheight": 0
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "crvUSD",
      "currencyid": "iQ1mX2VtESKfJ3PoWVcYKfnDEpYkWW59ZB",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0xf939e0a03fb07f59a73314e73794be0e57ac1b4e",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3322994,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        1.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "81654f84691ce16b43180409d803a48e182b4be1",
      "fullyqualifiedname": "crvUSD.vETH",
      "definitiontxid": "09676ac486330d179acb34431a74320ad61bc757942e50e34a68a77886fb19fe",
      "definitiontxout": 1
    },
    "bestheight": 0
  }
]





./verus listcurrencies '{"systemtype":"local"}'
[
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "NATI🦉",
      "currencyid": "iH37kRsdfoHtHK5TottP1Yfq8hBSHz9btw",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3230833,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "minpreconversion": [
        3333.00000000,
        1.00000000,
        23.00000000,
        2333333.00000000
      ],
      "maxpreconversion": [
        3333333.00000000,
        3333.00000000,
        33333.00000000,
        333333333.00000000
      ],
      "initialsupply": 88888.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 3333.33330000,
      "idreferrallevels": 3,
      "idimportfees": 0.00000003,
      "currencyidhex": "558f0d8e1c0cda7d5b6b1d3f7ba88d678597c394",
      "fullyqualifiedname": "NATI🦉",
      "definitiontxid": "440c74e2b2cf7cc54fa2647e2cb2755d09a77f77ffd2847604162f2491282601",
      "definitiontxout": 1
    },
    "bestheight": 3608956,
    "besttxid": "474c730af41fa96ee4082181a7a5ea60406f6a6d7c80885ee9f2e95b6be910c0",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iH37kRsdfoHtHK5TottP1Yfq8hBSHz9btw",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 2270178.17346181,
          "priceinreserve": 130.32175783
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.25000000,
          "reserves": 50.60850330,
          "priceinreserve": 0.00290522
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 2174.86057442,
          "priceinreserve": 0.12484995
        },
        {
          "currencyid": "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx",
          "weight": 0.25000000,
          "reserves": 988594084.18258211,
          "priceinreserve": 56751.19263586
        }
      ],
      "initialsupply": 88888.00000000,
      "emitted": 0.00000000,
      "supply": 69679.17594442,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 281.45027675,
          "lastconversionprice": 130.33791476,
          "viaconversionprice": 130.31550279,
          "fees": 0.00160080,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00627275,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.02226654,
          "lastconversionprice": 0.00290623,
          "viaconversionprice": 0.00290542,
          "fees": 0.00000312,
          "conversionfees": 0.00000312,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.95710000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.12482339,
          "viaconversionprice": 0.12483234,
          "fees": 0.00047854,
          "conversionfees": 0.00047854,
          "priorweights": 0.25000000
        },
        "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 56751.19263586,
          "viaconversionprice": 56743.19282591,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 128,
      "name": "vETH",
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 3,
      "nativecurrencyid": {
        "address": "0x71518580f36feceffe0721f06ba4703218cd7f63",
        "type": 9
      },
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 0,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        10.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "initialcontributions": [
        0.00000000
      ],
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 0.01000000,
      "idreferrallevels": 3,
      "idimportfees": 2500000.00000000,
      "notaries": [
        "iGW68WRwhHWyKDRGsYDd84CQXUuDiJHHuF",
        "iHXYU7ve9tQHa4kr2m9ZSfJKpYZMq79KeB",
        "iArGFqFy2TNrgFB5U8w7QMhMC1N3jRSDkE",
        "iPHjrbdcpuq2R6V2wjpAdHfG5zV9izVFAB",
        "iFrb9Bxz3hoiie53pam4JMbRXEKEATV5tq",
        "iAb9qKbJojyAeSbC94JUgTPbvCRQm7gwty",
        "iABWvTHVazhZoc7yBLx5cANZfayauUemRd",
        "iAkaGVggvvTqZcUEb8AQW9jB4ktN3jbQvs",
        "iPeojLxt8virFNSGwR97kUtSkwXryXVns6",
        "i3VA3QoyVkXxogL9uVF3vAwGjSg2Yakatu",
        "iByTJrnrwStZyV2qnLg5jipp12rnAPfCZZ",
        "iGsc6WXgerUydfBkb1xF5pQ8vHraXtjytc",
        "iCNfNggEJeRt1NV1uQPJc1xV2tHmhKQCPo",
        "iJLKrwdW5WBW2yyRmcicWNcUchJ2MsvjVb",
        "i6444FftGwEAT8qNAYNx43pjnU6XYETrmG"
      ],
      "minnotariesconfirm": 8,
      "currencyregistrationfee": 5000000.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 5000000.00000000,
      "transactionimportfee": 1400000.00000000,
      "transactionexportfee": 700000.00000000,
      "gatewayconverterid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "gatewayconvertername": "Bridge",
      "currencyidhex": "52c7a71ed15802d33778235e7988d61339b84c45",
      "fullyqualifiedname": "vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "127.0.0.1:8000",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 22748212,
    "lastconfirmedtxid": "9a5b35302a3a86448e2b2cd5c26a7ea207591595ee719796f0fbbc2291c6f48a",
    "lastconfirmedtxout": 1,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "proposer": {
        "address": "iC3rq46jaEZmHVhESR3ruhqmzt5qEfBcxj",
        "type": 4
      },
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationheight": 22748212,
      "currencystate": {
        "flags": 48,
        "version": 1,
        "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "launchcurrencies": [
          {
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "weight": 0.00000000,
            "reserves": 10.00000000,
            "priceinreserve": 10.00000000
          }
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 0.00000000,
        "currencies": {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "reservein": 0.00000000,
            "primarycurrencyin": 0.00000000,
            "reserveout": 0.00000000,
            "lastconversionprice": 5.00000000,
            "viaconversionprice": 0.00000000,
            "fees": 0.00000000,
            "conversionfees": 0.00000000,
            "priorweights": 0.00000000
          }
        },
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "a7e337b60867604b32715199efa3b8cc8300a179fb27c02af1098af1e3051000",
      "prevnotarizationout": 1,
      "prevheight": 22748149,
      "hashprevcrossnotarization": "45df18aeb92312f3c10bbbd41a40e37fb93178ede8768c6279a4b1fdf0d214fb",
      "currencystates": [
        {
          "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx": {
            "flags": 49,
            "version": 1,
            "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
            "reservecurrencies": [
              {
                "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
                "weight": 0.25000000,
                "reserves": 350305.95313450,
                "priceinreserve": 5.28565827
              },
              {
                "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
                "weight": 0.25000000,
                "reserves": 813729.44195201,
                "priceinreserve": 12.27811209
              },
              {
                "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
                "weight": 0.25000000,
                "reserves": 436.85680764,
                "priceinreserve": 0.00659159
              },
              {
                "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
                "weight": 0.25000000,
                "reserves": 334.82001748,
                "priceinreserve": 0.00505199
              }
            ],
            "initialsupply": 100000.00000000,
            "emitted": 0.00000000,
            "supply": 265099.20598146,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.12953538,
                "lastconversionprice": 5.28566023,
                "viaconversionprice": 5.28370388,
                "fees": 0.00060030,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 1204.20475587,
                "lastconversionprice": 12.29628197,
                "viaconversionprice": 12.28491915,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00659159,
                "viaconversionprice": 0.00658916,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
                "reservein": 0.49500000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00504731,
                "viaconversionprice": 0.00505012,
                "fees": 0.00024748,
                "conversionfees": 0.00024748,
                "priorweights": 0.25000000
              }
            },
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        },
        {
          "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
            "flags": 16,
            "version": 1,
            "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
            "launchcurrencies": [
            ],
            "initialsupply": 0.00000000,
            "emitted": 0.00000000,
            "supply": 0.00000000,
            "primarycurrencyfees": 0.00000000,
            "primarycurrencyconversionfees": 0.00000000,
            "primarycurrencyout": 0.00000000,
            "preconvertedout": 0.00000000
          }
        }
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608869,
          "stateroot": "9240598dcb6e218a5e21cfbc0a78ce19d6a3c7d6222d365e1d87eaff63fb6d27",
          "blockhash": "43d7d32b6dd03dcb94e4345868822dacf155412ac22c09d237827294d6de5e8f",
          "power": "00000000000d7a0eaa2543e0f1c0bde9000000026e5624a87940ab7e89820ba6"
        },
        {
          "version": 1,
          "type": 2,
          "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "height": 22748212,
          "stateroot": "b289922960f92d358abfcc4f64a32b615a3efe02e0927d54964aef84edbd23c6",
          "blockhash": "d3716eb7b4abe82661e86804a94bbb8b14286e1704e491972a270d1aa334645d",
          "power": "0000000000000000000000000000000000000000000000000000000000000000",
          "gasprice": 5.00000000
        }
      ],
      "nodes": [
        {
          "networkaddress": "135.181.136.102:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "157.90.113.198:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 22748235,
    "besttxid": "52ca3bb30adb93b64cec5cc0a8c48856ef07e0f2c0d4c2067d81e52cc1e89cbd",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 10.00000000,
          "priceinreserve": 10.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 5.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2758800,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 0.01000000,
      "idreferrallevels": 0,
      "idimportfees": 0.00000003,
      "currencyidhex": "ebca0ade2cc8370d4ad82061867b4626bdeb0002",
      "fullyqualifiedname": "Bridge.vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 22
    },
    "bestheight": 3608958,
    "besttxid": "fd4c6aa4971379dc6bdfe2b38e259f5d00d45b0c467107736d054037248ddda3",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 351637.28090331,
          "priceinreserve": 5.30532993
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.25000000,
          "reserves": 805722.15850449,
          "priceinreserve": 12.15633869
        },
        {
          "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
          "weight": 0.25000000,
          "reserves": 435.82624381,
          "priceinreserve": 0.00657553
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 337.77412521,
          "priceinreserve": 0.00509616
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 265120.00973183,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 63.98400000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 24.08302045,
          "lastconversionprice": 5.30496919,
          "viaconversionprice": 5.30498651,
          "fees": 0.03380090,
          "conversionfees": 0.03200000,
          "priorweights": 0.25000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 227.47888260,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 12.15460460,
          "viaconversionprice": 12.15492718,
          "fees": 0.11373938,
          "conversionfees": 0.11373938,
          "priorweights": 0.25000000
        },
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00657553,
          "viaconversionprice": 0.00657476,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.13368026,
          "lastconversionprice": 0.00509818,
          "viaconversionprice": 0.00509662,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 264,
      "name": "VRSC",
      "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "startblock": 0,
      "endblock": 0,
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "minnotariesconfirm": 0,
      "currencyregistrationfee": 200.00000000,
      "pbaassystemregistrationfee": 10000.00000000,
      "currencyimportfee": 100.00000000,
      "transactionimportfee": 0.01000000,
      "transactionexportfee": 0.01000000,
      "initialtarget": "00000f0f0f000000000000000000000000000000000000000000000000000000",
      "blocktime": 60,
      "powaveragingwindow": 45,
      "notarizationperiod": 10,
      "eras": [
        {
          "reward": 0,
          "decay": 100000000,
          "halving": 1,
          "eraend": 10080
        },
        {
          "reward": 38400000000,
          "decay": 0,
          "halving": 43200,
          "eraend": 226080
        },
        {
          "reward": 2400000000,
          "decay": 0,
          "halving": 1051920,
          "eraend": 0
        }
      ],
      "currencyidhex": "4c6c9b5a9f7f31d8ea604cb49ad3645c01b8f51a",
      "fullyqualifiedname": "VRSC",
      "definitiontxid": "af0cba3fbfc5868d4e09d7049594f4936df656691297e5623b7fea94821d6004",
      "definitiontxout": 1,
      "nodes": [
        {
          "networkaddress": "157.90.155.113:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "45.79.111.201:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "45.79.237.198:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "172.104.48.148:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "66.228.59.168:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "lastconfirmedheight": 3608963,
    "lastconfirmedtxid": "0000000000000000000000000000000000000000000000000000000000000000",
    "lastconfirmedtxout": 4294967295,
    "lastconfirmednotarization": {
      "version": 2,
      "launchconfirmed": true,
      "proposer": {
        "address": "iLcSuBHwtgVrKxe5V77ALSAwaiYxx2RKcW",
        "type": 4
      },
      "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationheight": 3608963,
      "currencystate": {
        "flags": 16,
        "version": 1,
        "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "launchcurrencies": [
        ],
        "initialsupply": 0.00000000,
        "emitted": 0.00000000,
        "supply": 0.00000000,
        "primarycurrencyfees": 0.00000000,
        "primarycurrencyconversionfees": 0.00000000,
        "primarycurrencyout": 0.00000000,
        "preconvertedout": 0.00000000
      },
      "prevnotarizationtxid": "0000000000000000000000000000000000000000000000000000000000000000",
      "prevnotarizationout": 4294967295,
      "prevheight": 0,
      "hashprevcrossnotarization": "0000000000000000000000000000000000000000000000000000000000000000",
      "currencystates": [
      ],
      "proofroots": [
        {
          "version": 1,
          "type": 1,
          "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "height": 3608963,
          "stateroot": "cfbd67386015098a0bd4156d7b53d1aaa8236b042e98f44e846fd5523c874e7b",
          "blockhash": "000000000002ddfdc6249e695ac19fea68f93fd5ac3bdee25197f140804d3a10",
          "power": "00000000000d7a0eae43d810f37ef414000000026e5624a8795c250bed68d6bb"
        }
      ],
      "nodes": [
      ]
    },
    "bestheight": 3608963,
    "besttxid": "0000000000000000000000000000000000000000000000000000000000000000",
    "besttxout": 4294967295,
    "bestcurrencystate": {
      "flags": 16,
      "version": 1,
      "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "cybermoney",
      "currencyid": "i9bBvuJijJeHcqFsDzAwW7f5wTBThULuhX",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2762620,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X"
      ],
      "weights": [
        0.20000000,
        0.60000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 345000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        6665000.00000000,
        0.00000000
      ],
      "idregistrationfees": 10.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "c7e9cedcab72d329a87a73e746fc43adda621343",
      "fullyqualifiedname": "cybermoney",
      "definitiontxid": "27d0eac5755e30fcf48baf61ceef043dfe60105697a269d0294bec71e89cb504",
      "definitiontxout": 1
    },
    "bestheight": 3603159,
    "besttxid": "d64808d4e230140bdbdb1749fb4b81739cd7d8493ef6ebbadcd1c8210f6e5e25",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i9bBvuJijJeHcqFsDzAwW7f5wTBThULuhX",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 76.99097952,
          "priceinreserve": 0.00218392
        },
        {
          "currencyid": "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
          "weight": 0.60000000,
          "reserves": 7603545.94921264,
          "priceinreserve": 71.89399420
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.20000000,
          "reserves": 0.07326756,
          "priceinreserve": 0.00000207
        }
      ],
      "initialsupply": 345000.00000000,
      "emitted": 0.00000000,
      "supply": 176267.52723609,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.99975000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00216687,
          "viaconversionprice": 0.00217821,
          "fees": 0.00070010,
          "conversionfees": 0.00050000,
          "priorweights": 0.20000000
        },
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 33191.05875983,
          "lastconversionprice": 72.20782643,
          "viaconversionprice": 71.95668784,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.60000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00000207,
          "viaconversionprice": 0.00000207,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "SUPER🛒",
      "currencyid": "iFrFn9b6ctse7XBzcWkRbpYMAHoKjbYKqG",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3437350,
      "endblock": 0,
      "currencies": [
        "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.20000000,
        0.10000000,
        0.05000000,
        0.05000000,
        0.05000000,
        0.05000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 0.77700000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "5b63ea1e94a28d1a1b57b2d11d93cd08e497bd87",
      "fullyqualifiedname": "SUPER🛒",
      "definitiontxid": "94b3192f02eda058fb69bd43131fc37f03dce13684ebd4273b6e7cbcf239f10e",
      "definitiontxout": 1
    },
    "bestheight": 3608958,
    "besttxid": "7b1c2e42754a104bba5aaaa5bf75a35314a2bff4b301015f04ee9d7d65cd8f79",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iFrFn9b6ctse7XBzcWkRbpYMAHoKjbYKqG",
      "reservecurrencies": [
        {
          "currencyid": "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
          "weight": 0.25000000,
          "reserves": 84386.95524054,
          "priceinreserve": 10.94723294
        },
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 228395.39991022,
          "priceinreserve": 29.62895911
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.20000000,
          "reserves": 4.07007135,
          "priceinreserve": 0.00065999
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.10000000,
          "reserves": 87.87337593,
          "priceinreserve": 0.02849878
        },
        {
          "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "weight": 0.05000000,
          "reserves": 755156.19166860,
          "priceinreserve": 489.81923323
        },
        {
          "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
          "weight": 0.05000000,
          "reserves": 101643.39662643,
          "priceinreserve": 65.92926224
        },
        {
          "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
          "weight": 0.05000000,
          "reserves": 837242.33583660,
          "priceinreserve": 543.06301596
        },
        {
          "currencyid": "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
          "weight": 0.05000000,
          "reserves": 100367.78236999,
          "priceinreserve": 65.10185673
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 30834.07675427,
      "currencies": {
        "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 10.94723294,
          "viaconversionprice": 10.94325084,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.08310004,
          "lastconversionprice": 29.62896989,
          "viaconversionprice": 29.61808377,
          "fees": 0.00040020,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00740858,
          "lastconversionprice": 0.00066119,
          "viaconversionprice": 0.00066046,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.31920000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.02844180,
          "viaconversionprice": 0.02848839,
          "fees": 0.00015960,
          "conversionfees": 0.00015960,
          "priorweights": 0.10000000
        },
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 489.81923323,
          "viaconversionprice": 489.64105934,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 65.92926224,
          "viaconversionprice": 65.90528019,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 543.06301596,
          "viaconversionprice": 542.86547441,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 65.10185673,
          "viaconversionprice": 65.07817564,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "RoomID",
      "currencyid": "iF6SvzAEYxt5gQPL7dsEH412zYgDRyMBen",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 2,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2982191,
      "endblock": 0,
      "preallocations": [
        {
          "iF6SvzAEYxt5gQPL7dsEH412zYgDRyMBen": 1000000.00000000
        }
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "192c28d430af98dcbf756dda49916096bc99747f",
      "fullyqualifiedname": "RoomID",
      "definitiontxid": "bbe17e53641595a9446db2524c7b4a2d3304416de8dd0dcab0c1a8db77002d13",
      "definitiontxout": 1
    },
    "bestheight": 2982190,
    "besttxid": "6349651ec5fb39b8ba5e3408291e0e54dd05c7ac5e8a0c3806181e0b2bcd6619",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iF6SvzAEYxt5gQPL7dsEH412zYgDRyMBen",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 1000000.00000000,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "RaceCondition",
      "currencyid": "iLjRC7LcFiwgPxvNP421TY1CPAX4XAMnhX",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2551923,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "weights": [
        1.00000000
      ],
      "conversions": [
        0.00000000
      ],
      "prelaunchdiscount": 0.95000000,
      "initialsupply": 100000000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        10.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "8e05253cee604227c13efb231776c6810e2b4bbd",
      "fullyqualifiedname": "RaceCondition",
      "definitiontxid": "4050df0232c3f1b234cddf2de06788f05c129f7488f108ccaea0811916fa871d",
      "definitiontxout": 1
    },
    "bestheight": 3530892,
    "besttxid": "92d53c20b5e954b2ff60b94d9b5fd6cd7f9402692596ee335fe923552bd02cf3",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iLjRC7LcFiwgPxvNP421TY1CPAX4XAMnhX",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.05000000,
          "reserves": 17.86396542,
          "priceinreserve": 0.00056471
        }
      ],
      "initialsupply": 100000000.00000000,
      "emitted": 0.00000000,
      "supply": 632676.40722135,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 5122.44095855,
          "reserveout": 3.12632815,
          "lastconversionprice": 0.00061032,
          "viaconversionprice": 0.00061032,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        }
      },
      "primarycurrencyfees": 1.28077033,
      "primarycurrencyconversionfees": 1.28077033,
      "primarycurrencyout": -5123.08134371,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "Pure",
      "currencyid": "iHax5qYQGbcMGqJKKrPorpzUBX2oFFXGnY",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2975703,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.50000000,
        0.50000000
      ],
      "conversions": [
        0.00000000,
        0.00000000
      ],
      "initialsupply": 20000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 0.00021000,
      "idreferrallevels": 1,
      "idimportfees": 0.00000001,
      "currencyidhex": "36eb9201689ec6f21796c8ac33dc02979bd5c89a",
      "fullyqualifiedname": "Pure",
      "definitiontxid": "603dbd4597eb324a039ecc457425db858352b1e31640a314c33fefedc4fa5522",
      "definitiontxout": 1
    },
    "bestheight": 3608955,
    "besttxid": "c3ffbeb1749c92b5148cb4b0f8d1d7aa4a2ffd35e39a6a2804f32b92013220e4",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iHax5qYQGbcMGqJKKrPorpzUBX2oFFXGnY",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 3042266.92960010,
          "priceinreserve": 4.22671217
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.50000000,
          "reserves": 68.06636765,
          "priceinreserve": 0.00009456
        }
      ],
      "initialsupply": 20000.00000000,
      "emitted": 0.00000000,
      "supply": 1439542.98357486,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 535.54697742,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 4.22615407,
          "viaconversionprice": 4.22634004,
          "fees": 0.26844074,
          "conversionfees": 0.26784044,
          "priorweights": 0.50000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.01197983,
          "lastconversionprice": 0.00009458,
          "viaconversionprice": 0.00009456,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "🎢",
      "currencyid": "i7H32twVkvDQBJd3UVUL18rGFGNKdUqfy2",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2762620,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4"
      ],
      "weights": [
        0.20000000,
        0.60000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 345000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        6664999.00000000,
        0.00000000
      ],
      "idregistrationfees": 10.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "d49a127d3060ffbf597c6eede6b60d898038b429",
      "fullyqualifiedname": "🎢",
      "definitiontxid": "a29c6b8bc460db68cca9f4c9cae9ef78564e9825d39687ec244194c288172a28",
      "definitiontxout": 1
    },
    "bestheight": 3603174,
    "besttxid": "56a7301965131968fd03824c99bce27f162f54d83bc13c50a5583762851b484b",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i7H32twVkvDQBJd3UVUL18rGFGNKdUqfy2",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 60.12141528,
          "priceinreserve": 0.00207510
        },
        {
          "currencyid": "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
          "weight": 0.60000000,
          "reserves": 5943075.16530284,
          "priceinreserve": 68.37567562
        },
        {
          "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
          "weight": 0.20000000,
          "reserves": 0.06775231,
          "priceinreserve": 0.00000233
        }
      ],
      "initialsupply": 345000.00000000,
      "emitted": 0.00000000,
      "supply": 144863.28925221,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00025043,
          "lastconversionprice": 0.00207511,
          "viaconversionprice": 0.00206812,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3": {
          "reservein": 32972.81635990,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 68.07205969,
          "viaconversionprice": 68.14777125,
          "fees": 16.48640816,
          "conversionfees": 16.48640816,
          "priorweights": 0.60000000
        },
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00113288,
          "lastconversionprice": 0.00000237,
          "viaconversionprice": 0.00000234,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "VRSC-USDT-ETH-DAI-USDC-EURC-MKR-wBTC",
      "currencyid": "i4EwCbq21jeYxPngmorM9BdSoBdi191EQw",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2799000,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
        "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE",
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
        "iS3NjE3XRYWoHRoovpLhFnbDraCq7NFStf"
      ],
      "weights": [
        0.12500000,
        0.12500000,
        0.12500000,
        0.12500000,
        0.12500000,
        0.12500000,
        0.12500000,
        0.12500000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "09c16f6322f6374069b8632950775b387f246608",
      "fullyqualifiedname": "VRSC-USDT-ETH-DAI-USDC-EURC-MKR-wBTC",
      "definitiontxid": "c6fb54abe2f52aaecd98b8d396ab66160129e9ab1c1b988c809b7cfde14ad629",
      "definitiontxout": 1
    },
    "bestheight": 2940091,
    "besttxid": "76096a0576136963df0f5950d1708f3e06f4bcb39ee9629559ea64b21306f3d8",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 37,
      "version": 1,
      "currencyid": "i4EwCbq21jeYxPngmorM9BdSoBdi191EQw",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        },
        {
          "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        },
        {
          "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        },
        {
          "currencyid": "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        },
        {
          "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        },
        {
          "currencyid": "iS3NjE3XRYWoHRoovpLhFnbDraCq7NFStf",
          "weight": 0.12500000,
          "reserves": 0.00000000,
          "priceinreserve": 0.12500000
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00759810,
          "viaconversionprice": 0.00759810,
          "fees": 0.00060030,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        },
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00008000,
          "viaconversionprice": 0.00008000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00008000,
          "viaconversionprice": 0.00008000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00799800,
          "viaconversionprice": 0.00799800,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        },
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00008000,
          "viaconversionprice": 0.00008000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        },
        "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00008000,
          "viaconversionprice": 0.00008000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        },
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00008000,
          "viaconversionprice": 0.00008000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        },
        "iS3NjE3XRYWoHRoovpLhFnbDraCq7NFStf": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00008000,
          "viaconversionprice": 0.00008000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.12500000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "valuid",
      "currencyid": "iQ2TqQot9W7mLrcCRJKnAZmaPTTY6sx4S4",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 2,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2913191,
      "endblock": 0,
      "preallocations": [
        {
          "iQ2TqQot9W7mLrcCRJKnAZmaPTTY6sx4S4": 100000.00000000
        }
      ],
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "35c9f8d9b39e8d92aa370eae7d698d3ac1d26ce1",
      "fullyqualifiedname": "valuid",
      "definitiontxid": "716b75510a3b1e9ecd70ac533771cc456bfd6e4121b60f0fd69d69f1003c8f2e",
      "definitiontxout": 1
    },
    "bestheight": 2913190,
    "besttxid": "14ba0bd7ff11076ff16da2c4b8737652f4b5964f600221e6b1338dfd2a8e1c1d",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iQ2TqQot9W7mLrcCRJKnAZmaPTTY6sx4S4",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 100000.00000000,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "Bots",
      "currencyid": "i582ifsBK7SUN32rrXU5inHfXB5YJq438p",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3311133,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp"
      ],
      "weights": [
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 10101.01010000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 2.71828000,
      "idreferrallevels": 2,
      "idimportfees": 0.00000001,
      "currencyidhex": "2140e2e1e64c2ea4f71578da69a9c0fe92f60f12",
      "fullyqualifiedname": "Bots",
      "definitiontxid": "7e93c6f7af95643bcd132bc9f6f15418c934824188114890889f88dc2f081a32",
      "definitiontxout": 1
    },
    "bestheight": 3311132,
    "besttxid": "6d579fd162d447f8ecbdc07de9a17dc08cb46e0c7ee25a1b17f2e7600361684d",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 37,
      "version": 1,
      "currencyid": "i582ifsBK7SUN32rrXU5inHfXB5YJq438p",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.20000000
        },
        {
          "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
          "weight": 0.20000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.20000000
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.20000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.20000000
        },
        {
          "currencyid": "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
          "weight": 0.20000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.20000000
        },
        {
          "currencyid": "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp",
          "weight": 0.20000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.20000000
        }
      ],
      "initialsupply": 10101.01010000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.01456916,
          "viaconversionprice": 0.01456916,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.06145083,
          "viaconversionprice": 0.06145083,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00000069,
          "viaconversionprice": 0.00000069,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 16058.07657164,
          "viaconversionprice": 16058.07657164,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 16058.10878232,
          "viaconversionprice": 16058.10878232,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 2080,
      "name": "Bridge",
      "currencyid": "iMd9gFvXRfiPztvWN3AbWiS4zB6HiDD1r1",
      "parent": "iNhWVCyWgtbgM8HFMCp8zJb1U9yxYydnG7",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3490212,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        0.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "preallocations": [
        {
          "iAw63quD9J2bHU31iXs1KjMGzvBczpPFnV": 0.00000001
        }
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "8668584c9bd08ba57529409ff8a2ad9de1d813c7",
      "fullyqualifiedname": "Bridge.Traders",
      "definitiontxid": "80d8e4311ee202de7961026066f01361f9a1a1537b9e2b4ed619234c1944173e",
      "definitiontxout": 1
    },
    "bestheight": 3490211,
    "besttxid": "e3894f62d23258757ba0db30cd4214d001420a0c8529d6bdb74f83636933505d",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iMd9gFvXRfiPztvWN3AbWiS4zB6HiDD1r1",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000001,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "Kek🐸",
      "currencyid": "iCDjBN71SbSppgsNTpwwMBT69399DpV4hA",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3345000,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i5VVBEi6efBrXMaeqFW3MTPSzbmpNLysGR"
      ],
      "weights": [
        0.50000000,
        0.50000000
      ],
      "conversions": [
        0.00000000,
        0.00000000
      ],
      "minpreconversion": [
        600.00000000,
        1000.00000000
      ],
      "maxpreconversion": [
        600000.00000000,
        1000000.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 5.00000000,
      "idreferrallevels": 3,
      "idimportfees": 1.00000000,
      "currencyidhex": "f30c45f1ac2fff364446349b897418e4aeb2ec5f",
      "fullyqualifiedname": "Kek🐸",
      "definitiontxid": "c2dbccf7d7fb6a8a9c51165efe67b83c3b12188f8cda2d0e2a14a0601fcdf14b",
      "definitiontxout": 1
    },
    "bestheight": 3562477,
    "besttxid": "4b8d3f0b05eebcdea92b389e0d155353e1b5d87eddb57c8dcee4ea328031b98b",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iCDjBN71SbSppgsNTpwwMBT69399DpV4hA",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 385.53373305,
          "priceinreserve": 0.07887450
        },
        {
          "currencyid": "i5VVBEi6efBrXMaeqFW3MTPSzbmpNLysGR",
          "weight": 0.50000000,
          "reserves": 2223.62079328,
          "priceinreserve": 0.45491996
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 9775.87685328,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 24.99375000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.07501776,
          "viaconversionprice": 0.07627437,
          "fees": 0.01275000,
          "conversionfees": 0.01250000,
          "priorweights": 0.50000000
        },
        "i5VVBEi6efBrXMaeqFW3MTPSzbmpNLysGR": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 154.10975179,
          "lastconversionprice": 0.48644854,
          "viaconversionprice": 0.46267007,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 2080,
      "name": "verustrading",
      "currencyid": "i7T38NYoDK4USAsFSYgubHnm9LNQpbasQU",
      "parent": "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3210918,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        0.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "preallocations": [
        {
          "iHNSgMgXWdGTY35Q9kmGHCfngaXp4gDy7z": 0.00000001
        }
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "2e6f024e4ba974e9b5b14b852a80ae548a75982b",
      "fullyqualifiedname": "verustrading.bitcoins",
      "definitiontxid": "f24c5e0fa966f94814402ef6e083b23ef4ed98611a72f419cf6db8f77178f74e",
      "definitiontxout": 1
    },
    "bestheight": 3210917,
    "besttxid": "701c2e9b24f7af3f2d1db073785a96f483323c614e762499840e8a6938ecfb39",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i7T38NYoDK4USAsFSYgubHnm9LNQpbasQU",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000001,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 40,
      "name": "bitcoins",
      "currencyid": "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2626434,
      "endblock": 0,
      "preallocations": [
        {
          "i9bBvuJijJeHcqFsDzAwW7f5wTBThULuhX": 6666667.00000000
        },
        {
          "iGwDA89H2BDCEStTPqhFyLzYteVHVs7tcJ": 6666667.00000000
        },
        {
          "i7H32twVkvDQBJd3UVUL18rGFGNKdUqfy2": 6666666.00000000
        },
        {
          "i5v3h9FWVdRFbNHU7DfcpGykQjRaHtMqu7": 1000000.00000000
        }
      ],
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "904a4ba33bb31038af3e6028cfb2fccf6499cf2d",
      "fullyqualifiedname": "bitcoins",
      "definitiontxid": "c92cb8ada27db9d936998b1b608fc2ca7f3ac73c478c1ae15a07026552879654",
      "definitiontxout": 1
    },
    "bestheight": 3456961,
    "besttxid": "69d72885c71a1abce99a50739bbbab248698a38685bded108f426bf3b513628b",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 20999984.40000000,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": -0.60000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "Traders",
      "currencyid": "iNhWVCyWgtbgM8HFMCp8zJb1U9yxYydnG7",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2877782,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp",
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2"
      ],
      "weights": [
        0.33333334,
        0.33333333,
        0.33333333
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 69420.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        200.00000000,
        119999000.00000000,
        119999000.00000000
      ],
      "idregistrationfees": 161.80000000,
      "idreferrallevels": 5,
      "idimportfees": 0.02000000,
      "currencyidhex": "26b87831f98ff8c9d32fde852c5a272af801dfd2",
      "fullyqualifiedname": "Traders",
      "definitiontxid": "820cc66746d207ccb31892aa0f07fe958d807ee2f5a3a7798bb50207abaa385f",
      "definitiontxout": 1
    },
    "bestheight": 3588028,
    "besttxid": "e33705cebb91e06d3303943c6708258267de4f5101af92c14c0a30de0731b10b",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iNhWVCyWgtbgM8HFMCp8zJb1U9yxYydnG7",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.33333334,
          "reserves": 236.19667243,
          "priceinreserve": 0.03683598
        },
        {
          "currencyid": "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp",
          "weight": 0.33333333,
          "reserves": 87993109.84554264,
          "priceinreserve": 13722.94228319
        },
        {
          "currencyid": "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
          "weight": 0.33333333,
          "reserves": 88001181.35747436,
          "priceinreserve": 13724.20107370
        }
      ],
      "initialsupply": 69420.00000000,
      "emitted": 0.00000000,
      "supply": 19236.35082979,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.99975000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.03673197,
          "viaconversionprice": 0.03678391,
          "fees": 0.00070010,
          "conversionfees": 0.00050000,
          "priorweights": 0.33333334
        },
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 373938.34110943,
          "lastconversionprice": 13781.25973874,
          "viaconversionprice": 13742.36311370,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.33333333
        },
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 13724.20107370,
          "viaconversionprice": 13704.81504063,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.33333333
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 40,
      "name": "Bulls",
      "currencyid": "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2874555,
      "endblock": 0,
      "preallocations": [
        {
          "iNhWVCyWgtbgM8HFMCp8zJb1U9yxYydnG7": 120030000.00000000
        }
      ],
      "idregistrationfees": 78.60000000,
      "idreferrallevels": 4,
      "idimportfees": 0.02000000,
      "currencyidhex": "b1571a0399da09cb7515e7cc955d13c3f358c6a9",
      "fullyqualifiedname": "Bulls",
      "definitiontxid": "d811552076afdbac699af8c54c48a1f474578c112831b482656a226f18ff3e5f",
      "definitiontxout": 1
    },
    "bestheight": 2878708,
    "besttxid": "14a9acb72b84fded1d19138c64df842cdf08dc954bf383ba1237c7652206dc02",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 120029997.25181295,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": -2.74818705,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "SUPERVRSC",
      "currencyid": "iHnYAmrS45Hb8GVgyzy7nVQtZ5vttJ9N3X",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3269500,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ"
      ],
      "weights": [
        0.50000000,
        0.50000000
      ],
      "conversions": [
        0.00000000,
        0.00000000
      ],
      "maxpreconversion": [
        5000000.00000000,
        100000.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "62c3efe93bc5cfe930d509e6f78efc9ae0dcf99c",
      "fullyqualifiedname": "SUPERVRSC",
      "definitiontxid": "66fcb0d2914e8751c0521690f357105dbfd3fb51c27dcd219c8af7787f6db866",
      "definitiontxout": 1
    },
    "bestheight": 3608677,
    "besttxid": "110f0eeea0718009b45803874a1e6683e0edec3c17b3bdfc381bf733ed9a5b81",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iHnYAmrS45Hb8GVgyzy7nVQtZ5vttJ9N3X",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 751352.10664672,
          "priceinreserve": 9.28811201
        },
        {
          "currencyid": "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
          "weight": 0.50000000,
          "reserves": 277683.93634970,
          "priceinreserve": 3.43269085
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 161787.90804382,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 199.95000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 9.28625800,
          "viaconversionprice": 9.28687575,
          "fees": 0.10020010,
          "conversionfees": 0.10000000,
          "priorweights": 0.50000000
        },
        "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 73.89850142,
          "lastconversionprice": 3.43360438,
          "viaconversionprice": 3.43291921,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "Agents",
      "currencyid": "iH9HFQeKRNVWguokGLLaiVYqy9u8VuFWMe",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3423243,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp"
      ],
      "weights": [
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 10101.01010101,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        53.60000000,
        238.00000000,
        232.50000000,
        32440558.72733590,
        32440623.79941516
      ],
      "idregistrationfees": 2.71828182,
      "idreferrallevels": 1,
      "idimportfees": 0.02000000,
      "currencyidhex": "9779968e997bc064871fd3fa00126ade7d04ee95",
      "fullyqualifiedname": "Agents",
      "definitiontxid": "0d38978751edfe3d6ec1ef7287106b01c4a693d4e8bb8bef789beeaa524c1268",
      "definitiontxout": 1
    },
    "bestheight": 3603186,
    "besttxid": "c43c077ac77c5ddd30dc7cdc1f96416e2fa3daac6000f23134f1be6610ae3ddf",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iH9HFQeKRNVWguokGLLaiVYqy9u8VuFWMe",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 81.10603539,
          "priceinreserve": 0.04014748
        },
        {
          "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
          "weight": 0.20000000,
          "reserves": 206.58333027,
          "priceinreserve": 0.10225874
        },
        {
          "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
          "weight": 0.20000000,
          "reserves": 206.20300577,
          "priceinreserve": 0.10207048
        },
        {
          "currencyid": "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
          "weight": 0.20000000,
          "reserves": 30071414.75886196,
          "priceinreserve": 14885.35030563
        },
        {
          "currencyid": "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp",
          "weight": 0.20000000,
          "reserves": 30066900.39888897,
          "priceinreserve": 14883.11569745
        }
      ],
      "initialsupply": 10101.01010101,
      "emitted": 0.00000000,
      "supply": 10101.01010101,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.99975000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.03985002,
          "viaconversionprice": 0.04004792,
          "fees": 0.00070010,
          "conversionfees": 0.00050000,
          "priorweights": 0.20000000
        },
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.10225874,
          "viaconversionprice": 0.10200546,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 2.57283059,
          "lastconversionprice": 0.10334403,
          "viaconversionprice": 0.10257864,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 14885.35030563,
          "viaconversionprice": 14848.48044819,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 14883.11569745,
          "viaconversionprice": 14846.25137495,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "tBTC Basket",
      "currencyid": "i5csnsWTvJq8zqwdm2AKDyc9xmQro9AgYX",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2958120,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.50000000,
        0.50000000
      ],
      "conversions": [
        0.00000000,
        0.00000000
      ],
      "initialsupply": 20000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 10.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "d04c746a8451957777f1e7b90dc94d9dde928417",
      "fullyqualifiedname": "tBTC Basket",
      "definitiontxid": "b7664b7ae9ba9e6fe1031c327c2eb3af631d6566ae76fec57b4aa3fca0498b73",
      "definitiontxout": 1
    },
    "bestheight": 3050260,
    "besttxid": "2e2df661b3390ddadb0852d3ba53eea4474e90bbd6a8b431e3a44da9c42473fe",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 37,
      "version": 1,
      "currencyid": "i5csnsWTvJq8zqwdm2AKDyc9xmQro9AgYX",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.50000000
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.50000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.50000000
        }
      ],
      "initialsupply": 20000.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.02499375,
          "viaconversionprice": 0.02499375,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00010000,
          "viaconversionprice": 0.00010000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "NATI",
      "currencyid": "iRt7tpLewArQnRddBVFARGKJStK6w5pDmC",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3173460,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx"
      ],
      "weights": [
        0.50000000,
        0.50000000
      ],
      "conversions": [
        0.00000000,
        0.00000000
      ],
      "minpreconversion": [
        3333.00000000,
        3333333.00000000
      ],
      "maxpreconversion": [
        3333333.00000000,
        333333333.00000000
      ],
      "initialsupply": 88888.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 333.33330000,
      "idreferrallevels": 1,
      "idimportfees": 0.00000001,
      "currencyidhex": "616386294c1affa26fadc369aecab38cda19c9f5",
      "fullyqualifiedname": "NATI",
      "definitiontxid": "60a0fb2255aa6e3cc1235ad620e1a3192645c413fae0a44e0ac459772dafc576",
      "definitiontxout": 1
    },
    "bestheight": 3608794,
    "besttxid": "97f21f46a19cb7a0322a6497b61e89daabde593c592e9099a7c4dffbe92b1c1a",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iRt7tpLewArQnRddBVFARGKJStK6w5pDmC",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 2354996.05592538,
          "priceinreserve": 21.22505971
        },
        {
          "currencyid": "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx",
          "weight": 0.50000000,
          "reserves": 1025118046.55554688,
          "priceinreserve": 9239.16271611
        }
      ],
      "initialsupply": 88888.00000000,
      "emitted": 0.00000000,
      "supply": 221907.13120961,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 200.31377512,
          "lastconversionprice": 21.22686510,
          "viaconversionprice": 21.22551103,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        },
        "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx": {
          "reservein": 87209.97275757,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 9238.57316617,
          "viaconversionprice": 9238.76960738,
          "fees": 43.60498636,
          "conversionfees": 43.60498636,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "SUPERNET",
      "currencyid": "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3261221,
      "endblock": 0,
      "preallocations": [
        {
          "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ": 777777.00000000
        }
      ],
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "df5bad49c829c3c3b3dc1e822fe62ebe66608a20",
      "fullyqualifiedname": "SUPERNET",
      "definitiontxid": "7807d143e0ca3fcc6fa9118eee970a2a0cfe97f5fa18b8a1df4101a63b1a407d",
      "definitiontxout": 1
    },
    "bestheight": 3261220,
    "besttxid": "83bd3047241542fc0712167e1eadb9303c86c3be3ee8621fd57b64918d6727b5",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 777777.00000000,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "Switch",
      "currencyid": "i4Xr5TAMrDTD99H69EemhjDxJ4ktNskUtc",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2984851,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
        "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE"
      ],
      "weights": [
        0.16000000,
        0.21000000,
        0.21000000,
        0.42000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 20000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 10.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.00000003,
      "currencyidhex": "335245d6f210a329b299fce0aee60548eeef980b",
      "fullyqualifiedname": "Switch",
      "definitiontxid": "fa6a301164770d6f39866f4ec22cb408f85d7fd6bbac3ad5914655302cae5e82",
      "definitiontxout": 1
    },
    "bestheight": 3608908,
    "besttxid": "416d74572b32443b65993f8069d3e4962ed592814cf72f56ac6f57aea1f8b917",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i4Xr5TAMrDTD99H69EemhjDxJ4ktNskUtc",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.16000000,
          "reserves": 1291.16795871,
          "priceinreserve": 0.77699796
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.21000000,
          "reserves": 3914.97504238,
          "priceinreserve": 1.79500982
        },
        {
          "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
          "weight": 0.21000000,
          "reserves": 3954.54126313,
          "priceinreserve": 1.81315087
        },
        {
          "currencyid": "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE",
          "weight": 0.42000000,
          "reserves": 7855.16551707,
          "priceinreserve": 1.80079043
        }
      ],
      "initialsupply": 20000.00000000,
      "emitted": 0.00000000,
      "supply": 10385.86980371,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 5.02373921,
          "lastconversionprice": 0.78002115,
          "viaconversionprice": 0.77826674,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.16000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 11.56901724,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.79179889,
          "viaconversionprice": 1.79389355,
          "fees": 0.00578450,
          "conversionfees": 0.00578450,
          "priorweights": 0.21000000
        },
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.81315087,
          "viaconversionprice": 1.81202465,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.21000000
        },
        "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.80079043,
          "viaconversionprice": 1.79967190,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.42000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "SuperBASKET",
      "currencyid": "iFPazWbwUnTHQYUiH5upZMqBtcEhfRdE4v",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3425692,
      "endblock": 0,
      "currencies": [
        "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.20000000,
        0.10000000,
        0.05000000,
        0.05000000,
        0.05000000,
        0.05000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "eb08b03538434f718123d8e786e245ed9266b282",
      "fullyqualifiedname": "SuperBASKET",
      "definitiontxid": "4559bfb465fc124e35c057a89f347da1252a53958629dc7c25b95f1834b957b8",
      "definitiontxout": 1
    },
    "bestheight": 3564666,
    "besttxid": "51993583b674bd518897aaa3d87f96537e5ba6b087e5563ffbfa321275b4f5bf",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 37,
      "version": 1,
      "currencyid": "iFPazWbwUnTHQYUiH5upZMqBtcEhfRdE4v",
      "reservecurrencies": [
        {
          "currencyid": "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
          "weight": 0.25000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.25000000
        },
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.25000000
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.20000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.20000000
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.10000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.10000000
        },
        {
          "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "weight": 0.05000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.05000000
        },
        {
          "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
          "weight": 0.05000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.05000000
        },
        {
          "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
          "weight": 0.05000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.05000000
        },
        {
          "currencyid": "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
          "weight": 0.05000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.05000000
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000000,
      "currencies": {
        "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00004000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00004000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00005000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00010000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.10000000
        },
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00020000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00020000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00020000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00020000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 40,
      "name": "Bears",
      "currencyid": "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2874554,
      "endblock": 0,
      "preallocations": [
        {
          "iNhWVCyWgtbgM8HFMCp8zJb1U9yxYydnG7": 120030000.00000000
        }
      ],
      "idregistrationfees": 78.60000000,
      "idreferrallevels": 4,
      "idimportfees": 0.02000000,
      "currencyidhex": "4c9ed78d07c26ec941ce340956c8382cc3074f2c",
      "fullyqualifiedname": "Bears",
      "definitiontxid": "ee09629f4417003ce526086983ed63c337c694a626420454ea4be18aab6a51c4",
      "definitiontxout": 1
    },
    "bestheight": 2878708,
    "besttxid": "4ef082eda561f37845da98a6f3952568d2c1accf24eaddc2b13e2051a0e8f10e",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 120029997.25181295,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": -2.74818705,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 32,
      "name": "PBaaSLaunch",
      "currencyid": "i53NorA4Qt1Zr5MQnQpihUzje9BjLbwU8r",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2597463,
      "endblock": 0,
      "preallocations": [
        {
          "i53NorA4Qt1Zr5MQnQpihUzje9BjLbwU8r": 300.00000000
        }
      ],
      "idregistrationfees": 1.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "68bd054643725d8864f59ec25d602a0b2ea72e11",
      "fullyqualifiedname": "PBaaSLaunch",
      "definitiontxid": "d9f1980d25288a4db4bb0ed86396f3025c7ca967dd91049328e39b254c007ddb",
      "definitiontxout": 1
    },
    "bestheight": 2651608,
    "besttxid": "f02dad1cd8d71fb09e9045e7dfcf498506d97cdc6d9fa7d45cbbe5e245f0b6d0",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "i53NorA4Qt1Zr5MQnQpihUzje9BjLbwU8r",
      "launchcurrencies": [
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 169.00000000,
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": -1.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "vYIELD",
      "currencyid": "iAik7rePReFq2t7LZMZhHCJ52fT5pisJ5C",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3333333,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj"
      ],
      "weights": [
        0.50000000,
        0.50000000
      ],
      "conversions": [
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "113ddb4739a3b1a0d379b3c7d7a456cf274b794f",
      "fullyqualifiedname": "vYIELD",
      "definitiontxid": "f311a596947d3fbca61976f81bb3588f45d89bdb5f31bb3678ac9077178815e5",
      "definitiontxout": 1
    },
    "bestheight": 3608883,
    "besttxid": "617f7ca901dfdd0231430483cae783c27bd46bc9aa855ead260d9b952fe910c8",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iAik7rePReFq2t7LZMZhHCJ52fT5pisJ5C",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 9154.70590547,
          "priceinreserve": 0.70470439
        },
        {
          "currencyid": "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
          "weight": 0.50000000,
          "reserves": 20097.75920370,
          "priceinreserve": 1.54707091
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 25981.69090745,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 5.00829711,
          "lastconversionprice": 0.70508992,
          "viaconversionprice": 0.70480076,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        },
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj": {
          "reservein": 10.99168638,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.54643624,
          "viaconversionprice": 1.54664769,
          "fees": 0.00549584,
          "conversionfees": 0.00549584,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "🟠",
      "currencyid": "iGwDA89H2BDCEStTPqhFyLzYteVHVs7tcJ",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2762620,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM"
      ],
      "weights": [
        0.20000000,
        0.60000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 345000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        6665000.00000000,
        0.00000000
      ],
      "idregistrationfees": 10.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "85d6ab0fb7212ad701a4681330fce2fa649ca593",
      "fullyqualifiedname": "🟠",
      "definitiontxid": "e3a946384eb9076a3cd901588dce6d63d8608fd412ddb0c001e40c152e39d3e7",
      "definitiontxout": 1
    },
    "bestheight": 3603174,
    "besttxid": "5d00a0110e04f5cac7abc104d589045d933edb179aeeb2f033535b7467bc4ee1",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iGwDA89H2BDCEStTPqhFyLzYteVHVs7tcJ",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 55.54553467,
          "priceinreserve": 0.00191518
        },
        {
          "currencyid": "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
          "weight": 0.60000000,
          "reserves": 5458385.59101372,
          "priceinreserve": 62.73427089
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.20000000,
          "reserves": 141.19393260,
          "priceinreserve": 0.00486830
        }
      ],
      "initialsupply": 345000.00000000,
      "emitted": 0.00000000,
      "supply": 145013.39042140,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.99975000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00189444,
          "viaconversionprice": 0.00190823,
          "fees": 0.00070010,
          "conversionfees": 0.00050000,
          "priorweights": 0.20000000
        },
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 33138.50890442,
          "lastconversionprice": 63.11513812,
          "viaconversionprice": 62.81032197,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.60000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00486830,
          "viaconversionprice": 0.00485065,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "Kaiju",
      "currencyid": "i9kVWKU2VwARALpbXn4RS9zvrhvNRaUibb",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3038234,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 15.00000000,
      "idreferrallevels": 2,
      "idimportfees": 0.00000001,
      "currencyidhex": "885cfcfe62d96ae7d64142cfc4dac7ea37cdd544",
      "fullyqualifiedname": "Kaiju",
      "definitiontxid": "30b817e251deef94ec41f0612ec8886d94cfdd532822529e41930ba2998458f6",
      "definitiontxout": 1
    },
    "bestheight": 3608908,
    "besttxid": "ad052f384988e625738e581671d5d30aa303a66775fb53c63bbe6f18cbd23c4b",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i9kVWKU2VwARALpbXn4RS9zvrhvNRaUibb",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 2907.77339053,
          "priceinreserve": 0.65787081
        },
        {
          "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
          "weight": 0.25000000,
          "reserves": 6802.98912167,
          "priceinreserve": 1.53914608
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 2.77691148,
          "priceinreserve": 0.00062826
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.25000000,
          "reserves": 0.06521306,
          "priceinreserve": 0.00001475
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 17679.90496046,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 4.99875000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.65716371,
          "viaconversionprice": 0.65758768,
          "fees": 0.00270010,
          "conversionfees": 0.00250000,
          "priorweights": 0.25000000
        },
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.53914608,
          "viaconversionprice": 1.53848433,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00478073,
          "lastconversionprice": 0.00062934,
          "viaconversionprice": 0.00062866,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00001475,
          "viaconversionprice": 0.00001474,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "whales",
      "currencyid": "iG1jouaqSJayNb9LCqPzb3yFYD3kUpY2P2",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2561900,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "weights": [
        1.00000000
      ],
      "conversions": [
        0.00000000
      ],
      "minpreconversion": [
        1000.00000000
      ],
      "maxpreconversion": [
        10000.00000000
      ],
      "initialsupply": 1000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        1010.00000000
      ],
      "idregistrationfees": 20.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "a3b9e922c3b5543781a9149ab9f083824abc8889",
      "fullyqualifiedname": "whales",
      "definitiontxid": "6b97441d46eb290244720d18bc0bfd24173efcca3aee01649298e0b3c2b960f7",
      "definitiontxout": 1
    },
    "bestheight": 3602921,
    "besttxid": "caf3d5b25ead3df77b80fc96920d6cabb927cce7852b2874dde04930fd71d6cf",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iG1jouaqSJayNb9LCqPzb3yFYD3kUpY2P2",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 1.00000000,
          "reserves": 12447.48558376,
          "priceinreserve": 13.38404489
        }
      ],
      "initialsupply": 1000.00000000,
      "emitted": 0.00000000,
      "supply": 930.02419521,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 1.00102930,
          "reserveout": 13.39782093,
          "lastconversionprice": 13.38404475,
          "viaconversionprice": 13.38404475,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 1.00000000
        }
      },
      "primarycurrencyfees": 0.00025028,
      "primarycurrencyconversionfees": 0.00025028,
      "primarycurrencyout": -1.00115444,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 2080,
      "name": "VERUSTRADING",
      "currencyid": "iHNSgMgXWdGTY35Q9kmGHCfngaXp4gDy7z",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3210278,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV"
      ],
      "conversions": [
        0.00000000
      ],
      "maxpreconversion": [
        0.00000000
      ],
      "preallocations": [
        {
          "iHZMBQrH76AC6DzUnpwVYcy1Y4yUEnUSKV": 0.00000001
        }
      ],
      "initialcontributions": [
        0.00000000
      ],
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "ba61ae22d8b2da8c5a3cf7d9552d7b96044c6b98",
      "fullyqualifiedname": "VERUSTRADING",
      "definitiontxid": "13cbe668bbb6d68df430ba87cfb34dabcba7baee0429077849c45003555faafa",
      "definitiontxout": 1
    },
    "bestheight": 3210277,
    "besttxid": "74e8238343090e9ee61a1b3716b80a14b9f1e23d72f71390ba3edd52a025b0b6",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 48,
      "version": 1,
      "currencyid": "iHNSgMgXWdGTY35Q9kmGHCfngaXp4gDy7z",
      "launchcurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.00000000,
          "reserves": 0.00000000,
          "priceinreserve": 0.00000000
        }
      ],
      "initialsupply": 0.00000000,
      "emitted": 0.00000000,
      "supply": 0.00000001,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00000000,
          "viaconversionprice": 0.00000000,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.00000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  }
]








./verus listcurrencies '{"converter":["dai.veth"]}'
[
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "parent": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2758800,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X"
      ],
      "weights": [
        0.25000000,
        0.25000000,
        0.25000000,
        0.25000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 100000.00000000,
      "prelaunchcarveout": 0.00000000,
      "gateway": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 0.00000000,
      "idregistrationfees": 0.01000000,
      "idreferrallevels": 0,
      "idimportfees": 0.00000003,
      "currencyidhex": "ebca0ade2cc8370d4ad82061867b4626bdeb0002",
      "fullyqualifiedname": "Bridge.vETH",
      "definitiontxid": "0010037f63324d1501d7e3c12b71b4b1f7a938ffb5c48896abbedf5c59cbe203",
      "definitiontxout": 22
    },
    "bestheight": 3608970,
    "besttxid": "1ae91eb6d0f525bc2884bf72f70ab84ad92249fab517c256f2a0510bf9545152",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 351637.16921040,
          "priceinreserve": 5.30532824
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.25000000,
          "reserves": 806703.64196116,
          "priceinreserve": 12.17114683
        },
        {
          "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
          "weight": 0.25000000,
          "reserves": 435.82624381,
          "priceinreserve": 0.00657553
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 337.36338437,
          "priceinreserve": 0.00508997
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 265120.00973183,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00234514,
          "lastconversionprice": 5.30532828,
          "viaconversionprice": 5.30516909,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 21.51065323,
          "lastconversionprice": 12.17147137,
          "viaconversionprice": 12.17126832,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00657553,
          "viaconversionprice": 0.00657548,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00900000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00508988,
          "viaconversionprice": 0.00508993,
          "fees": 0.00000450,
          "conversionfees": 0.00000450,
          "priorweights": 0.25000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 545,
      "name": "Bridge",
      "currencyid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
      "parent": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "systemid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3159230,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU"
      ],
      "weights": [
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "prelaunchdiscount": 0.05000000,
      "initialsupply": 85000.00000000,
      "prelaunchcarveout": 0.00000000,
      "preallocations": [
        {
          "i5v3h9FWVdRFbNHU7DfcpGykQjRaHtMqu7": 5000.00000000
        },
        {
          "iQXPpqsMsMZKauJ4sGHKppSfoeaZ1ggvZu": 10000.00000000
        }
      ],
      "gateway": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "gatewayconverterissuance": 43000.00000000,
      "idregistrationfees": 100.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "6a274253b910d4d003e9a97438eb38d0c4eea523",
      "fullyqualifiedname": "Bridge.vDEX",
      "definitiontxid": "dffce4bb3d0cf97acb12e8fd1bfba22b6672b54fea696501a1771c43cf86c117",
      "definitiontxout": 5
    },
    "bestheight": 3159229,
    "besttxid": "8c3e445c76af5c1ef6e187982783067f0e0c754f7562b2d6ef4f0821f266e39c",
    "besttxout": 3,
    "bestcurrencystate": {
      "flags": 27,
      "version": 1,
      "currencyid": "i6j1rzjgrDhSmUYiTtp21J8Msiudv5hgt9",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 100774.41009750,
          "priceinreserve": 5.03872050
        },
        {
          "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
          "weight": 0.20000000,
          "reserves": 43000.00000000,
          "priceinreserve": 2.15000000
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.20000000,
          "reserves": 28.21971680,
          "priceinreserve": 0.00141098
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.20000000,
          "reserves": 87610.75715539,
          "priceinreserve": 4.38053785
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.20000000,
          "reserves": 1.31390724,
          "priceinreserve": 0.00006569
        }
      ],
      "initialsupply": 85000.00000000,
      "emitted": 15000.00000000,
      "supply": 100000.00000000,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 100774.41009750,
          "primarycurrencyin": 100749.21019500,
          "reserveout": 0.00000000,
          "lastconversionprice": 4.74232519,
          "viaconversionprice": 5.92790648,
          "fees": 100.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": {
          "reservein": 43000.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 2.52941176,
          "viaconversionprice": 2.52941177,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 28.21971680,
          "primarycurrencyin": 28.21266016,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00132799,
          "viaconversionprice": 0.00165999,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 87610.75715539,
          "primarycurrencyin": 87588.84898909,
          "reserveout": 0.00000000,
          "lastconversionprice": 4.12285917,
          "viaconversionprice": 5.15357396,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 1.31390724,
          "primarycurrencyin": 1.31357873,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00006184,
          "viaconversionprice": 0.00007729,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 15000.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 33,
      "name": "Switch",
      "currencyid": "i4Xr5TAMrDTD99H69EemhjDxJ4ktNskUtc",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2984851,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
        "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE"
      ],
      "weights": [
        0.16000000,
        0.21000000,
        0.21000000,
        0.42000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 20000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "idregistrationfees": 10.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.00000003,
      "currencyidhex": "335245d6f210a329b299fce0aee60548eeef980b",
      "fullyqualifiedname": "Switch",
      "definitiontxid": "fa6a301164770d6f39866f4ec22cb408f85d7fd6bbac3ad5914655302cae5e82",
      "definitiontxout": 1
    },
    "bestheight": 3608908,
    "besttxid": "416d74572b32443b65993f8069d3e4962ed592814cf72f56ac6f57aea1f8b917",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i4Xr5TAMrDTD99H69EemhjDxJ4ktNskUtc",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.16000000,
          "reserves": 1291.16795871,
          "priceinreserve": 0.77699796
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.21000000,
          "reserves": 3914.97504238,
          "priceinreserve": 1.79500982
        },
        {
          "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
          "weight": 0.21000000,
          "reserves": 3954.54126313,
          "priceinreserve": 1.81315087
        },
        {
          "currencyid": "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE",
          "weight": 0.42000000,
          "reserves": 7855.16551707,
          "priceinreserve": 1.80079043
        }
      ],
      "initialsupply": 20000.00000000,
      "emitted": 0.00000000,
      "supply": 10385.86980371,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 5.02373921,
          "lastconversionprice": 0.78002115,
          "viaconversionprice": 0.77826674,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.16000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 11.56901724,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.79179889,
          "viaconversionprice": 1.79389355,
          "fees": 0.00578450,
          "conversionfees": 0.00578450,
          "priorweights": 0.21000000
        },
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.81315087,
          "viaconversionprice": 1.81202465,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.21000000
        },
        "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.80079043,
          "viaconversionprice": 1.79967190,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.42000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  },
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "🟠",
      "currencyid": "iGwDA89H2BDCEStTPqhFyLzYteVHVs7tcJ",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 2762620,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM"
      ],
      "weights": [
        0.20000000,
        0.60000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 345000.00000000,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        0.00000000,
        6665000.00000000,
        0.00000000
      ],
      "idregistrationfees": 10.00000000,
      "idreferrallevels": 3,
      "idimportfees": 0.02000000,
      "currencyidhex": "85d6ab0fb7212ad701a4681330fce2fa649ca593",
      "fullyqualifiedname": "🟠",
      "definitiontxid": "e3a946384eb9076a3cd901588dce6d63d8608fd412ddb0c001e40c152e39d3e7",
      "definitiontxout": 1
    },
    "bestheight": 3603174,
    "besttxid": "5d00a0110e04f5cac7abc104d589045d933edb179aeeb2f033535b7467bc4ee1",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iGwDA89H2BDCEStTPqhFyLzYteVHVs7tcJ",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 55.54553467,
          "priceinreserve": 0.00191518
        },
        {
          "currencyid": "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3",
          "weight": 0.60000000,
          "reserves": 5458385.59101372,
          "priceinreserve": 62.73427089
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.20000000,
          "reserves": 141.19393260,
          "priceinreserve": 0.00486830
        }
      ],
      "initialsupply": 345000.00000000,
      "emitted": 0.00000000,
      "supply": 145013.39042140,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.99975000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00189444,
          "viaconversionprice": 0.00190823,
          "fees": 0.00070010,
          "conversionfees": 0.00050000,
          "priorweights": 0.20000000
        },
        "i7ekXxHYzXW7uAfu5BtWZhd1MjXcWU5Rn3": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 33138.50890442,
          "lastconversionprice": 63.11513812,
          "viaconversionprice": 62.81032197,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.60000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00486830,
          "viaconversionprice": 0.00485065,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  }
]




./verus listcurrencies '{"converter":["vusdt.veth", "vusdc.veth"]}'
[
  {
    "currencydefinition": {
      "version": 1,
      "options": 41,
      "name": "Agents",
      "currencyid": "iH9HFQeKRNVWguokGLLaiVYqy9u8VuFWMe",
      "parent": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "systemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "notarizationprotocol": 1,
      "proofprotocol": 1,
      "launchsystemid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "startblock": 3423243,
      "endblock": 0,
      "currencies": [
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp"
      ],
      "weights": [
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000,
        0.20000000
      ],
      "conversions": [
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000,
        0.00000000
      ],
      "initialsupply": 10101.01010101,
      "prelaunchcarveout": 0.00000000,
      "initialcontributions": [
        53.60000000,
        238.00000000,
        232.50000000,
        32440558.72733590,
        32440623.79941516
      ],
      "idregistrationfees": 2.71828182,
      "idreferrallevels": 1,
      "idimportfees": 0.02000000,
      "currencyidhex": "9779968e997bc064871fd3fa00126ade7d04ee95",
      "fullyqualifiedname": "Agents",
      "definitiontxid": "0d38978751edfe3d6ec1ef7287106b01c4a693d4e8bb8bef789beeaa524c1268",
      "definitiontxout": 1
    },
    "bestheight": 3603186,
    "besttxid": "c43c077ac77c5ddd30dc7cdc1f96416e2fa3daac6000f23134f1be6610ae3ddf",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iH9HFQeKRNVWguokGLLaiVYqy9u8VuFWMe",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.20000000,
          "reserves": 81.10603539,
          "priceinreserve": 0.04014748
        },
        {
          "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
          "weight": 0.20000000,
          "reserves": 206.58333027,
          "priceinreserve": 0.10225874
        },
        {
          "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
          "weight": 0.20000000,
          "reserves": 206.20300577,
          "priceinreserve": 0.10207048
        },
        {
          "currencyid": "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2",
          "weight": 0.20000000,
          "reserves": 30071414.75886196,
          "priceinreserve": 14885.35030563
        },
        {
          "currencyid": "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp",
          "weight": 0.20000000,
          "reserves": 30066900.39888897,
          "priceinreserve": 14883.11569745
        }
      ],
      "initialsupply": 10101.01010101,
      "emitted": 0.00000000,
      "supply": 10101.01010101,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.99975000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.03985002,
          "viaconversionprice": 0.04004792,
          "fees": 0.00070010,
          "conversionfees": 0.00050000,
          "priorweights": 0.20000000
        },
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.10225874,
          "viaconversionprice": 0.10200546,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 2.57283059,
          "lastconversionprice": 0.10334403,
          "viaconversionprice": 0.10257864,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "iJxDEvJffuUNVRfCmDJN9nzCzjehj4n1e2": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 14885.35030563,
          "viaconversionprice": 14848.48044819,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        },
        "i7Woqe6DzhKYe9vHAqCYSSwgk1LrvRcEAp": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 14883.11569745,
          "viaconversionprice": 14846.25137495,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.20000000
        }
      },
      "primarycurrencyfees": 0.00000000,
      "primarycurrencyconversionfees": 0.00000000,
      "primarycurrencyout": 0.00000000,
      "preconvertedout": 0.00000000
    }
  }
]







