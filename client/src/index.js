import React from 'react';
import { render } from 'react-dom';
import './utils/font-awesome-library';
import './index.css';
import Error from './components/Error';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

fetch('/api/token')
	.then((res) => res.json())
	.then(({ developerToken }) => {
		window.MusicKit.configure({
			developerToken,
			app: {
				name: 'Webtunes',
				build: '1.0',
			},
		});
	})
	.then(() => render(<App />, root))
	.catch((error) => {
		render(
			<Error>
				There was an error loading the MusicKit library. Please try again
				another time.
			</Error>,
			root
		);
	});

serviceWorker.unregister();
