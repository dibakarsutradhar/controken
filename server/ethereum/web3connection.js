require('dotenv').config();
const { Web3 } = require('web3');

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_MAINNET;
const ALCHEMY_POLYGON_API_KEY = process.env.ALCHEMY_API_POLYGON_MAINNET;

exports.getWeb3connection = () => {
	// Set up provider
	const provider = new Web3.providers.HttpProvider(
		// `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
		`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
		// `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_POLYGON_API_KEY}`
	);

	// Set up a connection to the ethereum node
	const web3 = new Web3(provider);

	return web3;
};
