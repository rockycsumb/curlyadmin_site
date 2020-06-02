import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import NavRoutes from './components/routing/NavRoutes';

//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
	    setAuthToken(localStorage.token);
}

const App = () => {
	
  useEffect(()=>{
	  store.dispatch(loadUser());
  }, []);
	
  return (
	  <Provider store={store}>
	  	<NavRoutes />
	</Provider>
  );
}

export default App;
