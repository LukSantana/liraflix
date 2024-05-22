import axios, { AxiosResponse } from "axios";
import { liraflixApiUrl } from "@src/environment";
import { addContentToListTypes, getContentTypes, getGenresTypes, updateContentTypes } from "@src/types/api/liraflixApiTypes";

export const getContent = async (
	{
		contentId,
		contentName,
		contentStatus,
		contentType,
		page,
	}: getContentTypes
): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content`);

	contentId && url.searchParams.set("contentId", contentId);
	contentName && url.searchParams.set("contentName", contentName);
	contentStatus && url.searchParams.set("contentStatus", contentStatus);
	contentType && url.searchParams.set("contentType", contentType);
	page && url.searchParams.set("page", page.toString());

	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const getRandomContent = async (): Promise<AxiosResponse | undefined> => {
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
}: addContentToListTypes) => {
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

	const getResponse: AxiosResponse | undefined = await getContent({ contentName: contentName });

	if (getResponse?.data.length > 0) {
		return {
			message: "O conteúdo selecionado já existe na lista.",
		};
	}

	let postResponse;
	await axios.post(url.toString(), body).then((data) => postResponse = data.data);

	return postResponse;
};

export const updateContentStatus = async ({
	content_id,
	content_status
}: updateContentTypes): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/${content_id}`);
	url = url.toString();

	const body = {
		content_status: content_status,
	};

	let response: AxiosResponse | undefined;
	await axios.put(url.toString(), body).then((data) => (response = data));

	return response;
};

export const getStatus = async ({ contentStatusId, contentStatusName }: { contentStatusId?: string, contentStatusName?: string }): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL(
		`${liraflixApiUrl}/status`
	);
	if (contentStatusId) url.searchParams.set("id", contentStatusId);
	if (contentStatusName) url.searchParams.set("statusName", contentStatusName);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const deleteContent = async (content_id: string): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL(`${liraflixApiUrl}/content/${content_id}`);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.delete(url.toString()).then((data) => (response = data));

	return response;
};


export const getGenres = async ({ genreName, contentType }: getGenresTypes): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL(`${liraflixApiUrl}/genres`);
	genreName && url.searchParams.set("genreName", genreName);
	contentType && url.searchParams.set("contentType", contentType);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};

export const getGenresByNames = async (genreNames: Array<string>): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL(
		`${liraflixApiUrl}/genres/${genreNames.toString()}`
	);
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};
