import React, { useState, useEffect, useContext } from 'react';
import { MusicKitContext } from '../../providers/MusicKitProvider';
import Loading from '../../components/common/Loading';
import MediaItem from '../../components/MediaItem';

import styles from './LibraryAlbums.module.css';

// TODO: play params not working, 
// link not working, 
// loading too slow
// header

const LibraryAlbums = () => {
	const mk = useContext(MusicKitContext);
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		mk.api.library
			.albums({
				limit: 50,
				offset: albums.length,
			})
			.then((res) =>
				res.length > 0 ? setAlbums([...albums, ...res]) : setLoading(false)
			)
			.catch(console.error.bind(console));
	}, [albums, mk]);

	if (loading) {
		return <Loading />
	}

	return (
		<div className={styles.albums}>
			{albums.map(({ id, attributes }) => (
				<MediaItem
					key={id}
					attributes={attributes}
				/>
			))}
		</div>
	)
}

export default LibraryAlbums;
