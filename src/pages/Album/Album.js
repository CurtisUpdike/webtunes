import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import styles from './Album.module.css';
import Artwork from '../../components/Artwork/Artwork';
import Tracklist from '../../components/Tracklist/Tracklist';
import IconButton from '../../components/common/IconButton';

function Album({ id }) {
	const music = window.MusicKit.getInstance();
	const [album, setAlbum] = useState(null);

	function playAlbum() {
		music
			.setQueue({ album: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	useEffect(() => {
		music.api
			.album(id)
			.then(setAlbum)
			.catch((e) => console.error(e));
	}, [id, music]);

	if (!album) return null;

	let {
		attributes: {
			name,
			artwork,
			artistName,
			genreNames,
			releaseDate,
			editorialNotes,
			copyright,
		},
		relationships: {
			artists: { data: artistData },
		},
	} = album;

	editorialNotes = editorialNotes ? editorialNotes.short : null;

	return (
		<div className={styles.album}>
			<div className={styles.about}>
				<div className={styles.left}>
					<Artwork
						className={styles.artwork}
						artwork={artwork}
						name={name}
						size="320"
					/>
				</div>
				<div className={styles.right}>
					<h1 className={styles.name}>{name}</h1>
					<Link to={`/artist/${artistData[0].id}`} className={styles.artist}>
						{artistName}
					</Link>
					<p className={styles.genre}>
						{genreNames[0].toUpperCase()} · {releaseDate.substring(0, 4)}
					</p>
					{editorialNotes && <p className={styles.notes}>{editorialNotes} </p>}
					<IconButton icon="play" className={styles.play} onClick={playAlbum}>
						Play
					</IconButton>
				</div>
			</div>
			<Tracklist songs={album.relationships.tracks.data} />
			<p className={styles.footer}>
				{album.attributes.trackCount} Songs
				<br />
				{new Date(releaseDate).toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
				<br />
				{copyright}
			</p>
		</div>
	);
}

export default Album;
