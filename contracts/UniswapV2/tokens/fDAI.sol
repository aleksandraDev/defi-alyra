// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract fDAI is ERC20 {
    constructor(uint256 initialSupply) ERC20("Fake Dai stablecoin", "fDAI") {
        _mint(msg.sender, initialSupply);
    }
}