import React, {useState, useEffect} from 'react';
import {Link, withRouter, NavLink as NavLinkRRD} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {updateAccount, getAccountUpdate} from '../../actions/authDemo';
import DashboardHeader from '../demo-dashboard/DashboardHeader';
import Spinner from '../layout/Spinner';
import '../demo-dashboard/dashboard.css';
import { Button } from "reactstrap";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../demo-dashboard//stripeimplement/CheckoutForm';

const strK = `${process.env.REACT_APP_sU}`;

const stripePromise = loadStripe(strK);


const AccountForm = ({updateAccount, getAccountUpdate, history, fromServicePlan, auth:{account, loading, user}}) =>{

	const [formData, setFormData] = useState({
		plan: fromServicePlan !== null ? fromServicePlan.service : 'Basic',
		method: 'add'
	});
	
	
	useEffect(()=>{
		getAccountUpdate();
	}, [getAccountUpdate, account])
	
	const {
		plan
	} = formData;
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	const handleUpdateAccount = () => {
		
		console.log("from handle update ")
		updateAccount(formData, history);
	}
	
		
	return(
		<div className="Dashboard-content">
			{user.loading ? <Spinner /> : 
			<DashboardHeader 
				user={user}
				title='Dashboard Account'
				/>
			}
				<div className="col-xl-8 container-fluid pb-3">
					<div className="shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-6 pr-0">
									<h3 className="mb-0">Purchase Plans</h3>
									<h6 className="heading-small text-muted">
										Plans can only be purchased when your account has reached $0.00
									</h6>
								</div>
							</div>
						</div>
						<div className="card-body">
							<h6 className="heading-small text-muted mb-4">
								Service Level
							</h6>
							<div className="pl-lg-4">
									<div className="row">
										<div className="col-md-12">
											 <div class="form-group">
												<label htmlFor="plan">Plan</label>
												<select class="form-control" id="plan"
													name='plan'
													value={formData.plan}
													onChange={e => onChange(e)}
													disabled={account > 0 ? true : false}
													required
													>
												   <option value="Basic" disabled={account > 0 ? true : false} >Basic $35</option>
												   <option value="Super" disabled={account > 0 ? true : false}>Super $90</option>
												   <option value="Curly" disabled={account > 0 ? true : false}>Curly $150</option>
												</select>
											  </div>
										</div>
									</div>
							</div>
							<h6 className="heading-small text-muted mb-4">Payment Details: <small><em>(Payment processed through Stripe</em>)</small> </h6>
							<div className="pl-lg-4">
								<div className="row">
										<div className="col-md-12">
											{/******* STRIPE TEST ***********/}
											{/******* STRIPE TEST ***********/}
											{/******* STRIPE TEST ***********/}
											{/******* STRIPE TEST ***********/}
											
											<Elements stripe={stripePromise} >
													<CheckoutForm 
														price={formData.plan} 
														updateAccountProp={() =>
														handleUpdateAccount()}
														name={user.name}
														email={user.email}
														canpay={account > 0 ? false : true}
														/>
											</Elements>
											
										
											
										</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		</div>
	)
}

AccountForm.propTypes = {
	updateAccount: PropTypes.func.isRequired,
	getAccountUpdate: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, {updateAccount, getAccountUpdate})(withRouter(AccountForm));