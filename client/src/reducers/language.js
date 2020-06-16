import {SET_LANGUAGE} from '../actions/types';
const initialState = {
	language: "english"
};

export default function (state = initialState, action){
	const {type, payload} = action;
	switch(type){
		case SET_LANGUAGE:
			return {
				...state,
				language: payload
			};
		default:
			return state;
	}
}