import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setAlert} from '../../actions/alert';
import Alert from '../layout/Alert';
import './dashboardProfile.css';
import DashboardBio from './DashboardBio';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Navbar,
  Media
} from "reactstrap";

const DashboardProfile = ({props, user, profile:{profile}}) => {
	
	return (
		<Fragment>
		<div className="Dashboard-content">
				<div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
					<div className="Dashboard-header-container">
						<div className="Dashboard-page-title">
							Dashboard Profile
						</div>
						<div className="ml-3">
							<Alert  />
						</div>
						<div className="Dashboard-user">
							<span className="avaar avatar-sm rounded-circle">
								<i className="fa fa-user" />
							</span>
							<span className="ml-1 mb-0 text-sm font-weight-bold">{user.name}</span>
						</div>
					</div>
					
					
				
					
					<div style={{height: "4rem"}}>
					</div>
					

					{!profile ? (
					<Fragment> 
						<div className="container-fluid">
							<div className="d-flex align-items-center">
								<div className="row">
									<div className="col">
										<div className="mb-2">
											<h1 className="display-2 text-white">Hello!</h1>
											<p className="text-white mt-0 mb-5">Please create a profile by adding some info. </p>
											<Link to='/dashboard/create-profile' className="btn btn-info">Create Profile</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Fragment> 
						) : (
					<Fragment>
						<div className="container-fluid">
							<div className="d-flex align-items-center">
								<div className="row">
									<div className="col">
										<div className="mb-2">
											<h1 className="display-2 text-white">Hello {user.name}</h1>
											<p className="text-white mt-0 mb-5">Welcome to your profile page. </p>
											<Link to='/dashboard/edit-profile' className="btn btn-info">Edit Profile</Link>
										</div>
									</div>
									
								</div>
							</div>
						</div>
						
						
					</Fragment>
						
					)}
				
			</div>
			{profile && 
			<DashboardBio 
					name={user.name}
					location={profile.location}
					company={profile.company}
					website={profile.website}
					bio={profile.bio}
				/>
			}
		</div>
			
		</Fragment>	
	)	
}

DashboardProfile.propTypes = {
	setAlert: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
})

export default connect(mapStateToProps, {setAlert})(DashboardProfile);