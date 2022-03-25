import style from './ButtonLoader.module.css';
import { Audio } from  'react-loader-spinner';

export default function ButtonLoader() {
  return (
    <div role="alert" className={style.buttonLoaderBox}>
      <Audio
        height="50"
        width="50"
        color='aqua'
        ariaLabel='loading'
      />
    </div>
  );
}