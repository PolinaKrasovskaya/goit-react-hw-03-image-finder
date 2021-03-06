import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Idle from './components/Idle/Idle';
import Loader from './components/Loader/Loader';
import Error from './components/Error/Error';
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import imageAPI from "./services/image-api";
import style from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export default class App extends Component {
  state = {
    requestName: '',
    showModal: false,
    largeImage: '',
    status: Status.IDLE,
    imageList: [],
    error: null,
    page: 1,
    totalResults: 0,
  };

  handleFormSubmit = request => {
    this.setState({
      requestName: request,
      page: 1,
      imageList: [],
      totalResults: 0,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.requestName !== this.state.requestName) {
      this.setState({ 
        status: Status.PENDING,
       })
      this.fetchArticles()
    }
  }

  fetchArticles = () => {
    const {requestName, page} = this.state;
    imageAPI
    .fetchPictures(requestName, page)
    .then(response => {
      if( response.hits.length === 0 ) {
        this.setState(Status.REJECTED);
      }
      this.setState(prevState => ({
        imageList: [...prevState.imageList, ...response.hits],
        status: Status.RESOLVED,
        page: prevState.page + 1,
        totalResults: response.hits.length,
      }))
    })
    .catch(error => this.setState({ error, status: Status.REJECTED }))
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({ 
      showModal: !showModal,
      largeImage: largeImageURL ? largeImageURL : '',
    }));
  };

  render() {
    const { 
      requestName, 
      status, 
      showModal, 
      largeImage, 
      imageList,
      totalResults,
    } = this.state;

    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === Status.IDLE && <Idle />}
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && <Error request={requestName} />}
        {status === Status.RESOLVED && (
          <ImageGallery openModal={this.toggleModal} imageList={imageList}/>
        )}
        {totalResults > 0 
        && status !== Status.PENDING
        && imageList.length > 12
        && <Button loadMore={this.fetchArticles} />
        }
        {showModal && (
          <Modal onClose={this.toggleModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}