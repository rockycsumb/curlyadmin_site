import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from './Navbar';
import Landing from './Landing';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Confirmation from './Confirmation';
import PageNotFound from './PageNotFound';
import ForgotPassword from '../auth/ForgotPasswordDemo';
import ResetPassword from '../auth/ResetPasswordDemo';
import LoginDemo from '../auth/LoginDemo';
import RegisterDemo from '../auth/RegisterDemo';
import Dashboard from '../demo-dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import Footer from "../Footers/Footer.js";

const NavRoutes = ({auth: {isAuthenticated}}) => {
	return (
		<Router>
			<Fragment>				
			{isAuthenticated ? <Redirect id="navbar-main" to="/demo/dashboard/overview" /> : <NavBar />}
						
				{/*<Route render={() => <Redirect to={{pathname: "/"}} />} /> */}
				<section>
					<Switch>
						<Route exact path="/demo/curlyadmin" component={Landing} />
						<Route exact path="/demo/curlyadmin/" component={Landing} />
						<Route exact path="/demo/curlyadmin/home" component={Landing} />
						<Route exact path="/demo/curlyadmin/about" component={About} />
						<Route exact path="/demo/curlyadmin/services" component={Services} />
						<Route exact path="/demo/curlyadmin/contact" render={(props)=><Contact {...props} />} />
						<Route exact path="/demo/curlyadmin/login" component={LoginDemo} />
						<Route exact path="/demo/curlyadmin/forgotpass" component={ForgotPassword} />
						<Route exact path="/demo/curlyadmin/resetpass/:id" component={ResetPassword} />
						<Route exact path="/demo/curlyadmin/register" component={RegisterDemo} />
						<Route exact path="/demo/curlyadmin/confirmation" component={Confirmation} />
						<PrivateRoute exact path="/demo/dashboard/overview" component={Dashboard} />
						<Route exact path="/demo/dashboard/login" component={()=><Redirect to="/demo/curlyadmin/" />} />
					</Switch>
				</section>
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