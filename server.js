const express = require('express');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.static('client/build'));

app.get('/api/token', async (req, res) => {
	const developerToken = jwt.sign({}, process.env.AUTH_KEY, {
		algorithm: 'ES256', // only supported algorithm by MusicKit
		expiresIn: '30d',
		issuer: process.env.TEAM_ID,
		header: {
			alg: 'ES256',
			kid: process.env.KEY_ID,
		},
	});
	res.send({ developerToken });
});

const port = process.env.PORT || 3001;
app.listen(port);
