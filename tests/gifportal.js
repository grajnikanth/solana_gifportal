const anchor = require("@project-serum/anchor");

// describe("gifportal", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const program = anchor.workspace.Gifportal;
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

const main = async () => {
  console.log("Starting tests");
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Gifportal;

  const baseAccount = anchor.web3.Keypair.generate();

  let tx = await program.methods
    .startStuffOff()
    .accounts(
      {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF count", account.totalGifs.toString());

  tx = await program.methods
      .addGif("http://giflink_example.com")
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey
      })
      .rpc()
  
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF count after increment is ", account.totalGifs.toString());
  console.log("GIF_list for this user is ", account.gifList);
};

const runMain = async () => {
  try {
      await main();
      process.exit(0)
  } catch(error) {
      console.error(error);
      process.exit(1)
  }
};

runMain();

