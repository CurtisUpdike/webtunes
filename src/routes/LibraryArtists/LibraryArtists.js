import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './LibraryArtists.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LibraryAlbum from '../LibraryAlbum/LibraryAlbum';

function LibraryArtists() {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	useEffect(() => {
		music.api.library
			.artists({
				limit: 50,
				offset: artists.length,
			})
			.then((res) =>
				res.length > 0 ? setArtists([...artists, ...res]) : setLoading(false)
			)
			.catch((e) => console.error(e));
	}, [artists]);

	function handleClick(id) {
		setSelected(id);
	}

	if (!selected && artists[0]) {
		setSelected(artists[0].id);
	}

	return artists ? (
		<div className={styles.container}>
			<div className={styles.artists}>
				{artists.map((item) => (
					<a
						href={`#/${item.id}`}
						key={item.id}
						className={item.id === selected ? styles.selected : styles.artist}
						onClick={() => handleClick(item.id)}>
						{item.attributes.name}
					</a>
				))}
				{loading && <LoadingSpinner />}
			</div>
			{selected && <ArtistAlbums id={selected} />}
		</div>
	) : (
		<LoadingSpinner />
	);
}

function ArtistAlbums({ id }) {
	const [content, setContent] = useState(null);
	useEffect(() => {
		setContent(null);
		music.api.library.artistRelationship(id).then((res) => setContent(res));
	}, [id]);

	return content ? (
		<div className={styles.albums}>
			{content.map((item, key) => (
				<LibraryAlbum key={key} id={item.id} />
			))}
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default LibraryArtists;
