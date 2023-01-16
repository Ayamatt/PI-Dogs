import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_DOG = 'GET_DOG';
export const GET_DOG_ID = 'GET_DOG_ID';
export const POST_DOG = 'POST_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_DOGS_TEMPERAMENT = 'FILTER_DOGS_TEMPERAMENT';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_NAME = 'ORDER_NAME';
export const ORDER_WEIGHT = 'ORDER_WEIGHT';

export const getDogs = () => {
    return async function (dispatch) {
        return fetch('http://localhost:3001/dogs')
        .then(res => res.json())
        .then(json => dispatch({type: GET_DOGS, payload: json}))
    };
};

export const getDog = (name) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/dogs?name=${name}`)
        .then(res => res.json())
        .then(json => dispatch({type: GET_DOG, payload: json}))
    };
};

export const getDetail = (id) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(json => dispatch({type: GET_DOG_ID, payload: json}))
    };
};

export const getTemperaments = () => {
    return async function (dispatch) {
        return fetch('http://localhost:3001/temperaments')
        .then(res => res.json())
        .then(json => dispatch({type: GET_TEMPERAMENTS, payload: json}))
    };
};

export const postDog = (dog) => {
    return async function (dispatch) {
        let json = await axios.post('http://localhost:3001/dogs', dog)
        return json;
    }
}

export const filterDogsTemperament = (payload) => {
    return {
        type: FILTER_DOGS_TEMPERAMENT,
        payload,
    }
}

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload,
    }
}

export const orderName = (payload) => {
    return {
        type: ORDER_NAME,
        payload,
    }
}

export const orderWeight = (payload) => {
    return {
        type: ORDER_WEIGHT,
        payload,
    }
}