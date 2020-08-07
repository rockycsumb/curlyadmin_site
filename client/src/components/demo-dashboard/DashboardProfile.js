import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setAlert} from '../../actions/alert';
import './dashboardProfile.css';
import Spinner from '../layout/Spinner';
import DashboardBio from './DashboardBio';
import DashboardHeader from './DashboardHeader';

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
		<div className="">
			
			{user.loading ? <Spinner /> : 
			<DashboardHeader 
				user={user} 
				title='Dashboard Profile'
				/>
			}
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
											<Link to='/demo/dashboard/create-profile' className="btn btn-info">Create Profile</Link>
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
											<Link to='/demo/dashboard/edit-profile' className="btn btn-info">Edit Profile</Link>
										</div>
									</div>
									
								</div>
							</div>
						</div>
						{user.loading && profile === null ? "" : 
							<DashboardBio 
									name={user.name}
									location={profile.location}
									company={profile.company}
									website={profile.website}
									bio={profile.bio}
								/>
							}
					</Fragment>
					)}
			
			
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