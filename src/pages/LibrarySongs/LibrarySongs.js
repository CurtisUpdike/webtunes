import React, { useState, useEffect } from 'react';
// import styles from './LibrarySongs.module.css';
import Loading from '../../components/common/Loading';
import Tracklist from '../../components/Tracklist';

function LibrarySongs() {
	let [songs, setSongs] = useState([]);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		const LIMIT = 100; // maximum the MusicKit API will return for each request

		function handleResponse(res) {
			if (res.length > 0) {
				setSongs([...songs, ...res]);
			}
			setLoading(false);
		}

		let mk = window.MusicKit.getInstance();
		mk.api.library
			.songs(null, { limit: LIMIT, offset: songs.length })
			.then(handleResponse)
			.catch(console.error.bind(console));
	}, [songs]);

	return (
		<div className={'styles.songs'}>
			<h1 className={'styles.title'}>Songs</h1>
			{songs.length > 0 && <Tracklist songs={songs} />}
			{loading && <Loading />}

			{!loading && songs.length === 0 && (
				<p>You have no songs in your library.</p>
			)}
		</div>
	);
}

export default LibrarySongs;
