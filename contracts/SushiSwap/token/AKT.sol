// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AKT is ERC20, Ownable {

    constructor(uint256 initialSupply) ERC20("AKToken", "AKT") {
         _mint(msg.sender, initialSupply);
    }

    mapping (address => bool) public minters;

    modifier isMinter() {
        require(minters[msg.sender] || _msgSender() == owner());
        _;
    }

    function mint(address to, uint256 amount) public isMinter {
        _mint(to, amount);
    }

    function setRootMinter(address _minterAddress) public onlyOwner {
        require (minters[_minterAddress] == false);
        minters[_minterAddress] = true;
    }
}