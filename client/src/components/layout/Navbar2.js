
import React, {useEffect, useState, Fragment} from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import './Navbar.css';
import Headroom from "headroom.js";

import {
  Button,
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
			// initialise
			headroom.init();
			
	},[isOpen]);
	
	return(
		<div>
			<div class="dropdown">
				<div 
					id="myDropdown" 
					className={isOpen ? `${"dropdown-content"} ${"show fade-in"}`
						: "dropdown-content"
						}
				>
					<div className="dropdown-navbar-header">
						<NavbarBrand to="/" tag={Link} onClick={toggler}>
							<span>
							<i 
								className="fas fa-glasses" 
								style={{fontSize: "50px", marginRight: "5px"}} />
							</span>
							<span className="curlyName">Curly</span>
							<span className="adminName">ADMIN</span>
						</NavbarBrand>
						  
						<div>
							<Button onClick={toggler} className="dropdown-toggler bg-transparent" >
								<i class="fas fa-times" />
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
					</Nav>
				  </div>
			</div>
			
			<Navbar 
				className="headroom fixed-top navbar-main navbar-dark bg-danger"
				expand="lg"
				id="navbar-main"
				>
				<Container>
				<NavbarBrand to="/" tag={Link}>
					<div className="navbarBrand">
						<div>
							<i 
								className="fas fa-glasses" 
								style={{fontSize: "50px", marginRight: "5px"}}></i>
						</div>
						<div>
								<span className="curlyName">Curly</span>
								<span className="adminName">ADMIN</span>
						</div>
					</div>
				</NavbarBrand>

				<Button onClick={toggler} className="toggler bg-transparent" >
					<i className="fas fa-bars" />
				</Button>
					
					
				
					<Nav className="mr-auto nav-links" navbar>
						<NavItem>
							<NavLink 
								to="/" 
								tag={Link}
							>
								Home
								
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								to="/services" 
								tag={Link}
							>
								Services
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								to="/about" 
								tag={Link}
							>
								About
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink 
								to="/contact" 
								tag={Link}
							>
								Contact
							</NavLink>
						</NavItem>
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
