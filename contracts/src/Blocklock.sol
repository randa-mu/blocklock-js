pragma solidity 0.8.24;

import "./IBlocklockProvider.sol";
import "./ISignatureScheme.sol";
import "./IDecryptionProvider.sol";

library Blocklock {
    function contractAddress() public pure returns (address){
        return 0xfD1Bf3fCBf2e250AbfF4a61670DFa3ce740453e5;
    }

    function signatureSchemeAddress() public pure returns (address) {
        return 0x4fbFd8851935f0e3D2483c850C32b20499A9b755;
    }

    function decryptionSenderAddress() public pure returns (address) {
        return 0xaDE54E76eD6118F3d5b6905f63F6c49d1BFfb904;
    }

    /**
     * @notice Requests the generation of a blocklock decryption key at a specific blockHeight.
     * @dev Initiates a blocklock decryption key request.
     * The blocklock decryption key will be generated once the chain reaches the specified `blockHeight`.
     * @return requestID The unique identifier assigned to this blocklock request.
     */
    function requestBlocklock(uint256 blockHeight, bytes calldata ciphertext) public returns (uint256 requestID) {
        TypesLib.Ciphertext memory c = abi.decode(ciphertext, (TypesLib.Ciphertext));
        IBlocklockProvider blocklock = IBlocklockProvider(contractAddress());
        return blocklock.requestBlocklock(blockHeight, c);
    }

    /**
     * @notice Retrieves a specific request by its ID.
     * @dev This function returns the Request struct associated with the given requestId.
     * @param requestId The ID of the request to retrieve.
     * @return The Request struct corresponding to the given requestId.
     */
    function getRequest(uint256 requestId) external view returns (TypesLib.BlocklockRequest memory) {
        IBlocklockProvider blocklock = IBlocklockProvider(contractAddress());
        return blocklock.getRequest(requestId);
    }

    /**
     * @notice performs decryption with the blocklock scheme attached to this contract
     * @param ciphertext encrypted with blocklock
     * @param decryptionKey for the corresponding chain height
     * @return The Request struct corresponding to the given requestId.
     */
    function decrypt(bytes calldata ciphertext, bytes calldata decryptionKey) public returns (bytes memory){
        IBlocklockProvider blocklock = IBlocklockProvider(contractAddress());
        TypesLib.Ciphertext memory c = abi.decode(ciphertext, (TypesLib.Ciphertext));
        return blocklock.decrypt(c, decryptionKey);
    }

    function verify(bytes calldata decryptionKey) public returns (bool)  {
        ISignatureScheme scheme = ISignatureScheme(signatureSchemeAddress());
        IDecryptionProvider decrypter = IDecryptionProvider(decryptionSenderAddress());
        bytes memory m = abi.encode(block.number);
        bytes memory h_m = scheme.hashToBytes(abi.encode(m));
        bytes memory pk = decrypter.getPublicKeyBytes();
        return scheme.verifySignature(h_m, decryptionKey, pk);
    }
}