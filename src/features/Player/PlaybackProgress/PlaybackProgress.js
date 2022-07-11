import React, { useState, useEffect } from 'react';
import styles from './PlaybackProgress.module.css';
import formatMediaTime from '../../../utils/formatMediaTime';
import ProgressBar from '../ProgressBar';

function PlaybackProgress() {
	const music = window.MusicKit.getInstance();
	let [current, duration, progress] = usePlaybackProgress();

	function seekToSelection(percentSelected) {
		music.player.seekToTime(duration * percentSelected);
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
	const music = window.MusicKit.getInstance();
	let [time, setTime] = useState(music.player.currentPlaybackTime || 0);
	let [duration, setDuration] = useState(
		music.player.currentPlaybackDuration || 0
	);
	let progress = (time / duration) * 100 || 0;

	useEffect(() => {
		function handleTimeChange() {
			setTime(music.player.currentPlaybackTime);
		}
		function handleDurationChange() {
			setDuration(music.player.currentPlaybackDuration);
		}
		music.player.addEventListener('playbackTimeDidChange', handleTimeChange);
		music.player.addEventListener(
			'playbackDurationDidChange',
			handleDurationChange
		);
		return function cleanup() {
			music.player.removeEventListener(
				'playbackTimeDidChange',
				handleTimeChange
			);
			music.player.removeEventListener(
				'playbackDurationDidChange',
				handleDurationChange
			);
		};
	});
	return [time, duration, progress];
}

export default PlaybackProgress;
