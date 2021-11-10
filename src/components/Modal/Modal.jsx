import { useEffect } from 'react';
import s from './Modal.module.css';

function Modal({ onClose, children }) {
	const handleOverlayClick = e => {
		if (e.currentTarget === e.target) {
			onClose();
		}
	};

	useEffect(() => {
		const handleKeydown = e => {
			if (e.code === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [onClose]);

	return (
		<div className={s.Overlay} onClick={handleOverlayClick}>
			<div className={s.Modal}>{children}</div>
		</div>
	);
}

export default Modal;
