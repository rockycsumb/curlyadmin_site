/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState, Fragment} from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import "../../assets/vendor/font-awesome/css/font-awesome.min.css";
import './Navbar.css';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
 Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const NavBar = ({auth: {isAuthenticated, loading}, logout}) => {
	const [collapseClasses, setCollapseClasses] = useState("");
	const [collapse, setCollapse] = useState(false);
	
	useEffect(()=>{
			let headroom = new Headroom(document.getElementById("navbar-main"));
			// initialise
			headroom.init();

	},[]);

	  const onExiting = () => {
		setCollapseClasses("collapsing-out");

	  };

	  const onExited = () => {
		  setCollapseClasses("");

	  };


	  const toggle = () => setCollapse(!collapse);
	
	const handleLogout = () => {
		logout();
		// toggle();
	}

	const authLinks = (
		<Fragment>
				<NavItem>
                    <NavLink
                      className="nav-link-icon ml-3"
                      to="/dashboard"
                      id="tooltip112445449"
					  onClick={toggle}
                      tag={Link}
					>
                     <span className="nav-link-inner--text">Dashboard</span>
                    </NavLink>
                  </NavItem>
				  <NavItem>
                    <NavLink
                      className="nav-link-icon ml-3"
                      to="/login"
                      id="tooltip112445449"
                      tag={Link}
					  onClick={handleLogout}
					>
                     <span className="nav-link-inner--text">Logout</span>
                    </NavLink>
                  </NavItem>
			</Fragment>
	);
	
	const guestLinks = (
			<NavItem>
				<NavLink
					 className="nav-link-icon"
					 to="/login"
					 id="tooltip112445449"
					 tag={Link}
					onClick={toggle}
				>
					<span className="nav-link-inner--text">Sign In / Sign Up</span>
				</NavLink>
            </NavItem>
	);
	
    return (
		<Fragment>
			<header className="header-global">
			  <Navbar
				className="navbar-main navbar-transparent navbar-light headroom"
				expand="lg"
				
				id="navbar-main"
			  >
				<Container>
				  <NavbarBrand className="mr-lg-2" to="/" tag={Link}>
					  {/*<img
					  alt="..."
					  src={require("../../assets/img/brand/argon-react-white.png")}
					/>*/}
					  <div className="navbarBrand">
						  <div>
							  {/*<img
								  alt="..."
								  src={require("../../assets/img/theme/logowhite.gif")}
								  className="steflogo"
								/>*/}
							  {/*<i className="fa fa-female" style={{fontSize: "50px", marginRight: "5px"}}> </i>*/}
							  <i className="fas fa-glasses" style={{fontSize: "50px", marginRight: "5px"}}></i>
						  </div>
						  <div><span className="curlyName">Curly</span><span className="adminName">ADMIN</span></div>
					  </div>
				  </NavbarBrand>


				  <button className="navbar-toggler" id="navbar_global" onClick={toggle}>
					<span className="navbar-toggler-icon" />
				  </button>
				  <Collapse
					isOpen={collapse}
					navbar
				  >
					<div className="navbar-collapse-header">
					  <Row>
						<Col className="collapse-brand" xs="6">
						  <Link to="/">
							  {/*<img
								  alt="..."
								  src={require("../../assets/img/theme/logo.gif")}
								  className="steflogo"
								/>
							  */}
							  <i className="fas fa-glasses" style={{fontSize: "50px", marginRight: "5px"}}></i>
							  <span className="curlyName">Curly</span><span className="adminName">ADMIN</span>
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
					  <NavItem>
						<NavLink
						  className="nav-link-icon"
						  to="/"
						  tag={Link}
							onClick={toggle}
						>

						 <span className="nav-link-inner--text">Home</span>
						</NavLink>
					  </NavItem>

					  <NavItem>
						<NavLink
						  className="nav-link-icon"
						  to="/services"
						  id="tooltip112445449"
						  onClick={toggle}
						  tag={Link}
						>
						 <span className="nav-link-inner--text">Services</span>
						</NavLink>
					  </NavItem>
					  <NavItem>
						<NavLink
						  className="nav-link-icon"
						  to="/about"
						  id="tooltip112445449"
						  tag={Link}
						  onClick={toggle}
						>
						 <span className="nav-link-inner--text">About</span>
						</NavLink>
					  </NavItem>
					  <NavItem>
						<NavLink
						  className="nav-link-icon  mr-3"
						  to="/contact"
						  id="tooltip112445449"
						  tag={Link}
						  onClick={toggle}
						>
						 <span className="nav-link-inner--text">Contact</span>
						</NavLink>
					  </NavItem>

						{!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks }</Fragment>) }

					  </Nav>
				  </Collapse>
				</Container>
			  </Navbar>
			</header>
		  </Fragment>
    );
  }


Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
	
}

const mapStateToProps = state =>({
	auth: state.auth
})

export default connect(mapStateToProps, {logout})(NavBar);
