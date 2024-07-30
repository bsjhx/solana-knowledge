# Test indexer

In this project is very simple Solana program which only emits event. Three TS scripts are example of handling events in Solana.

## Start

```bash
solana-test-validator --reset

anchor build
anchor keys list
# update program id
anchor build
anchor deploy

# in three separate terminals:
ts-node ./scripts/client.ts
ts-node ./scripts/live_listener.ts
ts-node ./scripts/historical-events.ts
```
