import React from 'react';
import IconButton from '../../components/common/IconButton';

function PlayButton({ id, kind, ...props }) {
	function play() {
		let music = window.MusicKit.getInstance();
		music
			.setQueue({ [kind]: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	return (
		<IconButton icon={['fa', 'play']} size="3x" onClick={play} {...props} />
	);
}

export default PlayButton;
