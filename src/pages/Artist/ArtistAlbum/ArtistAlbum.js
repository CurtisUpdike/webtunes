import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import formatArtworkURL from '../../../utils/formatArtworkURL';
import styles from './ArtistAlbum.module.scss';

function ArtistAlbum({ name, artwork, releaseDate, kind, id, setError }) {
	const music = window.MusicKit.getInstance();

	if (!name) return null;

	async function play() {
		try {
			await music.setQueue({ [kind]: id });
			await music.player.play();
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<div>
			<div className={styles.mediaItem}>
				<img src={formatArtworkURL(artwork, 160)} alt={`Artwork for ${name}`} />
				<div>
					<Link to={`/${kind}/${id}`}></Link>
					<button onClick={play}>
						<Icon icon={['fa', 'play']} size="3x" />
					</button>
				</div>
			</div>
			<Link className={styles.info} to={`/${kind}/${id}`}>
				<div>{name}</div>
				<div>{new Date(releaseDate).getFullYear()}</div>
			</Link>
		</div>
	);
}

export default ArtistAlbum;
