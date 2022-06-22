import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Button from './Button';

let IconButton = ({ children, icon, ...props }) => (
	<Button {...props}>
		<Icon icon={icon} />
	</Button>
);

export default IconButton;
