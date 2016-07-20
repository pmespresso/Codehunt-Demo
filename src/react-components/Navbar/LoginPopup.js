import React from 'react';

import Popup from './Popup';

import Actions from '../../actions';

class LoginPopup extends React.Component {

	handleLogin = () => {
		Actions.login();
		this.props.hidePopup();
	}


	render() {
		return (
			<Popup {...this.props} className="login-popup" style="login-popup"> <img src="img/kitty.png" />
				<h1> Login To Join The Community! </h1>
				<p> Codehunt is a community to share and geek out about the latest code </p>
				<button className="facebook-btn" onClick={this.handleLogin}>Login with Facebook </button>
				<p> We will never post to Facebook without your permission </p>
			</Popup>
		);
	}
}

export default LoginPopup;
