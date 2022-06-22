import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './LibraryPlaylist.module.css';
import Artwork from '../../components/Artwork/Artwork';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PlayButton from '../../components/PlayButton/PlayButton';

function LibraryPlaylist({ id }) {
	const [playlist, setPlaylist] = useState(null);

	useEffect(() => {
		music.api.library
			.playlist(id)
			.then((res) => setPlaylist(res))
			.catch((e) => console.error(e));
	}, [id]);

	return playlist ? (
		<div className={styles.playlist}>
			<div className={styles.left}>
				<Artwork
					className={styles.artwork}
					artwork={playlist.attributes.artwork}
					name={playlist.attributes.name}
					size="320"
				/>
				<div className={styles.info}>
					<p className={styles.trackCount}>
						{playlist.relationships.tracks.data.length} Songs
					</p>
					<PlayButton
						className={styles.playButton}
						{...playlist.attributes.playParams}
					/>
				</div>
			</div>
			<div className={styles.right}>
				<h1 className={styles.name}>{playlist.attributes.name}</h1>
				<PlaylistTracklist tracks={playlist.relationships.tracks.data} />
			</div>
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default LibraryPlaylist;
