import { useState } from "react";
import { useDispatch} from "react-redux";
import { getDog } from "../actions/actions";
import { Link } from 'react-router-dom';
import s from '../styles/SearchBar.module.css'

export default function SearchBar () {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const searcher = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getDog(search));
        setSearch('');
    }

    return (

        <div className={s.container}>
            <h1> Dogs API </h1>
            <Link to = '/CreateDog'> Crear perro </Link>
            <div className={s.search}>
                <input type='text' value={search} onChange={e => searcher(e)} />
            </div>
            <button type='submit' onClick={e => handleSubmit(e)}> Buscar </button>
        </div>
    )

}