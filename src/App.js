import React from 'react';
import MusicKitProvider from './providers/MusicKitProvider';
import TopBar from './features/TopBar';
import Nav from './features/Nav';
import Routes from './pages/Routes';
import Player from './features/Player';
import styles from './App.module.css';

const App = () => (
	<div className={styles.app}>
		<MusicKitProvider>
			<header className={styles.header}>
				<TopBar />
			</header>
			<Nav />
			<Player />
			<main className={styles.main}>
				<Routes />
			</main>
		</MusicKitProvider>
	</div>
);

export default App;
