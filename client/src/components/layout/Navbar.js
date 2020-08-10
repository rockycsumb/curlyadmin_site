import React, {useEffect, useState, Fragment} from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
// import '../../assets/css/Navbar.css';
import Headroom from "headroom.js";
import {CSSTransition} from 'react-transition-group';

import {
  Button,
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const NavBar = ({auth: {isAuthenticated, loading}, logout}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggler = () => {
		setIsOpen(!isOpen)
	};
	
	useEffect(()=>{
			var myElement = document.getElementById("navbar-main");
			var headroom = new Headroom(myElement);
			headroom.init();
	},[]);
	
	const authLinks = (
		<Fragment>
			<NavItem>
				<NavLink 
					to="/login" 
					tag={Link}
					onClick={toggler}
				>
					Login
				</NavLink>
			</NavItem>
		</Fragment>
	)
	
	return(
		<div>
			<CSSTransition
			  in={isOpen}
			  timeout={300}
			  classNames="dd"
			  unmountOnExit
			>
			<div className="dropdown">
				<div 
					id="myDropdown" 
					className="dropdown-content"
				>
					<div className="dropdown-navbar-header ">
						<NavbarBrand to="/" tag={Link} onClick={toggler}>
							<span>
								{/*<i 
								className="fas fa-glasses" 
								style={{fontSize: "50px", marginRight: "5px"}} />*/}
							</span>
							<span className="curlyName">Curly</span>
							<span className="adminName">ADMIN</span>
						</NavbarBrand>
						<div>
							<Button onClick={toggler} className="dropdown-toggler bg-transparent" >
								<i className="fas fa-times" />
							</Button>
						</div>
					</div>
						<hr className="mx-3" />
					<Nav vertical>
						<NavItem>
							<NavLink 
								to="/" 
								tag={Link}
								onClick={toggler}
							>
								Home
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								to="/services" 
								tag={Link}
								onClick={toggler}
							>
								Services
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								to="/about" 
								tag={Link}
								onClick={toggler}
							>
								About
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								to="/contact" 
								tag={Link}
								onClick={toggler}
							>
								Contact
							</NavLink>
						</NavItem>
						
						
						<NavItem>
							<NavLink 
								to="/login" 
								tag={Link}
								onClick={toggler}
							>
								Login
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								to="/register" 
								tag={Link}
								onClick={toggler}
							>
								Sign Up
							</NavLink>
						</NavItem>
						
						
					</Nav>
				  </div>
			</div>
			</CSSTransition>
			
			<Navbar 
				className="headroom fixed-top navbar-main navbar-dark bg-color"
				expand="lg"
				id="navbar-main"
				>
				<Container>
				<NavbarBrand to="/" tag={Link}>
					<div className="navbarBrand">
						<div>
							{/*<i 
								className="fas fa-glasses" 
								style={{fontSize: "50px", marginRight: "5px"}}></i>*/}
						</div>
						<div>
								<span className="curlyName">Curly</span>
								<span className="adminName">ADMIN</span>
						</div>
					</div>
				</NavbarBrand>

				<Button onClick={toggler} className="toggler bg-transparent" >
					<i className="fas fa-bars icon-toggler" />
				</Button>
					
					<Nav className="ml-auto nav-links" navbar>
						<NavItem>
							<NavLinkRRD
								className="navbar-navlink"
								to="/home" 
								activeClassName={"active-navbar"}
								tag={Link}
							>
								Home
								
							</NavLinkRRD>
						</NavItem>
						<NavItem>
							<NavLinkRRD
								className="navbar-navlink"
								to="/services" 
								activeClassName={"active-navbar"}
								tag={Link}
							>
								Services
							</NavLinkRRD>
						</NavItem>
						<NavItem>
							<NavLinkRRD 
								className="navbar-navlink"
								activeClassName={"active-navbar"}
								to="/about" 
								tag={Link}
							>
								About
							</NavLinkRRD>
						</NavItem>
						<NavItem className="mr-4">
							<NavLinkRRD 
								className="navbar-navlink"
								activeClassName={"active-navbar"}
								to="/contact" 
								tag={Link}
							>
								Contact
							</NavLinkRRD>
						</NavItem>
						
						
						{/*
						<NavItem>
							<NavLinkRRD 
								className="navbar-navlink pr-1"
								activeClassName={"active-navbar"}
								to="/demo/Login" 
								tag={Link}
							>
								Login
							</NavLinkRRD>
						</NavItem>
						<span className="text-white">|</span>
						<NavItem>
							<NavLinkRRD 
								className="navbar-navlink pl-1"
								activeClassName={"active-navbar"}
								to="/demo/register" 
								tag={Link}
							>
								Sign Up
							</NavLinkRRD>
						</NavItem>
						*/}
						
					</Nav>
				</Container>
			</Navbar>
		</div>
	)
}

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
	auth: state.auth
})

export default connect(mapStateToProps, {logout})(NavBar);
