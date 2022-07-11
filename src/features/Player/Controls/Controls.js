import React, { useState, useEffect } from 'react';
import styles from './Controls.module.css';
import IconButton from '../../common/IconButton';

function PlayerButtons() {
	const music = window.MusicKit.getInstance();
	let isPlaying = usePlaybackState();
	let isPlayable = usePlayableState();

	async function skipToPreviousItem() {
		await music.player.skipToPreviousItem();
	}

	async function skipToNextItem() {
		await music.player.skipToNextItem();
	}

	async function play() {
		await music.player.play();
	}

	async function pause() {
		await music.player.pause();
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
	const music = window.MusicKit.getInstance();
	let [isPlaying, setIsPlaying] = useState(music.player.isPlaying);

	useEffect(() => {
		function handlePlaybackState() {
			setIsPlaying(music.player.isPlaying);
		}

		music.player.addEventListener(
			'playbackStateDidChange',
			handlePlaybackState
		);
		return function cleanup() {
			music.player.removeEventListener(
				'playbackStateDidChange',
				handlePlaybackState
			);
		};
	});

	return isPlaying;
}

function usePlayableState() {
	const music = window.MusicKit.getInstance();
	let [isPlayable, setIsPlayable] = useState(music.player.isReady);

	useEffect(() => {
		function handleCanPlay() {
			setIsPlayable(music.player.isReady);
		}

		music.player.addEventListener('mediaCanPlay', handleCanPlay);
		return function cleanup() {
			music.player.removeEventListener('mediaCanPlay', handleCanPlay);
		};
	});

	return isPlayable;
}

export default PlayerButtons;
