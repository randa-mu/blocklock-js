// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {TypesLib} from "../libraries/TypesLib.sol";
import {IBlocklockSender} from "../interfaces/IBlocklockSender.sol";
import {IBlocklockReceiver} from "../interfaces/IBlocklockReceiver.sol";

contract MockBlocklockReceiver is IBlocklockReceiver {
    uint256 public requestId;
    TypesLib.Ciphertext public encrytpedValue;
    uint256 public plainTextValue;

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

    function createTimelockRequest(uint256 decryptionBlockNumber, TypesLib.Ciphertext calldata encryptedData) external returns (uint256) {
        // create timelock request
        requestId = timelock.requestBlocklock(decryptionBlockNumber, encryptedData);
        // store Ciphertext
        encrytpedValue = encryptedData;
        return requestId;
    }
    
    function receiveBlocklock(uint256 requestID, bytes calldata decryptionKey)
        external
        onlyTimelockContract
    {
        require(requestID == requestId, "Invalid request id");
        // decrypt stored Ciphertext with decryption key
        plainTextValue = abi.decode(timelock.decrypt(encrytpedValue, decryptionKey), (uint256));
    }
}
