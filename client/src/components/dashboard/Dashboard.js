import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Sidebar from './Sidebar';
import './dashboard.css';
import DashboardOverview from './DashboardOverview';
import DashboardTask from './DashboardTask';
import DashboardProfile from './DashboardProfile';
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
	auth: {user}, 
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