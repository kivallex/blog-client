import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Style from './style.module.css';
import { getAllCategories } from '../../services/api';
import classNames from 'classnames';
import UserLogin from '../modal/index';

import { ReactComponent as NavbarIcon } from '../../assets/menu.svg';

export let login = {};

class navbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			category: [],
			loggedIn: false
		};
	}

	async componentDidMount() {
		login.update = () => this.setState({ ...this.state, loggedIn: true });
		const category = await getAllCategories();

		this.setState({
			...this.state,
			category
		});
	}

	closeNavbar = () => {
		this.setState({ ...this.state, open: false });
	};

	openNavbar = () => {
		this.setState({ ...this.state, open: true });
	};

	logOut = () => {
		this.setState({ ...this.state, open: false, loggedIn: false });
		this.props.history.push('/');
	};

	render() {
		if (
			window.location.pathname.indexOf('/create') > -1 &&
			!this.state.loggedIn
		) {
			return <Redirect to="/" />;
		}

		return (
			<div className={Style.main}>
				<NavbarIcon className={Style.navbarIcon} onClick={this.openNavbar} />
				<div
					className={classNames({
						[Style.bg]: true,
						[Style.active]: this.state.open
					})}
					onClick={this.closeNavbar}
				/>
				<div
					className={classNames({
						[Style.sidenav]: true,
						[Style.active]: this.state.open
					})}
				>
					<p className={Style.label}>Account</p>
					<div>
						{!this.state.loggedIn && (
							<Link
								className={Style.item}
								to="/login"
								onClick={this.closeNavbar}
							>
								Admin log in
							</Link>
						)}
						{this.state.loggedIn && (
							<Link
								className={Style.item}
								to="/create"
								onClick={this.closeNavbar}
							>
								Create post
							</Link>
						)}
						{this.state.loggedIn && (
							<div className={Style.item} onClick={this.logOut}>
								Log out
							</div>
						)}
					</div>
					<p className={classNames(Style.label, Style.marginTop)}>Category</p>
					<div>
						<Link className={Style.item} to="/" onClick={this.closeNavbar}>
							all
						</Link>
						{this.state.category.map((category, index) => (
							<Link
								className={Style.item}
								to={`/${category.name}`}
								onClick={this.closeNavbar}
								key={index}
							>
								{category.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(navbar);
