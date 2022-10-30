// import "dotenv/config";
import { ethers, network, run } from "hardhat";

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("Deployed contract to:", simpleStorage.address);

  // verify if on the goerli testnet
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  // current favorite number
  const currentNumber = await simpleStorage.retrieve();
  console.log("Current favorite number:", currentNumber.toString());

  // update favorite number
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  // new favorite number
  const updatedNumber = await simpleStorage.retrieve();
  console.log("Updated favorite number:", updatedNumber.toString());
};

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified:", contractAddress);
    } else {
      console.log(e);
    }
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
