import axios from 'axios';

const exampleCategories = ['Food', 'Video', 'Life'];

const URL =
	process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export const getAllPosts = async () => {
	const res = await axios.get(URL + '/api/posts');
	const posts = res.data;
	return posts;
};

export const getPost = async (category, title) => {
	const res = await axios.get(
		`${URL}/api/post?category=${category}&title=${title}`
	);
	return res.data;
};

export const createNewPost = async data => {
	const res = await axios.post(URL + '/api/create', data);
	return res.data;
};

export const createComment = async data => {
	const res = await axios.post(URL + '/api/create/comment', data);
	return res.data;
};

export const getAllCategories = async () => {
	const res = await axios.get(URL + '/api/category');
	return res.data;
};

export const userLogin = async data => {
	const res = await axios.post(URL + '/api/login', data);
	return res.data;
};

export const createCategory = async data => {
	const res = await axios.post(URL + '/api/create/category', data);
	return res.data;
};
