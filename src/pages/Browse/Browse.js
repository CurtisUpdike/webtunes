import React, { useState, useEffect } from 'react';
import MK from '../../services/music-kit';
import MediaContainer from '../../components/MediaContainer';
import Loading from '../../components/common/Loading';

function Browse() {
	const [recommendations, setRecomendations] = useState(null);

	useEffect(() => {
		MK.browseRecommendations()
			.then(setRecomendations)
			.catch((e) => console.error(e));
	}, []);

	if (!recommendations) {
		return <Loading />;
	}

	return <MediaContainer title="Browse" media={recommendations} />;
}

export default Browse;
