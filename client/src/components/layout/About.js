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
import React from "react";
// nodejs library that concatenates classes

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

class About extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        
        <main ref="main">
			<div style={{height: "80px"}}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
        <section className="section  bg-secondary">
			<div className="container pt-5">
				<div className="row-grid align-items-center row">
					<div className="col-md-6">
						<div className="bg-default shadow border-0 card">
							{/*<img alt="..." src={require("../../assets/img/theme/aboutpic.jpg")} className="card-img-top" />*/}
								<blockquote className="card-blockquote" >
									<svg xmlns="http://www.w3.org/2000/svg" className="svg-bg" preserveAspectRatio="none" viewBox="0 0 583 95">
										<polygon className="fill-default" points="0,52 583,95 0,95"></polygon>
										<polygon className="fill-default" opacity=".2" points="0,42 583,95 683,0 0,95"></polygon>
									</svg>
									<h4 className="display-3 font-weight-bold text-white">A Virtual System</h4>
									<p className="lead text-italic text-white pb-5">
										
										<p className="pb-5">
							CurlyAdmin is a service that provides its customers administrative and IT support. We believe no task is too big or too smal to be handled with importance, attention to detail and accuracy.  Our small business was inspired by our highly desire to serve others. Our mindset is to provide individuals with quality support allowing them to be more productive and efficient. 
										</p>
										
									</p>
								</blockquote>
						</div>
					</div>
					<div className="col-md-6">
						<div className="pl-md-5">
							<div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
								<i class="fas fa-user-friends"></i>
								{/*<i className="ni ni-settings"></i>*/}
							</div>
							<h3>Who We Are</h3>
							<p>
							<span className="font-weight-bold">Stef</span> is an Executive Assistant for an environmental program in the City of Campbell and holds a Bachelors degree in business administration and information technology management. Over 10 years in administrative support experience, positive attitude, and very goal oriented. She is constantly motivated by "new" projects, and is ambitious in gaining new knowledge. She believes there are no problems only solutions and when it comes to work, she is persistent with prioritization, organization and perfection. Stef is bilingual fluent in both English and Spanish.
							</p>
							<p>
								<span className="font-weight-bold">Rocky</span> graduated recently with a Bachelors Degree in Computer Science. He currently works on web projects and prefers a MERN stack. Technical, but yet can explain information technology in a way that can be easily understood. He is always taking online tutorials to build skills and knowledge in Computer Science.
							</p>
							{/*
							<p class="lead">Don't let your uses guess by attaching tooltips and popoves to any element. Just make sure you enable them first via JavaScript.
							</p>
							<p>The kit comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go.
							</p>
							<p>The kit comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go.</p> 
							<a class="font-weight-bold text-warning mt-5" href="#pablo">A beautiful UI Kit for impactful websites</a>*/}
						</div>
					</div>
				</div>
			</div>
			</section>
        </main>
      </>
    );
  }
}

export default About;
