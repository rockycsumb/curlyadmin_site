import {SET_ALERT, REMOVE_ALERT, FADE_OUT} from './types';
import uuid from 'uuid/v4';

export const setAlert = (msg, alertType) => dispatch => {
		const id = uuid();
		dispatch({
			type: SET_ALERT,
			payload: { msg, alertType, id}
		})
		
		setTimeout(()=> 
			dispatch({type: FADE_OUT, payload: id}), 7000);
	
		setTimeout(()=> 
			dispatch({type: REMOVE_ALERT, payload: id}), 7250);
	
}

export const removeAlert = (id) => dispatch => {
	
		dispatch({
			type: FADE_OUT,
			payload: id
		})
	
		setTimeout(() =>
		dispatch({
			type: REMOVE_ALERT,
			payload: id
		}), 500)
		
		
}