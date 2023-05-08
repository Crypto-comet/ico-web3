const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {

  // BSC Testnet
  // const network = "bscTestnet";
  // const provider = new ethers.providers.JsonRpcProvider(hre.network.config.url);
  // const signer = new ethers.Wallet.fromMnemonic("hre.network.config.accounts.mnemonic").connect(provider);

  // Hardhat
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const signer = new ethers.Wallet.fromMnemonic("candy maple cake sugar pudding cream honey rich smooth crumble sweet treat").connect(provider);


  //STKN
  console.log("Deploying STKN Contract...");
  const STKNFactory = await ethers.getContractFactory("STKN");
  const stkn = await STKNFactory.deploy();

  console.log("Deployed STKN:", stkn.address);

  //STKNICO
  console.log("Deploying stknICO Contract...");
  const StknICOFactory = await ethers.getContractFactory("StknICO");
  const stknICO = await StknICOFactory.deploy(
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    // "0x23851D963D494ed6B290bcfb3a56059af5139140",
    stkn.address
  );

  console.log("Deployed stknICO:", stknICO.address);

  const data = {
    address: stknICO.address,
    abi: JSON.parse(stknICO.interface.format("json"))
  };
  fs.writeFileSync("./artifacts/MyContract.json", JSON.stringify(data));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
