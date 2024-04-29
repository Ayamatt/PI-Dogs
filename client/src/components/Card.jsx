import s from '../styles/Card.module.css';

export default function Card (props) {
    return (
        <div className={s.container} >
            {props.weight_min ? (
                <div> 
                    <img src={props.image} alt='Not found' />
                    <h2> {props.name} </h2>
                    <h5 className={s.temperaments}> {props.temperament} </h5>
                    <h5> Weight: {props.weight_min} - {props.weight_max} kg </h5>
                </div>

            ) : (<div> 
                    <img src={props.image} alt='Not found' />
                    <h2> {props.name} </h2>
                    <h5> {props.temperament} </h5>
                    <h5> Weight: {props.weight} Kg </h5>
            </div>)}
        </div>
    )
}