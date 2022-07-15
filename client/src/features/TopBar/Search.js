import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.css';

function SearchBar() {
	const [value, setValue] = useState('');

	function handleChange(e) {
		setValue(e.target.value);
	}

	function handleSubmit(e) {
		e.persist();
		e.preventDefault();
		navigate(`/search/${e.target[0].value}`);
		setValue('');
	}

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<Icon icon="search" className={styles.icon} />
				<input
					type="search"
					placeholder="Search"
					className={styles.input}
					value={value}
					onChange={handleChange}
				/>
			</form>
		</div>
	);
}

export default SearchBar;
