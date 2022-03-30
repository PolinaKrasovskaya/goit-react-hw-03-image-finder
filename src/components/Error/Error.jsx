import errorImage from './error.jpg';
import style from './Error.module.css';
import propTypes from 'prop-types';

export default function Error({ request }) {
    return (
        <div role="alert">
            <h1 className={style.message} >We have no find any "{request}"</h1>
            <img className={style.galleryImage} src={errorImage} alt="sadunicorn" />
        </div>
    );
}


Error.propTypes = {
    request: propTypes.string,
};



// import { Component } from 'react';
// import { createPortal } from 'react-dom';
// import errorImage from './error.jpg';
// import style from './Error.module.css';
// import propTypes from 'prop-types';

// const modalRoot = document.querySelector('#modal-root');
// // export default function Error({ request }) {
// //     return (
// //         <div role="alert">
// //             <h1 className={style.message} >We have no find any "{request}"</h1>
// //             <img className={style.galleryImage} src={errorImage} alt="sadunicorn" />
// //         </div>
// //     );
// // }
// export default class ErrorModal extends Component {

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { requestName } = this.props;

//     return createPortal(
//       <div onClick={this.handleBackdropClick} className={style.modal_backdrop}>
//         <img className={style.modal} src={errorImage} alt={requestName} />
//       </div>,
//       modalRoot
//     );
//   }
// }

// ErrorModal.propTypes = {
//   largeImage: propTypes.string.isRequired,
//   requestName: propTypes.string,
// };