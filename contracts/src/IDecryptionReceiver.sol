// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IDecryptionReceiver {
    /// Setters

    /// @notice Receives a decrypted version of a Ciphertext linked to a specific request id
    /// @dev This function is intended to be called by an authorized decrypter contract
    /// @param requestID The ID of the request for which the decryption key is provided
    /// @param decryptedCipherText The decrypted Ciphertext associated with the request, provided as a byte array
    function receiveDecryptedCipherText(uint256 requestID, bytes calldata decryptedCipherText) external;
}
