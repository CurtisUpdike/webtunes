import React from 'react';
import { button } from './LoginButton.module.css';

function LoginButton({ isAuthorized }) {
	let mk = window.MusicKit.getInstance();

	function toggleIsAuthorized() {
		if (isAuthorized) {
			mk.unauthorize();
		} else {
			mk.authorize();
		}
	}

	return isAuthorized ? (
		<button className={button} onClick={toggleIsAuthorized}>
			Sign Out
		</button>
	) : (
			<button className={button} onClick={toggleIsAuthorized}>
				Sign In
			</button>
		);
}

export default LoginButton;
