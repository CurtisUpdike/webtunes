import React from 'react';
import { formatMediaTime } from '../../utils/utils';
import Artwork from '../Artwork';
import styles from './SongCollection.module.css';
import PlayButton from '../PlayButton/PlayButton';

function SongCollection({ data }) {
	return (
		<div className={styles.collection}>
			{data.map((item) => (
				<SongItem
					key={item.id}
					artwork={item.attributes.artwork}
					name={item.attributes.name}
					artistName={item.attributes.artistName}
					durationInMillis={item.attributes.durationInMillis}
					playParams={item.attributes.playParams}
				/>
			))}
		</div>
	);
}

function SongItem({ artistName, artwork, durationInMillis, name, playParams }) {
	return (
		<div className={styles.track}>
			<div className={styles.album}>
				<Artwork
					artwork={artwork}
					name={name}
					size="45"
					className={styles.artwork}
				/>
				<PlayButton className={styles.playButton} {...playParams} />
			</div>
			<div className={styles.text}>
				<div className={styles.info}>
					<p className={styles.name}>{name}</p>
					<p className={styles.artistName}>{artistName}</p>
				</div>
				<p className={styles.duration}>{formatMediaTime(durationInMillis)}</p>
			</div>
		</div>
	);
}

export default SongCollection;
