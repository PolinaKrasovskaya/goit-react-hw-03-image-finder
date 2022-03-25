import style from './Button.module.css';
import propTypes from 'prop-types';

export default function Button({ loadMore }) {
  return (
    <div className={style.buttonBox}>
      <button type="button" onClick={loadMore} className={style.button}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  loadMore: propTypes.func.isRequired,
};