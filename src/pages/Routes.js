import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Home from './Home';
import Browse from './Browse';
import Album from './Album';
import Playlist from './Playlist';
import Artist from './Artist';
import Song from './Song.js';
// import LibraryAlbums from './LibraryAlbums';

import RecentlyAdded from '../routes/RecentlyAdded/RecentlyAdded';
// import LibraryArtists from '../routes/LibraryArtists/LibraryArtists';
// import LibrarySongs from './LibrarySongs';
// import LibraryAlbum from '../routes/LibraryAlbum/LibraryAlbum';
import Search from '../routes/Search/Search';
import NotFound from '../components/NotFound/NotFound';

function Main({ isAuthorized }) {
	return (
		<Router>
			{isAuthorized ? (
				<Fragment>
					<Home path="/" />
					<Browse path="browse" />
					<RecentlyAdded path="library/recent" />
					{/* <LibraryAlbums path="library/albums" /> */}
					{/* <LibraryArtists path="library/artists" /> */}
					{/* <LibrarySongs path="library/songs" /> */}
					{/* <LibraryAlbum path="library/album/:id" /> */}
				</Fragment>
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
	);
}

export default Main;
