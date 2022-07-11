import { useState, useEffect } from 'react';

export default function useAuth() {
	const music = window.MusicKit.getInstance();
	const [isAuthorized, setIsAuthorized] = useState(music.isAuthorized);

	function changeAuth(target) {
		return target ? music.authorize() : music.unauthorize();
	}

	useEffect(() => {
		const handleChange = () => setIsAuthorized(music.isAuthorized);

		music.addEventListener('authorizationStatusDidChange', handleChange);
		return () => {
			music.removeEventListener('authorizationStatusDidChange', handleChange);
		};
	});

	return [isAuthorized, changeAuth];
}
