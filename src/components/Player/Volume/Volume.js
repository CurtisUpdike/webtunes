import React, { useState } from 'react';
import styles from './Volume.module.css';
import MK from '../../../services/music-kit';
import IconButton from '../../common/IconButton';
import ProgressBar from '../ProgressBar';

function Volume() {
	let [volume, setVolume] = useState(MK.volume);
	let [isMuted, setIsMuted] = useState(MK.volume === 0);
	let volumeDisplay = isMuted ? 0 : volume * 100;

	function toggleMute() {
		if (isMuted) {
			MK.volume = volume;
			setIsMuted(MK.volume === 0);
		} else {
			MK.volume = 0;
			setIsMuted(MK.volume === 0);
		}
	}

	function setVolumeAtSelection(percentSelected) {
		let newVolume = Math.floor(percentSelected * 100) / 100;
		MK.volume = newVolume;
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
