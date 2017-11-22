import {FETCH_START,FETCH_END,FETCH_GET_SUCCESS,FETCH_GET_FAIL,FETCH_GETBYID_SUCCESS} from '../../actions/types'
const INITIAL_STATE = {data:'',loading:false,error:'',pokedux_data:[],pokedux_details:''};
export default (state=INITIAL_STATE,action) =>
{
    switch(action.type)
    {
        case FETCH_START:
            return {...state,loading:true};
        case FETCH_END:
            return {...state,loading:false};
        case FETCH_GET_SUCCESS:
            return {...state,pokedux_data:action.payload,error:'',loading:false};
        case FETCH_GETBYID_SUCCESS:
            return {...state,pokedux_details:action.payload,error:'',loading:false};
        case FETCH_GET_FAIL:
            return {...state,error:action.payload,error:'Some thing is wrong,Please try again',loading:false};
        default:
        return state;
    }
}
