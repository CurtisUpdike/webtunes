import React from 'react';

const Center = ({ children }) => (
	<div
		style={{
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		{children}
	</div>
);

export default Center;
