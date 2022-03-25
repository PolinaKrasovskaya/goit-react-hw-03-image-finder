import style from './ImageGalleryItem.module.css';
import propTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  onImageClick
}) {
  return (
    <li onClick={onImageClick} className={style.imageGalleryItem}>
      <img src={webformatURL} alt={largeImageURL} className={style.galleryImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string.isRequired,
  largeImageURL: propTypes.string,
  onImageClick: propTypes.func.isRequired,
};