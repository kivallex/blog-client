// this is where most of the HTML stuff goes in
// this is related to the whole web

import React from 'react';
import PostItem from '../../components/postItem';
import { getAllPosts } from '../../services/api';
import Style from './style.module.css';

class home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}

	async componentDidMount() {
		const posts = await getAllPosts();

		this.setState({
			...this.state,
			posts
		});
	}

	render() {
		const category = this.props.match.params.category;
		let posts = this.state.posts;

		if (category) {
			posts = posts.filter(post => post.category.name === category);
		}

		return (
			<div className={Style.main}>
				{posts
					.reverse()
					.map((post, index) => <PostItem key={index} postInfo={post} />)}
			</div>
		);
	}
}

export default home;
