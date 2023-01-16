import { Link } from "react-router-dom";
import s from '../styles/Landing.module.css';

export default function Landing () {
    return (
        <div className={s.container}>
            <div className={s.box} >
                <h1> Bienvenido a mi PI-Dog </h1>
                <Link to ='/Home'>
                    <button> HOME </button>
                </Link>
            </div>
        </div>
    )
}