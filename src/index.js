import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './modules/home';
import PostDetail from './modules/postDetail';
import Navbar from './components/navbar';
import CreatePost from './modules/createPost';
import AdminLogin from './components/modal';
import './style.css';
import 'react-quill/dist/quill.snow.css';

ReactDOM.render(
	<Router>
		<Navbar />
		<Switch>
			<Route exact path="/create" component={CreatePost} />
			<Route exact path="/login" component={AdminLogin} />
			<Route exact path="/:category/:postTitle" component={PostDetail} />
			<Route exact path="/:category" component={Home} />
			<Route exact path="/" component={Home} />
		</Switch>
	</Router>,
	document.getElementById('root')
);
