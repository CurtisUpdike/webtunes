import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function Loading() {
	return (
		<div
			style={{
				marginTop: '40vh',
				display: 'flex',
				justifyContent: 'space-around',
			}}>
			<Icon icon="spinner" size="3x" pulse />
		</div>
	);
}

export default Loading;
