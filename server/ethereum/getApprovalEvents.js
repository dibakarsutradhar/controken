const getApprovalEvents = (web3, contract, log) => {
	return contract.options.jsonInterface.filter((event) => {
		if (event.type === 'event') {
			const eventSignature = web3.utils.sha3(
				`${event.name}(${event.inputs.map((input) => input.type).join(',')})`
			);
			return log.topics[0] === eventSignature && event.name === 'Approval';
		}
		return false;
	});
};

module.exports = getApprovalEvents;
