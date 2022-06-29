import React, { useState, useEffect } from 'react';
import MediaPanel from '../features/MediaPanel';
import PlaylistTracklist from '../components/PlaylistTracklist';
import Center from '../components/Center';
import Loading from '../components/Loading';

function Playlist({ id }) {
	const music = window.MusicKit.getInstance();
	const [playlist, setPlaylist] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);

	async function playAlbum() {
		try {
			await music.setQueue({ playlist: id });
			await music.player.play();
		} catch (err) {
			setError(err.message);
		}
	}

	useEffect(() => {
		async function fetchPlaylist() {
			try {
				setLoading(true);
				let response;
				if (id.substring(0, 2) === 'pl') {
					response = await music.api.playlist(id);
				} else {
					response = await music.api.library.playlist(id);
				}
				setPlaylist(response);
				setLoading(false);
			} catch (err) {
				setError(err.message);
			}
		}

		fetchPlaylist();
	}, [id, music]);

	if (error) {
		return (
			<Center>
				<p>{error}</p>
			</Center>
		);
	}

	if (loading) return <Loading />;

	const {
		attributes: { name, artwork, description, curatorName },
		relationships: {
			tracks: { data: tracks },
		},
	} = playlist;

	return (
		<div style={{ maxWidth: '60rem' }}>
			<MediaPanel
				title={name}
				artwork={artwork}
				curator={curatorName}
				description={description ? description.short : null}
				play={playAlbum}
			/>
			{tracks && <PlaylistTracklist tracks={tracks} />}
			<p style={{ fontSize: '0.75rem', textAlign: 'center' }}>
				{tracks && `${tracks.length} Songs`}
			</p>
		</div>
	);
}

export default Playlist;
