var jwt = require('jsonwebtoken');

function parseAuthKey(key) {
	// netlify's env variables do not preserve newlines
	const head = '-----BEGIN PRIVATE KEY-----';
	const tail = '-----END PRIVATE KEY-----';
	const body = key
		.replace(new RegExp(head), '')
		.replace(new RegExp(tail), '')
		.replace(/\s/g, '\n');
	return `${head}${body}${tail}`;
}

exports.handler = async () => {
	const developerToken = jwt.sign({}, parseAuthKey(process.env.AUTH_KEY), {
		algorithm: 'ES256', // only supported algorithm by MusicKit
		expiresIn: '30d',
		issuer: process.env.TEAM_ID,
		header: {
			alg: 'ES256',
			kid: process.env.KEY_ID,
		},
	});

	return {
		statusCode: 200,
		body: JSON.stringify({ developerToken }),
	};
};
