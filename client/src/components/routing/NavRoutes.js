import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect,} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from '../layout/Navbar';
import Landing from '../layout/Landing';
import About from '../layout/About';
import Services from '../layout/Services';
import Contact from '../layout/Contact';
import Confirmation from '../layout/Confirmation';
import PageNotFound from '../layout/PageNotFound';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../demo-dashboard/Dashboard';
import DemoRoutes from '../demo-layout/DemoRoutes';
import DemoHome from '../demo-layout/Landing';
import PrivateRoute from './PrivateRoute';
import Footer from "../Footers/Footer.js";

const NavRoutes = ({auth: {isAuthenticated}, location}) => {
	return (
		<Router>
			<Fragment>				
				{isAuthenticated ? <Redirect id="navbar-main" to="/demo/dashboard/overview" /> : <NavBar />}
				
				<Route exact path="/" component={Landing} />
				
				{/*<Route render={() => <Redirect to={{pathname: "/"}} />} /> */}
				<section>
					<Switch>
						<Route exact path="/home" component={Landing} />
						<Route exact path="/about" component={About} />
						<Route exact path="/services" component={Services} />
						<Route exact path="/contact" render={(props)=><Contact {...props} />} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/forgotpass" component={ForgotPassword} />
						<Route exact path="/resetpass/:id" component={ResetPassword} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/confirmation" component={Confirmation} />
						<PrivateRoute exact path="/demo/dashboard/overview" component={Dashboard} />
						
						{/* DEMO LINK */}
						<Route exact path="/demo/curlyadmin/" component={DemoRoutes} />
						<Route exact path="/demo/curlyadmin/login" component={DemoRoutes} />
						<Route exact path="/demo/curlyadmin/resetpass/:id" component={DemoRoutes} />
					</Switch>
				</section>
				
				{/*
				{isAuthenticated ? <Fragment /> : <Footer />}
				*/}
			</Fragment>	
		</Router>
	)
}

NavRoutes.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(NavRoutes);