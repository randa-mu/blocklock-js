import Ganache from "ganache";
import { ZeroAddress, ethers } from "ethers";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

let server: any;
let provider: ethers.JsonRpcProvider;
let wallet: ethers.Signer;
let accounts: ethers.Signer[];

describe("Blockchain Integration Tests with Ganache", () => {
  beforeAll(async () => {
    // Start Ganache server with a mnemonic
    server = Ganache.server({
      wallet: {
        totalAccounts: 10,
        mnemonic: "test test test test test test test test test test test junk",
      },
      chain: {
        chainId: 1337,
      },
    });

    await server.listen(8545);

    // Connect to Ganache with Ethers.js
    provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // Get the list of accounts from Ganache
    accounts = await provider.listAccounts();

    // Create a wallet using the first account
    wallet = accounts[0];
  });

  afterAll(async () => {
    // Ensure the Ganache server is stopped after all tests
    await server.close();
  });

  it("should get network information from ganache", async () => {
    const network = await provider.getNetwork();
    expect(network.chainId).toBe(1337n); // Default Ganache chainId
  });

  it("should get valid address for signer", async () => {
    expect(await wallet.getAddress()).not.toBe(ZeroAddress);
  });
});
