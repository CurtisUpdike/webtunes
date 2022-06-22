import React from 'react';
import styles from './NotFound.module.css';

function NotFound() {
	return (
		<div className={styles.container}>
			<p className={styles.message}>Sorry, nothing here...</p>
		</div>
	);
}

export default NotFound;
