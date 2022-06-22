import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { music } from '../../services/music';
import styles from './Album.module.css';
import Artwork from '../../components/Artwork/Artwork';
import AlbumTracklist from '../../components/AlbumTracklist/AlbumTracklist';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PlayButton from '../../components/PlayButton/PlayButton';

function Album({ id }) {
	const [album, setAlbum] = useState(null);
	useEffect(() => {
		music.api
			.album(id)
			.then((res) => setAlbum(res))
			.catch((e) => console.error(e));
	}, [id]);

	return album ? (
		<div className={styles.album}>
			<div className={styles.left}>
				<Artwork
					className={styles.artwork}
					artwork={album.attributes.artwork}
					name={album.attributes.name}
					size="320"
				/>
				<div className={styles.info}>
					<p className={styles.trackCount}>
						{album.attributes.trackCount} Songs
					</p>
					<PlayButton
						className={styles.playButton}
						{...album.attributes.playParams}
					/>
				</div>
				{album.attributes.editorialNotes && (
					<div className={styles.notes}>
						<h3>Editors' Notes</h3>
						<p
							dangerouslySetInnerHTML={{
								__html: album.attributes.editorialNotes.standard,
							}}
						/>
					</div>
				)}
			</div>
			<div className={styles.right}>
				<h1 className={styles.name}>{album.attributes.name}</h1>
				<Link
					to={`/artist/${album.relationships.artists.data[0].id}`}
					className={styles.artist}>
					{album.attributes.artistName}
				</Link>
				<p className={styles.genre}>{album.attributes.genreNames[0]}</p>
				<AlbumTracklist tracks={album.relationships.tracks.data} />
				<div className={styles.copyright}>
					<p>
						<strong>Released:</strong> {album.attributes.releaseDate}
					</p>
					<p>{album.attributes.copyright}</p>
				</div>
			</div>
		</div>
	) : (
		<LoadingSpinner />
	);
}

export default Album;
