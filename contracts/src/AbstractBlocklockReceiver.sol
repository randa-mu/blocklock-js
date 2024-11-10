// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IBlocklockReceiver} from "./IBlocklockReceiver.sol";

abstract contract AbstractBlocklockReceiver is IBlocklockReceiver {
    address public immutable DECRYPTION_PROVIDER = 0x11045878Ed62Ec3aCC91cE36A46F4EF61d4616e1;

    error NotAuthorizedDecryptionProvider();

    modifier onlyDecryptionProvider(){
        if (msg.sender != DECRYPTION_PROVIDER) revert NotAuthorizedDecryptionProvider();
        _;
    }
}
