import React from 'react';
import { Link } from '@reach/router';
import styles from './LibraryItemPreview.module.css';
import Artwork from '../Artwork/Artwork';
import PlayButton from '../PlayButton/PlayButton';

function LibraryItemPreview({
	artwork,
	artworkLink,
	name,
	description,
	playParams,
}) {
	return (
		<div>
			<div className={styles.item}>
				<Link to={artworkLink} className={styles.link}>
					<Artwork
						artwork={artwork}
						name={name}
						size={160}
						className={styles.artwork}
					/>
				</Link>
				<PlayButton className={styles.playButton} {...playParams} />
			</div>
			<p className={styles.name}>{name}</p>
			<p className={styles.description}>{description}</p>
		</div>
	);
}

export default LibraryItemPreview;
