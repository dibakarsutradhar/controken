const bigIntToString = (obj) => {
	if (typeof obj === 'bigint') return obj.toString();
	else if (Array.isArray(obj)) return obj.map(bigIntToString);
	else if (typeof obj === 'object' && obj !== null) {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) obj[key] = bigIntToString(obj[key]);
		}
	}
	return obj;
};

module.exports = bigIntToString;
