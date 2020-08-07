import React, {useState} from 'react';
import {Link, withRouter, NavLink as NavLinkRRD} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createProfile} from '../../actions/profileDemo';
import '../demo-dashboard/dashboard.css';

// reactstrap components
import { Button } from "reactstrap";

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
						<span className="ml-1 mb-0 text-sm font-weight-bold">{profile && profile.user.name}</span>
					</div>
				</div>
				
				<div className="col-xl-8 container-fluid mb-3">
					<div className="shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-6 pr-0">
									<h3 className="mb-0">My account</h3>
								</div>
								<div className="text-right col-6">
									<Button 
										className="btn-round  bg-color-default btn-rollover-color-default"
										type="submit" 
										size="sm"
										onClick={e => onSubmit(e)} >Create Profile</Button>
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
		</div>
	)
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired	
}

export default connect(null, {createProfile})(withRouter(CreateProfile));