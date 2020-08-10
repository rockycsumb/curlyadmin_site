import React from "react";
import ScrollAnimation from 'react-animate-on-scroll';
import Footer from "../Footers/Footer.js";
import '../../assets/css/about.css';

// reactstrap components
class About extends React.Component {
   render() {
    return (
      <>
        <main ref="main" className="services-background">
			<div style={{height: "80px"}}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
        <section className="">
			<div className="container pt-5">
				<div className="row-grid row">
					<div className="col-md-6">
						<ScrollAnimation animateIn="fadeIn">
						<div className="bg-color-default shadow border-0 card about-card">
							<img alt="..." src={require("../../assets/images/aboutpic.jpg")} className="card-img-top" />
								<blockquote className="card-blockquote" >
									<ScrollAnimation animateIn="fadeIn">
									<div className="card-body">
										<h2 className="font-weight-bold text-white card-title">A Virtual System</h2>
											<p className="lead text-white pb-5 card-text-size">
													CurlyAdmin is a service that provides its customers administrative and IT 												support. We believe no task is too big or too small to be handled with importance, attention to detail and accuracy. Our small business was inspired by our desire to serve others. Our mindset is to provide individuals with quality support allowing them to be more productive and efficient. 
											</p>
									</div>
									</ScrollAnimation>
								</blockquote>
						</div>
						</ScrollAnimation>
					</div>
					<div className="col-md-6">
						<ScrollAnimation animateIn="fadeInUp">
						<div className="text-color-default about-card">
							<div className="mb-3">
								<i className="fas fa-user-friends
										  bg-color-danger
										  rounded-circle p-3
										  text-color-danger
										  shadow-sm
										  about-icon
										  "
								/>
								{/*<i className="ni ni-settings"></i>*/}
							</div>
							<h3>Who We Are</h3>
							<div className="about-text">
								<p>
								<span className="font-weight-bold">Rocky</span> and <span className="font-weight-bold">Stef</span>, a dynamic duo. They combined their knowledge, expertise and ideas to
								create CurlyAdmin.
								</p>

								<div>
								<span className="font-weight-bold">Stef </span>is an executive assistant with an extensive background providing administrative
								support in both the private and public sector. Her experience includes calendar management, document drafting, reporting, budgeting	and forecasting as well as payroll and human resources support.<br />
									<div className="my-2" />
								She has a Bachelor’s degree in business administration with a concentration in
								information technology management and she is also fluent in English and Spanish.<br />
									<div className="my-2" />
								Her passionate personality reflects in her work as she performs her administrative tasks
								with care, accuracy and attention to detail.
								</div>
								<div className="my-2" />
								<div>
									<span className="font-weight-bold">Rocky</span> on the other hand is the brains behind the website development of CurlyAdmin.<br />
									<div className="my-2" />
								He’s a software developer with a Bachelor’s in Computer Science from California State
								University Monterey Bay. His programing experience include Java, PHP, JavaScript, C++ and Python with a concentration in MERN stack development.<br />
									<div className="mt-2" />
								He takes delight in front-end development but can take projects that include both front
								and back end coding. His problem solving skills and steady diligence contribute to the
								success needed to carry out desired results.
								</div>
						
							</div>
							</div>
							</ScrollAnimation>
					</div>
				</div>
			</div>
			</section>
        </main>
		<Footer />
      </>
    );
  }
}

export default About;
