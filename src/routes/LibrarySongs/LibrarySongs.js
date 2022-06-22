import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './LibrarySongs.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';

function LibrarySongs() {
	const [songs, setSongs] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		music.api.library
			.songs(null, {
				limit: 100,
				offset: songs.length,
			})
			.then((res) =>
				res.length > 0 ? setSongs([...songs, ...res]) : setLoading(false)
			)
			.catch((e) => console.error(e));
	}, [songs]);

	return songs.length > 0 ? (
		<div className={styles.songs}>
			<h1 className={styles.title}>Songs</h1>
			<PlaylistTracklist tracks={songs} />
			{loading && <LoadingSpinner />}
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default LibrarySongs;
