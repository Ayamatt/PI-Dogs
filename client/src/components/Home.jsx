import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterDogsTemperament, filterCreated, orderName, orderWeight } from "../actions/actions";
import Cards from "./Cards";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import s from '../styles/Home.module.css';

export default function Home () {

    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const temperaments = useSelector(state => state.temperaments);
    const [allDogs, setAllDogs] = useState(dogs)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexLastDog = currentPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexFirstDog, indexLastDog);

    useEffect (() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [])

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    function handleClick (e) {
        e.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1)
    };

    function handleTemperamentFilter (e) {
        dispatch(filterDogsTemperament(e.target.value));
        setCurrentPage(1);
    };

    function handleCreatedFilter (e) {
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    };

    function handleOrderName (e) {
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
        setAllDogs(currentDogs)
    }

    function handleOrderWeight (e) {
        dispatch(orderWeight(e.target.value));
        setCurrentPage(1);
        setAllDogs(currentDogs)
    }

    return (

        <div className={s.container} >

            <SearchBar />
            
            <button onClick = {e => handleClick(e)} className={s.btn} > Volver a cargar los perros </button>

            <div className={s.body} >
                <label> Temperamentos: </label>
                <select onChange={e => handleTemperamentFilter(e)}>
                    <option value='temp'> Todos </option>
                    {temperaments.map(el => (
                        <option value={el.name} key={el.name}> {el.name} </option>
                    ))}
                </select>

                <label> Orden: </label>
                <select onChange={e => handleOrderName(e)}>
                    <option value='asc'> Ascendente </option>
                    <option valye='desc'> Descendente </option>
                </select>

                <label> Peso: </label>
                <select onChange={e => handleOrderWeight(e)}>
                    <option value='mas'> Más pesados </option>
                    <option value='men'> Más livianos </option>
                </select>

                <label> Perros: </label>
                <select onChange={e => handleCreatedFilter(e)}>
                    <option value='all'> Todos </option>
                    <option value='api'> Existentes en la api </option>
                    <option value='created'> Creados </option>
                </select>
            </div>
            <Paginado dogsPerPage={dogsPerPage}
                      dogs={dogs.length}
                      paginado={paginado}/>
            <Cards dogs={currentDogs}/>
        </div>
    )
}