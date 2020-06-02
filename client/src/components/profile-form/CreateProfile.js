import React, {useState, Fragment} from 'react';
import {Link, withRouter, NavLink as NavLinkRRD} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createProfile} from '../../actions/profile';

import '../dashboard/dashboard.css';


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

const CreateProfile = ({props, profile, createProfile, history}) =>{
	
	const [formData, setFormData] = useState({
		company: '',
		location: '',
		bio: '',
		website: ''
	});
	
	const {
		company,
		location,
		bio,
		website
	} = formData;
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		console.log(formData);
		createProfile(formData, history);
	}
	
	return(
		<div className="Dashboard-content">
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
				<div className="Dashboard-header-container">
					<div className="Dashboard-page-title">
						Dashboard Profile
					</div>
					<div className="Dashboard-user">
						<span >
							<NavLinkRRD className="EditProfile-close-x" to="/dashboard/profile">
								X
							</NavLinkRRD>
						</span>
						<span className="ml-1 mb-0 text-sm font-weight-bold">{profile && profile.user.name}</span>
					</div>
				</div>
				
				<div className="order-xl-1 col-xl-8 container-fluid">
					<div className="bg-secondary shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-8">
									<h3 className="mb-0">My account</h3>
								</div>
								<div className="text-right col-4">
									<Button className="btn btn-primary btn-sm" type="submit" onClick={e => onSubmit(e)} >Create Profile</Button>
								</div>
							</div>
						</div>
						<div className="card-body">
							<form className="" onSubmit={e => onSubmit(e)}>
								<h6 className="heading-small text-muted mb-4">User information</h6>
								<div className="pl-lg-4">
									
									{/*  UPDATE USERNAME AND EMAIL ADDRESS */}
									{/*<div className="row">
										<div className="col-lg-6">
											<div className="form-group">
												<label className="form-control-label" htmlFor="input-username">
													Username
												</label>
												<input id="input-username" placeholder="Username" type="text" className="form-control-alternative form-control" value="lucky.jesse" />
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="form-control-label" htmlFor="input-email">
													Email address
												</label>
												<input id="input-email" placeholder="jesse@example.com" type="email" className="form-control-alternative form-control" />
											</div>
										</div>
									</div> */}
									{/*
									<div className="row">
										<div className="col-lg-6">
											<div className="form-group">
												<label className="form-control-label" htmlFor="input-first-name">
													First name
												</label>
												<input 
													id="input-first-name" 
													placeholder="First name" 
													type="text" 
													className="form-control-alternative form-control" 
													value="Lucky" 
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="form-control-label" htmlFor="input-last-name">
													Last name
												</label>
												<input 
													id="input-last-name" 
													placeholder="Last name" 
													type="text" 
													className="form-control-alternative form-control" 
													value="Jesse" />
											</div>
										</div>
									</div>
									*/}
								</div>
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
									{/*
									<div className="pl-lg-4">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-address">
														Address
													</label>
													<input id="input-address" placeholder="Home Address" type="text" className="form-control-alternative form-control" value="Apt 09" />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-lg-4">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-city">
														City
													</label>
													<input 
														className="form-control-alternative form-control"
														id="input-city"
														type="text" 
														placeholder="City" 
														name="city"
														value={city}
														onChange={e => onChange(e)}
													/>
												</div>
											</div>
											<div className="col-lg-4">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-state">
														State
													</label>
													<input
														className="form-control-alternative form-control" 
														id="input-state"
														type="text"
														placeholder="State" 
														name="state"
														value={state}
														onChange={e => onChange(e)}
													/>
												</div>
											</div>
											<div className="col-lg-4">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-country">
														Country
													</label>
													<input
														className="form-control-alternative form-control" 
														id="input-country"
														type="text" 
														placeholder="Country" 
														name="country"
														value={country}
														onChange={e => onChange(e)}
													/>
												</div>
											</div>
										</div>
									</div>*/}
									
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
		</div>
	)
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired	
}

export default connect(null, {createProfile})(withRouter(CreateProfile));