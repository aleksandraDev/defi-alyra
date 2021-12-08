const { BN } = require('@openzeppelin/test-helpers');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
const web3 = new Web3(provider);

var AKMasterChef = artifacts.require('SushiSwap/AKMasterChef.sol');
var AKT = artifacts.require('SushiSwap/AKT.sol');
var AKSushiBar = artifacts.require('SushiSwap/AKSushiBar.sol');

const amount = new BN(web3.utils.toWei('1000000', 'ether'));

module.exports = async function (deployer, network, addresses) {
	await deployer.deploy(AKT, amount);
	const aktoken = await AKT.deployed();

	await deployer.deploy(
		AKMasterChef,
		aktoken.address,
		addresses[0],
		web3.utils.toWei('100'),
		1,
		10
	);

	const masterchef = await AKMasterChef.deployed();
	await aktoken.transferOwnership(masterchef.address);

	await deployer.deployed(AKSushiBar, aktoken.address);
	const sushibar = await AKSushiBar.deployed();

	await aktoken.setRootMinter(masterchef.address);
	await aktoken.setRootMinter(sushibar.address);
};
