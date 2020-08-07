import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import DemoRoutes from './components/demo-layout/DemoRoutes';

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
	  	<DemoRoutes />
	</Provider>
  );
}

export default App;
