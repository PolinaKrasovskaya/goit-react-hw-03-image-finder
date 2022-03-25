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
    request: propTypes.string.isRequired,
};