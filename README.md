# DEFI ALYRA #4 - DeFi

## UniswapV2 fork

- Contracts upgrade to 0.8.10
- Uniswap contracts renamed: AKUniswapFactory, AKUniswapPair, AKUniswapRouter02, AKUniswapERC20
- 3 tokens: fUSDC, fUSDT and fDAI

### Script

- Creation of pairs: fUSDC/WETH, fUSDT/WETH and fDAI/WETH
- Add liquidity in the 3 pairs
- Swap of a pair via router

## MasterChef SushiSwap fork

- Creation of an mintable ERC20 mintable that can be minted only by the MasterChef contract and the stacking contract
- [_MasterChef contract_](https://github.com/sushiswap/sushiswap/blob/canary/contracts/MasterChef.sol)

### Script

- Add rewards on fUSDC/WETH (30%), fUSDT/WETH (20%) and fDAI/WETH (50%) with the number of rewards per block chosen at your convenience.

## Stacking

- Stake created token against stkXYS where the stkXYS represent shares of the total amount in the contract
- Unstake its stkXYS against created token and retrive the amount corresponding to the shares
- Function callable every hour which mints the tokens of this contract

Used as inspiration [_yearn_](https://github.com/yearn/yearn-protocol/blob/develop/contracts/vaults/yDelegatedVault.sol)

## WebUI

- Creation of a Web interface for all functionalities of different contracts
