const { getWeb3connection } = require('../ethereum/web3connection');
const catchAsync = require('../utils/catchAsync');
const bigIntToString = require('../utils/bigIntToString');
const { fetchQuery } = require('@airstack/node');
const {
	GET_TOKEN_TRANSFERS_FROM_ADDRESS,
} = require('../queries/getTokenTransfersFromAddress');
const { erc20abi } = require('../utils/erc20abi');
const getTransactionReceipts = require('../ethereum/getTxReceipts');
const getApprovalEvents = require('../ethereum/getApprovalEvents');

const web3 = getWeb3connection();

exports.getevents = catchAsync(async (req, res, next) => {
	try {
		let approvalEventsData = [];

		const { data, error } = await fetchQuery(
			GET_TOKEN_TRANSFERS_FROM_ADDRESS(req.body.address)
		);

		if (error) console.log('fetching error ', error);

		if (data) {
			let lastTxHashes = data.Ethereum.TokenTransfer.map(
				(transfer) => transfer.token.lastTransferHash
			);

			const contract = new web3.eth.Contract(erc20abi);

			let txReceipts = await getTransactionReceipts(web3, lastTxHashes);

			for (let txReceipt of txReceipts) {
				txReceipt.logs.forEach((log) => {
					const approvalEvents = getApprovalEvents(web3, contract, log);

					approvalEvents.forEach((event) => {
						const decodedLog = web3.eth.abi.decodeLog(
							event.inputs,
							log.data,
							log.topics.slice(1)
						);

						let eventData = {
							spender: decodedLog.spender,
							value: web3.utils.fromWei(decodedLog.value, 'ether'),
							// tokenName: correspondingTx
							// 	? correspondingTx.tokenName
							// 	: undefined,
							// tokenSymbol: correspondingTx
							// 	? correspondingTx.tokenSymbol
							// 	: undefined,
						};

						approvalEventsData.push(eventData);
					});
				});
			}
		}

		res.status(200).json({
			message: 'success',
			// transactions: data.Ethereum,
			approval: approvalEventsData,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: 'Error fetching logs', error: e });
	}
});
