import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './LibraryAlbum.module.css';
import Artwork from '../../components/Artwork/Artwork';
import AlbumTracklist from '../../components/AlbumTracklist/AlbumTracklist';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PlayButton from '../../components/PlayButton/PlayButton';

function LibraryAlbum({ id }) {
	const [album, setAlbum] = useState(null);
	useEffect(() => {
		music.api.library
			.album(id)
			.then((res) => setAlbum(res))
			.catch((e) => console.error(e));
	}, [id]);

	return album ? (
		<div className={styles.album}>
			<div className={styles.left}>
				<Artwork
					className={styles.artwork}
					artwork={album.attributes.artwork}
					name={album.attributes.name}
					size="320"
				/>
				<div className={styles.info}>
					<p className={styles.trackCount}>
						{album.attributes.trackCount} Songs
					</p>
					<PlayButton
						className={styles.playButton}
						{...album.attributes.playParams}
					/>
				</div>
			</div>
			<div className={styles.right}>
				<h1 className={styles.name}>{album.attributes.name}</h1>
				<h3 className={styles.artist}>{album.attributes.artistName}</h3>
				<AlbumTracklist tracks={album.relationships.tracks.data} />
			</div>
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default LibraryAlbum;
