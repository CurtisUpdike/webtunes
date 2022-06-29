import React, { useEffect, useState } from 'react';
import Center from '../components/Center';
import MediaPanel from '../features/MediaPanel';

export default function Song({ id }) {
	const music = window.MusicKit.getInstance();
	const [song, setSong] = useState(null);
	const [error, setError] = useState(null);

	async function play() {
		try {
			await music.setQueue({ song: id });
			await music.player.play();
		} catch (err) {
			setError(err.message);
		}
	}

	useEffect(() => {
		async function fetchSong() {
			try {
				const response = await music.api.song(id);
				setSong(response);
			} catch (err) {
				setError(err.message);
			}
		}
		fetchSong();
	}, [id, music]);

	if (error) {
		return (
			<Center>
				<p>{error}</p>
			</Center>
		);
	}

	if (!song) return null;

	const {
		attributes: {
			albumName,
			artistName,
			artwork,
			genreNames,
			name,
			releaseDate,
		},
		relationships: { albums, artists },
	} = song;

	return (
		<MediaPanel
			artwork={artwork}
			title={name}
			album={{
				name: albumName,
				link: `/album/${albums.data[0].id}`,
			}}
			artist={{
				name: artistName,
				link: `/artist/${artists.data[0].id}`,
			}}
			genre={genreNames.slice(0, -1).reduce((a, b) => a + '/' + b)}
			releaseDate={releaseDate.substring(0, 4)}
			play={play}
		/>
	);
}
