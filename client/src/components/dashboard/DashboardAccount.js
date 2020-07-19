import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAllUsers} from '../../actions/auth';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import AccountForm from '../account/AccountForm';
import AccountAdminForm from '../account/AccountAdminForm';
import DashboardHeader from './DashboardHeader';
import './dashboard.css';

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


const DashboardAccount = ({history, auth: {user, fromService, loading, users}, getAllUsers}) =>{
	
	useEffect(()=>{
		getAllUsers();
	},[getAllUsers])
	
	const handleEdit = (id, name, account) =>{
		history.push({
			pathname: '/dashboard/adjustaccount',
			state: {id: id, name: name, balance: account}
		})
	}
	
	return (
		<div className="Dashboard-content">
			{user.loading ? <Spinner /> : 
			<DashboardHeader 
				user={user}
				title='Dashboard Account'
				/>
			}
			{loading ? <Spinner /> :
				user.rights !== 'admin' ? (
				<AccountForm fromServicePlan='curly' /> 
				) : (
					<AccountAdminForm />
				)
			}
			
			<Container className="mt--7" fluid>
					  <Row className="mt-5">
						<Col>
						  <Card className="shadow">
							<CardHeader className="border-0">
							  <Row className="align-items-center">
								<div className="col">
								  <h3 className="mb-0">Tasks Completed</h3>
								</div>
								<div className="col text-right">
								  <Button
									color="primary"
									href="#pablo"
									to="/dashboard/task"
									tag={Link}
									size="sm"
								  >
									Task Dashboard
								  </Button>
								</div>
							  </Row>
							</CardHeader>
							<Table className="align-items-center table-flush" responsive>
							  <thead className="thead-light">
								<tr>
								  <th scope="col">User Name</th>
								  <th scope="col">Account</th>
								  <th scope="col">Add/Deduct</th>
								</tr>
							  </thead>
							  <tbody>
								 	{
											users === null ? <Spinner /> : ( 
											users.map(userInfo => {
												return (
													<tr>
														<td>
															{userInfo.name}
														</td>
														<td>
															{userInfo.account}
														</td>
														<td>
															<Button
																onClick={e => handleEdit(userInfo._id, userInfo.name, userInfo.account)}
																>Edit
															</Button>
														</td>
													</tr>
												)})
										)
									}	
							  </tbody>
							</Table>
						  </Card>
						</Col>
					</Row>
				</Container>
						
			</div>
		
	)
}

DashboardAccount.propTypes = {
	auth: PropTypes.object.isRequired,
	getAllUsers: PropTypes.func.isRequired
	
}

const mapStateToProps = state => ({
	auth: state.auth
})
export default connect(mapStateToProps, {getAllUsers})(DashboardAccount);


