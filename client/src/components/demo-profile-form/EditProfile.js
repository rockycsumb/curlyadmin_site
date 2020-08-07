import React, {useState, Fragment, useEffect} from 'react';
import {Link, Redirect, withRouter, NavLink as NavLinkRRD} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createProfile, getCurrentProfile} from '../../actions/profileDemo';
import {deleteAccount} from '../../actions/profileDemo';
import Spinner from '../layout/Spinner';
import DashboardHeader from '../demo-dashboard/DashboardHeader';
import '../demo-dashboard/dashboard.css';


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

const EditProfile = ({
	profile: {profile, loading},
	createProfile, 
	history, 
	getCurrentProfile,
	deleteAccount
}) =>{
	
	const [formData, setFormData] = useState({
		user: '',
		company: '',
		location: '',
		bio: '',
		website: ''
	});
	
	useEffect(()=>{
		getCurrentProfile();
		
		setFormData({
			user: profile.user,
			company: loading || !profile.company ? '' : profile.company,
			location: loading || !profile.location ? '' : profile.location,
			bio: loading || !profile.bio ? '' : profile.bio,
			website: loading || !profile.website ? '' : profile.website
		})
	}, [loading]);
	
	const {
		
		company,
		location,
		bio,
		website
	} = formData;
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		// console.log(formData);
		createProfile(formData, history, true);
		
	}
	
	return(
		<div className="">
			{profile.loading ? <Spinner /> :
			<DashboardHeader 
				user={profile.user}
				title='Dashboard Edit Profile'
				/>
				}
				<div className="col-xl-8 container-fluid">
					<div className="shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-5">
									<h3 className="mb-0">My account</h3>
								</div>
								<div className="col-7 pr-0">
									<div className="justify-content-end EditProfile-update-delete" >
										<div className="">
											<Button 
												className="EditProfile-update-delete-buttons" 
												color="primary"
												size="sm"
												type="submit" 
												onClick={e => onSubmit(e)}>
												Update
											</Button>
										</div>
										<div className="">
											<Button 
												className="btn btn-danger EditProfile-update-delete-buttons" 
												size="sm"
												onClick={()=> deleteAccount()}
												to='/demo/curlyadmin/home'
												tag={Link}
												>
												 Delete
											</Button>
										</div>
										<NavLinkRRD
											className="bg-transparent EditProfile-close-x"
											size="sm"
											to="/demo/dashboard/profile"
											tag={Link}
											 >
											<i class="fa fa-times" aria-hidden="true"></i>
										</NavLinkRRD>
									</div>
								</div>
							</div>
						</div>
						<div className="card-body">
							<form className="" onSubmit={e => onSubmit(e)}>
								<h6 className="heading-small text-muted mb-4">User information</h6>
								<div className="pl-lg-4">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-company">
														Company
													</label>
													<input
														className="form-control-alternative form-control" 
														id="input-company"
														type="text"
														placeholder="Company"
														name="company"
														value={company}
														onChange={e => onChange(e)}
													/>
												</div>
											</div>
										</div>
								</div>
								<div className="pl-lg-4">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-website">
														Website
													</label>
													<input
														className="form-control-alternative form-control" 
														id="input-website"
														type="text" 
														placeholder="Website" 
														name="website"
														value={website}
														onChange={e => onChange(e)}
													/>
												</div>
											</div>
										</div>
								</div>
								
								<hr className="my-4" />
									<h6 className="heading-small text-muted mb-4">
										Some location info
									</h6>
									<div className="pl-lg-4">
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label className="form-control-label" htmlFor="input-location">
															City, State and Country
														</label>
														<input
															className="form-control-alternative form-control" 
															id="input-location"
															type="text"
															placeholder="Location"
															name="location"
															value={location}
															onChange={e => onChange(e)}
														/>
													</div>
												</div>
											</div>
									</div>
									
									<hr className="my-4" />
										<h6 className="heading-small text-muted mb-4">
											About me
										</h6>
										<div className="pl-lg-4">
											<div className="form-group">
												<label>
													About Me
												</label>
												<textarea
													className="form-control-alternative form-control"
													rows="4" 
													placeholder="A few words about you ..."
													name="bio"
													value={bio}
													onChange={e => onChange(e)}
												/>
											
											</div>
										</div>
										</form>
									</div>
								</div>
						</div>
			</div>
		
	)
}

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
})


export default connect(mapStateToProps, {deleteAccount, createProfile, getCurrentProfile})(withRouter(EditProfile));