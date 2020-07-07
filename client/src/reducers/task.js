import {
	GET_TASKS,
	TASK_ERROR
} from '../actions/types';

const initialState = {
	tasks: [],
	task: null,
	loading: true,
	error: {}
}

export default function(state = initialState, action){
	const {type, payload} = action;
	switch(type){
		case GET_TASKS:
			return {
				...state,
				tasks: payload,
				loading: false
			};
		case TASK_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
}