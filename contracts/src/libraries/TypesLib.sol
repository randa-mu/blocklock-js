// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./BLS.sol";

library TypesLib {
    // Blocklock request stores details needed to generate blocklock decryption keys
    struct BlocklockRequest {
        uint256 decryptionRequestID;
        uint256 blockHeight;
        Ciphertext ciphertext;
        bytes signature;
        address callback;
    }

    struct Ciphertext {
        BLS.PointG2 u;
        bytes v;
        bytes w;
    }

    // Decryption request stores details for each decryption request
    struct DecryptionRequest {
        string schemeID; // signature scheme id, e.g., "BN254", "BLS12-381", "TESS"
        bytes ciphertext;
        bytes condition;
        bytes decryptionKey;
        bytes signature;
        address callback;
    }
}
