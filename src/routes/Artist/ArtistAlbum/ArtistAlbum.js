import React, { useState, useEffect } from 'react';
import { music } from '../../../services/music';
import ItemPreview from '../../../components/ItemPreview/ItemPreview';

function ArtistAlbum({ id }) {
	const [album, setAlbum] = useState(null);
	useEffect(() => {
		music.api
			.album(id)
			.then((res) => setAlbum(res.attributes))
			.catch((e) => console.error(e));
	}, [id]);

	return (
		album && (
			<ItemPreview
				artwork={album.artwork}
				artworkLink={`/album/${id}`}
				name={album.name}
				description={album.releaseDate.substring(0, 4)}
				playParams={album.playParams}
			/>
		)
	);
}

export default ArtistAlbum;
