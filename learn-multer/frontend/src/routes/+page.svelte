<script lang="ts">
	import axios from 'axios';

	let file: any;
	let files: any;

	const uploadSingleFile = async () => {
		const formData = new FormData();
		formData.set('name', 'Sahil Rajput');
		formData.set('price', '25');
		formData.append('photo', file);

		const payload = formData;
		const config = {
			headers: { 'Content-Type': 'multipart/form-data' }
		};
		try {
			const { data } = await axios.post('http://localhost:8080/single-image-2', payload, config);
			console.log('🚀 ~ uploadFile ~ data:', data);
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
			const { data } = await axios.post('http://localhost:8080/multiple-image-2', payload, config);
			console.log('🚀 ~ uploadFile ~ data:', data);
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
<input type="file" onchange={(e: any) => (file = e.target.files[0])} />
<button onclick={uploadSingleFile}>Submit</button>

<hr />

<h2 class="text-1xl mb-5 font-bold">Multiple File Upload</h2>
<input type="file" multiple onchange={(e: any) => (files = e.target.files)} />
<button onclick={uploadMultipleFiles}>Submit</button>

<style>
	button {
		border: 1px solid #000;
		padding: 3px 5px;
	}
	hr {
		margin: 50px 0px;
	}
</style>
