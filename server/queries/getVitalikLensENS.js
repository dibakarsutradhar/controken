const GET_VITALIK_LENS_FARCASTER_ENS = `
	query MyQuery {
		Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
			socials {
				dappName
				profileName
			}
			addresses
		}
	}
`;

module.exports = { GET_VITALIK_LENS_FARCASTER_ENS };
