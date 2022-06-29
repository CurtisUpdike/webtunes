import React, { useState, useEffect } from 'react';
import MediaPanel from '../features/MediaPanel';
import Tracklist from '../components/Tracklist/Tracklist';
import Center from '../components/Center';

function Album({ id }) {
	const music = window.MusicKit.getInstance();
	const [album, setAlbum] = useState(null);
	const [error, setError] = useState();

	async function playAlbum() {
		try {
			await music.setQueue({ album: id });
			await music.player.play();
		} catch (err) {
			setError(err.message);
		}
	}

	useEffect(() => {
		async function fetchAlbum() {
			try {
				const response = await music.api.album(id);
				setAlbum(response);
			} catch (err) {
				setError(err.message);
			}
		}

		fetchAlbum();
	}, [id, music]);

	if (error) {
		return (
			<Center>
				<p>{error}</p>
			</Center>
		);
	}

	if (!album) return null;

	let {
		attributes: {
			name,
			artwork,
			artistName,
			genreNames,
			releaseDate,
			editorialNotes,
			copyright,
		},
		relationships: {
			artists: { data: artistData },
		},
	} = album;

	return (
		<div style={{ maxWidth: '60rem' }}>
			<MediaPanel
				title={name}
				artwork={artwork}
				artist={{
					name: artistName,
					link: artistData.length > 0 ? `/artist/${artistData[0].id}` : null,
				}}
				description={editorialNotes ? editorialNotes.short : null}
				genre={genreNames[0]}
				releaseDate={releaseDate.substring(0, 4)}
				play={playAlbum}
			/>
			<Tracklist songs={album.relationships.tracks.data} />
			<p style={{ fontSize: '0.75rem', textAlign: 'center' }}>
				{album.attributes.trackCount} Songs
				<br />
				{new Date(releaseDate).toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
				<br />
				{copyright}
			</p>
		</div>
	);
}

export default Album;
