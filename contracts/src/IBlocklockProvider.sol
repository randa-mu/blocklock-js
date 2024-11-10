// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./TypesLib.sol";

interface IBlocklockProvider {
    /**
     * @notice Requests the generation of a blocklock decryption key at a specific blockHeight.
     * @dev Initiates a blocklock decryption key request.
     * The blocklock decryption key will be generated once the chain reaches the specified `blockHeight`.
     * @return requestID The unique identifier assigned to this blocklock request.
     */
    function requestBlocklock(uint256 blockHeight, TypesLib.Ciphertext calldata ciphertext)
    external
    returns (uint256 requestID);
    /**
     * @notice Retrieves a specific request by its ID.
     * @dev This function returns the Request struct associated with the given requestId.
     * @param requestId The ID of the request to retrieve.
     * @return The Request struct corresponding to the given requestId.
     */
    function getRequest(uint256 requestId) external view returns (TypesLib.BlocklockRequest memory);

    /**
     * @notice performs decryption with the blocklock scheme attached to this contract
     * @param ciphertext encrypted with blocklock
     * @param decryptionKey for the corresponding chain height
     * @return The Request struct corresponding to the given requestId.
     */
    function decrypt(TypesLib.Ciphertext calldata ciphertext, bytes calldata decryptionKey)
    external
    view
    returns (bytes memory);
}
