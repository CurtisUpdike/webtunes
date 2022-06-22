import React from 'react';
import { player } from '../../services/music';

function PlayButton({ id, kind, className }) {
	function handleClick() {
		player.playSelection(id, kind);
	}

	return (
		<button className={className} onClick={handleClick} aria-label="play">
			<svg height="100%" width="100%" viewBox="0 0 26 26" role="presentation">
				<circle
					fill="rgba(255,255,255,.9)"
					cx="13"
					cy="13"
					r="13"
					stroke="none"></circle>
				<path
					fill="#0070c9"
					d="M11.72 6.98L.8 12.93a.55.55 0 0 1-.81-.47V.54A.54.54 0 0 1 .8.07l10.92 5.96a.54.54 0 0 1 0 .95z"
					transform="translate(8.5 6.5)"></path>
			</svg>
		</button>
	);
}

export default PlayButton;
