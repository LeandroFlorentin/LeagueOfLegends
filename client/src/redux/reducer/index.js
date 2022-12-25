import {
    PERSONAJES,
    PERSONAJE,
    CLEAR,
    GENEROS,
    SEARCH,
    FILTROS,
    PAGINA,
    FAVORITOS,
    MODO
} from '../actions/index.js'

const initialState = {
    personajes: {},
    personaje: {},
    generos: [],
    busco: "",
    filtros: {
        Fighter: undefined,
        Tank: undefined,
        Mage: undefined,
        Assassin: undefined,
        Marksman: undefined,
        Support: undefined
    },
    pagina: 1,
    favoritos: [],
    modo: true
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSONAJES:
            return {
                ...state,
                personajes: { ...action.payload }
            }
        case PERSONAJE:
            return {
                ...state,
                personaje: action.payload
            }
        case CLEAR:
            return {
                ...state,
                personaje: action.payload
            }
        case GENEROS:
            return {
                ...state,
                generos: [...action.payload]
            }
        case SEARCH:
            return {
                ...state,
                busco: action.payload
            }
        case FILTROS:
            return {
                ...state,
                filtros: {
                    ...state.filtros,
                    [action.payload.tipo]: action.payload.filtro
                }
            }
        case PAGINA:
            return {
                ...state,
                pagina: action.payload
            }
        case FAVORITOS:
            return {
                ...state,
                favoritos: [...action.payload]
            }
        case MODO:
            return {
                ...state,
                modo: action.payload
            }
        default: return state
    }
}

export default rootReducer;
