import React, { useState, useEffect } from 'react';
import styles from './Artist.module.css';
import { music } from '../../services/music';
import ArtistAlbum from './ArtistAlbum/ArtistAlbum';

function Artist({ id }) {
	const [artist, setArtist] = useState(null);

	useEffect(() => {
		music.api
			.artist(id)
			.then(setArtist)
			.catch((e) => console.error(e));
	}, [id]);

	if (!artist) return null;

	const {
		attributes: { name },
		relationships: {
			albums: { data: albums },
		},
	} = artist;

	return (
		<div className={styles.artist}>
			<h1 className={styles.name}>{name}</h1>
			<div className={styles.artists}>
				{albums.map((item, key) => (
					<ArtistAlbum id={item.id} key={key} />
				))}
			</div>
		</div>
	);
}

export default Artist;
