import React from 'react';
import useAuth from '../../hooks/useAuth';
import styles from './TopBar.module.css';

function TopBar() {
	const [isAuthorized, setIsAuthorized] = useAuth();
	const login = () => setIsAuthorized(true);
	const logout = () => setIsAuthorized(false);

	return (
		<div className={styles.container}>
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
	);
}

export default TopBar;
