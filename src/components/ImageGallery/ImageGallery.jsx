import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Idle from '../Idle/Idle';
import Loader from '../Loader/Loader';
import ButtonLoader from '../ButtonLoader/ButtonLoader';
import Error from '../Error/Error';
import imageAPI from "../../services/image-api";
import style from './ImageGallery.module.css';
import propTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export default class ImageGallery extends Component {
  state = {
    imageList: [],
    error: null,
    status: Status.IDLE,
    loading: false,
    request: '',
    page: 1,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.requestName;
    const nextName = this.props.requestName;
    const { page } = this.state;

    if (prevName !== nextName) {
      console.log('izmenilos')

      this.setState({ status: Status.PENDING })

      imageAPI
        .fetchPictures(nextName)
        .then(imageList =>
          this.setState({
            imageList: imageList.hits,
            status: imageList.hits.length !== 0 ? Status.RESOLVED : Status.REJECTED,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }))
      } 
      else if (prevState.page < page ) {

      this.setState({ loading: true });

      imageAPI
        .fetchPictures(nextName, page)
        .then(imageList =>
          this.setState({
            imageList: [...prevState.imageList, ...imageList.hits],
            status: imageList.hits.length !== 0 ? Status.RESOLVED : Status.REJECTED,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoadMore = () => {
    this.setState({ 
      page: this.state.page + 1,
    });
  };

  render() {
    const { imageList, status, loading } = this.state;

    if (status === Status.IDLE) {
      return <Idle />
    }

    if (status === Status.PENDING) {
      return <Loader />
    }

    if (status === Status.REJECTED) {
      return <Error request={this.props.requestName} />
    }

    if (status === Status.RESOLVED) {
      return (
        <div>
          <ul className={style.imageGallery}>
            {imageList.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                onImageClick={() => {
                  this.props.openModal(largeImageURL)
                }}
              />
            ))}
          </ul>
          {loading && <ButtonLoader />}
          {imageList.length > 11 && !loading && <Button loadMore={this.handleLoadMore} />}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
        id: propTypes.string.isRequired,
        webformatURL: propTypes.string.isRequired,
        largeImageURL: propTypes.string.isRequired,
    }),
  )
};