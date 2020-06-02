import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeAlert} from '../../actions/alert';
import {Alert as AlertMsg } from 'reactstrap';
import './Alert.css';



const Alert = ({alerts, removeAlert}) => { 
	  
	  const onDismiss = (id) => {
		  removeAlert(id);
	  };
	 
	return(
		
	  alerts !== null && alerts.length > 0 &&
	  alerts.map(alert =>(
		  
	  	<div key={alert.id}>
			  <AlertMsg 
				  color={`${alert.alertType}`} 
				  toggle={e => onDismiss(alert.id)}
				  className={ alert.fade ? 'alertFadeOut' : ""}
				  
				>
				  
				  	{alert.msg} 
			  </AlertMsg>
		  </div>
	  )))
}

Alert.propTypes ={
	alerts: PropTypes.array.isRequired,
	removeAlert: PropTypes.func.isRequired
}



const mapStateToProps = state =>({
	alerts: state.alert
})

export default connect(mapStateToProps, {removeAlert})(Alert);