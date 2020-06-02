import React, {useEffect, useState, Fragment} from "react";
import { NavLink as NavLinkRRD, Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import './sidebar.css';
import './icons8-menu.svg';

import {
  UncontrolledCollapse,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const Sidebar = ({auth: isAuthenticated, logout, props, userInfo}) =>{
	const [collapseClasses, setCollapseClasses] = useState("");
	const [collapse, setCollapse] = useState(false);
	const toggle = () => setCollapse(!collapse);
	
	return(
		<Fragment>
			<div className="Sidebar-Container">
				  <button className="hamburger" id="navbar_global" onClick={toggle}>
					  <i className="fas fa-bars"></i>
					 <span />
				  </button>
				<Collapse
					isOpen={collapse}
					navbar
				  >
					<div className="navbar-collapse-header">
					  <Row>
						<Col className="collapse-brand" xs="6">
						  <Link to="/">
							  <i className="fa fa-female"> </i> VirtualAdmin.io
						  </Link>
						</Col>
						<Col className="collapse-close" xs="6">
						  <button className="navbar-toggler" id="navbar_global"  onClick={toggle}>
							<span />
							<span />
						  </button>
						</Col>
					  </Row>
					</div>
					<Nav className="align-items-lg-center ml-lg-auto" navbar >
					  <NavItem  className="Sidebar-nav-item">
						<NavLink
						  className="nav-link-icon"
						  to="/dashboard/overview"
						  tag={Link}
						  onClick={toggle}
						>

						 <span className="nav-link-inner--text">Dashboard</span>
						</NavLink>
					  </NavItem>
					  <NavItem  className="Sidebar-nav-item">
						<NavLink
						  className="nav-link-icon"
						  to="/dashboard/task"
						  tag={Link}
						  onClick={toggle}
						>

						 <span className="nav-link-inner--text">Task</span>
						</NavLink>
					  </NavItem>
					  <NavItem  className="Sidebar-nav-item">
						<NavLink
						  className="nav-link-icon"
						  to="/dashboard/profile"
						  tag={Link}
						  onClick={toggle}
						>

						 <span className="nav-link-inner--text">Profile</span>
						</NavLink>
					  </NavItem>
					  <NavItem  className="Sidebar-nav-item">
						<NavLink
						  className="nav-link-icon"
						  to="/home"
						  tag={Link}
						  onClick={logout}
						>

						 <span className="nav-link-inner--text">Logout</span>
						</NavLink>
					  </NavItem>
					</Nav>
				</Collapse>
				
				{/* **********FOR SIDE NAV NOT COLLAPSES******* */}
				
				  <div className="Sidebar-item-logo">	  
					  <div>
						  <i className="fa fa-female" /> <span className="Sidebar-item-title">VirtualAdmin.io</span>
					  </div>
				  </div>
				
				 <div className="Sidebar-item-user">
					<span className="avaar avatar-sm rounded-circle">
						<i className="fa fa-user" />{userInfo && userInfo.name}
					</span>
				  </div>
				
				<Nav vertical  className="Sidebar-sidenav">
					<NavItem  className="Sidebar-nav-item" >
						<NavLinkRRD
						  className="nav-link-icon"
						  to="/dashboard/overview"
						  activeClassName={"active"}
						  tag={Link}
						>
							<i className="fa fa-desktop" style={{color: "#7A8AE9"}} />  <span className="nav-link-inner--text ml-3">Dashboard</span>
						</NavLinkRRD>
					</NavItem>
					<NavItem  className="Sidebar-nav-item">
						<NavLinkRRD
						  className="nav-link-icon  "
						  to="/dashboard/task"
						  activeClassName={"active"}
						  tag={Link}
						>
						<i className="fa fa-pencil-square-o" style={{color: "#FB6340"}}/> 	<span className="nav-link-inner--text ml-3">Task</span>
						</NavLinkRRD>
					</NavItem>
					
					
					<hr className="m-3" />
					
					
					<NavItem  className="Sidebar-nav-item">
						<NavLinkRRD
						  className="nav-link-icon  "
						  to="/dashboard/profile"
						  tag={Link}
						>
						<i className="fa fa-user-circle" style={{color: "#FFD80C"}} /> 	<span className="nav-link-inner--text ml-3">Profile</span>
						</NavLinkRRD>
					</NavItem>
					<NavItem  className="Sidebar-nav-item">
						<NavLinkRRD
						  className="nav-link-icon "
						  to="/home"
						  onClick={logout}
						  tag={Link}
						>
						<i className="fa fa-sign-out " style={{color: "#11CDEF"}}/> 	<span className="nav-link-inner--text ml-3">Logout</span>
						</NavLinkRRD>
					</NavItem>
				</Nav>
			</div>
		</Fragment>
	)
}

Sidebar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
	auth: state.auth
})

export default connect(mapStateToProps, {logout})(Sidebar);