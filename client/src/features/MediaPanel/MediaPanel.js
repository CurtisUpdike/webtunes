import React from 'react';
import { Link } from '@reach/router';
import Artwork from '../../components/Artwork';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styles from './MediaPanel.module.css';

const MediaPanel = ({
	artwork,
	title,
	album,
	artist,
	curator,
	description,
	genre,
	releaseDate,
	play,
}) => (
	<div className={styles.container}>
		{artwork && (
			<Artwork
				className={styles.artwork}
				artwork={artwork}
				name={''}
				size="320"
			/>
		)}
		<div className={styles.details}>
			<h1 className={styles.title}>{title}</h1>

			{album && (
				<Link
					to={album.link || '#'}
					className={styles.album}
					style={album.link ? null : { pointerEvents: 'none' }}
				>
					{album.name}
				</Link>
			)}

			{artist && (
				<Link
					to={artist.link || '#'}
					className={styles.artist}
					style={artist.link ? null : { pointerEvents: 'none' }}
				>
					{artist.name}
				</Link>
			)}

			{curator && <h2 className={styles.curator}>{curator}</h2>}

			{description && <p className={styles.description}>{description}</p>}

			{genre && releaseDate && (
				<p className={styles.info}>
					{genre.toUpperCase()} · {releaseDate}
				</p>
			)}

			<button type="button" className={styles.play} onClick={play}>
				<Icon icon="play" />
				Play
			</button>
		</div>
	</div>
);

export default MediaPanel;
