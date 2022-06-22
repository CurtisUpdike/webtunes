import formatArtworkURL from './formatArtworkURL';

export { formatArtworkURL };

export function formatMediaTime(millis) {
	const seconds = millis / 1000;
	return window.MusicKit.formatMediaTime(seconds, ':');
}
