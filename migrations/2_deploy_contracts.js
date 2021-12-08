const { BN, constants } = require('@openzeppelin/test-helpers');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
const web3 = new Web3(provider);

const AKUniswapV2Factory = artifacts.require('UniswapV2/AKUniswapV2Factory.sol');
const AKUniswapV2Router02 = artifacts.require('UniswapV2/AKUniswapV2Router02.sol');
const AKUniswapV2Pair = artifacts.require('UniswapV2/AKUniswapV2Pair.sol');

const fUSDC = artifacts.require('UniswapV2/tokens/fUSDC');
const fUSDT = artifacts.require('UniswapV2/tokens/fUSDT');
const fDAI = artifacts.require('UniswapV2/tokens/fDAI');
const WETH = artifacts.require('UniswapV2/tokens/WETH');

const amount = new BN(web3.utils.toWei('10000000', 'ether'));
const liquidValue = web3.utils.toWei('10');
const swapAmount = new BN(web3.utils.toWei('0.1', 'ether'));

module.exports = async function (deployer, network, addresses) {
	await deployer.deploy(AKUniswapV2Factory, addresses[0]);
	const factory = await AKUniswapV2Factory.deployed();

	console.log('factory deployed');

	await deployer.deploy(fUSDC, amount);
	await deployer.deploy(fUSDT, amount);
	await deployer.deploy(fDAI, amount);
	await deployer.deploy(WETH, amount);

	const WETHContract = await WETH.deployed();
	const USDCContract = await fUSDC.deployed();
	const USDTContract = await fUSDT.deployed();
	const DAIContract = await fDAI.deployed();

	console.log('Deployed tokens ...');

	await deployer.deploy(AKUniswapV2Router02, factory.address, WETHContract.address);
	const router = AKUniswapV2Router02.deployed();

	await factory.createPair(WETHContract.address, USDCContract.address);
	await factory.createPair(WETHContract.address, USDTContract.address);
	await factory.createPair(WETHContract.address, DAIContract.address);

	console.log('Created pairs ...');

	const pair_WETH_USDC = await factory.getPair(WETHContract.address, USDCContract.address);
	const pair_WETH_USDT = await factory.getPair(WETHContract.address, USDTContract.address);
	const pair_WETH_DAI = await factory.getPair(WETHContract.address, DAIContract.address);

	console.log('Getting pairs ...');

	const swapWethUsdcContract = new web3.eth.Contract(AKUniswapV2Pair.abi, pair_WETH_USDC);
	const swapWethDaiContract = new web3.eth.Contract(AKUniswapV2Pair.abi, pair_WETH_DAI);
	const swapWethUsdTContract = new web3.eth.Contract(AKUniswapV2Pair.abi, pair_WETH_USDT);

	console.log('Paired contracts ...');

	await WETHContract.approve(router.address, amount);
	await USDCContract.approve(router.address, amount);
	await USDTContract.approve(router.address, amount);
	await DAIContract.approve(router.address, amount);

	console.log('Approved tokens ...');

	await router.addLiquidityETH(
		USDCContract.address,
		amount,
		0,
		0,
		account[0],
		constants.MAX_UINT256,
		liquidValue
	);
	await router.addLiquidityETH(
		USDTContract.address,
		amount,
		0,
		0,
		account[0],
		constants.MAX_UINT256,
		liquidValue
	);
	await router.addLiquidityETH(
		DAIContract.address,
		amount,
		0,
		0,
		account[0],
		constants.MAX_UINT256,
		liquidValue
	);

	console.log('Added tokens liquidity ...');

	await router.swapExactETHForTokens(
		swapAmount,
		[WETHContract.address, DAIContract.address],
		accounts[0],
		constants.MAX_UINT256,
		{ value: swapAmount }
	);
	console.log('Swapped WETH to DAI');

	swapWethDaiReserves = await swapWethDaiContract.methods.getReserves().call();

	console.log('r0: ' + web3.utils.fromWei(swapWethDaiReserves._reserve0));
	console.log('r1: ' + web3.utils.fromWei(swapWethDaiReserves._reserve1));
};
