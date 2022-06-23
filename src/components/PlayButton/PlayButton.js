import React from 'react';
import Icon from '../../components/common/IconButton';

function PlayButton({ id, kind, className }) {
	let music = window.MusicKit.getInstance();
	let playParams = { [kind]: id };

	function play() {
		music
			.setQueue(playParams)
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	return (
		<button onClick={play} className={className} aria-label="play">
			<Icon icon={['fa', 'play']} size="3x" />
		</button>
	);
}

export default PlayButton;
