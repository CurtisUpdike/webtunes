import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import formatArtworkURL from '../../../utils/formatArtworkURL';
import styles from './ArtistAlbum.module.scss';

function ArtistAlbum({ id }) {
	const [album, setAlbum] = useState(null);
	useEffect(() => {
		const music = window.MusicKit.getInstance();
		music.api
			.album(id)
			.then(setAlbum)
			.catch((e) => console.error(e));
	}, [id]);

	if (!album) return null;

	const {
		attributes: {
			name,
			artwork,
			releaseDate,
			playParams: { kind },
		},
	} = album;

	function play() {
		const music = window.MusicKit.getInstance();
		music
			.setQueue({ [kind]: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
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
				<div>{releaseDate.substring(0, 4)}</div>
			</Link>
		</div>
	);
}

export default ArtistAlbum;
