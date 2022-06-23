import React, { Component, createContext } from 'react';

export const MusicKitContext = createContext({});

const PATH_TO_API = '/.netlify/functions/getDeveloperToken';

class MusicKitProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: false,
		};
	}

	setStore(data) {
		localStorage.setItem('devToken', JSON.stringify(data));
	}

	getStore() {
		return JSON.parse(localStorage.getItem('devToken')) || {};
	}

	async configure() {
		try {
			let { developerToken, expiration } = this.getStore();
			const isValidToken = expiration - Date.now() > 0;
			if (!isValidToken) {
				const response = await fetch(PATH_TO_API);
				const data = await response.json();
				this.setStore(data);
				developerToken = data.developerToken;
			}
			window.MusicKit.configure({
				developerToken: developerToken,
				app: {
					name: 'Webtunes',
					build: '1.0',
				},
			});
			this.setState({ loading: false });
		} catch (error) {
			console.error(error);
			this.setState({ error });
		}
	}

	componentDidMount() {
		if (window.MusicKit) {
			this.configure();
		} else {
			document.addEventListener('musickitloaded', this.configure);
		}
	}

	render() {
		if (this.state.loading) {
			return null;
		}

		if (this.state.error) {
			return ErrorMessage;
		}

		return (
			<MusicKitContext.Provider value={window.MusicKit.getInstance()}>
				{this.props.children}
			</MusicKitContext.Provider>
		);
	}
}

const ErrorMessage = () => (
	<h1
		style={{
			display: 'flex',
			justifyContent: 'center',
			marginTop: '40vh',
		}}>
		There was an error loading the MusicKit library. Please try again another
		time.
	</h1>
);

export default MusicKitProvider;
