// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {TypesLib} from "../libraries/TypesLib.sol";
import {IBlocklockSender} from "../interfaces/IBlocklockSender.sol";
import {IBlocklockReceiver} from "../interfaces/IBlocklockReceiver.sol";

contract MockBlocklockReceiver is IBlocklockReceiver {
    uint256 public requestId;
    TypesLib.Ciphertext public Ciphertext;
    uint256 public plainText;

    // ** State Variables **
    IBlocklockSender public timelock; // The timelock contract which we will be used to decrypt data at specific block

    // ** Modifiers **
    modifier onlyTimelockContract() {
        require(msg.sender == address(timelock), "Only timelock contract can call this.");
        _;
    }

    constructor(address timelockContract) {
        timelock = IBlocklockSender(timelockContract);
    }

    function generateTimelockRequest(uint256 decryptionBlockNumber, TypesLib.Ciphertext calldata encryptedData) external returns (uint256) {
        requestId = timelock.requestBlocklock(decryptionBlockNumber, encryptedData);
        return requestId;
    }
    
    function receiveBlocklock(uint256 requestID, bytes calldata decryptionKey)
        external
        onlyTimelockContract
    {
        require(requestID == requestId, "Invalid request id");
        plainText = abi.decode(timelock.decrypt(Ciphertext, decryptionKey), (uint256));
    }
}
