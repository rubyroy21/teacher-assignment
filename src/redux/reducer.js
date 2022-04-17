import * as types from './actionType'

const initialState = {
    teachers: [],
    teacher: {},
    loading: true
}


const teachersReducers = (state = initialState, action) => {
        switch(action.type){
            case types.GET_TEACHERS:
                return {
                    ...state,
                    teachers: action.payload,
                    loading: false
                }
            case types.DELETE_TEACHER:
            case types.ADD_DATA:
                return {
                    ...state,
                    loading: false
                }
            case types.GET_SINGLE_DATA:
                return {
                    ...state,
                    teacher: action.payload,
                    loading: false
                }
            case types.UPDATE_DATA:
            default:
                return state
        }
}

export default teachersReducers