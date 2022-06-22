import React, { useState, useEffect } from 'react';
import MK from '../../services/music-kit';
import Loading from '../../components/common/Loading';
import MediaContainer from '../../components/MediaContainer';

function Home() {
	const [recommendations, setRecomendations] = useState(null);

	useEffect(() => {
		MK.homeRecommendations()
			.then(setRecomendations)
			.catch((e) => console.error(e));
	}, []);

	if (!recommendations) {
		return <Loading />;
	}

	return <MediaContainer title="Home" media={recommendations} />;
}

export default Home;
