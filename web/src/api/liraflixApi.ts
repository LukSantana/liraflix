import axios, { AxiosResponse } from "axios";
import { liraflixApiUrl } from "../environment";

export const getContent = async (
	{
		contentId,
		contentName,
		contentStatus,
		contentType,
	}: {
		contentId?: string,
		contentName?: string,
		contentStatus?: string,
		contentType?: string,
	}
) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content`);
	contentId && url.searchParams.set("contentId", contentId);
	contentName && url.searchParams.set("contentName", contentName);
	contentStatus && url.searchParams.set("contentStatus", contentStatus);
	contentType && url.searchParams.set("contentType", contentType);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const getRandomContent = async () => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/random`);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const addContentToList = async ({
	contentName,
	contentStatus,
	contentType,
	globalRating,
	genres,
	images
}: {
	contentName: string,
	contentStatus: string,
	contentType: string,
	globalRating: number
	genres: string,
	images: string
}) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content`);
	url = url.toString();

	const body = {
		contentName: contentName,
		contentStatus: contentStatus,
		contentType: contentType,
		globalRating: globalRating,
		genres: genres,
		images: images,
	};

	let response: AxiosResponse | undefined;

	response = await getContent({ contentName: contentName });

	if (response?.data) {
		return {
			message: "O conteúdo selecionado já existe na lista.",
		};
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

	let response: AxiosResponse | undefined;
	await axios.put(url.toString(), body).then((data) => (response = data));

	return response;
};

export const getStatusNameById = async (contentStatusId: string) => {
	console.log(contentStatusId);
	let url: URL | string = new URL(
		`${liraflixApiUrl}/status/${contentStatusId}`
	);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const deleteContent = async (content_id: string) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/${content_id}`);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.delete(url.toString()).then((data) => (response = data));

	return response;
};


export const getGenres = async (genreName?: string, contentType?: string) => {
	let url: URL | string = new URL(`${liraflixApiUrl}/genres`);
	genreName && url.searchParams.set("genreName", genreName);
	contentType && url.searchParams.set("contentType", contentType);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const getGenresByNames = async (genreNames: Array<string>) => {
	let url: URL | string = new URL(
		`${liraflixApiUrl}/genres/${genreNames.toString()}`
	);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};
