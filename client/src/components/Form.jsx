import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../actions/actions";
import s from '../styles/Form.module.css'

export default function Form () {

    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector(state => state.temperaments);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        age: '',
        image: '',
        temper: [],
    })

    const validate = (input) => {
        let err = {}

        // NAME
        !input.name ? err.name = 'Name is required*' : err.name = '';

        input.name && input.name.length > 25 || input.name && input.name.length < 4 ? err.name = "Name must be under 25 and over 3 characters*" : err.name = err.name;

        // HEIGHT_MIN

        !input.height_min ? err.height_min = 'Height min is required*' : err.height_min = '';

        input.height_min && !/(?=.*[0-9])/.test(input.height_min) ? err.height_min = 'Height min must be a integer*' : err.height_min = err.height_min;

        input.height_min && parseInt(input.height_min) <= 0 ? err.height_min = 'Height min must be over 0*' : err.height_min = err.height_min;

        input.height_min && parseInt(input.height_min) > 50 ? err.height_min = 'Height min must be under 50*' : err.height_min = err.height_min;

        // HEIGHT_MAX

        !input.height_max ? err.height_max = 'Height max is required*' : err.height_max = '';

        input.height_max && !/(?=.*[0-9])/.test(input.height_max) ? err.height_max = 'Height max must be a integer*' : err.height_max = err.height_max;

        input.height_max && parseInt(input.height_max) <= 0 ? err.height_max = 'Height max must be over 0*' : err.height_max = err.height_max;

        input.height_max && parseInt(input.height_max) > 230 ? err.height_min = 'Height max must be under 230*' : err.height_max = err.height_max;        

        // WEIGHT MIN

        !input.weight_min ? err.weight_min = 'weight min is required*' : err.weight_min = '';

        input.weight_min && !/(?=.*[0-9])/.test(input.weight_min) ? err.weight_min = 'Weight min must be a integer*' : err.weight_min = err.weight_min;

        input.weight_min && parseInt(input.weight_min) <= 0 ? err.weight_min = 'Weight min must be over 0*' : err.weight_min = err.weight_min;

        input.weight_min && parseInt(input.weight_min) > 50 ? err.weight_min = 'Weight min must be under 50*' : err.weight_min = err.weight_min;

        // WEIGHT MAX   
        
        !input.weight_max ? err.weight_max = 'Weight max is required*' : err.weight_max = '';

        input.weight_max && !/(?=.*[0-9])/.test(input.weight_max) ? err.weight_max = 'Weight max must be a integer*' : err.weight_max = err.weight_max;

        input.weight_max && parseInt(input.weight_max) <= 2 ? err.weight_max = 'Weight max must be over 2*' : err.weight_max = err.weight_max;

        input.weight_max && parseInt(input.weight_max) > 120 ? err.weight_min = 'Weight max must be under 120*' : err.weight_max = err.weight_max;     

        // AGE
        
        !input.age ? err.age = 'Age is required' : err.age = '';    

        return err;
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(input))
        if(Object.keys(errors).length === 0) {
            alert('Invalid camps');
        }
        else{
            dispatch(postDog(input));
            setInput({
                name: '',
                height_min: '',
                height_max: '',
                weight_min: '',
                weight_max: '',
                age: '',
                image: '',
                temper: [],
            });
            alert('Perro creado con éxito !')
            history.push('/Home')
        }
    }


    const handleSelect = (e) => {
        setInput({
            ...input,
            temper: [...input.temper, e.target.value],
        })
    }

    useEffect (() => {
        dispatch(getTemperaments());
    }, []);

    return (
        <div className={s.container}>

            <h1> Creá tu perro </h1>

            <form onSubmit={handleSubmit}>
                <div className={s.form} >

                    <label> Nombre </label>
                    <input type='text' value={input.name} name='name' onChange={handleChange} />
                    {errors.name && <p> {errors.name} </p>}

                    <label> Altura mínima </label>
                    <input type='text' value={input.height_min} name='height_min' onChange={handleChange} />
                    {errors.height_min && <p> {errors.height_min} </p>}

                    <label> Altura maxíma</label>
                    <input type='text' value={input.height_max} name='height_max' onChange={handleChange} />
                    {errors.height_max && <p> {errors.height_max} </p>}

                    <label> Peso mínimo </label>
                    <input type='text' value={input.weight_min} name='weight_min' onChange={handleChange} />
                    {errors.weight_min && <p> {errors.weight_min} </p>}

                    <label> Peso maxímo </label>
                    <input type='text' value={input.weight_max} name='weight_max' onChange={handleChange} />
                    {errors.weight_max && <p> {errors.weight_max} </p>}

                    <label> Edad </label>
                    <input type='text' value={input.age} name='age' onChange={handleChange} />
                    {errors.age && <p> {errors.age} </p>}

                    <label> Imagen </label>
                    <input type='text' value={input.image} name='image' onChange={handleChange} />

                    <label> Temperamentos </label>
                    <select onChange={handleSelect} >
                        {temperaments.map(el => (
                            <option value={el.name} key={el.name} > {el.name} </option>
                        ))}
                    </select>
                    <label className={s.label} >Temperamentos agregados:  {input.temper.map(el => el + ', ')} </label>
                    <button type='submit' className={s.btn} disabled={
                        errors.name || errors.height_min || errors.height_max || errors.weight_min || errors.weight_max || errors.age ? true : false
                        } > Enviar </button>
                    
                    <Link to='/Home'>
                        <button className={s.btn}> Volver </button>
                    </Link>
                </div>
            </form>
        </div>
    )

}