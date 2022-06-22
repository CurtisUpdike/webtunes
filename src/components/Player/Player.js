import React from 'react';
import styles from './Player.module.css';
import NowPlaying from './NowPlaying';
import Controls from './Controls';
import PlaybackProgress from './PlaybackProgress/PlaybackProgress';
import Volume from './Volume';

function Player() {
	return (
		<div className={styles.player}>
			<div className={styles.side}>
				<NowPlaying />
			</div>
			<div className={styles.center}>
				<Controls />
				<PlaybackProgress />
			</div>
			<div className={styles.side}>
				<Volume />
			</div>
		</div>
	);
}

export default Player;
