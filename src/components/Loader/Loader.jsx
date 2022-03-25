import style from './Loader.module.css';
import { Audio } from  'react-loader-spinner'

export default function Loader() {
  return (
    <div role="alert" className={style.loaderBox}>
      <Audio
        height="100"
        width="100"
        color='aqua'
        ariaLabel='loading'
      />
    </div>
  );
}