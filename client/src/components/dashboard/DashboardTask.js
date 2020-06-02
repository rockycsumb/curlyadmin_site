import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTasks} from '../../actions/task';
import Spinner from '../layout/Spinner';


import Tasks from '../tasks/Tasks';


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

const DashboardTasks = ({getTasks, auth:{user}, task: {tasks, loading}}) =>{
	useEffect(()=>{
		getTasks();
	}, [getTasks]);
	
	return loading ? <Spinner /> : (
		<div className="Dashboard-content">
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
				<div className="Dashboard-header-container">
					<div className="Dashboard-page-title">
						Tasks
					</div>

					<div className="Dashboard-user">
						<span className="avaar avatar-sm rounded-circle">
							<i className="fa fa-user" />
						</span>
						<span className="ml-1 mb-0 text-sm font-weight-bold">{user.name}</span>
					</div>
				</div>
				<div className="container-fluid">
					<div className="header-body">
						<div className="row">
							{/*********   START TASK CARDS *********/}
							
							{tasks.map(task =>(
								<Tasks key={task._id} taskData={task} />
							))}
							
							
						</div>
					</div>
				</div>
			</div>
			
			
			{/*********   PAST TASKS OVER VIEW ************/}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">In Progress Tasks</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Past Tasks</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
		</div>
	)
}

DashboardTasks.propTypes = {
	getTasks: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	task: state.task,
	auth: state.auth
})

export default connect(mapStateToProps, {getTasks})(DashboardTasks);


