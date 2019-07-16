import React from 'react';
import Style from './style.module.css';
import ReactQuill, { Quill } from 'react-quill';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { createNewPost } from '../../services/api';
import ImageUploader from 'react-images-upload';
import { createCategory, getAllCategories } from '../../services/api';

import ImageResize from './imageResize';

Quill.register('modules/imageResize', ImageResize);

class createPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			picture: '',
			content: '',
			category: '',
			categoryOptions: ['new category'],
			preview: ''
		};
		this.onDrop = this.onDrop.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.editorRef = React.createRef();
	}

	// this works just fine
	onDrop(picture) {
		if (picture && picture[0]) {
			const FR = new FileReader();

			FR.addEventListener('load', e => {
				this.setState({
					...this.state,
					picture: e.target.result
				});
			});

			FR.readAsDataURL(picture[0]);
		}
	}

	async onSelect(category) {
		if (category.value === 'new category') {
			const name = window.prompt('Enter new category here');
			await createCategory({ name });

			const categoryOptions = this.state.categoryOptions;
			categoryOptions.splice(0, 0, name);
			this.setState({
				...this.state,
				categoryOptions
			});
			return;
		}
		this.setState({
			...this.state,
			category: category.value
		});
	}

	async componentDidMount() {
		const categoryOptions = await getAllCategories();

		this.setState({
			...this.state,
			categoryOptions: categoryOptions
				.map(item => item.name)
				.concat('new category')
		});
	}

	modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' }
			],
			[{ align: '' }, { align: 'center' }, { align: 'right' }],
			['link', 'image', 'video'],
			['clean']
		],
		imageResize: {
			modules: ['Resize', 'DisplaySize']
		}
	};

	formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video'
	];

	handleChange = field => value => {
		if (field !== 'content') {
			value = value.target.value;
		}

		this.setState({
			...this.state,
			[field]: value
		});
	};

	submitPost = async () => {
		const title = this.state.title;
		const picture = this.state.picture;
		const content = this.state.content;
		const category = this.state.category;
		const preview = this.state.preview;

		createNewPost({ title, picture, content, category, preview })
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				window.alert('Error occurred!');
			});
	};

	render() {
		console.log(this.state.categoryOptions);

		return (
			<div className={Style.main}>
				<div className={Style.imageField}>
					<p>Background Image</p>
					<ImageUploader
						withPreview={true}
						withIcon={true}
						buttonText="Choose image"
						onChange={this.onDrop}
						imgExtension={['.jpg', '.gif', '.png', '.gif']}
						maxFileSize={5242880}
					/>
				</div>
				<div className={Style.titleField}>
					<p>Title</p>
					<input
						className={Style.input}
						onChange={this.handleChange('title')}
						value={this.state.title}
						type="text"
					/>
				</div>
				<div className={Style.titleField}>
					<p>Preview</p>
					<input
						className={Style.input}
						onChange={this.handleChange('preview')}
						value={this.state.preview}
						type="text"
					/>
				</div>
				<div className={Style.categoryField}>
					<p>Category</p>
					<Dropdown
						className={Style.list}
						options={this.state.categoryOptions}
						onChange={this.onSelect}
						value={this.state.category}
						placeholder="Select a category"
						controlClassName={Style.capitalize}
						menuClassName={Style.capitalize}
					/>
				</div>
				<div className={Style.contentField}>
					<p>Content</p>
					<ReactQuill
						ref={this.editorRef}
						value={this.state.content}
						onChange={this.handleChange('content')}
						modules={this.modules}
						formats={this.formats}
					/>
				</div>
				<button className={Style.submitBtn} onClick={this.submitPost}>
					Submit
				</button>
			</div>
		);
	}
}

export default createPost;
