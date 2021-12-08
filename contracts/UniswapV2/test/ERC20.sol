// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '../AKUniswapV2ERC20.sol';

contract ERC20 is AKUniswapV2ERC20 {
    constructor(uint _totalSupply) {
        _mint(msg.sender, _totalSupply);
    }
}
