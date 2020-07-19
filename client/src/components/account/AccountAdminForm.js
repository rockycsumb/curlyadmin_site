import React, {useState, Fragment} from 'react';
import {Link, withRouter, NavLink as NavLinkRRD} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {updateAccount} from '../../actions/auth';
import '../dashboard/dashboard.css';
import { Button } from "reactstrap";

const AccountAdminForm = ({updateAccount, history, fromServicePlan, auth:{account, loading}}) =>{

	const [formData, setFormData] = useState({
		plan: fromServicePlan,
		method: 'add'
	});
	
	const {
		plan,
		method
	} = formData;
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		updateAccount(formData, history);
	}
	
	return(
		<Fragment>
				<div className="col-xl-8 container-fluid mb-3">
					<div className="shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-6 pr-0">
									<h3 className="mb-0">Purchase Plans</h3>
								</div>
							</div>
						</div>
						<div className="card-body">
							<form className="" onSubmit={e => onSubmit(e)}>
								<h6 className="heading-small text-muted mb-4">Service Level</h6>
								<div className="pl-lg-4">
										<div className="row">
											<div className="col-md-12">
												 <div class="form-group">
													<label htmlFor="plan">Plan</label>
													<select class="form-control" id="plan"
														name='plan'
														value={formData.plan}
														onChange={e => onChange(e)}
														id="plan"
														required
														>
													   <option value="basic" >Basic $35</option>
													   <option value="super" >Super $90</option>
													   <option value="curly" >Curly $150</option>
													</select>
												  </div>
											</div>
										</div>
										<button type="submit" class="btn btn-primary">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			
		</Fragment>
	)
}

AccountAdminForm.propTypes = {
	updateAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, {updateAccount})(withRouter(AccountAdminForm));