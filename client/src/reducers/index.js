import { combineReducers } from 'redux'
import user from './user'

const reducers = {
  user,
}

const rootReducer = combineReducers(reducers)

export default rootReducer

