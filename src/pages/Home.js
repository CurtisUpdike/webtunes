import React, { useState, useEffect } from 'react';
import MediaContainer from '../components/MediaContainer';
import Error from '../components/Error';
import Loading from '../components/Loading';

function Home() {
	const music = window.MusicKit.getInstance();
	const [recommendations, setRecomendations] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const recentlyPlayed = music.api.recentPlayed().then((content) => ({
			id: 'recentlyPlayed',
			title: 'Recently Played',
			content,
		}));

		const homeRecommendations = music.api.recommendations().then((response) =>
			response.map(
				({
					id,
					attributes: {
						title: { stringForDisplay: title },
					},
					relationships: {
						contents: { data: content },
					},
				}) => ({ id, title, content })
			)
		);

		Promise.all([recentlyPlayed, homeRecommendations])
			.then((arr) => [].concat(...arr))
			.then(setRecomendations)
			.catch((err) => setError(err.message));
	}, [music]);

	if (error) return <Error>{error}</Error>;

	if (!recommendations) return <Loading />;

	return (
		<div style={{ margin: '0 1rem 1rem' }}>
			<MediaContainer title="Home" media={recommendations} />
		</div>
	);
}

export default Home;
