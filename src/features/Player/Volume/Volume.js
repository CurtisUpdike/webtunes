import React, { useState } from 'react';
import styles from './Volume.module.css';
import IconButton from '../../../components/common/IconButton';
import ProgressBar from '../ProgressBar';

function Volume() {
	const music = window.MusicKit.getInstance();
	let [volume, setVolume] = useState(music.player.volume);
	let [isMuted, setIsMuted] = useState(music.player.volume === 0);
	let volumeDisplay = isMuted ? 0 : volume * 100;

	function toggleMute() {
		if (isMuted) {
			music.player.volume = volume;
			setIsMuted(music.player.volume === 0);
		} else {
			music.player.volume = 0;
			setIsMuted(music.player.volume === 0);
		}
	}

	function setVolumeAtSelection(percentSelected) {
		let newVolume = Math.floor(percentSelected * 100) / 100;
		music.player.volume = newVolume;
		setVolume(newVolume);
	}

	return (
		<div className={styles.container}>
			<IconButton
				className={styles.mute}
				icon={isMuted ? 'volume-mute' : 'volume-up'}
				onClick={toggleMute}
			/>
			<ProgressBar onSelect={setVolumeAtSelection} progress={volumeDisplay} />
		</div>
	);
}

export default Volume;
