import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Sidebar from './Sidebarcopy';
import './dashboard.css';
import './dashboardcopy.css';
import DashboardOverview from './DashboardOverview';
import DashboardTask from './DashboardTask';
import DashboardAccount from './DashboardAccount';
import DashboardProfile from './DashboardProfile';
import AccountAdjustAdminForm from '../account/AccountAdjustAdminForm';
import CreateProfile from '../profile-form/CreateProfile';
import Task from '../task/Task';
import TaskForm from '../task-form/TaskForm';
import EditTask from '../task-form/EditTask';
import EditProfile from '../profile-form/EditProfile';
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
							<div className="Dashboardcopy-container">
								<div className="Dashboardcopy-navbar">
									<Sidebar />
								</div>
								<div className="Dashboardcopy-content">
									
									{fromService !== null && <Redirect to="/dashboard/account" />}
									<Switch>
										<PrivateRoute 
											exact 
											path="/dashboard/overview" 
											component={DashboardOverview}
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/task" 
											component={DashboardTask} 
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/add-task" 
											component={TaskForm} 
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/edit-task" 
											component={EditTask} 
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/task/:id" 
											component={Task} 
											/>
										<Route 
											exact 
											path="/dashboard/profile" 
											render={props => <DashboardProfile {...props} user={user} /> } 
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/create-profile" 
											component={CreateProfile} 
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/edit-profile" 
											component={EditProfile} 
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/account" 
											component={DashboardAccount} 
											/>
										<PrivateRoute 
											exact 
											path="/dashboard/adjustaccount" 
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