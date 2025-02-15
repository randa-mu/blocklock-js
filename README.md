## blocklock-js

BlocklockJS is a TypeScript library designed to simplify the process of generating encrypted data off-chain for the dcrypt network. It enables developers to securely encrypt data tied to a user-specified future chain height. The encrypted data can then be used to create on-chain timelock encryption requests in smart contracts. Once the specified chain height is mined, the user’s smart contract will receive the decryption keys automatically.


### Key Capabilities

Using this library, developers can:

* Encode and encrypt various Solidity-compatible data types.
* Encrypt the encoded data off-chain using a public key, which can then be integrated into smart contracts for timelock encryption requests.


### On-Chain Integration

Solidity interfaces used for on-chain decryption requests can be found in the [blocklock-solidity](./blocklock-solidity) directory and the documentation for the solidity interfaces can be found in the [blocklock-solidity](github.com/randa-mu/blocklock-solidity.git) repository.

#### Smart Contract Addresses

| Contract        | Address | Network          |
|-----------------|---------|------------------|
| BlocklockSender Proxy | 0xfF66908E1d7d23ff62791505b2eC120128918F44   | Filecoin Calibnet |


### Installation

To install the library, install the latest version using:

```sh
npm install blocklock-js
```



### Usage Example

#### Prerequisites

* [ethers](https://www.npmjs.com/package/ethers) for wallet setup and message encoding.


Here’s how to use BlocklockJS to encrypt data and create an on-chain timelock encryption request.

#### Example: Encrypting a uint256 (4 ETH) for Decryption 2 Blocks Later

This example demonstrates encrypting a uint256 value and sending it to a user smart contract that implements the createTimelockRequest function. In a different use case, e.g., sealed bid auction, this could be refactored into a `sealedBid` function.
The example user smart contract source code can be found [here](contracts/src/mocks/MockBlocklockReceiver.sol).

```js
import { ethers, getBytes } from "ethers";
import { Blocklock, SolidityEncoder, encodeCiphertextToSolidity } from "blocklock-js";
import { MockBlocklockReceiver__factory } from "../types"; // Users' solidity contract TypeScript binding

async function main() {
  // User wallet
  const wallet = new ethers.Wallet("your-private-key", ethers.provider);
  // User contract
  const mockBlocklockReceiver = MockBlocklockReceiver__factory.connect("user blocklcok receiver contract address", wallet);

  // Ensure plainTextValue is initially 0
  console.log("Initial plainTextValue:", (await mockBlocklockReceiver.plainTextValue()).toString());

  // Set block height (current block + 2)
  const blockHeight = BigInt(await ethers.provider.getBlockNumber() + 2);

  // Value to encrypt (4 ETH as uint256)
  const msg = ethers.utils.parseEther("4");

  // Encode the uint256 value
  const encoder = new SolidityEncoder();
  const msgBytes = encoder.encodeUint256(msg);
  const encodedMessage = getBytes(msgBytes);

  // Encrypt the encoded message
  const blocklockjs = new Blocklock(wallet, "blocklockSender contract address");
  const ciphertext = blocklockjs.encrypt(encodedMessage, blockHeight);

  // Call `createTimelockRequest` on the user's contract
  const tx = await mockBlocklockReceiver
    .connect(wallet)
    .createTimelockRequest(blockHeight, encodeCiphertextToSolidity(ciphertext));
  const receipt = await tx.wait(1);

  if (!receipt) {
    throw new Error("Transaction has not been mined");
  }

  console.log("Timelock request created!");
}

main().catch((error) => {
  console.error("Error:", error);
});
```

#### How It Works
1. Encoding and Encryption:

    * Use the SolidityEncoder to encode Solidity-compatible data types.
    * Encrypt the encoded message and specify the decryption chain height.

2. On-Chain Interaction:

    * Call the appropriate function in the user contract with the encrypted data and the chain height used during off-chain encryption. In this example, the function `createTimelockRequest` is called, which creates an on-chain timelock request with the encrypted data and chain height as a condition for decryption, stores the encrypted data, and generates a request ID.

3. Decryption:

    * After the specified chain height, the on-chain timelock contract triggers a callback to the user's contract, providing the decryption key. The user's contract then calls the `decrypt` function in the `BlocklockSender` contract to perform on-chain decryption using the provided decryption key.


#### Supported Data Types
The library supports encoding and encryption of the following Solidity-compatible data types:

* uint256
* int256
* address
* string
* bytes
* bytes32

Use the `SolidityEncoder` to encode any of these types before encryption.


### Common Errors

#### Webpack Configuration

When using the library in web applications, there might be webpack errors such as the one displayed below:

![Webpack require error](./documentation/images/webpack-require.png)


To resolve this error, one solution is to update your `next.config.ts` configuration file if you use one with similar configurations for webpack below. 

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   webpack: (config) => {
     config.externals.push({
       'node:crypto': 'crypto',
     });
     return config;
  },
};

export default nextConfig;
```

In the library's Webpack configuration, the following setting is used:

```javascript
externals: {
    'node:crypto': 'commonjs crypto',
}
```

This configuration tells the bundler **not to include the `crypto` module** in the final bundle. Instead, it treats `'node:crypto'` as an **external dependency** and expects it to be available in the runtime environment. `'commonjs crypto'` ensures that the module is required using the **CommonJS format**, making it compatible with Node.js. This ensures compatibility with environments where the `crypto` module is natively available.


### Licensing

This library is licensed under the MIT License which can be accessed [here](LICENSE).

### Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to improve the code, feel free to open an issue or submit a pull request.

### Acknowledgments

Special thanks to the Filecoin Foundation for supporting the development of this library.
