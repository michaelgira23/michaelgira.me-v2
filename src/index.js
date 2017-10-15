const port = 2468;
const me = require(__dirname + '/me.json');

const path = require('path');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Static Files
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Favicons (Also static files but placed in root)
app.use('/', express.static(path.join(__dirname, 'favicons')));

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
