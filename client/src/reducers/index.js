import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import task from './task';
import language from './language';

export default combineReducers({
	alert,
	auth,
	profile,
	task,
	language
	
});