<script lang="ts">
	import axios from 'axios';

	let file: any;
	let files: any = [];

	let isSingleFileUploadSuccessful = $state(false);
	let isMultipleFileUploadSuccessful = $state(false);

	const uploadSingleFile = async () => {
		const formData = new FormData();
		formData.set('name', 'Sahil Rajput');
		formData.set('price', '25');
		formData.append('photo', file);

		console.log('🚀 ~ uploadSingleFile ~ file:', file);

		const payload = formData;
		const config = {
			headers: { 'Content-Type': 'multipart/form-data' }
		};
		try {
			const { data } = await axios.post('http://localhost:8080/v2/single-image', payload, config);
			console.log('🚀 ~ uploadFile ~ data:', data);

			// Asserting this alert is doable but its very inconsistant (flaky tests experience).
			// alert('single file upload successful');
			isSingleFileUploadSuccessful = true;
		} catch (error: any) {
			console.log('error?', error);
			const { data } = error.response;
			if (data.success === false) {
				alert(':SERVER:' + data.message);
			}
		}
	};

	const uploadMultipleFiles = async () => {
		const formData = new FormData();
		formData.set('name', 'Bahubali');
		formData.set('age', '52');

		Array.from(files).forEach((file: any) => {
			formData.append('photos', file);
		});

		const payload = formData;
		const config = {
			headers: { 'Content-Type': 'multipart/form-data' }
		};
		try {
			const { data } = await axios.post('http://localhost:8080/v2/multiple-image', payload, config);
			console.log('🚀 ~ uploadFile ~ data:', data);
			// Asserting this alert is doable but its very inconsistant (flaky tests experience).
			// alert('multiple file upload successful');
			isMultipleFileUploadSuccessful = true;
		} catch (error: any) {
			console.log('error?', error);
			const { data } = error.response;
			if (data.success === false) {
				alert(':SERVER:' + data.message);
			}
		}
	};
</script>

<h1 class="mb-5 text-3xl font-bold">Learn Multer</h1>

<h2 class="text-1xl mb-5 font-bold">Single File Upload</h2>
<input id="single-file-input" type="file" onchange={(e: any) => (file = e.target.files[0])} />
<button onclick={uploadSingleFile}>Submit single image</button>
<div class="text-green-600">
	{isSingleFileUploadSuccessful ? 'Single file upload successful' : ''}
</div>

<hr />

<h2 class="text-1xl mb-5 font-bold">Multiple File Upload</h2>
<input
	id="multiple-file-input"
	type="file"
	multiple
	onchange={(e: any) => (files = e.target.files)}
/>
<button onclick={uploadMultipleFiles}>Submit multiple images</button>
<div class="text-green-600">
	{isMultipleFileUploadSuccessful ? 'Multiple file upload successful' : ''}
</div>

<style>
	button {
		border: 1px solid #000;
		padding: 3px 5px;
	}
	hr {
		margin: 50px 0px;
	}
</style>
