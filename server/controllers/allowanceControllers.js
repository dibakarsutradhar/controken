const axios = require('axios');
const { getWeb3connection } = require('../ethereum/web3connection');
const catchAsync = require('../utils/catchAsync');

const web3 = getWeb3connection();

/** @GET METHODS */

/**
 * 1. Get all the transactions of an address
 * 2. Get all the internal tx of an address
 * 3. Get all the tx logs of an address
 * 4. Detact all the events with "Approve" && "ApproveAll"
 * 5.
 */

// Replace YourApiKeyToken with your actual API key
const POLYGONSCAN_API = process.env.POLYGONSCAN_API_KEY;
const EVENTS = ['Approve', 'ApproveForAll']; // Events to search for

// Get all the tx for an user
exports.getTx = catchAsync(async (req, res) => {
	if (!req.body.address) {
		res.status(400).json({ message: 'User wallet address is required' });
	}

	const address = req.body.address;
	console.log(typeof address);

	let page = 1;
	let maxpage = 10;
	let logs = [];
	while (page <= maxpage) {
		try {
			const response = await axios.get(`https://api.polygonscan.com/api
				?module=account
				&action=txlist
				&address=${address}
				&startblock=0
				&endblock=99999999
				&page=${page}
				&offset=10
				&sort=asc
				&apikey=${POLYGONSCAN_API}`);

			if (response.data.status !== '1') {
				console.log(response.data);
				return res.status(500).json({
					message: 'Error fetching datas',
					error: response.data.message,
				});
			}

			logs = logs.concat(response.data.result);
			console.log(page);
			page++;
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Error fetching logs', error: error.toString() });
		}
	}

	// Filter logs by event name
	// const filteredLogs = response.data.result.filter((log) => {
	// 	const topics = log.topics.slice(2); // Skip first two topics
	// 	return EVENTS.some((event) => topics.includes(web3.utils.sha3(event)));
	// });

	res.status(200).json({
		logs: logs,
	});
});
