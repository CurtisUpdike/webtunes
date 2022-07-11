export default function formatArtworkURL(artwork, size) {
	const defaultURL =
		'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/{h}x{w}bb.{f}';

	artwork = artwork || {};
	artwork.url = artwork.url || defaultURL;
	size = size || 400;
	if (window.devicePixelRatio >= 1.5) {
		size *= 2;
	}
	size = String(size);

	return artwork.url
		.replace('{h}', size)
		.replace('{w}', size)
		.replace('{f}', 'jpeg');
}
