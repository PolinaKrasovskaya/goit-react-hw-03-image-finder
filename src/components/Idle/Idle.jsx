import idleImage from './idle.jpg';
import style from './Idle.module.css';

export default function Idle() {
    return (
        <div role="alert" className={style.idleBox}>
            <h1>Enter your request.</h1>
            <img src={idleImage} width="240" alt="loupeMan" />
        </div>
    );
}