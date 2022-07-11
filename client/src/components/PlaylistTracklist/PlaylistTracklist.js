import React from 'react';
import { formatMediaTime } from '../../utils/utils';
import Artwork from '../Artwork';
import PlayButton from '../PlayButton/PlayButton';
import styles from './PlaylistTracklist.module.css';

function PlaylistTracklist({ tracks }) {
	return (
		<ul className={styles.tracklist}>
			{tracks.map((item, key) => {
				return <PlaylistTrack key={key} {...item.attributes} />;
			})}
		</ul>
	);
}

function PlaylistTrack({
	artistName,
	albumName,
	artwork,
	name,
	durationInMillis,
	playParams,
}) {
	if (!playParams) return null;
	let { kind, id } = playParams;

	function play() {
		const music = window.MusicKit.getInstance();
		music
			.setQueue({ [kind]: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	return (
		<li onDoubleClick={play} className={styles.track}>
			<div className={styles.album}>
				<Artwork
					artwork={artwork}
					name={albumName}
					size={45}
					className={styles.artwork}
				/>
				<div className={styles.buttonWrapper}>
					<PlayButton className={styles.playButton} id={id} kind={kind} />
				</div>
			</div>
			<div className={styles.text}>
				<div className={styles.info}>
					<p className={styles.name}>{name}</p>
					<p className={styles.artistName}>{artistName}</p>
				</div>
				<p className={styles.duration}>{formatMediaTime(durationInMillis)}</p>
			</div>
		</li>
	);
}

export default PlaylistTracklist;
