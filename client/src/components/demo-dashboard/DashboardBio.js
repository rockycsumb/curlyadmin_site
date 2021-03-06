import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';

const DashboardBio = (props) => {
	return(
		<Fragment>
		<div className="mt--7 container-fluid">
			<div className="row">
				<div class="order-xl-2 mb-5 mb-xl-0 col-xl-12">
					<div class="card-profile shadow card">
						<div class="justify-content-center row">
							<div class="order-lg-2 col-lg-3">
								<div class="card-profile-image">
									{/*<i className="fa fa-user rounded-circle" /> */}
								</div>
							</div>
						</div>
							<div class="pt-0 pt-md-4 card-body">
								<div class="text-center">
									<h3>
										Name: {props.name}
									</h3>
									<div class="h5 font-weight-300">
										Location: <i class="ni location_pin mr-2"></i> {!props.location ? <i>Fill in a location</i> : props.location}
									</div>
									<div class="h5 mt-4">
													Company: <i class="ni business_briefcase-24 mr-2"></i>{!props.company ? <i>Fill in Company Name</i> : props.company}
									</div>
									<div>
										Website: <i class="ni education_hat mr-2"></i>{!props.website ? <i>Fill in a web address</i> : props.website}
									</div>
									<hr class="my-4" />
									A Little about me:
									<p>{!props.bio ? <i>Say something about yourself</i> : props.bio}</p>
									
								</div>
							</div>
					</div>
				</div>
			</div>	
		</div>
		</Fragment>
	)
}

DashboardBio.propTypes = {
	
}

export default DashboardBio;