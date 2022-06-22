import React from 'react';
import formatArtworkURL from '../../utils/formatArtworkURL';
import styles from './MediaItem.module.scss';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function MediaItem({ attributes, size }) {
	let music = window.MusicKit.getInstance();
	let {
		artwork,
		name,
		playParams: {
			kind, id
		}
	} = attributes;
	let playParams = { [kind]: id };

	function play() {
		music
			.setQueue(playParams)
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	return (
		<div className={styles.mediaItem}>
			<img src={formatArtworkURL(artwork, size)} alt={`Artwork for ${name}`} />
			<div>
				<Link to={`/${kind}/${id}`}></Link>
				<button onClick={play}>
					<Icon icon={['far', 'play-circle']} size="3x" />
				</button>
			</div>
		</div>
	);
}

export default MediaItem;
