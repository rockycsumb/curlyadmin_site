import {SET_ALERT, REMOVE_ALERT, FADE_OUT} from '../actions/types';
const initialState = [];

export default function(state = initialState, action){
	const {type, payload} = action;
	switch(type){
		case SET_ALERT:
			return [...state, payload];
		case FADE_OUT:
			state.map(alert => {
					  if(alert.id === payload) {
							alert.fade = true
						}  
				}
			)
			return [...state];
			
		case REMOVE_ALERT:
			
			return state.filter(alert => alert.id !== payload);
		default:
			return state;
	}
	
}


