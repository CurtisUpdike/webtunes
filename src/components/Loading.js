import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Center from './Center';

const Loading = () => (
	<Center>
		<Icon icon="spinner" size="3x" pulse />
	</Center>
);

export default Loading;
