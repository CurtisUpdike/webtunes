import React, { useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './RecentlyAdded.module.css';
import LibraryItemPreview from '../../components/LibraryItemPreview/LibraryItemPreview';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function RecentlyAdded() {
	const [media, setMedia] = useState(null);
	useEffect(() => {
		music.api.library
			.recentlyAdded()
			.then((res) => setMedia(res))
			.catch((e) => console.error(e));
	}, []);

	return media ? (
		<>
			<h1 className={styles.title}>Recently Added</h1>
			<div className={styles.media}>
				{media.map((item) => (
					<LibraryItemPreview
						key={item.id}
						artwork={item.attributes.artwork}
						artworkLink={
							item.type === 'library-albums'
								? `/library/album/${item.id}`
								: `/library/playlist/${item.id}`
						}
						name={item.attributes.name}
						description={item.attributes.artistName}
						playParams={item.attributes.playParams}
					/>
				))}
			</div>
		</>
	) : (
		<LoadingSpinner />
	);
}

export default RecentlyAdded;
