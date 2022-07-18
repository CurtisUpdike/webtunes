import React from 'react';
import { Router } from '@reach/router';
import TopBar from './features/TopBar';
import Nav from './features/Nav';
import Player from './features/Player';
import styles from './App.module.css';
import useAuth from './hooks/useAuth';

import Home from './pages/Home';
import Browse from './pages/Browse';
import Album from './pages/Album';
import Playlist from './pages/Playlist';
import Artist from './pages/Artist';
import Song from './pages/Song';
import Search from './pages/Search';
import NotFound from './components/NotFound';

function App() {
	const [isAuthorized, setIsAuthorized] = useAuth();

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<TopBar isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
			</header>
			<Nav isAuthorized={isAuthorized} />
			<Player />
			<main className={styles.main}>
				<Router>
					{isAuthorized ? (
						<>
							<Home path="/" />
							<Browse path="browse" />
						</>
					) : (
						<Browse path="/" />
					)}
					<Search path="search/:query" />
					<Album path="album/:id" />
					<Artist path="artist/:id" />
					<Playlist path="playlist/:id" />
					<Song path="song/:id" />
					<NotFound default />
				</Router>
			</main>
		</div>
	);
}

export default App;
