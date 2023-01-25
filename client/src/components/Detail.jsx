import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../actions/actions"
import s from '../styles/Detail.module.css';

export default function Detail (props) {

    const dispatch = useDispatch();
    const dog = useSelector(state => state.dogDetail);

    useEffect(() =>{
        dispatch(getDetail(props.match.params.id));
    }, [])

    return (

        <div className={s.container} >
            {dog.length && !dog[0].height_min ? (

                <div> 
                    <img src={dog[0].image} />
                    <h1> Name: {dog[0].name} </h1>
                    <h4> Temperaments: {dog[0].temperament} </h4>
                    <h4> Height: {dog[0].height} centímetros </h4>
                    <h4> Weight {dog[0].weight} Kgs </h4>
                    <h4> Life span: {dog[0].age} </h4>

                </div>

            ) : (<div></div>)}

            {dog.length && dog[0].height_min ? (

                <div> 
                    <img src={dog[0].image} />
                    <h1> Name: {dog[0].name} </h1>
                    <h4> Temperaments: {dog[0].temperament} </h4>
                    <h4> Height: {dog[0].height_min} - {dog[0].height_max} centímetros </h4>
                    <h4> Weight: {dog[0].weight_min} - {dog[0].weight_max} Kgs </h4>
                    <h4> Life span: {dog[0].age} years </h4>
                </div>

            ) : (<div></div>)}

        </div>

    )
}