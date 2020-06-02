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
/*eslint-disable*/
import React from "react";
import {Link} from 'react-router-dom';
import './simplefooter.css';
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6" className="simplefooter-style">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                
				  <Link
					to="/"
					
				  >
					  VirtualAdmin
				  </Link>
				</div>
              </Col>
              <Col md="6">
                <Nav className=" nav-footer  justify-content-around">
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
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
