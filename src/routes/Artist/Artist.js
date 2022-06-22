import React, { Fragment, useState, useEffect } from 'react';
import styles from './Artist.module.css';
import { music } from '../../services/music';
import ArtistAlbum from './ArtistAlbum/ArtistAlbum';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Artist({ id }) {
	const [artist, setArtist] = useState(null);

	useEffect(() => {
		music.api
			.artist(id)
			.then((res) => setArtist(res))
			.catch((e) => console.error(e));
	}, [id]);

	return artist ? (
		<Fragment>
			<h1 className={styles.name}>{artist.attributes.name}</h1>
			<div className={styles.artists}>
				{artist.relationships.albums.data.map((item, key) => (
					<ArtistAlbum id={item.id} key={key} />
				))}
			</div>
		</Fragment>
	) : (
		<LoadingSpinner />
	);
}

export default Artist;
