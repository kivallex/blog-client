// this will contain about the post itself not the abbreviated version

import React from 'react';
import { getPost, createComment } from '../../services/api';
import Style from './style.module.css';

class postDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {},
			comment: ''
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

	async componentDidMount() {
		const category = this.props.match.params.category;
		const postTitle = this.props.match.params.postTitle;

		const post = await getPost(category, postTitle);

		if (!post) {
			this.props.history.push('/');
			return;
		}

		this.setState({
			...this.state,
			post
		});
	}

	submitComment = async () => {
		const comment = this.state.comment;

		createComment({ comment, postID: this.state.post._id })
			.then(() => {
				window.location.reload();
			})
			.catch(() => {
				window.alert('Error occurred!');
			});
	};

	render() {
		const post = this.state.post;

		return (
			<div className={Style.main}>
				<img className={Style.picture} src={post.picture} />
				<h3 className={Style.title}>{post.title}</h3>
				<p className={Style.date}>{post.date}</p>
				<div
					className={Style.content}
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
				<div className={Style.listComments}>
					{post.comments &&
						post.comments.map((item, index) => (
							<div key={index}>
								<div>{item.content}</div>
								<div>{item.date}</div>
							</div>
						))}
				</div>
				<div className={Style.commentField}>
					<p>Comment</p>
					<textarea
						className={Style.input}
						onChange={this.handleChange('comment')}
						value={this.state.comment}
						type="text"
					/>
					<button className={Style.submitBtn} onClick={this.submitComment}>
						Submit
					</button>
				</div>
			</div>
		);
	}
}

export default postDetail;
