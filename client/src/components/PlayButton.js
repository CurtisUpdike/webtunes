import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function PlayButton({ id, kind, ...props }) {
	function play() {
		let music = window.MusicKit.getInstance();
		music
			.setQueue({ [kind]: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	return (
		<button type="button" onClick={play} {...props}>
			<Icon icon={['fa', 'play']} />
		</button>
	);
}

export default PlayButton;
