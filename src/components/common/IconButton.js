import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

let IconButton = ({ children, icon, ...props }) => (
	<button type="button" {...props}>
		<Icon icon={icon} />
		{children}
	</button>
);

export default IconButton;
