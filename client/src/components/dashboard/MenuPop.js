import React, {useState, useEffect} from 'react'
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
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

export const MenuPop = ({isCollapse, setMenuCollapse, logout}) =>{
	const [isOpen, setIsOpen] = useState(isCollapse);
	const toggler = () => {
		setIsOpen(!isOpen)
		setMenuCollapse();
	};
	
	const logoutToggler = () => {
		setIsOpen(!isOpen)
		setMenuCollapse();
		logout();
	};
	
	useEffect(()=>{
		setIsOpen(isCollapse);
	},[isCollapse])
	
	return(
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
					<NavbarBrand to="/dashboard/overview" tag={Link} onClick={toggler}>
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
							to="/dashboard/overview" 
							tag={Link}
							onClick={toggler}
						>
							Dashboard
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							to="/dashboard/task"
							tag={Link}
							onClick={toggler}
						>
							Task
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							to="/dashboard/profile"
							tag={Link}
							onClick={toggler}
						>
							Profile
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							to="/dashboard/account"
							tag={Link}
							onClick={toggler}
						>
							Account
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							to="/home" 
							tag={Link}
							onClick={logoutToggler}
						>
							Logout
						</NavLink>
					</NavItem>
				</Nav>
			  </div>
		</div>
		</CSSTransition>
	)
}

MenuPop.propTypes = {
	logout: PropTypes.func.isRequired
}

export default connect(null, {logout})(MenuPop);