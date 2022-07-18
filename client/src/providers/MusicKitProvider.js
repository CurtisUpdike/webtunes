import React, { Component, createContext } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';

export const MusicKitContext = createContext({});

class MusicKitProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: false,
		};
	}

	componentDidMount() {
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
			.then(() => this.setState({ loading: false }))
			.catch((error) => this.setState({ error }));
	}

	render() {
		if (this.state.error) {
			return (
				<Error>
					There was an error loading the MusicKit library. Please try again
					another time.
				</Error>
			);
		}

		if (this.state.loading) {
			return <Loading />;
		}

		return (
			<MusicKitContext.Provider value={window.MusicKit.getInstance()}>
				{this.props.children}
			</MusicKitContext.Provider>
		);
	}
}

export default MusicKitProvider;
