import axios from "axios";
import { liraflixApiUrl } from "../environment";

export const getContentList = async (
	contentId?: string,
	contentName?: string,
	contentStatus?: string,
	contentType?: string
) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/list`);
	contentId && url.searchParams.set("contentId", contentId);
	contentName && url.searchParams.set("contentName", contentName);
	contentStatus && url.searchParams.set("contentStatus", contentStatus);
	contentType && url.searchParams.set("contentType", contentType);
	url = url.toString();

	let response;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const getContentById = async (contentId: string) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/id/${contentId}`);
	url = url.toString();

	let response;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const getContentByName = async (contentName: string) => {
	let url: URL | string = new URL(
		`${liraflixApiUrl}/content/name/${contentName}`
	);
	url = url.toString();

	let response;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const addContentToList = async (
	content_name: string,
	content_status: string,
	content_type: string,
	global_rating: number | string,
	genres: Array<string>,
	images: string
) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content`);
	url = url.toString();

	const body = {
		name: content_name,
		content_status: content_status,
		content_type: content_type,
		global_rating: global_rating,
		genres: genres,
		images: images,
	};

	let response;

	response = await getContentByName(content_name);

	if (response.data) {
		return (response = {
			message: "O conteúdo selecionado já existe na lista.",
		});
	}
	await axios.post(url.toString(), body).then((data) => (response = data));

	return response;
};

export const updateContentStatus = async (
	content_id: string,
	content_status: string
) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/${content_id}`);
	url = url.toString();

	const body = {
		content_status: content_status,
	};

	let response;
	await axios.put(url.toString(), body).then((data) => (response = data));

	return response;
};

export const deleteContent = async (content_id: string) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/${content_id}`);
	url = url.toString();

	let response;
	await axios.delete(url.toString()).then((data) => (response = data));

	return response;
};

export const getGenres = async (genreName?: string, contentType?: string) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/genres`);
	genreName && url.searchParams.set("genreName", genreName);
	contentType && url.searchParams.set("contentType", contentType);
	url = url.toString();

	let response;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const getGenresByNames = async (genreNames: Array<string>) => {
	let url: URL | string = new URL(
		`${liraflixApiUrl}/genres/${genreNames.toString()}`
	);
	url = url.toString();

	let response;
	await axios.get(url).then((data) => (response = data));

	return response;
};
