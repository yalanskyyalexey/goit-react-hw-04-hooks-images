import { useState, useEffect, useCallback } from 'react';
import LoaderSpinner from './components/Loader/Loader';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchImages from './apiService/images-api';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import s from './App.module.css';

function App() {
	const [images, setImages] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [largeImageURL, setlargeImage] = useState('');
	const [alt, setAlt] = useState('');

	const getImagesFromApi = useCallback(() => {
		setIsLoading(true);

		fetchImages({ searchQuery, currentPage })
			.then(images => {
				if (images.length === 0) {
					return Promise.reject(new Error(`Error`));
				} else {
					setImages(prevImages => [...(prevImages || []), ...images]);
				}
			})
			.catch(error => setError(error))
			.finally(() => setIsLoading(false));
	}, [searchQuery, currentPage]);

	const onChangeQuery = query => {
		setQuery(query);
		setCurrentPage(1);
		setImages([]);
		setError(null);
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const handleModal = (largeImageURL, alt) => {
		setlargeImage(largeImageURL);
		setAlt(alt);
		toggleModal();
	};

	const addPageNum = () => {
		setCurrentPage(prevPage => prevPage + 1);
	};

	useEffect(() => {
		if (searchQuery === '') return;
		getImagesFromApi();
	}, [searchQuery, currentPage, getImagesFromApi]);

	useEffect(() => {
		if (currentPage > 1) {
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [images, currentPage]);

	return (
		<>
			<Searchbar onSubmit={onChangeQuery} />
			{error && (
				<h3 className={s.Error}>
					Oops! That image can’t be found. Please, try anothe request!
				</h3>
			)}
			<ImageGallery images={images} onImageClick={handleModal} />
			{isLoading && <LoaderSpinner className={s.Loader} />}
			{(images.length && !isLoading) > 0 && <Button onClick={addPageNum} />}
			{showModal && (
				<Modal onClose={toggleModal}>
					<img src={largeImageURL} alt={alt} />
				</Modal>
			)}
		</>
	);
}
export default App;
