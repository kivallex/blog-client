// this is where most of the HTML stuff goes in
// this is related to items that are being posted in the web

/* what do i need for each posts? all of these info are coming from app folder
 * Title for the post
 * Date for the post
 * Picture for the post
 * Content of the post
*/

import React from 'react';
import { Link } from 'react-router-dom';
import Style from './style.module.css';

const postItem = props => {
	const postInfo = props.postInfo;

	return (
		<div className={Style.main}>
			<Link
				className={Style.wrapper}
				to={`/${postInfo.category.name}/${postInfo.postTitle}`}
			>
				<div className={Style.contentBox}>
					<img className={Style.picture} src={postInfo.picture} />
					<h4 className={Style.title}>{postInfo.title}</h4>
					<p className={Style.date}>{postInfo.date}</p>
					<p className={Style.content}>{postInfo.preview}</p>
				</div>
			</Link>
		</div>
	);
};

export default postItem;
