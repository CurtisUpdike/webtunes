import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import useAuth from '../../hooks/useAuth';
import styles from './TopBar.module.css';

function TopBar() {
	const [isAuthorized, setIsAuthorized] = useAuth();
	const login = () => setIsAuthorized(true);
	const logout = () => setIsAuthorized(false);

	return (
		<div className={styles.container}>
			<div className={styles.logoContainer}>
				<Link to="/" className={styles.logo}>
					<Icon icon="record-vinyl" />
					<span>Webtunes</span>
				</Link>
			</div>
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
