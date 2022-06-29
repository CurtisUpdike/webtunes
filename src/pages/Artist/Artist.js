import React, { useState, useEffect } from 'react';
import ArtistAlbum from './ArtistAlbum/ArtistAlbum';
import Error from '../../components/Error';
import styles from './Artist.module.css';

function Artist({ id }) {
	const music = window.MusicKit.getInstance();
	const [artist, setArtist] = useState();
	const [albums, setAlbums] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		async function getArtist() {
			try {
				const response = await music.api.artist(id);
				let {
					attributes: { name },
					relationships: {
						albums: { data },
					},
				} = response;
				setArtist(name);
				data = data.map((album) => music.api.album(album.id));
				data = await Promise.all(data);
				data = data.map(({ attributes, id }) => ({
					name: attributes.name,
					artwork: attributes.artwork,
					releaseDate: new Date(attributes.releaseDate).getTime(),
					kind: attributes.playParams.kind,
					id,
				}));
				window.data = data;
				const byDate = (a, b) => a.releaseDate - b.releaseDate;
				data = data.sort(byDate);
				setAlbums(data);
			} catch (err) {
				setError(err.message);
			}
		}

		getArtist();
	}, [id, music]);

	if (error) return <Error>{error}</Error>;

	if (!artist) return null;

	return (
		<div className={styles.artist}>
			<h1 className={styles.name}>{artist}</h1>
			<div className={styles.artists}>
				{albums &&
					albums.map((album, key) => (
						<ArtistAlbum key={key} {...album} setError={setError} />
					))}
			</div>
		</div>
	);
}

export default Artist;
