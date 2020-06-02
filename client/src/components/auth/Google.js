import React, {useState, useEffect, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import {registerSocialMedia} from '../../actions/auth';
import './Auth.css';

// reactstrap components
import {
  Button
} from 'reactstrap';

const Google = ({login, isAuthenticated, registerSocialMedia}) => {
	
	const [userInfo, setUserInfo] = useState({
		isLoggedIn: false,
		userID: '',
		name: '',
		email: '',
		picture: ''
	})
	const {name, email, userID} = userInfo;
	
	const clickHandle = () =>{
		console.log("clicked");
	}
	
	const responseGoogle = response => {
		
		
		if(response.status){
			console.log("not logged in");
		} else {
			
				setUserInfo({
				isLoggedIn: true,
				userID: response.profileObj.googleId,
				name: response.profileObj.name,
				email: response.profileObj.email,
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
	

		
		if(userInfo.isLoggedIn){
			return(
				<Fragment />
			)
		} else {
			return (
			<GoogleLogin
				clientId="465962391442-d0f8qgffc15hrpu71sfcdjoc1fen35cl.apps.googleusercontent.com"
				render={renderProps => (
    						<Button 
								onClick={renderProps.onClick} 
								className="btn-neutral btn-icon ml-1" 
								color="default"
							> 
							<span className="btn-inner--icon mr-1">
                    			<i className="fa fa-google" style={{fontSize: "1.5em"}}/>
                          	</span>
								<span className="btn-inner--text">Google</span>
							</Button>
  						)}
				buttonText="Login"
				onClick={()=>clickHandle()}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>)
	}
	
	return (
						<Fragment />
	)	
}

Google.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	registerSocialMedia: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login, registerSocialMedia})(Google);