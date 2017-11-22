import {FETCH_START,FETCH_END,FETCH_GET_SUCCESS,FETCH_GET_FAIL,FETCH_GETBYID_SUCCESS} from '../types';
import axios from 'axios';
import { ROOT_URL }  from '../../config/config';

/*
@method: fetchPokidexData
@desc: Get fetch pokedex data
*/
export function fetchPokidexData(callback) {
    return (dispatch) => {
        axios.get(ROOT_URL)
            .then((response) => {
                onSuccess(dispatch,response.data.results);
                dispatch({type:FETCH_END});
                callback();
            })
            .catch((err)=>{
                onFail(dispatch);
                dispatch({type:FETCH_END});
                callback();
          });
    }
}

/*
@method: fetchPokidexDataById
@desc: Get fetch pokedex data by id
*/
export function fetchPokidexDataById(url,callback) {
    return (dispatch) => {
        dispatch({type:FETCH_START});
        axios.get(url)
            .then((response) => {
                dispatch({type:FETCH_GETBYID_SUCCESS,payload:response.data});
                callback();
            })
            .catch((err)=>{
                onFail(dispatch);
                dispatch({type:FETCH_END});
                callback();
            });
    }
}

/*
@method: onSuccess
@desc: set success status and data
*/
const onSuccess = (dispatch,response)=>
{
    dispatch({type:FETCH_GET_SUCCESS,payload:response});

};

/*
@method: onFail
@desc: set fail status
*/
const onFail = (dispatch)=>
{
    dispatch({type:FETCH_GET_FAIL});

};