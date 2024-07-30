import * as anchor from "@project-serum/anchor";
import { BorshCoder, EventParser } from "@project-serum/anchor";
import { GetVersionedTransactionConfig, Keypair } from "@solana/web3.js";
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
    const eventParser = new EventParser(program.programId, new BorshCoder(program.idl));

    let signatures = await connection.getSignaturesForAddress(programId);
    const config: GetVersionedTransactionConfig = {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0
    };

    for (let s of signatures) {
        const transaction = await connection.getTransaction(s.signature, config);
        if (transaction) {
            const events = eventParser.parseLogs(transaction.meta.logMessages);
            
            console.log("====================================");
            console.log(`Logs for signature ${s.signature}:`);
            for (let event of events) {
                console.log(event);
            }
            console.log("====================================");
            
        }
    }

}

main().catch(console.error);