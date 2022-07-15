import React from 'react';
import formatArtworkURL from '../../utils/formatArtworkURL';
import styles from './MediaItem.module.scss';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function MediaItem({ attributes, size }) {
	let music = window.MusicKit.getInstance();
	let { artwork, name, playParams, artistName, curatorName } = attributes;

	if (!(artwork && name && playParams && (artistName || curatorName))) {
		return null;
	}

	let { kind, id } = playParams;
	if (!kind || !id) return null;

	function play() {
		music
			.setQueue({ [kind]: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	return (
		<div>
			<div className={styles.mediaItem}>
				<img
					src={formatArtworkURL(artwork, size)}
					alt={`Artwork for ${name}`}
				/>
				<div>
					<Link to={`/${kind}/${id}`}></Link>
					<button onClick={play}>
						<Icon icon={['fa', 'play']} size="3x" />
					</button>
				</div>
			</div>
			<Link className={styles.info} to={`/${kind}/${id}`}>
				<div>{name}</div>
				<div>{artistName || curatorName}</div>
			</Link>
		</div>
	);
}

export default MediaItem;
