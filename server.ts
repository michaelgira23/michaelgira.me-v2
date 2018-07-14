import { config } from './config';

import * as express from 'express';
import * as path from 'path';

const app = express();

function serve(res: express.Response, pageName: string, httpCode = 200) {
	res.status(httpCode).sendFile(path.join(__dirname, 'dist', pageName, `${pageName}.html`));
}

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
for (const url of Object.keys(config.routes)) {
	app.get(url, (_, res) => serve(res, config.routes[url]));
}
if (typeof config[404] === 'string') {
	app.use((_, res, __) => serve(res, config[404] as string, 404));
} else if (typeof config.redirect404 === 'string') {
	app.use((_, res, __) => res.redirect(config.redirect404 as string));
}

app.listen(config.port, () => console.log(`Server is listening on *:${config.port}`));
