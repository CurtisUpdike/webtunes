import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './Search.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SongCollection from '../../components/SongCollection/SongCollection';
import ArtistCollection from './ArtistCollection/ArtistCollection';
import MediaCollection from '../../components/MediaCollection/MediaCollection';
import NotFound from '../../components/NotFound/NotFound';

function Search({ query }) {
	const [search, setSearch] = useState(null);

	useEffect(() => {
		music.api
			.search(query, { limit: 16 })
			.then((res) => setSearch(res))
			.catch((e) => console.error(e));
	}, [query]);

	return search ? (
		<>
			<h1 className={styles.title}>Search</h1>
			<h2 className={styles.heading}>Songs</h2>
			{search.songs ? (
				<SongCollection data={search.songs.data} />
			) : (
				<NotFound />
			)}
			<h2 className={styles.heading}>Artists</h2>
			{search.artists ? (
				<ArtistCollection data={search.artists.data} />
			) : (
				<NotFound />
			)}
			<h2 className={styles.heading}>Album</h2>
			{search.albums ? (
				<MediaCollection data={search.albums.data} />
			) : (
				<NotFound />
			)}
			<h2 className={styles.heading}>Playlists</h2>
			{search.playlists ? (
				<MediaCollection data={search.playlists.data} />
			) : (
				<NotFound />
			)}
		</>
	) : (
		<LoadingSpinner />
	);
}

export default Search;
