import React, { useState, useEffect } from 'react';
import MediaPanel from '../../features/MediaPanel';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';
import Center from '../../components/Center';
import Loading from '../../components/Loading';
import styles from './Playlist.module.css';

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

		fetchPlaylist(id);
	}, [id, music]);

	if (error) return <Center>{error}</Center>;
	if (loading) return <Loading />;

	let {
		attributes: { name, artwork, description, curatorName },
		relationships: {
			tracks: { data: tracks },
		},
	} = playlist;

	description = description ? description.short : null;

	return (
		<div className={styles.playlist}>
			<MediaPanel
				title={name}
				artwork={artwork}
				curator={curatorName}
				description={description}
				play={playAlbum}
			/>
			{tracks && <PlaylistTracklist tracks={tracks} />}
			<p className={styles.footer}>{tracks && `${tracks.length} Songs`}</p>
		</div>
	);
}

export default Playlist;
