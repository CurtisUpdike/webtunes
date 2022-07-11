import React from 'react';
import { Link } from '@reach/router';
import styles from './ArtistCollection.module.css';

function ArtistCollection({ data }) {
	return (
		<div className={styles.artists}>
			{data.map(
				(item, key) =>
					item.relationships.albums.data.length > 0 && (
						<Link to={`/artist/${item.id}`} key={key} className={styles.link}>
							<div className={styles.name}>{item.attributes.name}</div>
						</Link>
					)
			)}
		</div>
	);
}

export default ArtistCollection;
