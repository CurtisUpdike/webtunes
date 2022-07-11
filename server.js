const express = require('express');
const token = require('./src/functions/getDeveloperToken').handler;
require('dotenv').config();

const app = express();

app.use(express.static('build'));

app.get('/.netlify/functions/getDeveloperToken', async (req, res) => {
	const { body } = await token();
	res.send(body);
});

const port = process.env.PORT || 3030;
app.listen(port);
