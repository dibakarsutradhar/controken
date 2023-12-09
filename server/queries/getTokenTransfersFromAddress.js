const GET_TOKEN_TRANSFERS_FROM_ADDRESS = (address) => {
	return `
	query GetTokenTransfersFromVitalik {
		Ethereum: TokenTransfers(
			input: {filter: {from: {_eq: "${address}"}}, blockchain: ethereum, limit: 50, order: {blockTimestamp: DESC}}
		) {
			TokenTransfer {
				amount
				formattedAmount
				blockTimestamp
				token {
					symbol
					name
					decimals
					lastTransferHash
					lastTransferTimestamp
					rawContractMetaData
				}
				from {
					addresses
				}
				to {
					addresses
				}
				type
			}
		}  
	}`;
};

module.exports = { GET_TOKEN_TRANSFERS_FROM_ADDRESS };
