// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IDecryptionReceiver} from "./IDecryptionReceiver.sol";

abstract contract AbstractDecryptionReceiver is IDecryptionReceiver {
    address public immutable DECRYPTION_PROVIDER = 0xfD1Bf3fCBf2e250AbfF4a61670DFa3ce740453e5;

    error NotAuthorizedDecryptionProvider();

    modifier onlyDecryptionProvider(){
        if (msg.sender != DECRYPTION_PROVIDER) revert NotAuthorizedDecryptionProvider();
        _;
    }
}
