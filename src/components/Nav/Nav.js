import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styles from './Nav.module.scss';

function Nav({ isAuthorized }) {
	let [userPlaylists, setUserPlaylists] = useState(null);

	useEffect(
		function () {
			let mk = window.MusicKit.getInstance();
			if (isAuthorized) {
				mk.api.library.playlists().then(setUserPlaylists);
			} else {
				setUserPlaylists(null);
			}
		},
		[isAuthorized]
	);

	return isAuthorized && <NavView userPlaylists={userPlaylists} />;
}

let NavView = ({ userPlaylists }) => (
	<nav className={styles.nav}>
		<Link to="/" className={styles.logo}>
			<Icon icon="record-vinyl" />
			<span>Webtunes</span>
		</Link>
		<NavLink to="/" className={styles.icon}>
			<Icon icon="home" />
			<span>Home</span>
		</NavLink>
		<NavLink to="/browse" className={styles.icon}>
			<Icon icon="headphones-alt" />
			<span>Browse</span>
		</NavLink>
		<div className={styles.list}>
			{/* <h2 className={styles.heading}>Your Library</h2> */}
			{/* <NavLink to="/library/songs">Songs</NavLink> */}
			{/* <NavLink to="/library/albums">Albums</NavLink> */}
			{/* <NavLink to="/library/artists">Artists</NavLink> */}

			{userPlaylists && [
				<h2 className={styles.heading} key="header">
					Playlists
				</h2>,
				...userPlaylists.map((playlist) => (
					<NavLink to={`library/playlist/${playlist.id}`} key={playlist.id}>
						{playlist.attributes.name}
					</NavLink>
				)),
			]}
		</div>
	</nav>
);

let NavLink = ({ children, ...props }) => (
	<Link className={styles.link} {...props}>
		<div>{children}</div>
	</Link>
);

export default Nav;
