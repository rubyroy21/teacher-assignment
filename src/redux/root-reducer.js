import {combineReducers} from "redux"
import teachersReducers from './reducer'

const rootReducer = combineReducers({
    data: teachersReducers,
})


export default rootReducer