import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressBar.module.css';

ProgressBar.propTypes = {
	progress: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
};

function ProgressBar({ progress, onSelect }) {
	function handleClick(event) {
		let selection = event.clientX - event.target.offsetLeft;
		let total = event.target.offsetWidth;
		onSelect(selection / total);
	}

	return (
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.bar}>
				<div
					className={styles.fill}
					style={{
						transform: `translateX(${progress - 100}%)`,
					}}
				/>
			</div>
		</div>
	);
}

export default ProgressBar;
