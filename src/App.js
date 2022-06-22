import React, { useContext, useState, useEffect } from 'react';
import MusicKitProvider, { MusicKitContext } from './providers/MusicKitProvider';
import LoginButton from './components/LoginButton';
import Nav from './components/Nav';
import Routes from './pages/Routes';
import Player from './components/Player';
import styles from './App.module.css';

const App = () => (
	<div>
		<MusicKitProvider>
			<Auth>
				{(isAuthorized) => (
					<div className={styles.app}>
						<header className={styles.header}>
							<LoginButton isAuthorized={isAuthorized} />
						</header>
						<Nav isAuthorized={isAuthorized} />
						<Player />
						<main className={styles.main}>
							<Routes isAuthorized={isAuthorized} />
						</main>
					</div>
				)}
			</Auth>
		</MusicKitProvider>
	</div>
);

const Auth = (props) => {
	const mk = useContext(MusicKitContext);
	const [isAuthorized, setIsAuthorized] = useState(mk.isAuthorized);

	useEffect(function () {
		function handleChange() {
			setIsAuthorized(mk.isAuthorized);
		}

		mk.addEventListener('authorizationStatusDidChange', handleChange);
		return function () {
			mk.removeEventListener('authorizationStatusDidChange', handleChange);
		};
	});

	return props.children(isAuthorized);
}

export default App;
