import React, { useState, useEffect } from 'react';
import MediaContainer from '../components/MediaContainer';
import Error from '../components/Error';
import Loading from '../components/Loading';

function Browse() {
	const music = window.MusicKit.getInstance();
	const [recommendations, setRecomendations] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		music.api
			.charts(['songs', 'albums', 'playlists'], { limit: 24 })
			.then(({ songs, albums, playlists }) => [
				...albums,
				...playlists,
				...songs,
			])
			.then((charts) =>
				charts.map(({ name: title, data: content }) => ({
					id: title,
					title,
					content,
				}))
			)
			.then(setRecomendations)
			.catch((err) => {
				setError(err.message);
			});
	}, [music]);

	if (error) return <Error>{error}</Error>;

	if (!recommendations) return <Loading />;

	return (
		<div style={{ margin: '0 1rem 1rem' }}>
			<MediaContainer title="Browse" media={recommendations} />
		</div>
	);
}

export default Browse;
