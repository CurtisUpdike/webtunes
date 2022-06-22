import { useState, useEffect } from 'react';

function useComponentWidth(componentRef) {
	let [width, setWidth] = useState(null);
	useEffect(() => {
		window.addEventListener('resize', updateWidth);
		if (componentRef.current) {
			updateWidth();
		}
		return function cleanup() {
			window.removeEventListener('resize', updateWidth);
		};

		//
		function updateWidth() {
			setWidth(componentRef.current.offsetWidth);
		}
	}, [componentRef]);

	return width;
}

export default useComponentWidth;
