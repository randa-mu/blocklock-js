import Ganache from "ganache";
import { ZeroAddress, ethers } from "ethers";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

import {MockBlocklockReceiver__factory, BlocklockSender__factory, BlocklockSignatureScheme__factory, DecryptionSender__factory, SignatureSchemeAddressProvider__factory, SignatureSender__factory} from "../src/generated"

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

  it.only("can request blocklock decryption for user contract", async () => {
    /** FIELD VARIABLES */

    const blocklock_default_pk = {
      x: {
        c0: BigInt("0x2691d39ecc380bfa873911a0b848c77556ee948fb8ab649137d3d3e78153f6ca"),
        c1: BigInt("0x2863e20a5125b098108a5061b31f405e16a069e9ebff60022f57f4c4fd0237bf"),
      },
      y: {
        c0: BigInt("0x193513dbe180d700b189c529754f650b7b7882122c8a1e242a938d23ea9f765c"),
        c1: BigInt("0x11c939ea560caf31f552c9c4879b15865d38ba1dfb0f7a7d2ac46a4f0cae25ba"),
      },
    };

    const SCHEME_ID = "BN254-BLS-BLOCKLOCK";

    /** DEPLOY CONTRACTS */

    // deploy signature scheme address provider
    const SignatureSchemeAddressProvider = new ethers.ContractFactory(
      SignatureSchemeAddressProvider__factory.abi,
      SignatureSchemeAddressProvider__factory.bytecode,
        wallet,
    )
    const signatureSchemeAddressProvider = await SignatureSchemeAddressProvider.deploy(
      await wallet.getAddress()
    )
    await signatureSchemeAddressProvider.waitForDeployment()
    const schemeProviderAddr = await signatureSchemeAddressProvider.getAddress()
    
    // deploy blocklock scheme
    const BlocklockScheme = new ethers.ContractFactory(
      BlocklockSignatureScheme__factory.abi,
      BlocklockSignatureScheme__factory.bytecode,
        wallet,
    )
    const blocklockScheme = await BlocklockScheme.deploy()
    await blocklockScheme.waitForDeployment()

    const schemeProviderContract = SignatureSchemeAddressProvider__factory.connect(schemeProviderAddr, wallet)
    await schemeProviderContract.updateSignatureScheme(SCHEME_ID, await blocklockScheme.getAddress());

    // deploy signature sender
    const SignatureSender = new ethers.ContractFactory(
      SignatureSender__factory.abi,
      SignatureSender__factory.bytecode,
        wallet,
    )
    const signatureSender = await SignatureSender.deploy(
      [blocklock_default_pk.x.c0, blocklock_default_pk.x.c1],
      [blocklock_default_pk.y.c0, blocklock_default_pk.y.c1],
      await wallet.getAddress(),
      schemeProviderAddr,
    )
    await signatureSender.waitForDeployment()

    // deploy decryption sender
    const DecryptionSender = new ethers.ContractFactory(
      DecryptionSender__factory.abi,
      DecryptionSender__factory.bytecode,
        wallet,
    )
    const decryptionSender = await DecryptionSender.deploy(
      [blocklock_default_pk.x.c0, blocklock_default_pk.x.c1],
      [blocklock_default_pk.y.c0, blocklock_default_pk.y.c1],
      await wallet.getAddress(),
      schemeProviderAddr,
    )
    await decryptionSender.waitForDeployment()

    // deploy blocklock sender
    const BlocklockSender = new ethers.ContractFactory(
      BlocklockSender__factory.abi,
      BlocklockSender__factory.bytecode,
        wallet,
    )
    const blocklockSender = await BlocklockSender.deploy(
      await decryptionSender.getAddress()
    )
    await blocklockSender.waitForDeployment()

    // deploy user mock decryption receiver contract
    const MockBlocklockReceiver = new ethers.ContractFactory(
      MockBlocklockReceiver__factory.abi, 
      MockBlocklockReceiver__factory.bytecode,
      wallet
    )
    const mockBlocklockReceiver = await MockBlocklockReceiver.deploy()
    await mockBlocklockReceiver.waitForDeployment()

    // const blockHeight = await provider.getBlockNumber();
    // console.log("current block number", blockHeight)

    /**  */
  });
});
