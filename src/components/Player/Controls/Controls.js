import React, { useState, useEffect } from 'react';
import styles from './Controls.module.css';
import MK from '../../../services/music-kit';
import IconButton from '../../common/IconButton';

function PlayerButtons() {
	let isPlaying = usePlaybackState();
	let isPlayable = usePlayableState();

	async function skipToPreviousItem() {
		await MK.player.skipToPreviousItem();
	}

	async function skipToNextItem() {
		await MK.player.skipToNextItem();
	}

	async function play() {
		await MK.player.play();
	}

	async function pause() {
		await MK.player.pause();
	}

	return (
		<div className={styles.container}>
			{/* <IconButton
				icon="random"
				className={styles.shuffle}
				onClick={() => console.log('todo: random')}
				disabled
			/> */}
			<IconButton
				icon="backward"
				className={styles.skip}
				onClick={skipToPreviousItem}
				disabled={!isPlayable}
			/>
			{isPlaying ? (
				<IconButton
					icon="pause"
					className={styles.pause}
					onClick={pause}
					disabled={!isPlayable}
				/>
			) : (
				<IconButton
					icon="play"
					className={styles.play}
					onClick={play}
					disabled={!isPlayable}
				/>
			)}
			<IconButton
				icon="forward"
				className={styles.skip}
				onClick={skipToNextItem}
				disabled={!isPlayable}
			/>
			{/* <IconButton
				icon="sync-alt"
				className={styles.repeat}
				onClick={() => console.log('todo: repeat')}
				disabled
			/> */}
		</div>
	);
}

function usePlaybackState() {
	let [isPlaying, setIsPlaying] = useState(MK.player.isPlaying);

	useEffect(() => {
		function handlePlaybackState() {
			setIsPlaying(MK.player.isPlaying);
		}

		MK.player.addEventListener('playbackStateDidChange', handlePlaybackState);
		return function cleanup() {
			MK.player.removeEventListener(
				'playbackStateDidChange',
				handlePlaybackState
			);
		};
	});

	return isPlaying;
}

function usePlayableState() {
	let [isPlayable, setIsPlayable] = useState(MK.instance.player.isReady);

	useEffect(() => {
		function handleCanPlay() {
			setIsPlayable(MK.instance.player.isReady);
		}

		MK.instance.player.addEventListener('mediaCanPlay', handleCanPlay);
		return function cleanup() {
			MK.instance.player.removeEventListener('mediaCanPlay', handleCanPlay);
		};
	});

	return isPlayable;
}

export default PlayerButtons;
