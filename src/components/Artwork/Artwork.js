import React from 'react';
import { formatArtworkURL } from '../../utils/utils';

function Artwork({ artwork, name, size, className }) {
	const artworkURL = formatArtworkURL(artwork, size, size);

	return (
		<img
			className={className}
			src={artworkURL}
			alt={name + ' artwork'}
			height={size}
			width={size}
		/>
	);
}

export default Artwork;
