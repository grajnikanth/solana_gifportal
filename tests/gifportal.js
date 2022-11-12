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
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Gifportal;
  const tx = await program.methods.startStuffOff().rpc();
  console.log(`Transaction id for calling startStuffOff function is ${tx}`);
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

