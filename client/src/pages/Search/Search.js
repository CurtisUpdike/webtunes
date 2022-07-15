import React, { useState, useEffect } from 'react';

import Error from '../../components/Error';
import Loading from '../../components/Loading';
import MediaContainer from '../../components/MediaContainer';
import Tracklist from '../../components/Tracklist/Tracklist';
// import styles from './Search.module.css';

function Search({ query }) {
	const music = window.MusicKit.getInstance();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		music.api
			.search(query, { limit: 16 })
			.then(setSearchResults)
			.then(() => setLoading(false))
			.catch((err) => setError(err.message));
	}, [query, music]);

	if (error) return <Error>{error}</Error>;
	if (loading) return <Loading />;

	if (searchResults) {
		console.log(searchResults);
	}

	return (
		<div>
			<h4>
				Showing results for "<span style={{ color: '#fff' }}>{query}</span>"
			</h4>
			{searchResults.albums && (
				<MediaContainer
					media={[{ title: 'Albums', content: searchResults.albums.data }]}
				/>
			)}
			{searchResults.playlists && (
				<MediaContainer
					media={[
						{ title: 'Playlists', content: searchResults.playlists.data },
					]}
				/>
			)}
			<h2 style={titleStyles}>Songs</h2>
			{searchResults.songs && <Tracklist songs={searchResults.songs.data} />}
		</div>
	);
}

const titleStyles = {
	margin: '4rem 0 0 0',
	color: 'var(--color-font-accent)',
	fontSize: '1.125rem',
	paddingBottom: '0.5rem',
	borderBottom: '1px solid var(--color-border-main)',
};

export default Search;
