import React, { useState } from 'react';
import { navigate } from '@reach/router';
import styles from './SearchBar.module.css';

function SearchBar() {
	const [value, setValue] = useState('');

	function handleChange(e) {
		setValue(e.target.value);
	}

	function handleSubmit(e) {
		if (e.key === 'Enter') {
			navigate(`/search/${value}`);
			setValue('');
		}
	}

	return (
		<>
			<div className={styles.searchBar}>
				<input
					className={styles.input}
					type="text"
					placeholder="Search"
					value={value}
					onChange={handleChange}
					onKeyDown={handleSubmit}
				/>
			</div>
		</>
	);
}

export default SearchBar;
