import React, {useEffect, useState, Fragment} from "react";
import { NavLink as NavLinkRRD, Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import MenuPop from './MenuPop';
import './sidebar.css';
import './icons8-menu.svg';
import Spinner from '../layout/Spinner';

import {
  NavbarBrand,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

const Sidebar = ({auth: {isAuthenticated, user}, logout, props}) =>{
	const [collapseClasses, setCollapseClasses] = useState("");
	const [collapse, setCollapse] = useState(false);
	const toggle = () => setCollapse(!collapse);
	const setMenuCollapse = () => setCollapse(false);
	
	// console.log("from sidebar user ", user);
	
	return(
		<Fragment>
			<MenuPop isCollapse={collapse} setMenuCollapse={()=>setMenuCollapse()} />
			<div className="Sidebar-Container">
				  <button className="hamburger" id="navbar_global" onClick={toggle}>
					  <i className="fas fa-bars"></i>
					 <span />
				  </button>				
				{/* **********FOR SIDE NAV NOT COLLAPSES******* */}
				  <div className="Sidebar-item-logo">	  
					  <NavbarBrand className="Sidebar-logo-not-collapsed" to="/dashboard/overview" tag={Link}>
							<span>
								{/*<i 
								className="fas fa-glasses" 
								style={{fontSize: "50px", marginRight: "5px"}} />*/}
							</span>
							<span className="curlyName">Curly</span>
							<span className="adminName">ADMIN</span>						  
						  	<div>
								{user === null ? <Spinner /> : user.rights === "admin" ? "Admin Control" : ""}
						  	</div>
						  
						</NavbarBrand>
					  	
				  </div>
				
				 <div className="Sidebar-item-user">
					<span className="">
						<i className="fa fa-user" />{user && user.name}
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
						  className="nav-link-icon  "
						  to="/dashboard/account"
						  tag={Link}
						>
						<i className="fa fa-usd mr-1" style={{color: "#228B22"}} /> 	<span className="nav-link-inner--text ml-3">Account</span>
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