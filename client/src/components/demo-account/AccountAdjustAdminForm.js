import React, {useState, Fragment, useEffect} from 'react';
import {Link, withRouter, NavLink as NavLinkRRD} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {updateAccount, getAllUsers} from '../../actions/authDemo';
import DashboardHeader from '../demo-dashboard/DashboardHeader';
import Spinner from '../layout/Spinner';
import '../demo-dashboard/dashboard.css';
import { Button } from "reactstrap";

const AccountAdjustAdminForm = ({updateAccount, getAllUsers, history, auth:{account, loading, user, users}}) =>{

	const {name, id, balance} = history.location.state;
	
	const [formData, setFormData]= useState({
		plan: null,
		id: id,
		amount: '',
		method: 'Gift'
	});
	
	useEffect(()=>{
		getAllUsers();
		
	},[getAllUsers])
	
	const {
		amount,
		method
	} = formData;
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		updateAccount(formData, history);
		getAllUsers();
		history.push('/demo/dashboard/account')
	}
	
	return(
		<div className="Dashboard-content">
			{user.loading ? <Spinner /> : 
			<DashboardHeader 
				user={user}
				title='Dashboard Adjust Account'
				/>
			}
		
		<Fragment>
				<div className="col-xl-8 container-fluid mb-3">
					<div className="shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-6 pr-0">
									<h3 className="mb-0">Adjust Account for User: {name} </h3>
									<h5>Balance: $ {users.map(user => user._id === id ? user.account : "")}.00</h5>
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
													<label htmlFor="plan">Amount to Adjust</label>
													<input
														className="form-control-alternative form-control" 
														id="input-amount"
														type="number"
														name='amount'
														value={amount}
														onChange={e => onChange(e)}
													/>
												  </div>
												  <div class="form-group">
													<label htmlFor="plan">Type of Adjustment</label>
													<select class="form-control" id="method"
														name='method'
														value={method}
														onChange={e => onChange(e)}
														id="method"
														>
													  <option>Gift</option>
													  <option>Deduct</option>
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
		</div>
	)
}

AccountAdjustAdminForm.propTypes = {
	updateAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	getAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, {updateAccount, getAllUsers})(withRouter(AccountAdjustAdminForm));