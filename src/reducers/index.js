import {combineReducers} from 'redux';
import PokeduxReducer from './pokedux/pokedex_reducer';
export default combineReducers({
    pokedux:PokeduxReducer
});
