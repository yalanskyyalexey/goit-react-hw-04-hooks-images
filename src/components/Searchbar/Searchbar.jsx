import { useState } from 'react';
import s from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';

function Searchbar({ onSubmit }) {
	const [queryString, searchString] = useState('');

	const handleChange = e => {
		searchString(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		onSubmit(queryString);
		resetForm();
	};

	const resetForm = () => searchString('');

	return (
		<header className={s.Searchbar}>
			<form className={s.SearchForm} onSubmit={handleSubmit}>
				<button type='submit' className={s.SearchForm__button}>
					<span className={s.SearchForm__button_label}>
						<FcSearch />
					</span>
				</button>

				<input
					className={s.SearchForm__input}
					type='text'
					autoComplete='off'
					autoFocus
					placeholder='Search images and photos'
					value={queryString}
					onChange={handleChange}
				/>
			</form>
		</header>
	);
}

export default Searchbar;
