import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import useAuth from '../../hooks/useAuth';
import styles from './TopBar.module.css';
import Search from './Search';

function TopBar() {
	const [isAuthorized, setIsAuthorized] = useAuth();
	const login = () => setIsAuthorized(true);
	const logout = () => setIsAuthorized(false);

	return (
		<div
			className={styles.container}
			style={{
				paddingLeft: isAuthorized ? '2rem' : '200px',
				backgroundColor: isAuthorized ? '' : 'black',
			}}
		>
			<div className={styles.logoContainer}>
				<Link to="/" className={styles.logo}>
					<Icon icon="record-vinyl" />
					<span>Webtunes</span>
				</Link>
			</div>
			<Search />
			{!isAuthorized && (
				<p className={styles.warning}>
					Playback is limited to 30 seconds.{' '}
					<button onClick={login}>Log in</button> or{' '}
					<a
						href="https://www.apple.com/apple-music/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Sign up
					</a>{' '}
					for the full experience.
				</p>
			)}
			<div>
				{isAuthorized ? (
					<button type="button" className={styles.btn} onClick={logout}>
						Sign Out
					</button>
				) : (
					<button type="button" className={styles.btn} onClick={login}>
						Sign In
					</button>
				)}
			</div>
		</div>
	);
}

export default TopBar;
