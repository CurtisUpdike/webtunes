import React from 'react';
import { formatMediaTime } from '../../utils/utils';
import styles from './AlbumTracklist.module.css';
import PlayButton from '../PlayButton/PlayButton';

function AlbumTracklist({ tracks }) {
	return (
		<div className={styles.tracklist}>
			{tracks.map((item, key) => (
				<AlbumTrack key={key} {...item.attributes} />
			))}
		</div>
	);
}

function AlbumTrack({ trackNumber, name, durationInMillis, playParams }) {
	return (
		<div className={styles.track}>
			<div className={styles.trackNumber}>
				<p>{trackNumber}</p>
				<PlayButton className={styles.playButton} {...playParams} />
			</div>
			<p className={styles.name}>{name}</p>
			<p className={styles.duration}>{formatMediaTime(durationInMillis)}</p>
		</div>
	);
}

export default AlbumTracklist;
