getidentity help command followed by examples with outputs:

notes:  
- getidentity "i-address" can be used for retrieving the friendly name of an i-address, for example when getoffers "identity name@" is used it returns info that displays i-addresses instead of friendly names.
- an ID can be a root ID or a subID; the subID is defined using a currency (parent ID), and that currency itself would have been defined from an ID (root ID)



./verus help getidentity

getidentity "name@ || iid" (height) (txproof) (txproofheight)



Arguments
    "name@ || iid"                       (string, required) name followed by "@" or i-address of an identity
    "height"                             (number, optional) default=current height, return identity as of this height, if -1 include mempool
    "txproof"                            (bool, optional) default=false, if true, returns proof of ID
    "txproofheight"                      (number, optional) default="height", height from which to generate a proof

Result:

Examples:
> verus getidentity "name@"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getidentity", "params": ["name@"] }' -H 'content-type: text/plain;' http://127.0.0.1:27486/



EXAMPLES & OUTPUTS/RESULTS:


./verus getidentity user55@
{
  "friendlyname": "user55.VRSCTEST@",
  "fullyqualifiedname": "user55.VRSCTEST@",
  "identity": {
    "version": 3,
    "flags": 0,
    "primaryaddresses": [
      "RNbutwMxKynAeDQMpwPtq9qEr7a2EtRSbo"
    ],
    "minimumsignatures": 1,
    "name": "user55",
    "identityaddress": "i9HCcMiXxMMB12rDsawGQ6H2GmjrHNQnKd",
    "parent": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "systemid": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "contentmap": {},
    "contentmultimap": {},
    "revocationauthority": "iHbjFumRBT8nxoQeadcaYzzFdJGnMuQGeL",
    "recoveryauthority": "iHbjFumRBT8nxoQeadcaYzzFdJGnMuQGeL",
    "privateaddress": "zs18ljucx4c64jjtq8gd5j9deqlug56m8v82kdp67ftgeahaxcerwwkaecy7zlcezfcsg8wktn4dwj",
    "timelock": 0
  },
  "status": "active",
  "canspendfor": true,
  "cansignfor": true,
  "blockheight": 247878,
  "txid": "89f724fc8b19bd83bf97834ca66b368dc969dc1824117cb54a9f210b58884c82",
  "vout": 0
}


./verus getidentity player42.gamesession5@
{
  "friendlyname": "player42.gamesession5@",
  "fullyqualifiedname": "player42.gamesession5.VRSCTEST@",
  "identity": {
    "version": 3,
    "flags": 0,
    "primaryaddresses": [
      "RGi75h173LD84tTThCu73B9Dp6rupM5zoz"
    ],
    "minimumsignatures": 1,
    "name": "player42",
    "identityaddress": "iSKE3trvjUWqGFziyaoarJe92bzDEJw3uv",
    "parent": "i814vg9MCgn26oypfcvRKMdQPVCmS6P8G7",
    "systemid": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "contentmap": {},
    "contentmultimap": {},
    "revocationauthority": "iHbjFumRBT8nxoQeadcaYzzFdJGnMuQGeL",
    "recoveryauthority": "iHbjFumRBT8nxoQeadcaYzzFdJGnMuQGeL",
    "privateaddress": "zs1kv5zk4kyjuyknqmh6neyand9uewp9h5k0fayxjxah5mmk564d4yxxfqtwwd6atytlrhvyy3dj04",
    "timelock": 0
  },
  "status": "active",
  "canspendfor": true,
  "cansignfor": true,
  "blockheight": 248224,
  "txid": "f8fea511c8b36431ac96a2f798a8b0f822e3125fedb5c87d3cbdc231b1b763c0",
  "vout": 0
}


