import { getStatus } from "@src/api/liraflixApi";
import translate from "translate";

interface Status {
	id: string;
	status: string;
	translation: string;
}

export const possibleStatus: Array<Status> = [
	{
		id: "da3cea2f-4d6f-461c-832c-4047cc550ba1",
		status: "Plan to Watch",
		translation: "Planeja Assistir",
	},
	{
		id: "07be2da2-00f9-4501-a129-9cb5b3f3f5c9",
		status: "Watching",
		translation: "Assistindo",
	},
	{
		id: "ce6969fb-530f-4273-9518-eafe4d17f977",
		status: "Dropped",
		translation: "Droppado",
	},
	{
		id: "0755b68e-e00d-4e1c-a631-38d81e48cc19",
		status: "On Wait",
		translation: "Em Espera",
	},
	{
		id: "df4b8791-8750-4956-88ba-a2c241c16914",
		status: "Completed",
		translation: "Assistido",
	},
];

export const translateStatusIdToName = async (statusId: string) => {
	const statusInfo = await getStatus({ contentStatusId: statusId }).then(response => response?.data[0]);

	const statusName = statusInfo.status;

	const translatedStatus = await translate(statusName, { to: "pt" });

	return translatedStatus;
};

export const translateStatusNameToId = async (statusName: string) => {
	const translatedStatus = await translate(statusName, { to: "en" });

	const statusInfo = await getStatus({ contentStatusName: translatedStatus }).then(response => response?.data[0]);

	const statusId = statusInfo.id;

	return statusId;
};
