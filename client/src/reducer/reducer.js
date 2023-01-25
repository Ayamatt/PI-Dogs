import { GET_DOGS, GET_TEMPERAMENTS, FILTER_DOGS_TEMPERAMENT, FILTER_CREATED, ORDER_NAME, ORDER_WEIGHT, GET_DOG, POST_DOG, GET_DOG_ID } from "../actions/actions";

export const initialState = {
    dogs: [],
    allDogs: [],
    dogDetail: [],
    temperaments: [],
}

const reducer = (state=initialState, action) => {
    switch(action.type) {

        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }

        case GET_DOG:
            return {
                ...state,
                dogs: action.payload,
            }

        case GET_DOG_ID:
            return {
                ...state,
                dogDetail: action.payload,
            }

        case POST_DOG:
            return {
                ...state,
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }

        case FILTER_DOGS_TEMPERAMENT:
            const allDogs = state.allDogs;
            const temperamentFiltered = action.payload === 'temp' ? allDogs : allDogs.filter(el => 
                el.temperament?.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                dogs: temperamentFiltered,
            }

        case FILTER_CREATED:
            const allDogs2 = state.allDogs;
            const createdFilter = action.payload === 'created' ?
             allDogs2.filter(el => el.createdDb) :
             allDogs2.filter(el => !el.createdDb);

            return {
                ...state,
                dogs: action.payload === 'all' ? allDogs2 : createdFilter,
            }

        case ORDER_NAME:
            const allDogs3 = state.allDogs;
            const dogsSorted = action.payload === 'asc' ?
            allDogs3.sort((a,b) => {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            allDogs3.sort((a,b) => {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })

            return {
                ...state,
                dogs: dogsSorted,
            }

        case ORDER_WEIGHT:
            const allDogs4 = state.allDogs;
            const dogsOrdened = action.payload === 'mas' ?
            allDogs4.sort((a,b) => {
                let num1 = b.weight ? Number(b.weight.substring(0,2)) : b.weight_min;
                let num2 = a.weight ? Number(a.weight.substring(0,2)) : a.weight_min;


                if(num1 === NaN && num2 !== NaN) {
                    return 0;
                }

                if(num2 === NaN && num1 !== NaN) {
                    return 0;
                }

                 if(num1 > num2) {
                     return 1;
                 }
                 if(num2 > num1) {
                     return -1;
                 }
                 return 0;

            }) : allDogs4.sort((a,b) => {
                let num1 = b.weight ? Number(b.weight.substring(0,2)) : b.weight_min;
                let num2 = a.weight ? Number(a.weight.substring(0,2)) : a.weight_min;

                if(num1 === NaN && num2 !== NaN) {
                    return 0;
                }

                if(num2 === NaN && num1 !== NaN) {
                    return 0;
                }

                 if(num1 > num2) {
                     return -1;
                 }
                 if(num2 > num1) {
                     return 1;
                 }
                 return 0;
            })
            return {
                ...state,
                dogs: dogsOrdened,
            }

        default:
            return { ...state };
    }
}

export default reducer;