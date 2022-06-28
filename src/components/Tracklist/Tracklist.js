import React from 'react';
import formatMediaTime from '../../utils/formatMediaTime';
import styles from './Tracklist.module.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function Tracklist({ songs }) {
	return (
		<div className={styles.tracklist}>
			<header>
				<span></span>
				<span>TITLE</span>
				<span>ARTIST</span>
				<span>ALBUM</span>
				<span>
					<Icon icon={['far', 'clock']} />
				</span>
			</header>
			<ol>
				{songs.map((song, key) => (
					<Track key={key} song={song} />
				))}
			</ol>
		</div>
	);
	// return (
	// 	<table className={styles.tracklist}>
	// 		<thead>
	// 			<tr>
	// 				<th></th>
	// 				<th>TITLE</th>
	// 				<th>ARTIST</th>
	// 				<th>ALBUM</th>
	// 				<th>
	// 					<Icon icon={['far', 'clock']} />
	// 				</th>
	// 			</tr>
	// 		</thead>
	// 		<tbody>
	// 			{songs.map((song, key) => <Track key={key} song={song} />)}
	// 		</tbody>
	// 	</table>
	// )
}

function Track({ song }) {
	let {
		attributes: {
			name: title,
			albumName: album,
			artistName: artist,
			durationInMillis,
			playParams,
		},
	} = song;
	if (!playParams) return null;
	let duration = Math.ceil(durationInMillis / 1000);

	function play() {
		let mk = window.MusicKit.getInstance();
		let { kind, id } = playParams;
		mk.setQueue({ [kind]: id })
			.then(() => mk.player.play())
			.catch(console.error.bind(console));
	}

	return (
		<li onDoubleClick={play} className={styles.track}>
			<span onClick={play}>
				<Icon icon={['fa', 'play']} className={styles.play} />
			</span>
			<span>{title}</span>
			<span>{artist}</span>
			<span>{album}</span>
			<span className={styles.duration}>{formatMediaTime(duration)}</span>
		</li>
	);

	// return (
	// 	<tr onDoubleClick={play} className={styles.track}>
	// 		<td onClick={play}>
	// 		</td>
	// 		<td>{title}</td>
	// 		<td>{artist}</td>
	// 		<td>{album}</td>
	// 		<td className={styles.duration}>
	// 			{formatMediaTime(duration)}
	// 		</td>
	// 	</tr>
	// )
}

export default Tracklist;
