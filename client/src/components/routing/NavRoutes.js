import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from '../layout/Navbar';
import Landing from '../layout/Landing';
import About from '../layout/About';
import Services from '../layout/Services';
import Contact from '../layout/Contact';
import Confirmation from '../layout/Confirmation';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Footer from "../Footers/Footer.js";

const NavRoutes = ({auth: {isAuthenticated}}) => {
	return (
		<Router>
			<Fragment>				
			{/*	{isAuthenticated ? <Redirect id="navbar-main" to="/dashboard/overview" /> : <NavBar />}*/}
						<NavBar />
						<Route exact path="/" component={Landing} />
						<Route render={() => <Redirect to={{pathname: "/"}} />} />
				<section>
					<Switch>
						<Route exact path="/home" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/about" component={About} />
						<Route exact path="/services" component={Services} />
						<Route exact path="/contact" render={(props)=><Contact {...props} />} />
						<Route exact path="/confirmation" component={Confirmation} />
						<PrivateRoute exact path="/dashboard/overview" component={Dashboard} />
						<Route exact path="/dashboard/login" component={()=><Redirect to="/" />} />
					</Switch>
				</section>
				{isAuthenticated ? <Fragment /> : <Footer />}
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