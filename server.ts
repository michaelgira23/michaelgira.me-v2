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
if (config[404]) {
	app.use((_, res, __) => serve(res, config[404], 404));
}

app.listen(config.port, () => console.log(`Server is listening on *:${config.port}`));
