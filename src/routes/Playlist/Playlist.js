import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import Artwork from '../../components/Artwork/Artwork';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';
import styles from './Playlist.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PlayButton from '../../components/PlayButton/PlayButton';

function Playlist({ id }) {
	const [playlist, setPlaylist] = useState(null);
	const [tracks, setTracks] = useState(null);
	useEffect(() => {
		music.api
			.playlist(id)
			.then((res) => {
				console.log(res);
				setPlaylist(res.attributes);
				setTracks(res.relationships.tracks.data);
			})
			.catch((e) => console.error(e));
	}, [id]);

	return playlist && tracks ? (
		<div className={styles.playlist}>
			<div className={styles.left}>
				<Artwork
					className={styles.artwork}
					artwork={playlist.artwork}
					name={playlist.name}
					size="320"
				/>
				<div className={styles.info}>
					<p className={styles.trackCount}>{tracks && tracks.length} Songs</p>
					<PlayButton className={styles.playButton} {...playlist.playParams} />
				</div>
				{playlist.description && (
					<div className={styles.description}>
						<h3>Editors' Notes</h3>
						<p
							dangerouslySetInnerHTML={{
								__html: playlist.description.standard,
							}}
						/>
					</div>
				)}
			</div>
			<div className={styles.right}>
				<h1 className={styles.name}>{playlist.name}</h1>
				<h2 className={styles.curator}>{playlist.curatorName}</h2>
				{tracks && <PlaylistTracklist tracks={tracks} />}
			</div>
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default Playlist;
