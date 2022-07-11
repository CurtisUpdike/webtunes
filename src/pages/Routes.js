import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import useAuth from '../hooks/useAuth';
import Home from './Home';
import Browse from './Browse';
import Album from './Album';
import Playlist from './Playlist';
import Artist from './Artist';
import Song from './Song';
import NotFound from '../components/NotFound';

function Routes() {
	const [isAuthorized] = useAuth();

	return (
		<Router>
			{isAuthorized ? (
				<Fragment>
					<Home path="/" />
					<Browse path="browse" />
				</Fragment>
			) : (
				<Browse path="/" />
			)}
			{/* <Search path="search/:query" /> */}
			<Album path="album/:id" />
			<Artist path="artist/:id" />
			<Playlist path="playlist/:id" />
			<Song path="song/:id" />
			<NotFound default />
		</Router>
	);
}

export default Routes;
