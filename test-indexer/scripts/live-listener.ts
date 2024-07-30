import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { readFileSync } from "fs";
import { resolve } from "path";

const connection = new anchor.web3.Connection("http://127.0.0.1:8899", "confirmed");
const walletKeypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(readFileSync("/Users/michalrakoczy/.config/solana/id.json", "utf-8")))
);
const wallet = new anchor.Wallet(walletKeypair);

const provider = new anchor.AnchorProvider(connection, wallet, {
  preflightCommitment: "confirmed",
});

anchor.setProvider(provider);

const idl = JSON.parse(readFileSync(resolve("./target/idl/test_indexer.json"), "utf-8"));
const programId = new anchor.web3.PublicKey(idl.metadata.address);
const program = new anchor.Program(idl, programId, provider);

async function main() {
  let i = 0;
  program.addEventListener("SpecialEvent", (event) => {
    let data = event.data;
    console.log(`We have got a event!`, data.toNumber());

  });
  await new Promise(() => {});
}

main().catch(console.error);