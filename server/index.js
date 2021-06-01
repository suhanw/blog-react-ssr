import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from '../client/components/App';

const app = express();
const port = process.env.NODE_ENV === 'production' ? 8080 : 3000;

app.use('/build/client', express.static('build/client'));

app.get('/', (req, res) => {
	const jsx = ReactDOMServer.renderToString( // [A]
		<App />
	); 

	// const clientBundleScript = `<script src="http://localhost:8080/scripts/bundle.js"></script>`; // [B]
	// const clientBundleStyle = `<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">`; // [B]
	const clientBundleScript = process.env.NODE_ENV === 'production'
		? `<script src="build/client/scripts/bundle.js"></script>` // [B]
		: `<script src="http://localhost:8080/scripts/bundle.js"></script>`

	const clientBundleStyle = process.env.NODE_ENV === 'production'
		? `<link rel="stylesheet" href="build/client/styles/bundle.css">` // [B]
		: `<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">`

	res.send(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>My SSR App</title>
				${clientBundleStyle} <!-- [B] -->
			</head>
			<body>
				<div id='ssr-app'>${jsx}</div> <!-- [A] -->
				${clientBundleScript} <!-- [B] -->
			</body>
		</html>
	`);
});

app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});