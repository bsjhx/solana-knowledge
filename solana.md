# Solana knowledge

## Solana CLI

### Managing installed Solana CLI

#### Installation
`sh -c "$(curl -sSfL https://release.solana.com/stable/install)"`
[Full instructions](https://solana.com/developers/guides/getstarted/setup-local-development)

`solana --version` - returns current installed versions
`solana-install update` - updates

### Account managing

`solana-keygen new -o /path/to/file.json` - generates new private key and stores it to output file
`solana config set -k /path/to/file.json` - sets your new wallet as the default

`solana-keygen pubkey`, `solana address` - returns current address
`solana balance` - returns balance
`solana airdrop 2` - airdrops 2 SOL

`solana config get` - returns current config
`solana config set --url [localhost | devnet | mainnet-beta | mainnet]`

`solana program deploy <PATH>`

### Deploy program

(building: see Anchor)
`solana program deploy` - deploys program

### Recovering SOl after failed deploy

In terminal we got:
```
====================================================================================
Recover the intermediate account's ephemeral keypair file with
`solana-keygen recover` and the following 12-word seed phrase:
====================================================================================
frozen cabbage direct dance relax honey cover captain salute isolate diagram nuclear
====================================================================================
To resume a deploy, pass the recovered keypair as the
[BUFFER_SIGNER] to `solana program deploy` or `solana program write-buffer'.
Or to recover the account's lamports, pass it as the
[BUFFER_ACCOUNT_ADDRESS] argument to `solana program close`.
====================================================================================
Error: 246 write transactions failed
```

Copy seed phrase `frozen cabbage ...` and type:

``` bash
solana-keygen recover -o ./recover.json
# follow instructions and then:
solana program close recover.json
# you should see:

Buffer Address                               | Authority                                    | Balance
FSzKw7EMMQLaFC6fR25eQnX8cDMab5sFkzH46tWK7nE5 | 7bTKsQ1jHrstRLwC3e41hbWU34b1rv9Fpw521tAKhgHj | 2.6426076 SOL

```

#### What if we want to program ID with some beginning?

`solana-keygen grind --starts-with a23:1` - searching for 1 (`:1`) instance of address beginning with `a23`

### Calculate rent of program
`du -k target/deploy/<program-name>.so` - shows fiels sizes in KB -> calculate bytes, let's call it n
`solana rent n`

## Links

[Simple game built with Anchor with TS script to call deployed program](https://beta.solpg.io/tutorials/tiny-adventure)