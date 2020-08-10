import React from "react";
import {Link} from 'react-router-dom';
import './footer.css';

// reactstrap
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const Footer = () => {
    return (
      <>
        <footer className=" footer">
          <Container>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6" className="footer-style">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                
				  <Link
					to="/demo/curlyadmin"
					
				  >
					  CurlyAdmin
				  </Link>
				</div>
              </Col>
              <Col md="6">
                <Nav className=" nav-footer  justify-content-around">
                  <NavItem>
                    <NavLink
                      to="/demo/curlyadmin"
                      tag={Link}
                    >
                      Home
                    </NavLink>
                  </NavItem>
					
                  <NavItem>
                    <NavLink
                      to="/demo/curlyadmin/services"
                      tag={Link}
                    >
                      Services
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/demo/curlyadmin/about"
                      tag={Link}
                    >
                      About
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/demo/curlyadmin/contact"
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
export default Footer;
