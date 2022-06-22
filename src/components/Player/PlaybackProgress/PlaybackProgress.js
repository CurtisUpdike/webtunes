import React, { useState, useEffect } from 'react';
import styles from './PlaybackProgress.module.css';
import MK from '../../../services/music-kit';
import formatMediaTime from '../../../utils/formatMediaTime';
import ProgressBar from '../ProgressBar';

function PlaybackProgress() {
	let [current, duration, progress] = usePlaybackProgress();

	function seekToSelection(percentSelected) {
		MK.player.seekToTime(duration * percentSelected);
	}

	return (
		<div className={styles.container}>
			<div className={styles.time}>{formatMediaTime(current, ':')}</div>
			<ProgressBar onSelect={seekToSelection} progress={progress} />
			<div className={styles.time}>{formatMediaTime(duration, ':')}</div>
		</div>
	);
}

function usePlaybackProgress() {
	let [time, setTime] = useState(MK.player.currentPlaybackTime || 0);
	let [duration, setDuration] = useState(
		MK.player.currentPlaybackDuration || 0
	);
	let progress = (time / duration) * 100 || 0;

	useEffect(() => {
		function handleTimeChange() {
			setTime(MK.player.currentPlaybackTime);
		}
		function handleDurationChange() {
			setDuration(MK.player.currentPlaybackDuration);
		}
		MK.player.addEventListener('playbackTimeDidChange', handleTimeChange);
		MK.player.addEventListener(
			'playbackDurationDidChange',
			handleDurationChange
		);
		return function cleanup() {
			MK.player.removeEventListener('playbackTimeDidChange', handleTimeChange);
			MK.player.removeEventListener(
				'playbackDurationDidChange',
				handleDurationChange
			);
		};
	});
	return [time, duration, progress];
}

export default PlaybackProgress;
