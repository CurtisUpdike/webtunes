import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const styles = {
	container: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
};

const Loading = () => (
	<div style={styles.container}>
		<Icon icon="spinner" size="3x" pulse />
	</div>
);

export default Loading;
