import React, {useState, useEffect, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import {registerSocialMedia} from '../../actions/auth';
import './Auth.css';

// reactstrap components
import {
  Button
} from 'reactstrap';

const Facebook = ({login, isAuthenticated, registerSocialMedia}) => {
	
	const [userInfo, setUserInfo] = useState({
		isLoggedIn: false,
		userID: '',
		name: '',
		email: '',
		picture: ''
	})
	const {name, email, userID} = userInfo;
	
	const componentClicked = ()=>{
		console.log('clicked');
	}
	
	const responseFacebook = response => {
		if(response.status){
			console.log("not logged in");
		} else {
			
				setUserInfo({
				isLoggedIn: true,
				userID: response.id,
				name: response.name,
				email: response.email,
				picture: response.picture.data.url
				})
		}		
	}
	
	useEffect(() =>{
		registerSocialMedia({name, email, password: userID, privacy: "true" });
		
		//Redirect if logged login
		if(isAuthenticated){
			
			return <Redirect to="/dashboard/overview" />
		}
		
	}, [userInfo]);
	

		console.log("a click")
		if(userInfo.isLoggedIn){
			return(
				<Fragment />
			)
		} else {
			return (
			<FacebookLogin
				appId="633277577438682"
				autoLoad={false}
				fields="name, email, picture"
				callback={responseFacebook}
				render={renderProps => (
    						<Button onClick={renderProps.onClick} className="btn-neutral btn-icon ml-1" color="default" > <span className="btn-inner--icon mr-1">
                    		<i className="fa fa-facebook-square" style={{fontSize: "1.5em"}}/>
                          </span><span className="btn-inner--text">Facebook</span></Button>
  						)}
			/>)
	}
	
	return (
			<Fragment />
	)	
}

Facebook.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	registerSocialMedia: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login, registerSocialMedia})(Facebook);