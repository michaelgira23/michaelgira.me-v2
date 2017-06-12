'use strict';

const port = 2468;

const me = require(__dirname + '/me.json');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Static Files
app.use('/assets', express.static(__dirname + '/public'));

// Main site
app.get('/', (req, res) => {
	res.render('pages/index', me);
});

// Redirect all directories to the main
app.use((req, res) => {
	res.redirect('/');
});

app.listen(port, () => {
	console.log('Server listening to *:' + port);
});
