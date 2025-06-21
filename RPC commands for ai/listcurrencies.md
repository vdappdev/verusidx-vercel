
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



EXAMPLE & RESULT/OUTPUT:




./verus listcurrencies
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
    "bestheight": 3606391,
    "besttxid": "67497f91d7f348c4686e06b99bb3c4e93f7293b288b10a8216fc0d485fb12f7d",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iH37kRsdfoHtHK5TottP1Yfq8hBSHz9btw",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 2267656.38778607,
          "priceinreserve": 130.17699231
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.25000000,
          "reserves": 51.56213050,
          "priceinreserve": 0.00295997
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 2138.64806756,
          "priceinreserve": 0.12277114
        },
        {
          "currencyid": "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx",
          "weight": 0.25000000,
          "reserves": 987811177.95824915,
          "priceinreserve": 56706.24915232
        }
      ],
      "initialsupply": 88888.00000000,
      "emitted": 0.00000000,
      "supply": 69679.17594442,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 199.95000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 130.16981736,
          "viaconversionprice": 130.17412048,
          "fees": 0.10020010,
          "conversionfees": 0.10000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00295997,
          "viaconversionprice": 0.00295990,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.18854417,
          "lastconversionprice": 0.12278196,
          "viaconversionprice": 0.12277519,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 56706.24915232,
          "viaconversionprice": 56704.99940895,
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
    "lastconfirmedheight": 22735438,
    "lastconfirmedtxid": "515ee76a7bf4911050874121dcc2c3181f57ac4b0e63759d16eeebfb3bb7f41d",
    "lastconfirmedtxout": 1,
    "lastconfirmednotarization": {
      "version": 2,
      "launchcleared": true,
      "launchconfirmed": true,
      "launchcomplete": true,
      "proposer": {
        "address": "REFfYsWs2i4DjCVcZyNySuZspb9e9HccBq",
        "type": 2
      },
      "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
      "notarizationheight": 22735438,
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
      "prevnotarizationtxid": "3988b232e05e2d0c22687f1066528f0c6ea0bc1471c9ae966da5668e91256777",
      "prevnotarizationout": 1,
      "prevheight": 22735369,
      "hashprevcrossnotarization": "13ceeef276c2203452177175207c6a30d9a11955718c38a68c11178e10c6b120",
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
                "reserves": 352862.70092819,
                "priceinreserve": 5.32470966
              },
              {
                "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
                "weight": 0.25000000,
                "reserves": 840510.18013736,
                "priceinreserve": 12.68332602
              },
              {
                "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
                "weight": 0.25000000,
                "reserves": 420.70497160,
                "priceinreserve": 0.00634845
              },
              {
                "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
                "weight": 0.25000000,
                "reserves": 333.32723024,
                "priceinreserve": 0.00502991
              }
            ],
            "initialsupply": 100000.00000000,
            "emitted": 0.00000000,
            "supply": 265075.63660609,
            "currencies": {
              "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.24545345,
                "lastconversionprice": 5.32471336,
                "viaconversionprice": 5.32100894,
                "fees": 0.00080040,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
                "reservein": 1403.19275900,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 12.67243542,
                "viaconversionprice": 12.67449996,
                "fees": 0.70159636,
                "conversionfees": 0.70159636,
                "priorweights": 0.25000000
              },
              "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
                "reservein": 0.00000000,
                "primarycurrencyin": 0.00000000,
                "reserveout": 1.17207962,
                "lastconversionprice": 0.00636613,
                "viaconversionprice": 0.00635507,
                "fees": 0.00000000,
                "conversionfees": 0.00000000,
                "priorweights": 0.25000000
              },
              "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
                "reservein": 0.37087995,
                "primarycurrencyin": 0.00000000,
                "reserveout": 0.00000000,
                "lastconversionprice": 0.00502571,
                "viaconversionprice": 0.00502641,
                "fees": 0.00018542,
                "conversionfees": 0.00018542,
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
          "height": 3606368,
          "stateroot": "e744775617aac638cfc0570b6a353b93722051e07a9ac6e9668bcac9833ad711",
          "blockhash": "000000000003a1492671d2d0ef6c0fc09df7e7847bca88410d33d905aab074d8",
          "power": "00000000000d7a0e4a085791f8cba98b000000026e5624a876442f8c01b029b2"
        },
        {
          "version": 1,
          "type": 2,
          "systemid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "height": 22735438,
          "stateroot": "477293619076357c00f611eeebd759b0fdcbaeb7fb8e5a68ad6ba52399bab6fe",
          "blockhash": "f1ae48b3868239c07d2da6dc904b7013ade39f3908feae5402df5d35bb83202b",
          "power": "0000000000000000000000000000000000000000000000000000000000000000",
          "gasprice": 5.00000000
        }
      ],
      "nodes": [
        {
          "networkaddress": "135.181.253.217:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        },
        {
          "networkaddress": "104.131.182.75:27485",
          "nodeidentity": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk"
        }
      ]
    },
    "bestheight": 22735580,
    "besttxid": "991b75c49297b63a09ab810358472239cafe6e948e52eb57cd315b400a3678fb",
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
    "bestheight": 3606391,
    "besttxid": "144cc8d6a3ca6fb5c3073dc7003446daf9d6ee2c85138efb285c896ab5dc8630",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 352424.10862172,
          "priceinreserve": 5.31809129
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.25000000,
          "reserves": 835952.46023522,
          "priceinreserve": 12.61454988
        },
        {
          "currencyid": "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4",
          "weight": 0.25000000,
          "reserves": 425.12498441,
          "priceinreserve": 0.00641514
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 332.07501481,
          "priceinreserve": 0.00501102
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 265075.63660609,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 216.18344570,
          "lastconversionprice": 5.32135350,
          "viaconversionprice": 5.31931445,
          "fees": 0.00060030,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 19.00331617,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 12.61433482,
          "viaconversionprice": 12.61261605,
          "fees": 0.00950164,
          "conversionfees": 0.00950164,
          "priorweights": 0.25000000
        },
        "iCkKJuJScy4Z6NSDK7Mt42ZAB2NEnAE1o4": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00641514,
          "viaconversionprice": 0.00641416,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.19608658,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00500925,
          "viaconversionprice": 0.00501025,
          "fees": 0.00009802,
          "conversionfees": 0.00009802,
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
    "lastconfirmedheight": 3606416,
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
      "notarizationheight": 3606416,
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
          "height": 3606416,
          "stateroot": "48f22f29e44356dc668d74cb0cb8678a60e25011b2017aa0f5264804c5186d1f",
          "blockhash": "80a1526650513fbb07129f5a251011520e8a4cb0a804ef9f098fde57b65d6802",
          "power": "00000000000d7a0e4bd57cb620f7ed4f000000026e5624a876523cecf3443e1e"
        }
      ],
      "nodes": [
      ]
    },
    "bestheight": 3606416,
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
    "bestheight": 3606275,
    "besttxid": "a34d74d857c37c3f370c0fa415a66707344ce3b28cdb3702803b6a2d8121d529",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iFrFn9b6ctse7XBzcWkRbpYMAHoKjbYKqG",
      "reservecurrencies": [
        {
          "currencyid": "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
          "weight": 0.25000000,
          "reserves": 84131.83905249,
          "priceinreserve": 10.91413759
        },
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 226990.81055189,
          "priceinreserve": 29.44674651
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.20000000,
          "reserves": 4.13089939,
          "priceinreserve": 0.00066985
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.10000000,
          "reserves": 85.67138117,
          "priceinreserve": 0.02778464
        },
        {
          "currencyid": "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2",
          "weight": 0.05000000,
          "reserves": 759109.54295629,
          "priceinreserve": 492.38350738
        },
        {
          "currencyid": "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N",
          "weight": 0.05000000,
          "reserves": 101753.89422636,
          "priceinreserve": 66.00093463
        },
        {
          "currencyid": "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP",
          "weight": 0.05000000,
          "reserves": 841226.83396302,
          "priceinreserve": 545.64749297
        },
        {
          "currencyid": "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
          "weight": 0.05000000,
          "reserves": 102953.12814215,
          "priceinreserve": 66.77879734
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
          "lastconversionprice": 10.91413759,
          "viaconversionprice": 10.91222131,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.03957742,
          "lastconversionprice": 29.44675164,
          "viaconversionprice": 29.44135894,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00362608,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00066950,
          "viaconversionprice": 0.00066974,
          "fees": 0.00000180,
          "conversionfees": 0.00000180,
          "priorweights": 0.20000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.15052850,
          "lastconversionprice": 0.02783346,
          "viaconversionprice": 0.02780658,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.10000000
        },
        "iExBJfZYK7KREDpuhj6PzZBzqMAKaFg7d2": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 492.38350738,
          "viaconversionprice": 492.29705599,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "iHog9UCTrn95qpUBFCZ7kKz7qWdMA8MQ6N": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 66.00093463,
          "viaconversionprice": 65.98934637,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "iJ3WZocnjG9ufv7GKUA4LijQno5gTMb7tP": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 545.64749297,
          "viaconversionprice": 545.55168964,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.05000000
        },
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 66.77879734,
          "viaconversionprice": 66.76707249,
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
    "bestheight": 3606318,
    "besttxid": "621c63b3adf94fde5ae833f4592322b427e571f43180ca36f4f04e7c4c7caf15",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iHax5qYQGbcMGqJKKrPorpzUBX2oFFXGnY",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 3018958.38211720,
          "priceinreserve": 4.19432891
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.50000000,
          "reserves": 68.59165170,
          "priceinreserve": 0.00009529
        }
      ],
      "initialsupply": 20000.00000000,
      "emitted": 0.00000000,
      "supply": 1439542.98357486,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 5.01699863,
          "lastconversionprice": 4.19433588,
          "viaconversionprice": 4.19433064,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00011400,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00009529,
          "viaconversionprice": 0.00009529,
          "fees": 0.00000004,
          "conversionfees": 0.00000004,
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
    "bestheight": 3606331,
    "besttxid": "479e7d92a43345992daa6cbbd82076386dc192ed5379641055dd9c3db8604433",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iHnYAmrS45Hb8GVgyzy7nVQtZ5vttJ9N3X",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 750662.27914672,
          "priceinreserve": 9.27958446
        },
        {
          "currencyid": "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ",
          "weight": 0.50000000,
          "reserves": 277939.05253775,
          "priceinreserve": 3.43584456
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 161787.90804382,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 49.99375000,
          "reserveout": 463.99290313,
          "lastconversionprice": 9.28101819,
          "viaconversionprice": 9.28101819,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        },
        "i6SapneNdvpkrLPgqPhDVim7Ljek3h2UQZ": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 3.43478319,
          "viaconversionprice": 3.43478319,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.50000000
        }
      },
      "primarycurrencyfees": 0.01250000,
      "primarycurrencyconversionfees": 0.01250000,
      "primarycurrencyout": -50.00000000,
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
    "bestheight": 3606387,
    "besttxid": "8c99e6eaebf615dd08c281e82d960e0d65309151b5b306a7fa04f3cb81987fa6",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iRt7tpLewArQnRddBVFARGKJStK6w5pDmC",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 2353641.01175864,
          "priceinreserve": 21.21284700
        },
        {
          "currencyid": "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx",
          "weight": 0.50000000,
          "reserves": 1025707898.60215296,
          "priceinreserve": 9244.47892243
        }
      ],
      "initialsupply": 88888.00000000,
      "emitted": 0.00000000,
      "supply": 221907.13120961,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 199.95000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 21.21149530,
          "viaconversionprice": 21.21194570,
          "fees": 0.10020010,
          "conversionfees": 0.10000000,
          "priorweights": 0.50000000
        },
        "iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 87123.06934797,
          "lastconversionprice": 9245.26414342,
          "viaconversionprice": 9244.67522103,
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
    "bestheight": 3606318,
    "besttxid": "8665e7f895dba025fdab6234576be6ec7034ba5d66735b8499688833494e33a4",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i4Xr5TAMrDTD99H69EemhjDxJ4ktNskUtc",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.16000000,
          "reserves": 1259.55745145,
          "priceinreserve": 0.75797542
        },
        {
          "currencyid": "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM",
          "weight": 0.21000000,
          "reserves": 3932.07795289,
          "priceinreserve": 1.80285147
        },
        {
          "currencyid": "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd",
          "weight": 0.21000000,
          "reserves": 3994.71830143,
          "priceinreserve": 1.83157197
        },
        {
          "currencyid": "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE",
          "weight": 0.42000000,
          "reserves": 7872.37372355,
          "priceinreserve": 1.80473540
        }
      ],
      "initialsupply": 20000.00000000,
      "emitted": 0.00000000,
      "supply": 10385.86980371,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 4.99875000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.75622941,
          "viaconversionprice": 0.75749268,
          "fees": 0.00270010,
          "conversionfees": 0.00250000,
          "priorweights": 0.16000000
        },
        "iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 11.92831116,
          "lastconversionprice": 1.80832058,
          "viaconversionprice": 1.80501045,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.21000000
        },
        "i61cV2uicKSi1rSMQCBNQeSYC3UAi9GVzd": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.83157197,
          "viaconversionprice": 1.83040730,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.21000000
        },
        "iC5TQFrFXSYLQGkiZ8FYmZHFJzaRF5CYgE": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.80473540,
          "viaconversionprice": 1.80358779,
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
    "bestheight": 3605982,
    "besttxid": "76506c369f99ce9fd3343b49e39f44612e3cffda143ebc50d767d6ba1b6fe7cb",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "iAik7rePReFq2t7LZMZhHCJ52fT5pisJ5C",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.50000000,
          "reserves": 9010.86730503,
          "priceinreserve": 0.69363209
        },
        {
          "currencyid": "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj",
          "weight": 0.50000000,
          "reserves": 20418.35489524,
          "priceinreserve": 1.57174950
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 25981.69090745,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 4.99875000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.69334346,
          "viaconversionprice": 0.69343962,
          "fees": 0.00270010,
          "conversionfees": 0.00250000,
          "priorweights": 0.50000000
        },
        "i9nLSK4S1U5sVMq4eJUHR1gbFALz56J9Lj": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 11.33047050,
          "lastconversionprice": 1.57262169,
          "viaconversionprice": 1.57196751,
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
    "bestheight": 3606282,
    "besttxid": "9fa0b7ead0914cbdb8be2b2238eae8118b4c725a353715a6a9d736ac8845dabd",
    "besttxout": 1,
    "bestcurrencystate": {
      "flags": 49,
      "version": 1,
      "currencyid": "i9kVWKU2VwARALpbXn4RS9zvrhvNRaUibb",
      "reservecurrencies": [
        {
          "currencyid": "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
          "weight": 0.25000000,
          "reserves": 2887.03833166,
          "priceinreserve": 0.65317960
        },
        {
          "currencyid": "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY",
          "weight": 0.25000000,
          "reserves": 6945.02848761,
          "priceinreserve": 1.57128185
        },
        {
          "currencyid": "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X",
          "weight": 0.25000000,
          "reserves": 2.72058963,
          "priceinreserve": 0.00061552
        },
        {
          "currencyid": "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU",
          "weight": 0.25000000,
          "reserves": 0.06566579,
          "priceinreserve": 0.00001485
        }
      ],
      "initialsupply": 100000.00000000,
      "emitted": 0.00000000,
      "supply": 17679.90496046,
      "currencies": {
        "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00088048,
          "lastconversionprice": 0.65317980,
          "viaconversionprice": 0.65288704,
          "fees": 0.00020010,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9oCSqKALwJtcv49xUKS2U2i79h1kX6NEY": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 1.57128185,
          "viaconversionprice": 1.57060151,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "i9nwxtKuVYX4MSbeULLiK2ttVi6rUEhh4X": {
          "reservein": 0.00000000,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00471920,
          "lastconversionprice": 0.00061658,
          "viaconversionprice": 0.00061591,
          "fees": 0.00000000,
          "conversionfees": 0.00000000,
          "priorweights": 0.25000000
        },
        "iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU": {
          "reservein": 0.00011367,
          "primarycurrencyin": 0.00000000,
          "reserveout": 0.00000000,
          "lastconversionprice": 0.00001483,
          "viaconversionprice": 0.00001485,
          "fees": 0.00000004,
          "conversionfees": 0.00000004,
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
