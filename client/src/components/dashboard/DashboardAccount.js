import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
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



const DashboardAccount = (props) =>{
	
	
	return (
		<div className="Dashboard-content">
			<h1>Account</h1>
		</div>
	)
}

DashboardAccount.propTypes = {
	
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(DashboardAccount);


