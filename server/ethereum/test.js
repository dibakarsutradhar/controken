const { web3connection } = require('./web3connection');

const web3 = web3connection();

// Log the current block number to the console
web3.eth
	.getBlockNumber()
	.then((result) => {
		console.log('Current block number: ' + result);
	})
	.catch((error) => {
		console.error(error);
	});
