import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import style from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  state = {
    requestName: '',
    showModal: false,
    largeImage: '',
  };

  handelFormSubmit = requestName => {
    this.setState({ requestName });
  };

  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({ 
      showModal: !showModal,
      largeImage: largeImageURL ? largeImageURL : '',
    }));
  };

  render() {
    const { requestName, showModal, largeImage } = this.state;

    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.handelFormSubmit} />
        <ImageGallery openModal={this.toggleModal} requestName={requestName}/>
        {showModal && (
          <Modal onClose={this.toggleModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}