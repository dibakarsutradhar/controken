const getTransactionReceipts = async (web3, lastTxHashes) => {
	return await Promise.all(
		lastTxHashes.map(async (txHash) => {
			return await web3.eth.getTransactionReceipt(txHash);
		})
	);
};

module.exports = getTransactionReceipts;
