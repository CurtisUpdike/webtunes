import React, { useRef } from 'react';
import useComponentWidth from '../../hooks/useComponentWidth';
import styles from './MediaContainer.module.css';
import MediaCollection from '../MediaCollection';

function MediaContainer({ title, media }) {
	let containerRef = useRef(null);
	let componentWidth = useComponentWidth(containerRef);

	return (
		<div ref={containerRef}>
			<h2 className={styles.title}>{title}</h2>
			{media.map((props) => (
				<MediaCollection key={props.title} {...props} width={componentWidth} />
			))}
		</div>
	);
}

export default MediaContainer;
