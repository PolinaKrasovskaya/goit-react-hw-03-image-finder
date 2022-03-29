import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import style from './ImageGallery.module.css';
import propTypes from 'prop-types';

export default function ImageGallery({ imageList, openModal }) {
  return (
    <div>
      <ul className={style.imageGallery}>
        {imageList.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            onImageClick={() => {
              openModal(largeImageURL)
            }}
          />
        ))}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  imageList: propTypes.array.isRequired,
  onImageClick: propTypes.func,
};