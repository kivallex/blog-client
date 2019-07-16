import React from 'react';
import ReactDOM from 'react-dom';
import Style from './style.module.css';
import { userLogin } from '../../services/api';
import { login as loginUser } from '../navbar';

// without using Modal
class login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: ''
		};
	}

	handleChange = field => value => {
		if (field !== 'content') {
			value = value.target.value;
		}

		this.setState({
			...this.state,
			[field]: value
		});
	};

	submitPassword = e => {
		e.preventDefault();
		const password = this.state.password;

		userLogin({ password })
			.then(() => {
				loginUser.update();
				window.alert('Successfully Logged In!');
				this.props.history.push('/');
			})
			.catch(() => {
				window.alert('Error occurred!');
			});
	};

	render() {
		return (
			<div className={Style.main}>
				<form onSubmit={this.submitPassword}>
					<div className={Style.passwordField}>
						Password
						<input
							type="password"
							name="password"
							className={Style.input}
							onChange={this.handleChange('password')}
							value={this.state.password}
							type="text"
						/>
					</div>
					<button className={Style.loginBtn}>Login</button>
				</form>
			</div>
		);
	}
}

export default login;

// this is done for ReactModalLogin
// i need to connect password input in to this
// class loginUser extends React.Component {
// 	constructor(props) {
// 		super(props);
//
// 		this.state = {
// 			showModal: false,
// 			loading: false,
// 			error: null
// 		};
// 	}
//
// 	openModal() {
// 		this.setState({
// 			showModal: true
// 		});
// 	}
//
// 	closeModal() {
// 		this.setState({
// 			showModal: false,
// 			error: null
// 		});
// 	}
//
// 	onLoginSuccess(method, response) {
// 		console.log('Successfully Logged In with ' + method);
// 	}
//
// 	onLoginFail(method, response) {
// 		console.log('Failed to Login with ' + method);
// 		this.setState({
// 			error: response
// 		});
// 	}
//
// 	startLoading() {
// 		this.setState({
// 			loading: true
// 		});
// 	}
//
// 	finishLoading() {
// 		this.setState({
// 			loading: false
// 		});
// 	}
//
// 	afterTabsChange() {
// 		this.setState({
// 			error: null
// 		});
// 	}
//
// 	render() {
// 		return (
// 			<div>
// 				<ReactModalLogin
// 					visible={this.state.showModal}
// 					onCloseModal={this.closeModal.bind(this)}
// 					loading={this.state.loading}
// 					error={this.state.error}
// 					tabs={{ afterChange: this.afterTabsChange.bind(this) }}
// 					loginError={{ label: "Couldn't sign in, please try again." }}
// 					startLoading={this.startLoading.bind(this)}
// 					finishLoading={this.finishLoading.bind(this)}
// 				/>
// 			</div>
// 		);
// 	}
// }

// export default loginUser;
