import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileDemo';
import Spinner from '../layout/Spinner';
import Sidebar from './Sidebar';
import './dashboard.css';
import DashboardOverview from './DashboardOverview';
import DashboardTask from './DashboardTask';
import DashboardAccount from './DashboardAccount';
import DashboardProfile from './DashboardProfile';
import AccountAdjustAdminForm from '../demo-account/AccountAdjustAdminForm';
import CreateProfile from '../demo-profile-form/CreateProfile';
import Task from '../demo-task/Task';
import TaskForm from '../demo-task-form/TaskForm';
import EditTask from '../demo-task-form/EditTask';
import EditProfile from '../demo-profile-form/EditProfile';
import PrivateRoute from '../routing/PrivateRoute';
import Footer from "../Footers/Footer.js";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const Dashboard = ({
	getCurrentProfile, 
	auth: {user, fromService}, 
	profile: {profile, loading }
}) =>{
	
	useEffect(()=>{
		getCurrentProfile();
	},[getCurrentProfile]);
		
		return (
			loading && profile === null ? <Spinner /> :  
			<Fragment>
					<Router>
						<Fragment>
							<div className="Dashboard-container">
								<div className="Dashboard-sidebar">
									<Sidebar />
								</div>
								<div className="Dashboard-main">
									{fromService !== null && <Redirect to="/demo/dashboard/account" />}
									<Switch>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/overview" 
											component={DashboardOverview}
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/task" 
											component={DashboardTask} 
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/add-task" 
											component={TaskForm} 
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/edit-task" 
											component={EditTask} 
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/task/:id" 
											component={Task} 
											/>
										<Route 
											exact 
											path="/demo/dashboard/profile" 
											render={props => <DashboardProfile {...props} user={user} /> } 
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/create-profile" 
											component={CreateProfile} 
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/edit-profile" 
											component={EditProfile} 
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/account" 
											component={DashboardAccount} 
											/>
										<PrivateRoute 
											exact 
											path="/demo/dashboard/adjustaccount" 
											component={AccountAdjustAdminForm} 
											/>
									</Switch>
								</div>
							</div>
						</Fragment>
					</Router>
			</Fragment>
		)
}	

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);