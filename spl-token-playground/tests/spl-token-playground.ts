import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SplTokenPlayground } from "../target/types/spl_token_playground";
import { createMint } from "@solana/spl-token";

describe("spl-token-playground", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SplTokenPlayground as Program<SplTokenPlayground>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
