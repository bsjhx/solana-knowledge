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

### Calculate rent of program
`du -k target/deploy/<program-name>.so` - shows fiels sizes in KB -> calculate bytes, let's call it n
`solana rent n`

## Links

[Simple game built with Anchor with TS script to call deployed program](https://beta.solpg.io/tutorials/tiny-adventure)