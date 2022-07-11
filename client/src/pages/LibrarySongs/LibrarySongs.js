import React, { useState, useEffect } from 'react';
import fetchAll from '../../utils/fetchAll';
import Loading from '../../components/Loading';
import Tracklist from '../../components/Tracklist';

function LibrarySongs() {
	const music = window.MusicKit.getInstance();
	const [songs, setSongs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchAllSongs() {
			const fetcher = music.api.library.songs.bind(music.api.library);
			const data = await fetchAll(fetcher);
			setSongs(data);
			setLoading(false);
		}

		fetchAllSongs();
	}, [music]);

	if (loading) return <Loading />;

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
