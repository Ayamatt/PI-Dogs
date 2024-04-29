import Card from "./Card";
import s from '../styles/Cards.module.css';
import { Link } from "react-router-dom";

export default function Cards (props) {

    return (

        <div className={s.container} >
            {props.dogs.length ? (
                props.dogs.map(el => (
                    <Link to={`/Detail/${el.id}`} >
                        <div key={el.id} className={s.card}> 
                            <Card
                            image={el.image}
                            name={el.name}
                            temperament={el.temperament}
                            age={el.age}
                            weight={el.weight} 
                            weight_min={el.weight_min}
                            weight_max={el.weight_max}
                            />
                        </div>
                    </Link>
                ))
            ) : (<div className={s.loader} > Cargando...  </div>)}
        </div>
    )
}