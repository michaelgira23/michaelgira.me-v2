'use strict';

const port = 2468;

const express = require('express');
const app = express();

// Static Files
app.use('/', express.static(__dirname + '/public'));

// Main site
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/html/index.html');
});

// Redirect all directories to the main
app.use((req, res) => {
	res.redirect('/');
});

app.listen(port, () => {
	console.log('Server listening to *:' + port);
});
