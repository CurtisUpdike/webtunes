import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import formatArtworkURL from '../../../utils/formatArtworkURL';
import styles from './NowPlaying.module.scss';

function NowPlaying() {
	let mediaItem = useNowPlayingItem();

	return (
		mediaItem && (
			<div className={styles.container}>
				<div className={styles.artwork}>
					<img
						height="56"
						width="56"
						alt={`Cover art for ${mediaItem.albumName}`}
						src={formatArtworkURL(mediaItem.artwork, 56)}
					/>
				</div>
				<div className={styles.info}>
					<Link to={mediaItem.containerURL} className={styles.title}>
						{mediaItem.title}
					</Link>
					<p className={styles.artist}>{mediaItem.artistName}</p>
				</div>
			</div>
		)
	);
}

function useNowPlayingItem() {
	const music = window.MusicKit.getInstance();
	let [mediaItem, setMediaItem] = useState(null);

	useEffect(function () {
		function handleChange(event) {
			var {
				item: {
					title,
					artwork,
					albumName,
					artistName,
					container: { name, id },
				},
			} = event;
			setMediaItem({
				title,
				artwork,
				albumName,
				artistName,
				containerURL: `${name}/${id}`,
			});
		}
		music.player.addEventListener('mediaItemDidChange', handleChange);
		return function cleanup() {
			music.player.removeEventListener('mediaItemDidChange', handleChange);
		};
	});

	return mediaItem;
}

export default NowPlaying;