./verus getidentity vrsctest@
{
  "friendlyname": "VRSCTEST@",
  "fullyqualifiedname": "VRSCTEST@",
  "identity": {
    "version": 3,
    "flags": 1,
    "primaryaddresses": [
      "RXKs5Gz8kRqpA52M25AW5FzP3aCNq46yMh"
    ],
    "minimumsignatures": 1,
    "name": "VRSCTEST",
    "identityaddress": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "parent": "i3UXS5QPRQGNRDDqVnyWTnmFCTHDbzmsYk",
    "systemid": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "contentmap": {},
    "contentmultimap": {
      "i5Zkx5Z7tEfh42xtKfwbJ5LgEWE9rEgpFY": [
        {
          "i5Zkx5Z7tEfh42xtKfwbJ5LgEWE9rEgpFY": {
            "version": 1,
            "action": 2,
            "entrykey": "iH51dFy7vF3LTRuVQvCTVu6QSbYfhTjek8",
            "valuehash": "f90fa633c71b03f31a7fb37cdec2bc5cc668bf7968b855bc091940e8aa9a2aac"
          }
        }
      ]
    },
    "revocationauthority": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "recoveryauthority": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "timelock": 0
  },
  "status": "active",
  "canspendfor": false,
  "cansignfor": false,
  "blockheight": 11080,
  "txid": "805baed5d56f587cb2af5616b1738447da72a76c8ff8bdfc43c1c627cd91a593",
  "vout": 0
}



another example with contentmultimap:

getidentity dev28@
{
  "friendlyname": "dev28.VRSCTEST@",
  "fullyqualifiedname": "dev28.VRSCTEST@",
  "identity": {
    "version": 3,
    "flags": 0,
    "primaryaddresses": [
      "RDyDcLWtYXwGue6ac6eNQo5dtxKv4fF8ss"
    ],
    "minimumsignatures": 1,
    "name": "dev28",
    "identityaddress": "iHbjFumRBT8nxoQeadcaYzzFdJGnMuQGeL",
    "parent": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "systemid": "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq",
    "contentmap": {},
    "contentmultimap": {
      "iRdzneUE7xvFtLFQa2FEwXiDRK9q7pRNns": [
        {
          "i4GC1YGEVD21afWudGoFJVdnfjJ5XWnCQv": {
            "version": 1,
            "flags": 96,
            "mimetype": "text/plain",
            "objectdata": {
              "message": "devSpot"
            },
            "label": "iSapmQh5BSzA8wBs9uyBW9UmtdPEwK5V8t"
          }
        },
        {
          "i4GC1YGEVD21afWudGoFJVdnfjJ5XWnCQv": {
            "version": 1,
            "flags": 96,
            "mimetype": "text/plain",
            "objectdata": {
              "message": "The Matrix"
            },
            "label": "iGrXvgxf5jBcHqmJJcM3wX6NzjKZAjEG6W"
          }
        },
        {
          "i4GC1YGEVD21afWudGoFJVdnfjJ5XWnCQv": {
            "version": 1,
            "flags": 96,
            "mimetype": "text/plain",
            "objectdata": {
              "message": "https://dev.spot"
            },
            "label": "i4RpoVPFoCsfaDgHkYta8kaNgadPu7jWY4"
          }
        },
        {
          "i4GC1YGEVD21afWudGoFJVdnfjJ5XWnCQv": {
            "version": 1,
            "flags": 96,
            "mimetype": "text/plain",
            "objectdata": {
              "message": "1-800-555-7768"
            },
            "label": "i76wgVoFdJwWh8vQbL3gdRAPdjBZ5SCPXC"
          }
        },
        {
          "i4GC1YGEVD21afWudGoFJVdnfjJ5XWnCQv": {
            "version": 1,
            "flags": 96,
            "mimetype": "text/plain",
            "objectdata": {
              "message": "contact@dev.spot"
            },
            "label": "iPTehGEZpwBs5eutNGHLWNDPc4ARrfH4UZ"
          }
        }
      ]
    },
    "revocationauthority": "iHbjFumRBT8nxoQeadcaYzzFdJGnMuQGeL",
    "recoveryauthority": "iHbjFumRBT8nxoQeadcaYzzFdJGnMuQGeL",
    "timelock": 0
  },
  "status": "active",
  "canspendfor": true,
  "cansignfor": true,
  "blockheight": 570799,
  "txid": "156690d0966ba4604104c3ba2d1ba9dd805b31bf74128f6f105fab3df5da479c",
  "vout": 0
}

