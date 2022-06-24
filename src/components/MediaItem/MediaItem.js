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
		playParams: { kind, id },
		artistName,
		curatorName,
	} = attributes;

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
