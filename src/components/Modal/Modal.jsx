import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, requestName } = this.props;

    return createPortal(
      <div onClick={this.handleBackdropClick} className={style.modal_backdrop}>
        <img className={style.modal} src={largeImage} alt={requestName} />
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImage: propTypes.string.isRequired,
  requestName: propTypes.string,
};