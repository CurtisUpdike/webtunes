const express = require('express');
const token = require('./functions/getDeveloperToken').handler;
require('dotenv').config();

const app = express();

app.use(express.static('client/build'));

app.get('/api/token', async (req, res) => {
	const { body } = await token();
	res.send(body);
});

const port = process.env.PORT || 3001;
app.listen(port);
