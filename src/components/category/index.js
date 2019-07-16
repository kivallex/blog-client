import React from 'react';
import { Link } from 'react-router-dom';
import Style from './style.module.css';
import { getAllCategories } from '../../services/api';

const category = () => {
	const categories = getAllCategories();
	return (
		<div className={Style.categoryBox}>
			<div>
				<Link to="/">All</Link>
			</div>
			{categories.map(category => (
				<div key={category}>
					<Link to={`/${category}`}>{category}</Link>
				</div>
			))}
		</div>
	);
};

export default category;
